"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useServerStatus } from "@/hooks/useServerStatus";
import { toast } from "react-hot-toast";
import UpdatesCarousel from "./UpdatesCarousel";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const ip = "jogar.rootssky.app";
  const { online, players, statusText, loading } = useServerStatus();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      toast.success("IP copiado com sucesso! jogar.rootssky.app");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = ip;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success("IP copiado com sucesso! jogar.rootssky.app");
      setTimeout(() => setCopied(false), 2500);
    }
  }, [ip]);

  const features = [
    {
      icon: "🏝️",
      title: "Ilhas Personalizadas",
      desc: "Construa e expanda sua ilha flutuante com geradores evolutivos, biomas únicos e sistema de nível.",
    },
    {
      icon: "📜",
      title: "Passe de Batalha",
      desc: "Complete missões diárias e semanais para evoluir no Passe e desbloquear recompensas valiosas.",
    },
    {
      icon: "💰",
      title: "Economia Dinâmica",
      desc: "Mercado livre entre jogadores, lojas virtuais, leilões em tempo real e sistema financeiro equilibrado.",
    },
    {
      icon: "🔮",
      title: "Habilidades & RPG",
      desc: "Evolua suas habilidades de mineração, agricultura, pesca e alquimia através do sistema AuraSkills.",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden stars-bg">
      {/* Ambient background glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 15%, rgba(196, 162, 101, 0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 85%, rgba(27, 94, 59, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 w-full flex-grow flex flex-col justify-center">
        
        {/* Hero Header / Branding */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
            <Image
              src="/svg/logo-rootssky.svg"
              alt="RootsSky Logo"
              width={340}
              height={120}
              priority
              className="h-20 sm:h-28 md:h-32 w-auto logo-hover drop-shadow-2xl"
            />
          </div>

          <h1 className="font-cinzel font-black text-2xl sm:text-4xl md:text-5xl text-gold-shine uppercase tracking-wide leading-tight mb-4">
            O Servidor de Skyblock <span className="text-gradient-gold">Mais Inovador</span> do Brasil
          </h1>

          <p className="text-warm-muted font-inter text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Mergulhe em um mundo de ilhas flutuantes, missões épicas e uma comunidade vibrante. Construa sua ilha, evolua habilidades e conquiste a glória!
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={handleCopy}
              className="medieval-btn w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-3 text-sm"
            >
              <span>{copied ? "✓ IP COPIADO!" : "JOGAR AGORA — AGORA MESMO"}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-jetbrains uppercase">
                {loading ? "..." : (statusText || "REABERTURA EM DEZEMBRO")}
              </span>
            </button>

            <Link
              href="/store"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm uppercase font-cinzel tracking-wider font-bold"
            >
              Explorar Loja VIP
            </Link>
          </div>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 animate-slide-up">
          {features.map((item) => (
            <div
              key={item.title}
              className="medieval-panel p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl mb-4 group-hover:border-gold/40 group-hover:bg-gold/20 transition-all">
                {item.icon}
              </div>
              <h3 className="font-cinzel font-bold text-lg text-gold-shine mb-2 group-hover:text-gold transition-colors uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-warm-muted font-inter text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Updates Carousel Section */}
        <div className="animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-gold-shine uppercase tracking-widest">
              Últimas Atualizações
            </h2>
            <div className="gold-divider max-w-xs mx-auto mt-2" />
          </div>
          <UpdatesCarousel />
        </div>

      </div>

      {/* Footer copyright */}
      <footer className="relative z-10 border-t border-gold/15 bg-[#0d0a07]/90 py-6 text-center text-xs text-warm-dim font-inter">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© RootsSky 2026. Todos os Direitos Reservados.</p>
          <p className="text-warm-dim/50 text-[11px]">
            Não somos afiliados ou vinculados à Mojang AB.
          </p>
        </div>
      </footer>
    </section>
  );
}
