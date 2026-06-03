import { NextResponse } from "next/server";
import { preference } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";

import { CATALOG } from "@/lib/catalog";
import { sendDiscordPurchaseNotification } from "@/lib/discord";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, playerNick, playerUuid } = body;

    if (!productId || !playerNick || !playerUuid) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    const item = CATALOG[productId];
    if (!item) {
      return NextResponse.json({ error: "Produto inválido." }, { status: 400 });
    }

    // 1. Criar o pedido no nosso banco de dados (Status PENDING)
    const order = await prisma.order.create({
      data: {
        playerNick,
        playerUuid,
        totalAmount: item.rawPrice,
        status: "PENDING",
        items: {
          create: {
            productId: item.id,
            price: item.rawPrice,
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
      await sendDiscordPurchaseNotification(playerNick, [item.name], item.rawPrice);

      return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_APP_URL}/store?success=true` });
    }

    // 2. Criar a Preference (Sessão de Checkout) do Mercado Pago
    const prefResult = await preference.create({
      body: {
        items: [
          {
            id: item.id,
            title: item.name,
            description: `Comprador: ${playerNick}`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: item.rawPrice,
          }
        ],
        external_reference: order.id, // Passa o ID do pedido para o Webhook identificar depois
        metadata: {
          player_nick: playerNick,
          command_to_queue: item.command,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/store?success=true`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/store?canceled=true`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/store?pending=true`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`, // A URL do nosso novo Webhook
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
