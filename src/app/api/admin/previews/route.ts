import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const previews = await prisma.productPreview.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(previews);
}

export async function POST(request: Request) {
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
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
