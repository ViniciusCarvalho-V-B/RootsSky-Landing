import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar" 
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-wood border border-gold/30 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-slide-up">
        <h3 className="text-xl font-cinzel font-bold text-gold-shine mb-2">{title}</h3>
        <p className="text-warm-light font-inter mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-bold text-sm bg-wood-light/30 text-warm-dim hover:text-warm-light hover:bg-wood-light/50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg font-bold text-sm bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/40 hover:text-red-200 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
