import { useState, useEffect } from "react";

export function useServerStatus() {
  const [status, setStatus] = useState({ online: true, players: 247, max: 500, loading: true });

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/server-status");
        if (res.ok) {
          const data = await res.json();
          setStatus({ ...data, loading: false });
        } else {
          setStatus((prev) => ({ ...prev, loading: false }));
        }
      } catch {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchStatus();
  }, []);

  return status;
}
