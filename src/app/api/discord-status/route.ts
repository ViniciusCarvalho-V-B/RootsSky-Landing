import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const discordInviteCode = process.env.DISCORD_INVITE_CODE || "UxUM66WSSD"; 

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    // Consulta os status via link de convite do Discord (não requer widget ativo!)
    const res = await fetch(`https://discord.com/api/v9/invites/${discordInviteCode}?with_counts=true`, {
      signal: controller.signal,
      cache: 'no-store'
    });
    
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        online: data.approximate_presence_count || 0,
      });
    }
    
    throw new Error("Failed to fetch Discord status");
  } catch {
    // Se falhar (ex: widget desativado ou ID errado), retorna fallback visual
    return NextResponse.json({ online: 80 }, { status: 200 });
  }
}
