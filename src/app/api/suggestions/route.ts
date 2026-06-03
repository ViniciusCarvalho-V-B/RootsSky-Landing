import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
import { sendDiscordSuggestionNotification } from '@/lib/discord';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const sortFilter = searchParams.get('sort') || 'recent';

    // 1. Buscamos as sugestões com os includes de contagem
    const suggestions = await prisma.suggestion.findMany({
      where: statusFilter && statusFilter !== 'all' ? { status: statusFilter } : undefined,
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true }
            }
          },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { votes: true }
        }
      },
      orderBy: sortFilter === 'recent' ? { createdAt: 'desc' } : undefined,
    });

    // 2. Se for ordenar por votos (que precisa de contagem especifica)
    // Para updown a contagem total esta no _count.votes
    // Opcionalmente podemos buscar o breakdown
    
    // Otimizacao: buscar os breakdowns de votos updown numa query agrupada
    const voteBreakdown = await prisma.suggestionVote.groupBy({
      by: ['suggestionId', 'voteType'],
      _count: true,
      where: {
        suggestion: { type: 'updown' }
      }
    });

    // Formatar os dados para enviar ao frontend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedSuggestions = suggestions.map(sug => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formatted: any = {
        ...sug,
        totalVotes: sug._count.votes
      };

      if (sug.type === 'updown') {
        const upVotes = voteBreakdown.find(v => v.suggestionId === sug.id && v.voteType === 'up')?._count || 0;
        const downVotes = voteBreakdown.find(v => v.suggestionId === sug.id && v.voteType === 'down')?._count || 0;
        formatted.upVotes = upVotes;
        formatted.downVotes = downVotes;
        // Se a ordenacao for por net score (up - down)
        formatted.netScore = upVotes - downVotes;
      }

      return formatted;
    });

    // Ordenar pelo netScore (updown) ou totalVotes (poll) se sort == votes
    if (sortFilter === 'votes') {
      formattedSuggestions.sort((a, b) => {
        const scoreA = a.type === 'updown' ? a.netScore : a.totalVotes;
        const scoreB = b.type === 'updown' ? b.netScore : b.totalVotes;
        return scoreB - scoreA;
      });
    }

    return NextResponse.json(formattedSuggestions);
  } catch (error) {
    console.error("Erro ao buscar sugestões:", error);
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
    const { title, description, type, options } = body;

    if (!title) {
      return NextResponse.json({ error: "Título é obrigatório." }, { status: 400 });
    }
    
    if (type !== 'updown' && type !== 'poll') {
      return NextResponse.json({ error: "Tipo de sugestão inválido." }, { status: 400 });
    }

    if (type === 'poll' && (!options || !Array.isArray(options) || options.length < 2)) {
      return NextResponse.json({ error: "Enquetes exigem pelo menos duas opções." }, { status: 400 });
    }

    // Criar a sugestão
    const newSuggestion = await prisma.suggestion.create({
      data: {
        title,
        description,
        type,
        ...(type === 'poll' && options ? {
          options: {
            create: options.map((opt: { label: string }, idx: number) => ({
              label: opt.label,
              order: idx
            }))
          }
        } : {})
      },
      include: {
        options: true
      }
    });

    // Disparar Webhook
    sendDiscordSuggestionNotification(newSuggestion.title, newSuggestion.description, newSuggestion.type).catch(err => {
      console.error("Falha ao enviar webhook do Discord:", err);
    });

    return NextResponse.json(newSuggestion, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar sugestão:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
