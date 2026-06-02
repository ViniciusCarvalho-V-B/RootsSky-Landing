"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useServerStatus } from "@/hooks/useServerStatus";
import { useDiscordStatus } from "@/hooks/useDiscordStatus";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const ip = "rootssky.haskhosting.com.br";
  const { players, online, loading } = useServerStatus();
  const { online: discordOnline, loading: discordLoading } = useDiscordStatus();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = ip;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      id="hero"
    >
      {/* ═══ BACKGROUND LAYERS ═══ */}

      {/* Base background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/svg/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Warm color overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,10,7,0.35) 0%, rgba(13,10,7,0.1) 25%, rgba(13,10,7,0.05) 50%, rgba(13,10,7,0.6) 85%, rgba(13,10,7,0.85) 100%)",
        }}
      />

      {/* Golden ambient glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(196,162,101,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Green forest ambient glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 25% 70%, rgba(46,125,50,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 75% 25%, rgba(27,94,59,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Floating golden particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${3 + ((i * 5.2) % 94)}%`,
              bottom: `${-5 - ((i * 8) % 15)}%`,
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              backgroundColor:
                i % 5 === 0
                  ? "#D4AF37"
                  : i % 5 === 1
                    ? "#C4A265"
                    : i % 5 === 2
                      ? "#4CAF50"
                      : i % 5 === 3
                        ? "#2E7D32"
                        : "#F5D380",
              animationDuration: `${10 + ((i * 1.7) % 12)}s`,
              animationDelay: `${(i * 1.1) % 15}s`,
              boxShadow: `0 0 ${3 + (i % 3) * 2}px ${
                i % 5 === 2 || i % 5 === 3
                  ? "rgba(76,175,80,0.5)"
                  : "rgba(196,162,101,0.6)"
              }`,
            }}
          />
        ))}
      </div>

      {/* ═══ TOP BAR: IP + Logo + Discord ═══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex-shrink-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* IP Widget */}
          <button
            onClick={handleCopy}
            className="hero-widget group items-center gap-3 cursor-pointer order-2 lg:order-1 w-full lg:w-auto justify-center lg:justify-start"
            title="Clique para copiar o IP"
            id="hero-ip-widget"
          >
            {/* Play Icon */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-leaf-light to-leaf flex items-center justify-center flex-shrink-0 shadow-lg shadow-leaf-light/20">
              <svg
                className="w-4 h-4 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-jetbrains font-bold text-xs sm:text-sm text-gold-shine uppercase tracking-wider">
                {ip.toUpperCase()}
              </div>
              <div className="text-warm-dim text-[10px] uppercase tracking-wider">
                {copied ? (
                  <span className="text-leaf-light">✓ COPIADO!</span>
                ) : (
                  "CLICK TO COPY"
                )}
              </div>
            </div>
            {/* Online badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-leaf/20 border border-leaf-light/30 ml-1 sm:ml-2">
              <span className="relative flex h-2 w-2">
                {online && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf-light opacity-75" />}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${online ? "bg-leaf-light" : "bg-red-500"}`} />
              </span>
              <span className={`font-bold text-[10px] uppercase tracking-wider whitespace-nowrap ${online ? "text-leaf-light" : "text-red-500"}`}>
                {loading ? "..." : (online ? `${players} ONLINE` : "OFFLINE")}
              </span>
            </div>
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            <Image
              src="/svg/logo-rootssky.svg"
              alt="RootsSky"
              width={300}
              height={100}
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto logo-hover drop-shadow-2xl"
            />
          </div>

          {/* Discord Widget */}
          <a
            href="https://discord.gg/UxUM66WSSD"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-widget group items-center gap-3 order-3 w-full lg:w-auto justify-center lg:justify-end"
            id="hero-discord-widget"
          >
            {/* Members badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#5865F2]/15 border border-[#5865F2]/25 mr-1 sm:mr-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7289DA] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7289DA]" />
              </span>
              <span className="text-[#7289DA] font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">
                {discordLoading ? "..." : `${discordOnline} ONLINE`}
              </span>
            </div>
            <div className="text-right">
              <div className="font-outfit font-bold text-xs sm:text-sm text-warm uppercase tracking-wider">
                DISCORD SERVER
              </div>
              <div className="text-warm-dim text-[10px] uppercase tracking-wider">
                CLICK TO JOIN
              </div>
            </div>
            {/* Discord Icon */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#5865F2]/20 group-hover:shadow-[#5865F2]/40 transition-shadow">
              <svg
                width="20"
                height="15"
                viewBox="0 0 71 55"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309-0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1627 26.2532 30.1099 30.1693C30.1099 34.1136 27.2680 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9370 34.1136 40.9370 30.1693C40.9370 26.225 43.7636 23.0133 47.3178 23.0133C50.8999 23.0133 53.7546 26.2532 53.7018 30.1693C53.7018 34.1136 50.8999 37.3253 47.3178 37.3253Z" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* ═══ MAIN CONTENT: Sidebar + Welcome Panel ═══ */}
      <div className="relative z-10 flex-1 flex items-end lg:items-center max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full py-6 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full animate-slide-up">
          {/* Category Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="medieval-panel p-4 sm:p-5" style={{ borderTop: '2px solid rgba(46,125,50,0.4)' }}>
              <h3 className="font-cinzel font-bold text-sm text-gold uppercase tracking-[0.2em] text-center mb-5 pb-3 border-b border-gold/20">
                Categorias
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                <a href="/" className="medieval-btn">
                  Início
                </a>
                <a
                  href="https://minecraft-mp.com/server/332829/vote/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="medieval-btn"
                >
                  Votar
                </a>
                <a href="/store" className="medieval-btn">
                  Loja
                </a>
                <a href="#" className="medieval-btn">
                  Equipe
                </a>
              </div>
            </div>
          </div>

          {/* Welcome Panel */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="medieval-panel p-5 sm:p-6 md:p-8">
              <h2 className="font-cinzel font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gold-shine mb-4 sm:mb-6 uppercase tracking-wide leading-tight">
                Bem-Vindo ao RootsSky
              </h2>
              <div className="space-y-3 sm:space-y-4 text-warm/85 text-sm sm:text-base font-inter leading-relaxed">
                <p>
                  Bem-vindo ao RootsSky, o servidor de Skyblock mais inovador e
                  envolvente do Brasil!
                </p>
                <p>
                  Mergulhe em um mundo de ilhas flutuantes, desafios épicos e uma
                  comunidade vibrante. Explore nossas categorias, adquira ranks
                  exclusivos, desbloqueie habilidades e construa sua lenda.
                </p>
                <p>
                  Nossa loja oferece uma variedade de itens para melhorar sua
                  experiência. O suporte é feito via Discord e todas as compras
                  apoiam o desenvolvimento contínuo.
                </p>
                <p className="text-gold font-medium italic">
                  Divirta-se e prepare-se para a aventura!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ COPYRIGHT FOOTER ═══ */}
      <div className="relative z-10 text-center py-3 sm:py-4 flex-shrink-0">
        <p className="text-warm-dim text-[11px] font-inter">
          Copyright © RootsSky 2026. Todos os Direitos Reservados.
        </p>
        <p className="text-warm-dim/50 text-[10px] font-inter mt-0.5">
          Não somos afiliados à Mojang AB.
        </p>
      </div>
    </section>
  );
}
