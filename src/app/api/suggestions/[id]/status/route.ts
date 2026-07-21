import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['open', 'reviewing', 'approved', 'rejected', 'cancelled', 'implemented'];
    
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 });
    }

    const updatedSuggestion = await prisma.suggestion.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedSuggestion);
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
