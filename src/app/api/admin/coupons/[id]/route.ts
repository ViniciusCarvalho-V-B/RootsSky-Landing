import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
    console.error("Erro ao atualizar cupom:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar cupom" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await prisma.coupon.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("Erro ao deletar cupom:", error);
    return NextResponse.json({ error: "Erro interno ao deletar cupom" }, { status: 400 });
  }
}
