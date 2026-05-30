"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import ServerIP from "./ServerIP";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "BattlePass", href: "/battlepass" },
  { label: "Discord", href: "#" },
  { label: "Vote", href: "#" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: "1px solid #1E293B" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-outfit font-extrabold text-gradient-primary">
              RootsSky
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-emerald transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <ServerIP />
            <Button variant="primary" href="#">
              Play Now
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span
              className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96 border-t border-slate-border/30" : "max-h-0"}`}
        id="mobile-menu"
      >
        <div className="px-4 py-6 space-y-4 glass">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-base font-medium text-slate-300 hover:text-emerald transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <ServerIP />
            <Button variant="primary" href="#" className="w-full text-center">
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
