import { useState, useEffect } from "react";

export function useServerStatus() {
  const [status, setStatus] = useState<{
    online: boolean;
    players: number;
    max: number;
    loading: boolean;
    paused: boolean;
    statusText: string;
  }>({
    online: false,
    players: 0,
    max: 0,
    loading: true,
    paused: true,
    statusText: "REABERTURA EM DEZEMBRO",
  });

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/server-status");
        if (res.ok) {
          const data = await res.json();
          const isPaused = data.paused !== undefined ? data.paused : true;
          const text = isPaused
            ? "REABERTURA EM DEZEMBRO"
            : data.online
            ? `${data.players} ONLINE`
            : "REABERTURA EM DEZEMBRO";
          setStatus({
            online: false,
            players: 0,
            max: 0,
            paused: isPaused,
            statusText: text,
            loading: false,
          });
        } else {
          setStatus((prev) => ({ ...prev, paused: true, statusText: "REABERTURA EM DEZEMBRO", loading: false }));
        }
      } catch {
        setStatus((prev) => ({ ...prev, paused: true, statusText: "REABERTURA EM DEZEMBRO", loading: false }));
      }
    }

    fetchStatus();
  }, []);

  return status;
}
