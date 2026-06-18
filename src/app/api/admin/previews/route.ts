import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const previews = await prisma.productPreview.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(previews);
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { productId, content } = body;

    // Usar upsert para criar ou atualizar caso já exista preview pra esse produto
    const preview = await prisma.productPreview.upsert({
      where: { productId },
      update: { content },
      create: { productId, content }
    });

    return NextResponse.json(preview);
  } catch (error: unknown) {
    console.error("Erro ao atualizar preview:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar preview" }, { status: 400 });
  }
}
