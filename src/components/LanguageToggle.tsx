"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "pt" ? "en" : "pt")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-border bg-obsidian/60 hover:border-earth hover:bg-earth/10 transition-all duration-300 text-xs font-inter font-medium"
      title={lang === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <span className={`${lang === "pt" ? "text-emerald" : "text-slate-500"}`}>PT</span>
      <span className="text-slate-600">/</span>
      <span className={`${lang === "en" ? "text-emerald" : "text-slate-500"}`}>EN</span>
    </button>
  );
}
