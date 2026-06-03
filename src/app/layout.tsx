import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono, Outfit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RootsSky — Servidor Premium de Minecraft Skyblock",
  description:
    "Entre no RootsSky, a melhor experiência Premium de Minecraft Skyblock do Brasil. Ilhas personalizadas, arenas PvP, economia dinâmica, clãs, missões e muito mais. Jogue agora!",
  keywords: [
    "Minecraft",
    "Skyblock",
    "RootsSky",
    "Servidor Minecraft",
    "Skyblock Premium",
    "Minecraft Brasil",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-dark-wood text-warm font-inter antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
