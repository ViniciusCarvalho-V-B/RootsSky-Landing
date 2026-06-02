"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface StoreStatsData {
  recentPurchases: {
    id: string;
    playerNick: string;
    productName: string;
    timeAgo: string;
  }[];
  topSupporters: {
    playerNick: string;
    totalAmount: number;
  }[];
  monthlyGoal: {
    current: number;
    goal: number;
    percentage: number;
  };
}

export default function StoreStats() {
  const [stats, setStats] = useState<StoreStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/store-stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Erro ao carregar stats da loja:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
      {/* Meta Mensal */}
      <div className="md:col-span-12 lg:col-span-4 medieval-panel p-5 flex flex-col justify-center">
        <h3 className="font-cinzel font-bold text-gold uppercase tracking-wider mb-3 text-sm">
          Meta Mensal
        </h3>
        <div className="flex justify-between items-end mb-2">
          <span className="text-2xl font-black text-gold-shine">
            {stats.monthlyGoal.percentage}%
          </span>
          <span className="text-xs text-warm-dim font-inter">
            R$ {stats.monthlyGoal.current.toFixed(2)} / R$ {stats.monthlyGoal.goal.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-dark-wood rounded-full h-3 mb-2 border border-gold/20 overflow-hidden">
          <div
            className="bg-gradient-to-r from-forest-glow to-roots-green h-full rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${stats.monthlyGoal.percentage}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('/svg/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>
        </div>
        <p className="text-[10px] text-warm-muted font-inter text-center">
          Apoie o RootsSky a se manter online!
        </p>
      </div>

      {/* Top Apoiadores */}
      <div className="md:col-span-6 lg:col-span-4 medieval-panel p-5">
        <h3 className="font-cinzel font-bold text-gold uppercase tracking-wider mb-3 text-sm flex items-center gap-2">
          <span>🏆</span> Top Apoiadores
        </h3>
        {stats.topSupporters.length > 0 ? (
          <div className="space-y-3">
            {stats.topSupporters.slice(0, 3).map((supporter, idx) => (
              <div key={supporter.playerNick} className="flex items-center gap-3">
                <span className="text-gold/50 font-cinzel font-bold text-xs w-3 text-center">
                  {idx + 1}
                </span>
                <Image
                  src={`https://minotar.net/helm/${supporter.playerNick}/32.png`}
                  alt={supporter.playerNick}
                  width={24}
                  height={24}
                  unoptimized
                  className="rounded border border-gold/30 rendering-pixelated"
                  onError={(e) => { e.currentTarget.srcset = "https://minotar.net/helm/MHF_Steve/32.png 1x" }}
                />
                <span className="text-sm text-warm font-medium flex-1 truncate">
                  {supporter.playerNick}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-warm-dim">Nenhum apoiador este mês ainda.</p>
        )}
      </div>

      {/* Últimas Compras */}
      <div className="md:col-span-6 lg:col-span-4 medieval-panel p-5">
        <h3 className="font-cinzel font-bold text-gold uppercase tracking-wider mb-3 text-sm flex items-center gap-2">
          <span>⚡</span> Últimas Compras
        </h3>
        {stats.recentPurchases.length > 0 ? (
          <div className="space-y-3">
            {stats.recentPurchases.slice(0, 3).map((purchase) => (
              <div key={purchase.id} className="flex items-center gap-3">
                <Image
                  src={`https://minotar.net/helm/${purchase.playerNick}/32.png`}
                  alt={purchase.playerNick}
                  width={24}
                  height={24}
                  unoptimized
                  className="rounded border border-gold/30 rendering-pixelated"
                  onError={(e) => { e.currentTarget.srcset = "https://minotar.net/helm/MHF_Steve/32.png 1x" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-warm font-medium truncate">
                    {purchase.playerNick}
                  </p>
                  <p className="text-[10px] text-warm-dim truncate">
                    comprou {purchase.productName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-warm-dim">Nenhuma compra recente.</p>
        )}
      </div>
    </div>
  );
}
