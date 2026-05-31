"use client";

import React, { useState } from "react";
import Link from "next/link";
import StoreSidebar from "@/components/StoreSidebar";
import { CardBadge } from "@/components/Card";
import Button from "@/components/Button";

type Category = "ranks" | "coins" | "bundles";

const storeItems: Record<
  Category,
  {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    description: string;
    badge?: string;
    badgeVariant?: "emerald" | "gold" | "cyan";
    perks?: string[];
    popular?: boolean;
  }[]
> = {
  ranks: [
    {
      id: 1,
      name: "Semente",
      price: "R$ 14,90",
      description:
        "Tudo começa com uma semente. Plante suas raízes no RootsSky.",
      badge: "Iniciante",
      badgeVariant: "emerald",
      perks: [
        "Prefixo [🌱] exclusivo",
        "2 /sethome",
        "/fly na sua ilha",
        "Chat colorido",
        "Trilha de folhas",
      ],
    },
    {
      id: 2,
      name: "Raiz Viva",
      price: "R$ 29,90",
      description: "As raízes que sustentam os céus. Poder e presença.",
      badge: "Popular",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Todas as vantagens Semente",
        "Prefixo [🌿] exclusivo",
        "5 /sethome",
        "/fly em todo lugar",
        "Fila prioritária",
        "Kit semanal",
        "Aura de raízes",
      ],
    },
    {
      id: 3,
      name: "Yggdrasil",
      price: "R$ 59,90",
      description: "A Árvore do Mundo. O rank lendário definitivo.",
      badge: "Lendário",
      badgeVariant: "cyan",
      perks: [
        "Todas as vantagens Raiz Viva",
        "Prefixo [🌳] exclusivo",
        "10 /sethome",
        "Mensagem de entrada",
        'Pet "Sprite da Floresta"',
        "Aura Yggdrasil",
        "Kit lendário",
      ],
    },
  ],
  coins: [
    {
      id: 4,
      name: "1.000 Moedas",
      price: "R$ 9,90",
      description: "Um impulso de moedas para sua ilha.",
      perks: ["Entrega instantânea", "Use na /shop"],
    },
    {
      id: 5,
      name: "5.000 Moedas",
      price: "R$ 39,90",
      originalPrice: "R$ 49,50",
      description: "Melhor custo-benefício — economize 20%!",
      badge: "20% OFF",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Entrega instantânea",
        "Use na /shop",
        "Bônus de 20% no valor",
      ],
    },
    {
      id: 6,
      name: "10.000 Moedas",
      price: "R$ 69,90",
      originalPrice: "R$ 99,00",
      description: "O pacote definitivo — economize 30%!",
      badge: "30% OFF",
      badgeVariant: "cyan",
      perks: [
        "Entrega instantânea",
        "Use na /shop",
        "Bônus de 30% no valor",
      ],
    },
  ],
  bundles: [
    {
      id: 7,
      name: "Pacote Semente",
      price: "R$ 24,90",
      originalPrice: "R$ 34,80",
      description: "Tudo que você precisa para começar forte.",
      badge: "Economize 28%",
      badgeVariant: "emerald",
      perks: [
        "Rank Semente",
        "1.000 Moedas",
        "Kit Iniciante",
        "Expansão de Ilha",
      ],
    },
    {
      id: 8,
      name: "Pacote Raiz Viva",
      price: "R$ 54,90",
      originalPrice: "R$ 79,80",
      description: "O pacote mais popular para jogadores dedicados.",
      badge: "Mais Popular",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Rank Raiz Viva",
        "5.000 Moedas",
        "Kit Premium",
        "2x Expansão de Ilha",
        "Pet Exclusivo",
      ],
    },
    {
      id: 9,
      name: "Pacote Yggdrasil",
      price: "R$ 99,90",
      originalPrice: "R$ 158,80",
      description: "O pacote completo definitivo. Economize 37%!",
      badge: "Melhor Oferta",
      badgeVariant: "cyan",
      perks: [
        "Rank Yggdrasil",
        "10.000 Moedas",
        "Todos os Kits",
        "5x Expansão de Ilha",
        "3 Pets Exclusivos",
        "Aura Personalizada",
      ],
    },
  ],
};

