import { NextResponse } from "next/server";

// Cache em memória para evitar Rate Limit na Mojang (Duração: 10 minutos)
const playerCache = new Map<string, { data: any; expiresAt: number }>();

function getCachedPlayer(nick: string) {
  const item = playerCache.get(nick.toLowerCase());
  if (item && item.expiresAt > Date.now()) return item.data;
  return null;
}

function setCachedPlayer(nick: string, data: any) {
  playerCache.set(nick.toLowerCase(), { data, expiresAt: Date.now() + 10 * 60 * 1000 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nick = searchParams.get("nick");

  if (!nick) {
    return NextResponse.json(
      { error: "O nick do Minecraft é obrigatório." },
      { status: 400 },
    );
  }

  const cached = getCachedPlayer(nick);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    // Mojang API para validar se o nick existe e pegar o UUID
    // Usamos um AbortController para não travar o usuário se a API da Mojang estiver lenta (Timeout de 1.5s)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const mojangRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${nick}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);

    if (!mojangRes.ok || mojangRes.status === 204) {
      // Falha na Mojang (Pirata, Rate Limit 429, etc): aceita o nick como offline
      return NextResponse.json({
        name: nick,
        uuid: "8667ba71b85a4004af54457a9734eed7", // MHF_Steve
      });
    }

    try {
      const data: any = await mojangRes.json();
      const result = {
        name: data.name || nick,
        uuid: data.id || "8667ba71b85a4004af54457a9734eed7",
      };
      setCachedPlayer(nick, result);
      return NextResponse.json(result);
    } catch {
      const fallback = {
        name: nick,
        uuid: "8667ba71b85a4004af54457a9734eed7",
      };
      setCachedPlayer(nick, fallback);
      return NextResponse.json(fallback);
    }
  } catch {
    // Timeout ou erro de conexão com a Mojang
    const fallback = {
      name: nick,
      uuid: "8667ba71b85a4004af54457a9734eed7", // MHF_Steve
    };
    // Em caso de erro na rede, armazenamos por menos tempo (1 minuto) para tentar de novo logo
    playerCache.set(nick.toLowerCase(), { data: fallback, expiresAt: Date.now() + 60 * 1000 });
    return NextResponse.json(fallback);
  }
}
