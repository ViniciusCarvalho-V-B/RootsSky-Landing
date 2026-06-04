"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Servidor",
    links: [
      { label: "Início", href: "/" },
      { label: "Loja", href: "/store" },
      { label: "Benefícios VIP", href: "/vip-beneficios" },
      { label: "Regras", href: "/regras" },
    ],
  },
  {
    title: "Comunidade",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/UxUM66WSSD",
        external: true,
      },
      { label: "Votar", href: "/vote" },
      { label: "Fórum", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de Serviço", href: "/termos" },
      { label: "Política de Reembolso", href: "/reembolso" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-gold/15"
      style={{
        background:
          "linear-gradient(180deg, rgba(13,10,7,1) 0%, rgba(26,18,14,0.95) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/svg/logo-rootssky.svg"
                alt="RootsSky"
                width={160}
                height={40}
                className="h-10 w-auto logo-hover"
              />
            </Link>
            <p className="text-sm text-warm-muted font-inter leading-relaxed mb-6 max-w-sm">
              A experiência definitiva de Minecraft Skyblock Premium. Construa,
              troque, compita e conquiste os céus com milhares de jogadores.
            </p>
            <div className="font-jetbrains text-sm text-gold tracking-wider">
              rootssky.haskhosting.com.br
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-cinzel font-bold text-sm text-gold mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-warm-dim hover:text-gold transition-colors font-inter"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-warm-dim hover:text-gold transition-colors font-inter"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="gold-divider mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-dim font-inter">
            © {new Date().getFullYear()} RootsSky. Todos os direitos reservados.
          </p>
          <p className="text-xs text-warm-dim/50 font-inter">
            Não afiliado à Mojang Studios ou Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
