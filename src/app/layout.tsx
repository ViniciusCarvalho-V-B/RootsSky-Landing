import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono, Outfit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
  title: "RootsSky — O Melhor Servidor Skyblock Brasileiro",
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
  icons: {
    icon: "/svg/favicon-rootssky.svg",
    shortcut: "/svg/favicon-rootssky.svg",
    apple: "/svg/favicon-rootssky.svg",
  },
};

import { Toaster } from 'react-hot-toast';

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
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1D1A16', // bg-dark-wood
            color: '#F4E7C3', // text-warm-light
            border: '1px solid rgba(228, 179, 99, 0.3)', // border-gold/30
          },
          success: {
            iconTheme: {
              primary: '#10B981', // green-500
              secondary: '#1D1A16',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // red-500
              secondary: '#1D1A16',
            }
          }
        }} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
