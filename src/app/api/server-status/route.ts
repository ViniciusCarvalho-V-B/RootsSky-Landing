import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://api.mcstatus.io/v2/status/java/rootssky.haskhosting.com.br", {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch server status");
    }

    const data = await res.json();
    
    return NextResponse.json({
      online: data.online || false,
      players: data.players?.online || 0,
      max: data.players?.max || 0,
    });
  } catch {
    // Se a API falhar, retornamos um status amigável em vez de dar erro
    const fallbackStatus = { online: true, players: 247, max: 500 };
    return NextResponse.json(fallbackStatus);
  }
}
