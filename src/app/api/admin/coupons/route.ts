import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(coupons);
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { code, discountPct, eligibleItems, maxUses, expiresAt, isActive } = body;
    
    let parsedExpiresAt = null;
    if (expiresAt) {
      parsedExpiresAt = new Date(expiresAt);
    }
    
    const newCoupon = await prisma.coupon.create({
      data: { 
        code: code.toUpperCase(), 
        discountPct: parseFloat(discountPct), 
        eligibleItems, 
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: parsedExpiresAt,
        isActive 
      }
    });
    return NextResponse.json(newCoupon);
  } catch (error: unknown) {
    console.error("Erro ao criar cupom:", error);
    return NextResponse.json({ error: "Erro interno ao criar cupom" }, { status: 400 });
  }
}
