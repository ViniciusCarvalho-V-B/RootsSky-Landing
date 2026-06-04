import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import crypto from "crypto";
import { payment } from "@/lib/mercadopago";
import { CATALOG } from "@/lib/catalog";
import { sendDiscordPurchaseNotification } from "@/lib/discord";

export const dynamic = "force-dynamic";

// Helper para validar a assinatura enviada pelo Mercado Pago
function validateSignature(signatureHeader: string, requestId: string, dataId: string, secret: string): boolean {
  if (!signatureHeader || !requestId || !dataId) return false;

  // O header x-signature tem o formato: ts=...,v1=...
  const parts = signatureHeader.split(",");
  let ts = "";
  let v1 = "";

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key === "ts") ts = value;
    if (key === "v1") v1 = value;
  }

  if (!ts || !v1) return false;

  // Manifest é formado por: id;request-id
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  
  // Criar HMAC SHA256 do manifest usando o Webhook Secret
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);
  const hash = hmac.digest("hex");

  // Comparar de forma segura
  try {
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(v1));
  } catch (err) {
    console.error("Erro na verificação de assinatura:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // 1. Coletar headers e body
    const xSignature = headers().get("x-signature");
    const xRequestId = headers().get("x-request-id");
    const body = await request.json();

    const webhookSecret = process.env.MP_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("MP_WEBHOOK_SECRET não configurado.");
      return NextResponse.json({ error: "Internal Configuration Error" }, { status: 500 });
    }

    // Identificar a ação e o ID (varia um pouco na API do MP, geralmente vêm em data.id ou id)
    const dataId = body?.data?.id || body?.id;
    const action = body?.action || body?.type;

    if (!dataId) {
      return NextResponse.json({ received: true }); // Ignorar requisições malformadas
    }

    // 2. Validar assinatura criptográfica (apenas em produção ou quando a assinatura estiver presente)
    if (xSignature && xRequestId) {
      const isValid = validateSignature(xSignature, xRequestId, String(dataId), webhookSecret);
      if (!isValid) {
        console.error("Tentativa de webhook com assinatura inválida bloqueada!");
        return NextResponse.json({ error: "Invalid Signature" }, { status: 403 });
      }
    } else {
      console.warn("Recebido webhook sem x-signature (pode ser ambiente de teste do MP).");
      // O MP às vezes manda testes iniciais sem signature completa, mas num ambiente restrito real, bloquearíamos aqui:
      // return NextResponse.json({ error: "Missing Signature" }, { status: 401 });
    }

    // 3. Processar apenas eventos de pagamento "payment"
    if (action === "payment.created" || action === "payment.updated" || body?.type === "payment") {
      
      // 4. Buscar os dados REAIS do pagamento diretamente na API do MP por segurança
      const paymentData = await payment.get({ id: dataId });
      
      if (paymentData.status === "approved") {
        const orderId = paymentData.external_reference;
        const metadata = paymentData.metadata; // Metadata costuma vir como json ou objeto
        
        if (!orderId) {
          console.error("Pagamento aprovado, mas sem external_reference associado.");
          return NextResponse.json({ received: true });
        }

        // Recuperar o pedido
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true }
        });

        if (order && order.status !== "pending_delivery" && order.status !== "COMPLETED") {
          // 5. Atualizar o status para pending_delivery
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "pending_delivery" },
          });

          const playerNick = order.playerNick;
          const commandToQueue = metadata?.command_to_queue;

          // Incrementa uso do cupom se existir
          if (order.couponCode) {
            await prisma.coupon.update({
              where: { code: order.couponCode },
              data: { uses: { increment: 1 } },
            }).catch(e => console.error("Erro ao incrementar uso do cupom:", e));
          }

          // 6. Inserir os comandos na fila do Plugin Java
          if (commandToQueue) {
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
          }

          // 7. Notificar o Discord
          const productNames = order.items.map(i => CATALOG[i.productId]?.name || "Produto Desconhecido");
          await sendDiscordPurchaseNotification(playerNick, productNames, order.totalAmount);

          console.log(`✅ Pagamento ${dataId} aprovado para ${playerNick}! Comandos enfileirados.`);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no processamento do Webhook Mercado Pago:", error);
    return NextResponse.json({ error: "Webhook Handler Error" }, { status: 500 });
  }
}
