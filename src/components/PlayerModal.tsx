"use client";

import React, { useState } from "react";
import Button from "./Button";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (nick: string, uuid: string) => void;
}

export default function PlayerModal({ isOpen, onClose, onSuccess }: PlayerModalProps) {
  const [nick, setNick] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nick.trim()) {
      setError("Por favor, digite seu nick.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/player?nick=${encodeURIComponent(nick)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao validar nick.");
        return;
      }

      onSuccess(data.name, data.uuid);
    } catch {
      setError("Erro de conexão ao validar o nick.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="medieval-panel p-6 sm:p-8 w-full max-w-md relative">
        {/* Fechar botão */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-warm-dim hover:text-gold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="font-cinzel font-bold text-2xl text-gold-shine uppercase tracking-wide mb-2">
            Identificação
          </h2>
          <p className="text-sm text-warm-muted font-inter">
            Digite seu Nick exato do Minecraft para continuar com a compra.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="Ex: Notch"
              className="w-full bg-dark-wood/80 border border-gold/30 rounded-lg px-4 py-3 text-warm placeholder-warm-dim/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all font-inter"
              disabled={loading}
            />
            {error && <p className="text-red-400 text-xs mt-2 font-inter">{error}</p>}
          </div>

          <Button
            type="submit"
            variant="premium"
            className="w-full justify-center text-sm"
            disabled={loading}
          >
            {loading ? "Validando na Mojang..." : "Continuar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
