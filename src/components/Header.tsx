"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useServerStatus } from "@/hooks/useServerStatus";
import { toast } from "react-hot-toast";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/store" },
  { label: "Votar", href: "/vote" },
  { label: "Votações", href: "/suggestions" },
  { label: "Equipe", href: "/team" },
  { label: "Regras", href: "/regras" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { online, players, statusText, loading } = useServerStatus();
  const ip = "jogar.rootssky.app";

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0a07]/85 backdrop-blur-md border-b border-gold/15 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <Image
                src="/svg/favicon-rootssky.svg"
                alt="RootsSky Emblem"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9 logo-hover"
              />
              <span className="font-cinzel font-black text-lg sm:text-xl text-gold-shine tracking-wider group-hover:text-gold transition-colors">
                ROOTSSKY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-md font-cinzel text-xs uppercase tracking-widest font-bold transition-all relative ${
                      isActive
                        ? "text-gold bg-gold/10 border border-gold/30 shadow-sm"
                        : "text-warm-muted hover:text-gold hover:bg-gold/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions: IP Copy + Discord */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Copy IP Widget */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-wood border border-gold/25 hover:border-gold/50 transition-all duration-300 group cursor-pointer"
                title="Clique para copiar o IP"
              >
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    {online && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-roots-green opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        online ? "bg-roots-green" : "bg-red-500"
                      }`}
                    />
                  </span>
                  <span className="font-jetbrains font-bold text-xs text-warm-light tracking-wide group-hover:text-gold transition-colors">
                    {ip}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold/15 text-gold-shine border border-gold/20 uppercase tracking-wider">
                  {copied ? "COPIADO!" : loading ? "..." : (statusText || "REABERTURA EM DEZEMBRO")}
                </span>
              </button>

              {/* Discord Link */}
              <a
                href="https://discord.gg/UxUM66WSSD"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center text-[#7289DA] hover:bg-[#5865F2] hover:text-white transition-all duration-300"
                title="Comunidade no Discord"
              >
                <svg width="18" height="14" viewBox="0 0 71 55" fill="currentColor">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309-0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1627 26.2532 30.1099 30.1693C30.1099 34.1136 27.2680 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9370 34.1136 40.9370 30.1693C40.9370 26.225 43.7636 23.0133 47.3178 23.0133C50.8999 23.0133 53.7546 26.2532 53.7018 30.1693C53.7018 34.1136 50.8999 37.3253 47.3178 37.3253Z" />
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden p-2 text-warm-muted hover:text-gold"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-72 z-50 bg-[#0d0a07] border-l border-gold/20 p-6 flex flex-col justify-between transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-gold/15 mb-6">
            <div className="flex items-center gap-2">
              <Image
                src="/svg/favicon-rootssky.svg"
                alt="RootsSky"
                width={28}
                height={28}
              />
              <span className="font-cinzel font-bold text-gold text-lg">ROOTSSKY</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="text-warm-dim hover:text-warm">
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg font-cinzel text-sm uppercase tracking-wider font-bold transition-all ${
                    isActive
                      ? "text-gold bg-gold/10 border border-gold/30"
                      : "text-warm-muted hover:text-gold hover:bg-gold/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-gold/15 space-y-3">
          <button
            onClick={() => {
              handleCopy();
              setMobileOpen(false);
            }}
            className="w-full py-3 rounded-lg bg-wood border border-gold/30 text-gold-shine font-jetbrains font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>{ip}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-gold/20 text-gold">
              {copied ? "COPIADO" : loading ? "..." : (statusText || "REABERTURA EM DEZEMBRO")}
            </span>
          </button>
          <a
            href="https://discord.gg/UxUM66WSSD"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-[#5865F2] text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Entrar no Discord</span>
          </a>
        </div>
      </div>
    </>
  );
}
