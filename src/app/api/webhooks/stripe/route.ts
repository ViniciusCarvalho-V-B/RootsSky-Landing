import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Stripe from "stripe";
import { sendDiscordPurchaseNotification } from "@/lib/discord";
import { CATALOG } from "@/lib/catalog";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", (error as Error).message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Lidar apenas com pagamentos concluídos com sucesso
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const orderId = session.metadata?.orderId;
    const playerNick = session.metadata?.playerNick;
    const commandToQueue = session.metadata?.commandToQueue;

    if (orderId && commandToQueue && playerNick) {
      try {
        // 1. Marcar o pedido como COMPLETED
        const order = await prisma.order.update({
          where: { id: orderId },
          data: { status: "COMPLETED" },
          include: { items: true }
        });

        // 2. Formatar o comando substituindo {name} pelo nick real
        const rawCommands = commandToQueue.split(";").map((c: string) => c.trim()).filter((c: string) => c.length > 0);
        for (const rawCmd of rawCommands) {
          const finalCommand = rawCmd.replace(/{name}/g, playerNick);
          await prisma.commandQueue.create({
            data: {
              orderId: orderId,
              command: finalCommand,
              status: "PENDING",
            },
          });
        }

        // 3. Notificar o Discord
        const productNames = order.items.map(i => CATALOG[i.productId]?.name || "Produto Desconhecido");
        await sendDiscordPurchaseNotification(playerNick, productNames, order.totalAmount);

        console.log(`✅ Pagamento aprovado para ${playerNick}! Comandos enfileirados: ${commandToQueue}`);
      } catch (err) {
        console.error("Erro ao atualizar banco de dados no Webhook:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
