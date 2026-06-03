"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/store" },
  { label: "Votar", href: "/vote" },
  { label: "Equipe", href: "/team" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Header — visible only on sub-pages, hidden on landing via page.tsx */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/svg/logo-rootssky.svg"
                alt="RootsSky"
                width={160}
                height={40}
                className="h-10 w-auto logo-hover"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-warm-muted hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-warm-muted hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="/"
                className="btn-premium font-outfit text-sm px-5 py-2"
              >
                Jogar Agora
              </a>
            </div>

            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-warm-muted transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-warm-muted transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-warm-muted transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-72 z-50 transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(13,10,7,0.98) 0%, rgba(26,18,14,0.98) 100%)",
          borderLeft: "1px solid rgba(196,162,101,0.2)",
        }}
      >
        <div className="px-6 py-8 space-y-6">
          <Link href="/" className="block mb-6">
            <Image
              src="/svg/logo-rootssky.svg"
              alt="RootsSky"
              width={192}
              height={48}
              className="h-12 w-auto logo-hover"
            />
          </Link>
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-medium text-warm-muted hover:text-gold transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block text-base font-medium text-warm-muted hover:text-gold transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-6 space-y-4 border-t border-gold/15">
            <a
              href="/"
              className="btn-premium font-outfit w-full text-center text-sm py-3 block"
            >
              Jogar Agora
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
