"use client";

import { useState, useEffect } from "react";

export function useDiscordStatus() {
  const [online, setOnline] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/discord-status");
        if (res.ok) {
          const data = await res.json();
          setOnline(data.online || 0);
        }
      } catch (error) {
        console.error("Erro ao buscar discord status:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
    
    // Atualiza a cada 60 segundos
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return { online, loading };
}
