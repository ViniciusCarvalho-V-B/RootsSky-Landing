import React from "react";
import Card, { CardBadge } from "./Card";
import Button from "./Button";

const announcements = [
  {
    id: 1,
    date: "28 Mai, 2026",
    category: "Atualização",
    title: "Lançamento da Season 1 — Novas Ilhas & Reset de Economia",
    excerpt:
      "A espera acabou! A Season 1 traz 15 novos modelos de ilha, uma economia renovada e desafios empolgantes para todos os jogadores.",
  },
  {
    id: 2,
    date: "25 Mai, 2026",
    category: "Evento",
    title: "Torneio PvP de Fim de Semana — 50K de Prêmio",
    excerpt:
      "Participe do nosso primeiro torneio de arena PvP neste fim de semana. Top 3 jogadores ganham ranks exclusivos e moedas.",
  },
  {
    id: 3,
    date: "22 Mai, 2026",
    category: "Loja",
    title: "Novos Ranks Premium Disponíveis",
    excerpt:
      "Apresentamos os ranks Celestial e Void Master com vantagens exclusivas, trilhas personalizadas e fila prioritária.",
  },
  {
    id: 4,
    date: "18 Mai, 2026",
    category: "Comunidade",
    title: "Vencedores do Concurso de Construção",
    excerpt:
      "Parabéns aos nossos top 10 construtores! Confira as incríveis criações de ilhas que venceram o concurso deste mês.",
  },
];

const categoryColors: Record<string, "emerald" | "gold" | "cyan"> = {
  Atualização: "emerald",
  Evento: "cyan",
  Loja: "gold",
  Comunidade: "emerald",
};

export default function AnnouncementGrid() {
  return (
    <section id="announcements">
      <h2 className="font-outfit font-bold text-2xl text-white mb-6">
        Últimas Notícias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {announcements.map((post) => (
          <Card key={post.id} className="group">
            <div className="flex items-center gap-3 mb-3">
              <CardBadge variant={categoryColors[post.category] || "emerald"}>
                {post.category}
              </CardBadge>
              <span className="text-xs text-slate-500 font-inter">
                {post.date}
              </span>
            </div>
            <h3 className="font-outfit font-bold text-lg text-white mb-2 group-hover:text-emerald-light transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-slate-400 font-inter mb-4 leading-relaxed">
              {post.excerpt}
            </p>
            <Button variant="outline" className="text-sm px-4 py-2">
              Ler Mais →
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
