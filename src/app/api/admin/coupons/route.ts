import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(coupons);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, discountPct, eligibleItems, isActive } = body;
    const newCoupon = await prisma.coupon.create({
      data: { code: code.toUpperCase(), discountPct: parseFloat(discountPct), eligibleItems, isActive }
    });
    return NextResponse.json(newCoupon);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
