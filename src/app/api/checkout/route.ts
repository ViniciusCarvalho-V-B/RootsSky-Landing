import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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

    // Se for a chave mock, nós bypassamos a integração do Stripe real para permitir testes do front-end
    if (process.env.STRIPE_SECRET_KEY === "sk_test_mock_key_for_development") {
      // Simula que o pedido foi pago e atualiza o status para COMPLETED
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          stripeSessionId: "mock_session_" + order.id,
          status: "COMPLETED", 
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

    // 2. Criar a sessão do Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: item.name,
              description: `Comprador: ${playerNick}`,
            },
            unit_amount: Math.round(item.rawPrice * 100), // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Metadata importante para o Webhook saber qual pedido e quais comandos executar
      metadata: {
        orderId: order.id,
        playerNick,
        commandToQueue: item.command,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/store?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/store?canceled=true`,
    });

    // 3. Atualizar o pedido com o ID da sessão do Stripe
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    // Retorna a URL segura do Stripe para redirecionar o usuario
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erro no checkout:", error);
    return NextResponse.json({ 
      error: "Erro interno no servidor.", 
      details: (error as Error).message,
      stack: (error as Error).stack 
    }, { status: 500 });
  }
}
