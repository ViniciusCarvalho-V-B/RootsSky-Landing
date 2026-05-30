"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Button from "@/components/Button";

const features = [
  {
    icon: "⚔️",
    title: "Seasonal Tiers",
    description: "50+ tiers per season with exclusive rewards that never return. Grind your way through unique challenges each month.",
  },
  {
    icon: "🏆",
    title: "Exclusive Cosmetics",
    description: "Unlock trails, hats, particles, and island decorations only available through the BattlePass.",
  },
  {
    icon: "📈",
    title: "XP Multiplier",
    description: "Premium BattlePass holders earn 2x XP from all sources — level up faster and claim rewards sooner.",
  },
  {
    icon: "🔄",
    title: "Season Reset",
    description: "Each season introduces fresh rewards, new challenges, and a reset leaderboard. Stay competitive year-round.",
  },
  {
    icon: "🎁",
    title: "Free Tier Rewards",
    description: "Even without the premium pass, earn free coins, cosmetic crates, and bonus items every 5 tiers.",
  },
  {
    icon: "🛡️",
    title: "Server Integration",
    description: "Seamless in-game UI, automatic reward claiming, and progress tracking directly on your HUD.",
  },
];

const tiers = [
  {
    name: "Free Pass",
    price: "Free",
    description: "Access the basic seasonal track with limited rewards.",
    perks: ["10 free-tier rewards", "Basic challenges", "Season leaderboard", "Free cosmetic crate (tier 25)"],
    cta: "Already Included",
    variant: "outline" as const,
    disabled: true,
  },
  {
    name: "Premium Pass",
    price: "R$ 19,90",
    description: "Unlock the full reward track with 50+ exclusive items.",
    perks: ["All 50+ premium rewards", "2x XP multiplier", "Exclusive cosmetics", "Premium challenges", "Priority support"],
    cta: "Unlock Premium Pass",
    variant: "primary" as const,
    disabled: false,
    popular: true,
  },
  {
    name: "Premium + 10 Tiers",
    price: "R$ 34,90",
    description: "Everything in Premium plus skip the first 10 tiers instantly.",
    perks: ["All Premium perks", "Instantly unlock tiers 1–10", "Bonus 2,000 Coins", "Exclusive header badge"],
    cta: "Unlock Premium+ Pass",
    variant: "premium" as const,
    disabled: false,
  },
];

export default function BattlePassPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen stars-bg pt-24 pb-16">
        {/* Hero gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald/30 bg-emerald/5 text-emerald text-sm font-medium font-outfit">
                <span>⚔️</span> Season 1 BattlePass
              </span>
            </div>
            <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-6xl mb-4">
              <span className="text-gradient-primary">Battle</span>
              <span className="text-white">Pass</span>
            </h1>
            <p className="text-lg text-slate-400 font-inter max-w-2xl mx-auto">
              Level up your gameplay with the RootsSky BattlePass plugin. Complete challenges, earn exclusive rewards, and dominate the seasonal leaderboard.
            </p>
          </div>

          <div className="divider-glow mb-16" />

          {/* Features Grid */}
          <div className="mb-20">
            <h2 className="font-outfit font-bold text-2xl text-white text-center mb-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              Why BattlePass?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="group text-center">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-outfit font-bold text-lg text-white mb-2 group-hover:text-emerald-light transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-inter leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="divider-glow mb-16" />

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="font-outfit font-bold text-2xl text-white text-center mb-10">
              Choose Your Pass
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tiers.map((tier) => (
                <Card key={tier.name} className={`group flex flex-col ${tier.popular ? "ring-1 ring-emerald/40" : ""}`}>
                  {tier.popular && (
                    <span className="inline-block text-xs font-outfit font-bold text-emerald uppercase tracking-wider mb-4">
                      ★ Most Popular
                    </span>
                  )}
                  <h3 className="font-outfit font-bold text-xl text-white mb-1">{tier.name}</h3>
                  <span className={`font-outfit font-extrabold text-3xl mb-3 ${tier.popular ? "text-gradient-primary" : tier.variant === "premium" ? "text-gradient-gold" : "text-slate-400"}`}>
                    {tier.price}
                  </span>
                  <p className="text-sm text-slate-400 font-inter mb-6">{tier.description}</p>

                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-slate-300 font-inter">
                        <span className="text-emerald text-xs">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.variant}
                    className="w-full text-center"
                    disabled={tier.disabled}
                  >
                    {tier.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Season Progress Preview */}
          <Card hoverable={false} className="max-w-3xl mx-auto text-center !p-8">
            <h3 className="font-outfit font-bold text-xl text-white mb-2">Season 1 Progress</h3>
            <p className="text-sm text-slate-400 font-inter mb-6">Current season ends in 42 days</p>
            {/* Progress bar mock */}
            <div className="w-full bg-void rounded-full h-4 mb-4 overflow-hidden border border-slate-border">
              <div
                className="h-full rounded-full"
                style={{ width: "35%", background: "linear-gradient(to right, #10B981, #06B6D4)" }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-jetbrains mb-2">
              <span>Tier 17 / 50</span>
              <span>35%</span>
            </div>
            <p className="text-xs text-slate-500 font-inter mt-4">
              Progress syncs automatically with your in-game account. Log in to start earning XP!
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