export default function StorePage() {
  const [active, setActive] = useState<Category>("ranks");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const items = storeItems[active];

  return (
    <div className="flex min-h-screen bg-dark-wood">
      {/* ═══ SIDEBAR (desktop) ═══ */}
      <aside className="hidden lg:flex lg:w-72 xl:w-80 fixed inset-y-0 left-0 z-30 flex-col store-sidebar-container">
        <StoreSidebar
          activeCategory={active}
          onCategoryChange={(cat) => setActive(cat as Category)}
        />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 lg:hidden store-sidebar-container ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StoreSidebar
          activeCategory={active}
          onCategoryChange={(cat) => setActive(cat as Category)}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 lg:ml-72 xl:ml-80 min-h-screen stars-bg relative">
        {/* Green ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(27,94,59,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(196,162,101,0.05) 0%, transparent 50%)",
          }}
        />

        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 lg:hidden glass-header px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col gap-1 p-2"
              aria-label="Abrir menu"
            >
              <span className="block w-5 h-0.5 bg-warm-muted" />
              <span className="block w-5 h-0.5 bg-warm-muted" />
              <span className="block w-5 h-0.5 bg-warm-muted" />
            </button>
            <Link href="/">
              <img
                src="/svg/logo-rootssky.svg"
                alt="RootsSky"
                className="h-8 w-auto"
              />
            </Link>
            <div className="w-9" />
          </div>
        </div>

        {/* Store content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="font-cinzel font-black text-3xl sm:text-4xl lg:text-5xl mb-4 uppercase tracking-wide">
              <span className="text-gradient-gold">Loja</span>{" "}
              <span className="text-warm">Premium</span>
            </h1>
            <p className="text-warm-muted font-inter max-w-xl mx-auto text-sm sm:text-base">
              Melhore sua experiência Skyblock com ranks exclusivos, moedas e
              pacotes. Todas as compras apoiam o servidor.
            </p>
          </div>

          <div className="gold-divider mb-8" />

          {/* Category Tabs */}
          <div
            className="flex justify-center gap-3 mb-10 animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            {([
              { key: "ranks" as Category, label: "🌿 Ranks" },
              { key: "coins" as Category, label: "💰 Moedas" },
              { key: "bundles" as Category, label: "📦 Pacotes" },
            ]).map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 sm:px-6 py-2.5 rounded-lg font-cinzel font-bold text-xs sm:text-sm transition-all duration-300 ${
                  active === cat.key
                    ? "bg-gradient-to-r from-forest-glow to-roots-green text-warm border border-leaf-light/40 shadow-lg shadow-roots-green/20"
                    : "bg-wood border border-gold/20 text-warm-muted hover:text-gold hover:border-gold/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`medieval-panel p-5 sm:p-6 flex flex-col group animate-slide-up ${
                  item.popular ? "ring-1 ring-gold/30" : ""
                }`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {/* Badge row */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  {item.badge ? (
                    <CardBadge variant={item.badgeVariant || "emerald"}>
                      {item.badge}
                    </CardBadge>
                  ) : (
                    <span />
                  )}
                  {item.popular && (
                    <span className="text-[10px] font-cinzel font-bold text-gold uppercase tracking-wider">
                      ★ Popular
                    </span>
                  )}
                </div>

                {/* Name & Description */}
                <h3 className="relative z-10 font-cinzel font-bold text-xl text-gold-shine mb-1 group-hover:text-gold-light transition-colors uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="relative z-10 text-sm text-warm-muted font-inter mb-4 flex-grow leading-relaxed">
                  {item.description}
                </p>

                {/* Perks */}
                {item.perks && (
                  <ul className="relative z-10 space-y-2 mb-6">
                    {item.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-sm text-warm/80 font-inter"
                      >
                        <span className="text-leaf-light text-xs mt-0.5 flex-shrink-0">
                          ✓
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price & CTA */}
                <div className="relative z-10 mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-cinzel font-black text-2xl text-gradient-gold">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-warm-dim line-through font-inter">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    variant={item.popular ? "premium" : "primary"}
                    className="w-full text-center justify-center"
                  >
                    Comprar Agora
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-warm-dim/60 font-inter">
              Todas as compras são finais. Ao comprar, você concorda com nossos
              Termos de Serviço. Pagamentos processados com segurança.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
