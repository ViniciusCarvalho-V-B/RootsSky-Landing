import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Vote no RootsSky - Ajude o Servidor",
  description: "Vote no RootsSky e ganhe recompensas épicas dentro do jogo!",
};

const VOTE_LINKS = [
  { name: "CraftList", url: "https://craftlist.org/rootsky#vote", id: 1 },
  { name: "Minecraft-MP", url: "https://minecraft-mp.com/server/358261/vote/", id: 2 },
  { name: "Minecraft-ServerList (1)", url: "https://minecraft-serverlist.com/server/5230", id: 3 },
  { name: "MinecraftServers", url: "https://minecraftservers.org/vote/688262", id: 4 },
  { name: "Minecraft-Server-List (2)", url: "https://minecraft-server-list.com/server/520655/vote/", id: 5 },
  { name: "TopG", url: "https://topg.org/minecraft-servers/server-682861", id: 6 },
  { name: "TopMinecraftServers", url: "https://topminecraftservers.org/vote/43637", id: 7 },
];

export default function VotePage() {
  return (
    <main className="min-h-screen bg-dark-wood relative flex flex-col pb-20">
      {/* Background layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/svg/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-dark-wood via-dark-wood/95 to-dark-wood pointer-events-none" />

      {/* Header Spacer */}
      <div className="h-24 sm:h-32 relative z-10" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 w-full animate-fade-in">
        
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-warm-dim hover:text-gold transition-colors font-outfit uppercase text-sm tracking-widest"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar para o Início
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel font-black text-4xl sm:text-5xl lg:text-6xl text-gold-shine tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            Apoie o RootsSky
          </h1>
          <p className="text-warm/80 font-inter max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Vote diariamente nos sites parceiros e receba recompensas épicas como Chaves, Moedas e itens raros! Seu voto é crucial para manter nossa comunidade crescendo no topo.
          </p>
          <div className="flex justify-center mt-6">
            <div className="gold-divider w-64" />
          </div>
        </div>

        {/* Vote Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {VOTE_LINKS.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-5 rounded-xl bg-forest-deep/60 border border-leaf-light/20 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-leaf-light/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-gold/20 transition-colors" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-leaf/20 border border-leaf-light/30 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/50 transition-colors">
                  <span className="font-cinzel font-bold text-lg text-leaf-light group-hover:text-gold-shine">
                    {link.id}
                  </span>
                </div>
                <div className="bg-wood-light/30 px-3 py-1 rounded text-[10px] text-warm-dim uppercase tracking-widest border border-gold/10">
                  + Recompensas
                </div>
              </div>
              
              <h3 className="font-outfit font-bold text-lg text-warm group-hover:text-gold transition-colors mb-2">
                {link.name}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between text-leaf-light group-hover:text-gold transition-colors">
                <span className="text-xs uppercase tracking-widest font-bold">Votar Agora</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Top Voters Mockup Section */}
        <div className="medieval-panel p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-8">
            <h2 className="font-cinzel font-bold text-2xl sm:text-3xl text-gold uppercase tracking-widest">
              Top Eleitores do Mês
            </h2>
            <p className="text-warm-dim text-sm mt-2">
              Os maiores heróis que nos ajudam a alcançar o topo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="flex flex-col items-center justify-end order-2 md:order-1 mt-6 md:mt-12">
              <div className="relative mb-4">
                <Image src="https://minotar.net/helm/Steve/80.png" alt="2nd Place" width={80} height={80} className="rounded-lg border-2 border-[#C0C0C0] shadow-[0_0_15px_rgba(192,192,192,0.3)] rendering-pixelated" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#C0C0C0] flex items-center justify-center font-cinzel font-black text-dark-wood border-2 border-dark-wood">2</div>
              </div>
              <div className="font-outfit font-bold text-warm text-lg">MisterVoter</div>
              <div className="text-warm-dim text-sm">142 Votos</div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center justify-end order-1 md:order-2 transform md:-translate-y-4">
              <div className="relative mb-4">
                <Image src="https://minotar.net/helm/Alex/100.png" alt="1st Place" width={100} height={100} className="rounded-lg border-4 border-gold shadow-[0_0_25px_rgba(212,175,55,0.5)] rendering-pixelated" />
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#D4AF37" stroke="#8B6914" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-gold flex items-center justify-center font-cinzel font-black text-dark-wood border-2 border-dark-wood text-xl">1</div>
              </div>
              <div className="font-outfit font-bold text-gold-shine text-xl">LendaViva</div>
              <div className="text-warm-dim text-sm font-bold">155 Votos</div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center justify-end order-3 md:order-3 mt-6 md:mt-16">
              <div className="relative mb-4">
                <Image src="https://minotar.net/helm/Herobrine/70.png" alt="3rd Place" width={70} height={70} className="rounded-lg border-2 border-[#CD7F32] shadow-[0_0_15px_rgba(205,127,50,0.3)] rendering-pixelated" />
                <div className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full bg-[#CD7F32] flex items-center justify-center font-cinzel font-black text-dark-wood border-2 border-dark-wood text-sm">3</div>
              </div>
              <div className="font-outfit font-bold text-warm text-base">ApoiadorBR</div>
              <div className="text-warm-dim text-sm">130 Votos</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
