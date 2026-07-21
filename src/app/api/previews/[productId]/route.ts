import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  try {
    const preview = await prisma.productPreview.findUnique({
      where: { productId }
    });

    if (!preview) {
      return NextResponse.json({ error: "Preview não encontrado." }, { status: 404 });
    }

    return NextResponse.json(preview);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
