"use client";

import React from "react";
import Button from "./Button";
import ServerIP from "./ServerIP";

const stats = [
  { label: "Players Online", value: "1,247" },
  { label: "Islands Created", value: "38,500+" },
  { label: "Uptime", value: "99.9%" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center stars-bg pt-16">
      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Season badge */}
        <div className="animate-fade-in mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium font-outfit">
            <span>👑</span>
            Season 1 — Now Live
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-slide-up">
          <span className="text-gradient-primary">Conquer</span>{" "}
          <span className="text-white">the Skies</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-inter animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          Build your island empire, dominate the economy, and rise through the
          ranks in the ultimate Premium Minecraft Skyblock experience.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button variant="primary" href="#" className="text-lg px-8 py-4">
            ⚡ Play Now
          </Button>
          <Button variant="premium" href="/store" className="text-lg px-8 py-4">
            🛒 Visit Store
          </Button>
        </div>

        {/* Server IP */}
        <div
          className="flex justify-center mb-16 animate-slide-up"
          style={{ animationDelay: "0.45s" }}
        >
          <ServerIP />
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-outfit font-bold text-gradient-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
