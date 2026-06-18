import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const pages = await prisma.page.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { slug, title, content } = body;
    const newPage = await prisma.page.create({
      data: { slug, title, content }
    });
    return NextResponse.json(newPage);
  } catch (error: unknown) {
    console.error("Erro ao criar página:", error);
    return NextResponse.json({ error: "Erro interno ao criar página" }, { status: 400 });
  }
}
