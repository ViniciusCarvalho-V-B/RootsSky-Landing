import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "RootsSky — Premium Minecraft Skyblock Server",
  description:
    "Join RootsSky, the ultimate Premium Minecraft Skyblock experience. Custom islands, PvP arenas, dynamic economy, clans, quests, and more. Play now!",
  keywords: [
    "Minecraft",
    "Skyblock",
    "RootsSky",
    "Minecraft Server",
    "Premium Skyblock",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-void text-white font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
