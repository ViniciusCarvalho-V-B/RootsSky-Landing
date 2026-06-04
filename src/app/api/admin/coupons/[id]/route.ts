import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { code, discountPct, eligibleItems, maxUses, expiresAt, isActive } = body;
    
    let parsedExpiresAt = null;
    if (expiresAt) {
      parsedExpiresAt = new Date(expiresAt);
    }
    
    const coupon = await prisma.coupon.update({
      where: { id: params.id },
      data: { 
        code: code.toUpperCase(), 
        discountPct: parseFloat(discountPct), 
        eligibleItems, 
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: parsedExpiresAt,
        isActive 
      }
    });
    return NextResponse.json(coupon);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.coupon.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
