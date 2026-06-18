import { NextResponse } from "next/server";
import { preference } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";

import { CATALOG } from "@/lib/catalog";
import { sendDiscordPurchaseNotification } from "@/lib/discord";

import { checkoutRateLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkoutRateLimiter.check(ip)) {
      return NextResponse.json({ error: "Muitas requisições. Tente novamente mais tarde." }, { status: 429 });
    }

    const body = await request.json();
    const { productId, playerNick, playerUuid, couponCode } = body;

    if (!productId || !playerNick || !playerUuid) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    const nickRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!nickRegex.test(playerNick)) {
      return NextResponse.json({ error: "Nickname inválido." }, { status: 400 });
    }

    const item = CATALOG[productId];
    if (!item) {
      return NextResponse.json({ error: "Produto inválido." }, { status: 400 });
    }

    let finalPrice = item.rawPrice;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive) {
        let isValid = true;
        
        if (coupon.maxUses && coupon.uses >= coupon.maxUses) {
          isValid = false;
        }
        
        if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
          isValid = false;
        }

        if (isValid) {
          // Verifica se é elegível
          const isEligible = !coupon.eligibleItems || coupon.eligibleItems.split(",").includes(item.id);
          if (isEligible) {
            finalPrice = parseFloat((finalPrice * (1 - coupon.discountPct / 100)).toFixed(2));
            appliedCoupon = coupon.code;
          }
        }
      }
    }

    // 1. Criar o pedido no nosso banco de dados (Status PENDING)
    const order = await prisma.order.create({
      data: {
        playerNick,
        playerUuid,
        totalAmount: finalPrice,
        status: "PENDING",
        couponCode: appliedCoupon,
        items: {
          create: {
            productId: item.id,
            price: finalPrice,
            quantity: 1,
          }
        }
      },
    });

    // Se for a chave mock (ambiente de teste sem mercado pago configurado corretamente)
    if (process.env.MP_ACCESS_TOKEN === "APP_USR-mock-key") {
      // Simula que o pedido foi pago e atualiza o status para pending_delivery
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          paymentId: "mock_session_" + order.id,
          status: "pending_delivery", 
        },
      });
      // Incrementa uso do cupom se existir
      if (order.couponCode) {
        await prisma.coupon.update({
          where: { code: order.couponCode },
          data: { uses: { increment: 1 } },
        }).catch(e => console.error("Erro ao incrementar uso do cupom mock:", e));
      }
      
      // Simula o processamento do webhook inserindo os comandos na fila
      const rawCommands = item.command.split(";").map((c) => c.trim()).filter((c) => c.length > 0);
      for (const rawCmd of rawCommands) {
        const parsedCommand = rawCmd.replace(/{name}/g, playerNick);
        await prisma.commandQueue.create({
          data: {
            orderId: order.id,
            command: parsedCommand,
          }
        });
      }

      // Webhook do Discord simulado
      await sendDiscordPurchaseNotification(playerNick, [item.name], finalPrice);

      return NextResponse.json({ url: `https://www.rootssky.app/store?success=true` });
    }

    // 2. Criar a Preference (Sessão de Checkout) do Mercado Pago
    const prefResult = await preference.create({
      body: {
        items: [
          {
            id: item.id,
            title: item.name + (appliedCoupon ? ` (Cupom: ${appliedCoupon})` : ""),
            description: `Comprador: ${playerNick}`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: finalPrice,
          }
        ],
        external_reference: order.id, // Passa o ID do pedido para o Webhook identificar depois
        metadata: {
          player_nick: playerNick,
          command_to_queue: item.command,
        },
        back_urls: {
          success: `https://www.rootssky.app/store?success=true`,
          failure: `https://www.rootssky.app/store?canceled=true`,
          pending: `https://www.rootssky.app/store?pending=true`,
        },
        auto_return: "approved",
        notification_url: "https://www.rootssky.app/api/webhooks/mercadopago", // URL FORÇADA COM WWW PARA EVITAR ERRO 308
      }
    });

    // 3. O Mercado Pago não usa o ID da Preference para identificar o pagamento no banco
    // Mas podemos salvar como paymentId inicial e o webhook pode atualizar ou buscar pela external_reference.
    // Vamos salvar a preference id por enquanto.
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: prefResult.id },
    });

    // Retorna a URL de redirecionamento (init_point = checkout normal)
    // Se quiser o checkout transparente ou iframe sandbox, tem o sandbox_init_point
    return NextResponse.json({ url: prefResult.init_point });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Erro interno no checkout." }, { status: 500 });
  }
}
