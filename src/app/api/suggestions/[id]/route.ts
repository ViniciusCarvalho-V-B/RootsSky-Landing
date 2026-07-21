import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';

// EDITAR SUGESTÃO
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description } = body;

    const suggestion = await prisma.suggestion.update({
      where: { id },
      data: {
        title,
        description,
      }
    });

    return NextResponse.json(suggestion);
  } catch (error) {
    console.error("Erro ao atualizar sugestão:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// DELETAR SUGESTÃO
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.suggestion.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar sugestão:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
