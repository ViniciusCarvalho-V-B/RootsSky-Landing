import { NextResponse } from 'next/server';
import { createAdminResponse, removeAdminResponse } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      console.error("ADMIN_PASSWORD não configurada!");
      return NextResponse.json(
        { error: "Servidor não configurado para autenticação." },
        { status: 500 }
      );
    }

    if (password === expectedPassword) {
      // Cria a resposta de sucesso e anexa o cookie de autenticação
      const response = NextResponse.json({ success: true, message: "Autenticado com sucesso." });
      return createAdminResponse(response);
    } else {
      return NextResponse.json(
        { error: "Senha incorreta." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true, message: "Deslogado com sucesso." });
    return removeAdminResponse(response);
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
