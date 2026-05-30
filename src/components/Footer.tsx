"use client";

import React from "react";
import Link from "next/link";
import ServerIP from "./ServerIP";

const footerSections = [
  {
    title: "Server",
    links: [
      { label: "Home", href: "/" },
      { label: "Store", href: "/store" },
      { label: "BattlePass", href: "/battlepass" },
      { label: "Rules", href: "#" },
      { label: "Wiki", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "Vote", href: "#" },
      { label: "Forums", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-outfit font-extrabold text-gradient-primary">
                RootsSky
              </span>
            </Link>
            <p className="text-sm text-slate-400 font-inter leading-relaxed mb-6 max-w-sm">
              The ultimate Premium Minecraft Skyblock experience. Build, trade,
              compete, and conquer the skies with thousands of players.
            </p>
            <ServerIP />
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-outfit font-bold text-sm text-white mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-emerald transition-colors font-inter"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="divider-glow mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-inter">
            © {new Date().getFullYear()} RootsSky. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-inter">
            Not affiliated with Mojang Studios or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
