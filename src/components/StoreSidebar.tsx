"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";

interface StoreSidebarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onClose?: () => void;
}

const storeCategories = [
  { key: "ranks", label: "Ranks" },
  { key: "coins", label: "Moedas" },
  { key: "bundles", label: "Pacotes" },
];

const siteLinks = [
  {
    label: "Votar",
    href: "https://minecraft-mp.com/server/332829/vote/",
    external: true,
  },
  { label: "Regras", href: "#" },
];

const teamMembers = [
  { name: "M1stic", role: "Dono", initial: "M" },
  { name: "Sikez", role: "Mod + Dev", initial: "S" },
];

export default function StoreSidebar({
  activeCategory,
  onCategoryChange,
  onClose,
}: StoreSidebarProps) {
  const [copied, setCopied] = useState(false);
  const ip = "play.rootssky.com.br";

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
    <div className="flex flex-col h-full overflow-y-auto relative">
      {/* HOME button */}
      <div className="p-4 relative z-20">
        <Link
          href="/"
          className="block w-full text-center font-cinzel font-bold text-sm text-warm uppercase tracking-widest py-2.5 rounded-lg bg-gradient-to-r from-forest-glow to-roots-green border border-leaf-light/30 hover:border-leaf-light/60 hover:shadow-lg hover:shadow-roots-green/30 transition-all"
          onClick={onClose}
        >
          Home
        </Link>
      </div>

      {/* Logo */}
      <div className="px-4 py-2 flex justify-center relative z-20">
        <Link href="/">
          <img
            src="/svg/logo-rootssky.svg"
            alt="RootsSky"
            className="h-14 w-auto logo-hover"
          />
        </Link>
      </div>

      {/* IP Copy Widget */}
      <div className="px-4 py-3 relative z-20">
        <button
          onClick={handleCopy}
          className="w-full flex flex-col items-center gap-2 p-3 rounded-lg border border-gold/20 bg-wood-light/40 hover:border-gold/40 hover:bg-wood-light/60 transition-all group cursor-pointer"
          title="Clique para copiar"
        >
          <span className="text-warm-dim text-[10px] uppercase tracking-widest">
            Copiar IP
          </span>
          {/* Play button circle */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/25 group-hover:shadow-gold/50 transition-shadow">
            <svg
              className="w-6 h-6 text-dark-wood ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Online badge */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf-light opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf-light" />
            </span>
            <span className="text-leaf-light font-bold text-[10px]">247</span>
          </div>
          <div className="font-jetbrains font-bold text-xs text-gold-shine uppercase tracking-wider">
            ROOTSSKY.COM.BR
          </div>
          <span className="text-warm-dim text-[9px] uppercase tracking-widest">
            {copied ? (
              <span className="text-leaf-light">✓ Copiado!</span>
            ) : (
              "Clique para copiar"
            )}
          </span>
        </button>
      </div>

      {/* Gold divider */}
      <div className="gold-divider mx-6 my-1" />

      {/* Store Categories */}
      <div className="px-4 py-3 relative z-20">
        <h4 className="font-cinzel font-bold text-[10px] text-warm-dim uppercase tracking-[0.2em] mb-3 px-1">
          Selecione uma Categoria
        </h4>
        <div className="space-y-1">
          {storeCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                onCategoryChange(cat.key);
                onClose?.();
              }}
              className={`store-cat-item ${
                activeCategory === cat.key ? "active" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Site links */}
      <div className="px-4 py-1 relative z-20">
        <div className="space-y-1">
          {siteLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="store-cat-item"
                onClick={onClose}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="store-cat-item"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Gold divider */}
      <div className="gold-divider mx-6 my-2" />

      {/* Discord */}
      <div className="px-4 py-2 relative z-20">
        <a
          href="https://discord.gg/UxUM66WSSD"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[#5865F2]/20 bg-[#5865F2]/8 hover:bg-[#5865F2]/15 hover:border-[#5865F2]/40 transition-all"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="12"
              viewBox="0 0 71 55"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309-0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1627 26.2532 30.1099 30.1693C30.1099 34.1136 27.2680 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9370 34.1136 40.9370 30.1693C40.9370 26.225 43.7636 23.0133 47.3178 23.0133C50.8999 23.0133 53.7546 26.2532 53.7018 30.1693C53.7018 34.1136 50.8999 37.3253 47.3178 37.3253Z" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-warm uppercase tracking-wider">
              Discord
            </div>
            <div className="text-[10px] text-[#7289DA]">3,795 membros</div>
          </div>
        </a>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Team section */}
      <div className="px-4 py-3 relative z-20">
        <h4 className="font-cinzel font-bold text-[10px] text-warm-dim uppercase tracking-[0.2em] mb-2 px-1">
          Equipe
        </h4>
        <div className="space-y-1.5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-2.5 px-2 py-1.5"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-wood-medium to-bark flex items-center justify-center border border-gold/20">
                <span className="text-gold text-[10px] font-bold">
                  {member.initial}
                </span>
              </div>
              <div>
                <span className="text-xs text-warm font-medium">
                  {member.name}
                </span>
                <span className="text-[10px] text-warm-dim ml-1.5">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="px-4 py-3 relative z-20">
        <p className="text-[9px] text-warm-dim/40 text-center font-inter">
          © 2026 RootsSky
        </p>
      </div>
    </div>
  );
}
