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
      }
    });

    const availableCoupons = coupons.filter(c => c.maxUses === null || c.uses < c.maxUses);

    return NextResponse.json(availableCoupons);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
