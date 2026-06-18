"use client";

import React, { useState } from "react";
import Button from "./Button";

interface CheckoutConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function CheckoutConsentModal({ isOpen, onClose, onConfirm, loading }: CheckoutConsentModalProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [refundAccepted, setRefundAccepted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !privacyAccepted || !refundAccepted) {
      setError("Você deve aceitar todos os termos e políticas para prosseguir com a compra.");
      return;
    }
    setError("");
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="medieval-panel p-6 sm:p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-warm-dim hover:text-gold transition-colors"
          disabled={loading}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="font-cinzel font-bold text-2xl text-gold-shine uppercase tracking-wide mb-2">
            Confirmar Compra
          </h2>
          <p className="text-sm text-warm-muted font-inter">
            Antes de prosseguirmos para o pagamento, precisamos que você leia e concorde com nossas diretrizes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* Termos de Serviço */}
            <div className="flex items-start gap-3 p-3 bg-dark-wood/50 border border-gold/10 rounded-lg">
              <input
                type="checkbox"
                id="terms_consent"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 bg-dark-wood border-gold/30 rounded text-gold focus:ring-gold/50 cursor-pointer"
                disabled={loading}
              />
              <label htmlFor="terms_consent" className="text-sm text-warm-dim font-inter cursor-pointer select-none">
                Li e aceito os <a href="/termos" target="_blank" className="text-gold hover:underline font-bold">Termos de Serviço</a> do servidor.
              </label>
            </div>

            {/* Política de Privacidade e LGPD */}
            <div className="flex items-start gap-3 p-3 bg-dark-wood/50 border border-gold/10 rounded-lg">
              <input
                type="checkbox"
                id="privacy_consent"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-1 bg-dark-wood border-gold/30 rounded text-gold focus:ring-gold/50 cursor-pointer"
                disabled={loading}
              />
              <label htmlFor="privacy_consent" className="text-sm text-warm-dim font-inter cursor-pointer select-none">
                Concordo com a <a href="/privacy" target="_blank" className="text-gold hover:underline font-bold">Política de Privacidade</a> e autorizo o tratamento do meu Nickname/UUID conforme a LGPD.
              </label>
            </div>

            {/* Política de Reembolso */}
            <div className="flex items-start gap-3 p-3 bg-dark-wood/50 border border-gold/10 rounded-lg">
              <input
                type="checkbox"
                id="refund_consent"
                checked={refundAccepted}
                onChange={(e) => setRefundAccepted(e.target.checked)}
                className="mt-1 bg-dark-wood border-gold/30 rounded text-gold focus:ring-gold/50 cursor-pointer"
                disabled={loading}
              />
              <label htmlFor="refund_consent" className="text-sm text-warm-dim font-inter cursor-pointer select-none">
                Estou ciente da <a href="/reembolso" target="_blank" className="text-gold hover:underline font-bold">Política de Reembolso</a> e entendo que compras virtuais entregues não são reembolsáveis.
              </label>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs mt-2 font-inter text-center">{error}</p>}

          <Button
            type="submit"
            variant="premium"
            className="w-full justify-center text-sm mt-4"
            disabled={loading}
          >
            {loading ? "Processando..." : "Ir para o Pagamento"}
          </Button>
        </form>
      </div>
    </div>
  );
}
