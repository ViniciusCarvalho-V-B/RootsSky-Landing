"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DiscordBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Earth-toned background */}
      <div className="absolute inset-0 bg-gradient-to-r from-earth/20 via-obsidian to-earth/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest/5 to-transparent" />
      
      {/* Top and bottom decorative borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-earth/60 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="https://discord.gg/UxUM66WSSD"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-8 rounded-2xl border border-earth/30 bg-gradient-to-br from-earth/15 via-obsidian/80 to-forest/10 backdrop-blur-sm hover:border-emerald/40 hover:shadow-[0_0_40px_rgba(93,64,55,0.3),0_0_80px_rgba(16,185,129,0.15)] transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Discord Icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center shadow-lg shadow-[#5865F2]/20 group-hover:shadow-[#5865F2]/40 group-hover:scale-110 transition-all duration-300">
              <svg width="32" height="24" viewBox="0 0 71 55" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1627 26.2532 30.1099 30.1693C30.1099 34.1136 27.2680 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9370 34.1136 40.9370 30.1693C40.9370 26.225 43.7636 23.0133 47.3178 23.0133C50.8999 23.0133 53.7546 26.2532 53.7018 30.1693C53.7018 34.1136 50.8999 37.3253 47.3178 37.3253Z"/>
              </svg>
            </div>

            {/* Text content */}
            <div className="flex-grow">
              <h3 className="font-outfit font-bold text-xl md:text-2xl text-white mb-2 group-hover:text-emerald-light transition-colors">
                {t("Junte-se à nossa comunidade!", "Join our community!")}
              </h3>
              <p className="text-sm md:text-base text-slate-400 font-inter leading-relaxed">
                {t(
                  "Entre no nosso Discord para novidades, suporte, eventos exclusivos e para fazer parte da maior comunidade Skyblock do Brasil.",
                  "Join our Discord for news, support, exclusive events and to be part of the largest Skyblock community in Brazil."
                )}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#4752C4] text-white font-outfit font-bold text-sm shadow-lg shadow-[#5865F2]/20 group-hover:shadow-[#5865F2]/40 group-hover:scale-105 transition-all duration-300">
                {t("Entrar no Discord", "Join Discord")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
