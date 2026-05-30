import React from "react";
import Card from "./Card";
import Button from "./Button";

const quickLinks = [
  { label: "📢 Discord", href: "#", color: "text-cyan-light" },
  { label: "🗳️ Vote", href: "#", color: "text-emerald-light" },
  { label: "📜 Rules", href: "#", color: "text-slate-300" },
  { label: "📖 Wiki", href: "#", color: "text-slate-300" },
];

const topPlayers = [
  { rank: 1, name: "xDragonSlayer", level: 87, emoji: "🥇" },
  { rank: 2, name: "SkyLord_99", level: 82, emoji: "🥈" },
  { rank: 3, name: "IslandQueen", level: 79, emoji: "🥉" },
  { rank: 4, name: "BlockMaster_X", level: 74, emoji: "4." },
  { rank: 5, name: "CraftedByNova", level: 71, emoji: "5." },
];

export default function Sidebar() {
  return (
    <aside className="space-y-6" id="sidebar">
      {/* Server Status */}
      <Card hoverable={false} className="!p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
          </span>
          <span className="font-outfit font-bold text-emerald text-sm">
            Server Online
          </span>
        </div>
        <p className="text-xs text-slate-400 font-inter">
          <span className="text-white font-medium">1,247</span> players online
          right now
        </p>
      </Card>

      {/* Quick Links */}
      <Card hoverable={false}>
        <h3 className="font-outfit font-bold text-base text-white mb-4">
          Quick Links
        </h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${link.color} hover:bg-white/5 transition-colors`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </Card>

      {/* Top Players */}
      <Card hoverable={false}>
        <h3 className="font-outfit font-bold text-base text-white mb-4">
          🏆 Top Players
        </h3>
        <div className="space-y-3">
          {topPlayers.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 text-center font-jetbrains text-xs text-slate-500">
                  {player.emoji}
                </span>
                <span
                  className={`font-medium ${player.rank <= 3 ? "text-gold" : "text-slate-300"}`}
                >
                  {player.name}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-jetbrains">
                Lv.{player.level}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full text-xs py-2">
            View Full Leaderboard
          </Button>
        </div>
      </Card>
    </aside>
  );
}
