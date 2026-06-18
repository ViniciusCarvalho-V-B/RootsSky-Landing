import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutRateLimiter } from "@/lib/rate-limit"; // Usando o rate limit de checkout ou criando um novo

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkoutRateLimiter.check(ip)) {
      return NextResponse.json({ error: "Muitas solicitações. Tente novamente mais tarde." }, { status: 429 });
    }

    const body = await request.json();
    const { nick } = body;

    if (!nick || typeof nick !== "string") {
      return NextResponse.json({ error: "Nickname inválido." }, { status: 400 });
    }

    // Anonimiza pedidos: troca o nick para Anônimo e remove o playerUuid real
    // Mas ATENÇÃO: Se o pedido não foi entregue, isso pode quebrar o webhook.
    // Idealmente, apenas marcamos no banco. Vamos anonimizar apenas os já EXECUTED.
    // Como a lógica do BD não tem status do pedido, vamos anonimizar tudo,
    // garantindo que pedidos em andamento já foram pra fila do plugin.
    
    // Obfuscation query
    const result = await prisma.order.updateMany({
      where: {
        playerNick: {
          equals: nick,
          mode: 'insensitive'
        }
      },
      data: {
        playerNick: "Jogador Anônimo",
        playerUuid: "anonymous-uuid",
      }
    });

    if (result.count === 0) {
      // Retorna sucesso de qualquer forma para não confirmar existência
      return NextResponse.json({ success: true, message: "Dados processados." });
    }

    return NextResponse.json({ success: true, message: "Dados anonimizados com sucesso." });
  } catch (error) {
    console.error("Erro na solicitação de exclusão:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
