"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card, { CardBadge } from "@/components/Card";
import Button from "@/components/Button";

type Category = "ranks" | "coins" | "bundles";

const categories: { key: Category; label: string; emoji: string }[] = [
  { key: "ranks", label: "Ranks", emoji: "👑" },
  { key: "coins", label: "Coins", emoji: "💎" },
  { key: "bundles", label: "Bundles", emoji: "📦" },
];

const storeItems: Record<Category, {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  badge?: string;
  badgeVariant?: "emerald" | "gold" | "cyan";
  perks?: string[];
  popular?: boolean;
}[]> = {
  ranks: [
    {
      id: 1,
      name: "Celestial",
      price: "R$ 29,90",
      description: "Ascend to the skies with exclusive celestial perks.",
      badge: "Popular",
      badgeVariant: "cyan",
      popular: true,
      perks: ["Custom prefix & tag", "/fly on your island", "3 /sethome", "Priority queue", "Celestial trail"],
    },
    {
      id: 2,
      name: "Void Master",
      price: "R$ 59,90",
      description: "Master the void with the ultimate rank.",
      badge: "Best Value",
      badgeVariant: "gold",
      popular: false,
      perks: ["All Celestial perks", "/fly everywhere", "7 /sethome", "Custom join message", "Void Master aura", "Exclusive kit"],
    },
    {
      id: 3,
      name: "Ethereal",
      price: "R$ 14,90",
      description: "Begin your premium journey with ethereal powers.",
      badge: "Starter",
      badgeVariant: "emerald",
      perks: ["Custom prefix", "2 /sethome", "Ethereal trail", "Colored chat"],
    },
  ],
  coins: [
    {
      id: 4,
      name: "1,000 Coins",
      price: "R$ 9,90",
      description: "A boost of in-game currency for your island.",
      perks: ["Instant delivery", "Use in /shop"],
    },
    {
      id: 5,
      name: "5,000 Coins",
      price: "R$ 39,90",
      originalPrice: "R$ 49,50",
      description: "Best value coin pack — save 20%!",
      badge: "20% OFF",
      badgeVariant: "gold",
      popular: true,
      perks: ["Instant delivery", "Use in /shop", "Bonus 20% value"],
    },
    {
      id: 6,
      name: "10,000 Coins",
      price: "R$ 69,90",
      originalPrice: "R$ 99,00",
      description: "The ultimate coin hoard — save 30%!",
      badge: "30% OFF",
      badgeVariant: "cyan",
      perks: ["Instant delivery", "Use in /shop", "Bonus 30% value"],
    },
  ],
  bundles: [
    {
      id: 7,
      name: "Skyblock Starter",
      price: "R$ 24,90",
      originalPrice: "R$ 34,80",
      description: "Everything you need to start strong.",
      badge: "Save 28%",
      badgeVariant: "emerald",
      perks: ["Ethereal Rank", "1,000 Coins", "Starter Kit", "Island Expansion"],
    },
    {
      id: 8,
      name: "Celestial Pack",
      price: "R$ 54,90",
      originalPrice: "R$ 79,80",
      description: "The most popular bundle for serious players.",
      badge: "Most Popular",
      badgeVariant: "gold",
      popular: true,
      perks: ["Celestial Rank", "5,000 Coins", "Premium Kit", "2x Island Expansion", "Exclusive Pet"],
    },
    {
      id: 9,
      name: "Void Master Bundle",
      price: "R$ 99,90",
      originalPrice: "R$ 158,80",
      description: "The ultimate all-in-one package. Save 37%!",
      badge: "Best Deal",
      badgeVariant: "cyan",
      perks: ["Void Master Rank", "10,000 Coins", "All Kits", "5x Island Expansion", "3 Exclusive Pets", "Custom Aura"],
    },
  ],
};

export default function StorePage() {
  const [active, setActive] = useState<Category>("ranks");
  const items = storeItems[active];

  return (
    <>
      <Header />

      <main className="min-h-screen stars-bg pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl mb-4">
              <span className="text-gradient-gold">Premium</span>{" "}
              <span className="text-white">Store</span>
            </h1>
            <p className="text-slate-400 font-inter max-w-xl mx-auto">
              Enhance your Skyblock experience with exclusive ranks, coins, and bundles. All purchases support the server.
            </p>
          </div>

          <div className="divider-glow mb-10" />

          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-6 py-2.5 rounded-full font-outfit font-bold text-sm transition-all duration-300 ${
                  active === cat.key
                    ? cat.key === "ranks"
                      ? "bg-gradient-to-r from-emerald to-cyan text-white shadow-lg shadow-emerald/20"
                      : cat.key === "coins"
                      ? "bg-gradient-to-r from-cyan to-blue-500 text-white shadow-lg shadow-cyan/20"
                      : "bg-gradient-to-r from-gold to-gold-dark text-white shadow-lg shadow-gold/20"
                    : "bg-obsidian border border-slate-border text-slate-400 hover:text-white hover:border-slate-500"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className={`group flex flex-col ${item.popular ? "ring-1 ring-gold/40" : ""}`}>
                {/* Badge row */}
                <div className="flex items-center justify-between mb-4">
                  {item.badge ? (
                    <CardBadge variant={item.badgeVariant || "emerald"}>{item.badge}</CardBadge>
                  ) : (
                    <span />
                  )}
                  {item.popular && (
                    <span className="text-xs font-outfit font-bold text-gold uppercase tracking-wider">★ Popular</span>
                  )}
                </div>

                {/* Name & Description */}
                <h3 className="font-outfit font-bold text-xl text-white mb-1 group-hover:text-emerald-light transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-400 font-inter mb-4 flex-grow">
                  {item.description}
                </p>

                {/* Perks */}
                {item.perks && (
                  <ul className="space-y-2 mb-6">
                    {item.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-slate-300 font-inter">
                        <span className="text-emerald text-xs">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price & CTA */}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`font-outfit font-extrabold text-2xl ${item.popular ? "text-gradient-gold" : "text-gradient-primary"}`}>
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-slate-500 line-through font-inter">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button variant={item.popular ? "premium" : "primary"} className="w-full text-center">
                    Purchase Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500 font-inter">
              All purchases are final. By purchasing you agree to our Terms of Service. Payments are processed securely.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
