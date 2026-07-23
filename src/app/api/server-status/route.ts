import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Servidor em pausa para nova temporada (Reabertura em Dezembro)
  return NextResponse.json({
    online: false,
    players: 0,
    max: 0,
    paused: true,
    message: "Servidor em pausa para nova temporada — Reabertura em Dezembro de 2026",
  });
}
