import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code')?.toUpperCase();

    if (!code) {
      return NextResponse.json({ error: "Código do cupom é obrigatório." }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code }
    });

    if (!coupon) {
      return NextResponse.json({ error: "Cupom não encontrado." }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: "Este cupom não está mais ativo." }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      discountPct: coupon.discountPct,
      eligibleItems: coupon.eligibleItems
    });
  } catch (error) {
    console.error("Erro ao validar cupom:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
