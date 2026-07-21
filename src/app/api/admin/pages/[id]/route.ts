import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin-auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await request.json();
    const { slug, title, content } = body;
    const page = await prisma.page.update({
      where: { id },
      data: { slug, title, content }
    });
    return NextResponse.json(page);
  } catch (error: unknown) {
    console.error("Erro ao atualizar página:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar página" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await prisma.page.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("Erro ao deletar página:", error);
    return NextResponse.json({ error: "Erro interno ao deletar página" }, { status: 400 });
  }
}
