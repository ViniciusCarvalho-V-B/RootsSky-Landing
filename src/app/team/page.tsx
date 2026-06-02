import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Equipe RootsSky",
  description: "Conheça os heróis que mantém o RootsSky funcionando.",
};

const TEAM_MEMBERS = [
  {
    role: "Administração",
    members: [
      {
        name: "M1stic",
        nick: "M1stic", // Trocar pelo nick real se for diferente
        tag: "Dono",
        description: "O grande fundador do servidor. Responsável por manter as engrenagens de todo o império RootsSky girando.",
        color: "from-red-600 to-red-900",
        tagColor: "bg-red-500/20 text-red-400 border-red-500/30"
      }
    ]
  },
  {
    role: "Moderação & Desenvolvimento",
    members: [
      {
        name: "Sikez",
        nick: "sikez", // Trocar pelo nick real
        tag: "Mod + Dev",
        description: "O mestre dos códigos e guardião das regras. Garante a paz no servidor enquanto constrói novas magias nos bastidores.",
        color: "from-purple-600 to-purple-900",
        tagColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
      }
    ]
  }
];

export default function TeamPage() {
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
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-dark-wood/80 via-dark-wood to-dark-wood pointer-events-none" />

      {/* Header Spacer */}
      <div className="h-24 sm:h-32 relative z-10" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full animate-fade-in">
        
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
        <div className="text-center mb-16">
          <h1 className="font-cinzel font-black text-4xl sm:text-5xl lg:text-6xl text-gold-shine tracking-widest uppercase mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            A Nossa Equipe
          </h1>
          <p className="text-warm-dim font-inter max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Conheça os guerreiros, magos e construtores por trás do RootsSky. Uma equipe dedicada a trazer a melhor experiência de Skyblock para você.
          </p>
          <div className="flex justify-center mt-6">
            <div className="gold-divider w-64" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="space-y-20">
          {TEAM_MEMBERS.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="font-cinzel font-bold text-2xl text-warm uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                <span className="h-px bg-gold/20 flex-1" />
                {group.role}
                <span className="h-px bg-gold/20 flex-1" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.members.map((member, idx) => (
                  <div 
                    key={idx}
                    className="group relative flex flex-col items-center p-8 rounded-2xl bg-forest-deep/80 border border-gold/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Glowing background behind avatar */}
                    <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${member.color} opacity-20 group-hover:opacity-40 transition-opacity blur-xl`} />
                    
                    {/* Avatar Container */}
                    <div className="relative w-32 h-32 mb-6 z-10 transform group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold to-dark-wood opacity-50 blur-md group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gold shadow-2xl bg-dark-wood">
                        <Image
                          src={`https://minotar.net/body/${member.nick}/128.png`}
                          alt={`Avatar de ${member.name}`}
                          width={128}
                          height={128}
                          unoptimized
                          className="w-full h-full object-cover rendering-pixelated"
                        />
                      </div>
                    </div>

                    {/* Member Info */}
                    <h3 className="font-outfit font-black text-2xl text-gold-shine mb-2 relative z-10">
                      {member.name}
                    </h3>
                    
                    <div className={`px-4 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-4 relative z-10 ${member.tagColor}`}>
                      {member.tag}
                    </div>
                    
                    <p className="text-center text-warm-dim/80 text-sm font-inter leading-relaxed relative z-10 group-hover:text-warm-dim transition-colors">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
