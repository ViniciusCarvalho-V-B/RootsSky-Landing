import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id: suggestionId } = params;
    const body = await request.json();
    const { playerNick, playerUuid, voteType, optionId } = body;

    if (!playerNick || !playerUuid) {
      return NextResponse.json({ error: "Identificação do jogador necessária." }, { status: 400 });
    }

    // Buscar a sugestao para validar o tipo
    const suggestion = await prisma.suggestion.findUnique({
      where: { id: suggestionId },
      include: { options: true }
    });

    if (!suggestion) {
      return NextResponse.json({ error: "Sugestão não encontrada." }, { status: 404 });
    }

    if (suggestion.status !== 'open') {
      return NextResponse.json({ error: "Esta votação já está encerrada." }, { status: 403 });
    }

    // Validar os dados de acordo com o tipo
    if (suggestion.type === 'updown' && (voteType !== 'up' && voteType !== 'down')) {
      return NextResponse.json({ error: "Voto deve ser 'up' ou 'down'." }, { status: 400 });
    }

    if (suggestion.type === 'poll' && !optionId) {
      return NextResponse.json({ error: "Selecione uma opção válida." }, { status: 400 });
    }
    
    if (suggestion.type === 'poll' && optionId) {
      const validOption = suggestion.options.some(opt => opt.id === optionId);
      if (!validOption) {
        return NextResponse.json({ error: "Opção inválida para esta enquete." }, { status: 400 });
      }
    }

    // Tentar criar o voto, vai falhar se já existir devido ao @@unique([suggestionId, playerUuid])
    try {
      const vote = await prisma.suggestionVote.create({
        data: {
          suggestionId,
          playerNick,
          playerUuid,
          ...(suggestion.type === 'updown' ? { voteType } : { optionId })
        }
      });
      return NextResponse.json(vote, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // Prisma error code for unique constraint violation
      if (e.code === 'P2002') {
        return NextResponse.json({ error: "Você já votou nesta sugestão." }, { status: 409 });
      }
      throw e;
    }

  } catch (error) {
    console.error("Erro ao computar voto:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id: suggestionId } = params;
    const body = await request.json();
    const { playerUuid } = body;

    if (!playerUuid) {
      return NextResponse.json({ error: "UUID do jogador não fornecido." }, { status: 400 });
    }

    // Deletar usando deleteMany já que o índice unico é suggestionId + playerUuid
    // deleteMany é mais seguro caso passemos parametros que nao sao ID primario
    const result = await prisma.suggestionVote.deleteMany({
      where: {
        suggestionId,
        playerUuid
      }
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Voto não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao remover voto:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
