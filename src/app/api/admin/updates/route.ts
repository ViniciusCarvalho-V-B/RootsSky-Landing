import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
import { sendDiscordUpdateNotification } from '@/lib/discord';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const updates = await prisma.update.findMany({
      orderBy: { createdAt: 'desc' },
      ...(limit && !isNaN(limit) ? { take: limit } : {}),
    });

    return NextResponse.json(updates);
  } catch (error) {
    console.error("Erro ao buscar atualizações:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Título e conteúdo são obrigatórios." }, { status: 400 });
    }

    const newUpdate = await prisma.update.create({
      data: {
        title,
        content,
        author: author || "Admin",
      },
    });

    // Enviar webhook para o Discord (nao trava a requisicao se falhar)
    sendDiscordUpdateNotification(newUpdate.title, newUpdate.content).catch(err => {
      console.error("Falha ao enviar webhook do Discord:", err);
    });

    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar atualização:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
