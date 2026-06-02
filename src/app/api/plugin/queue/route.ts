import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Middleware simples para validar o token do plugin
function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.PLUGIN_SECRET;
  
  if (!secret) {
    console.warn("PLUGIN_SECRET não está definido no .env!");
    return false;
  }
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  
  const token = authHeader.split(" ")[1];
  return token === secret;
}

// GET: Retorna a lista de comandos pendentes
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const pendingCommands = await prisma.commandQueue.findMany({
      where: {
        status: "PENDING"
      },
      orderBy: {
        createdAt: "asc" // Os mais antigos primeiro
      },
      // Retornar também algumas infos do player se o plugin quiser usar
      include: {
        order: {
          select: {
            playerNick: true,
            playerUuid: true,
          }
        }
      }
    });

    return NextResponse.json({ commands: pendingCommands });
  } catch (error) {
    console.error("Erro ao buscar comandos:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// POST: O plugin avisa quais comandos foram executados com sucesso
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { executedIds } = body;

    if (!Array.isArray(executedIds)) {
      return NextResponse.json({ error: "Formato inválido. 'executedIds' deve ser um array." }, { status: 400 });
    }

    if (executedIds.length === 0) {
      return NextResponse.json({ success: true, count: 0 });
    }

    // Atualiza todos os comandos informados para EXECUTED
    const result = await prisma.commandQueue.updateMany({
      where: {
        id: {
          in: executedIds
        },
        status: "PENDING" // Garante que não re-atualize
      },
      data: {
        status: "EXECUTED",
        executedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    console.error("Erro ao confirmar comandos:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
