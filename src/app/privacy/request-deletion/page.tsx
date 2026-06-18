"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function RequestDeletionPage() {
  const [nick, setNick] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type: 'error' | 'success', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nick.trim()) return;

    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/privacy/deletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nick }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMsg({ type: 'success', text: "Solicitação recebida! Seus dados serão anonimizados em até 48 horas e você não aparecerá mais no site. (Nota: Isso não afeta entregas pendentes)." });
        setNick("");
      } else {
        setMsg({ type: 'error', text: data.error || "Erro ao solicitar exclusão." });
      }
    } catch {
      setMsg({ type: 'error', text: "Erro de conexão." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-wood text-warm-light pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full bg-forest-deep/80 backdrop-blur-md p-8 rounded-2xl border border-leaf-light/20 shadow-2xl text-center">
        <h1 className="font-cinzel text-2xl text-gold-shine mb-4 uppercase">Solicitação de Exclusão</h1>
        <p className="text-warm-muted text-sm font-inter mb-6">
          Ao solicitar a exclusão de dados, seus nicks e UUIDs serão ofuscados em nosso banco de dados. Isso impedirá que você apareça nas Últimas Compras ou Top Apoiadores.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs text-warm-dim mb-1 ml-1">Nickname do Minecraft</label>
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="Ex: Notch"
              className="w-full bg-dark-wood border border-gold/30 rounded px-4 py-2 text-warm placeholder-warm-dim/50 focus:border-gold focus:outline-none transition-colors"
              disabled={loading}
              required
            />
          </div>

          {msg && (
            <p className={`text-sm ${msg.type === 'success' ? 'text-roots-green' : 'text-red-400'}`}>
              {msg.text}
            </p>
          )}

          <Button type="submit" variant="primary" className="w-full justify-center mt-4" disabled={loading}>
            {loading ? "Enviando..." : "Solicitar Anonimização"}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-leaf-light/20">
          <Link href="/privacy" className="text-gold text-sm hover:underline">
            Voltar para a Política de Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}
