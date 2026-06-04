import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const pages = await prisma.page.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, content } = body;
    const newPage = await prisma.page.create({
      data: { slug, title, content }
    });
    return NextResponse.json(newPage);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
