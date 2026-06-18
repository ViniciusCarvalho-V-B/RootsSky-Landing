import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ],
      },
      select: {
        code: true,
        discountPct: true,
        eligibleItems: true,
        maxUses: true,
        uses: true,
        expiresAt: true,
      }
    });

    const availableCoupons = coupons
      .filter(c => c.maxUses === null || c.uses < c.maxUses)
      .map(c => ({
        code: c.code,
        discountPct: c.discountPct,
        eligibleItems: c.eligibleItems
      }));

    return NextResponse.json(availableCoupons);
  } catch (error) {
    console.error("Erro na API coupons active:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
