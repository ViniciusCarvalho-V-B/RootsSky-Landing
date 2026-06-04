"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StoreSidebar from "@/components/StoreSidebar";
import { CardBadge } from "@/components/Card";
import Button from "@/components/Button";
import PlayerModal from "@/components/PlayerModal";
import StoreStats from "@/components/StoreStats";

import { Category, storeItems } from "@/lib/catalog";

function StorePageContent() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Category>("ranks");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [couponCode, setCouponCode] = useState("");

  // Player authentication state
  const [playerNick, setPlayerNick] = useState<string | null>(null);
  const [playerUuid, setPlayerUuid] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const items = storeItems[active];

  // Checa se voltou do Stripe com sucesso
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccessToast(true);
      // Opcional: remover o parametro da URL para não ficar alertando no refresh
      window.history.replaceState(null, "", "/store");
      setTimeout(() => setShowSuccessToast(false), 6000);
    }
  }, [searchParams]);

  // Carrega do localStorage no client-side
  useEffect(() => {
    const savedNick = localStorage.getItem("rootssky_player_nick");
    const savedUuid = localStorage.getItem("rootssky_player_uuid");
    
    // Limpa estado bugado se existir
    if (savedNick === "undefined" || savedUuid === "undefined" || savedNick === "null" || savedUuid === "null") {
      localStorage.removeItem("rootssky_player_nick");
      localStorage.removeItem("rootssky_player_uuid");
    } else if (savedNick && savedUuid) {
      setPlayerNick(savedNick);
      setPlayerUuid(savedUuid);
    }
  }, []);

  const handlePlayerSuccess = (nick: string, uuid: string) => {
    setPlayerNick(nick);
    setPlayerUuid(uuid);
    localStorage.setItem("rootssky_player_nick", nick);
    localStorage.setItem("rootssky_player_uuid", uuid);
    setIsModalOpen(false);
    
    // Se logou para comprar, continua
    if (pendingProductId) {
      proceedToCheckout(pendingProductId, nick, uuid);
    }
  };

  const handlePurchaseClick = (productId: string) => {
    if (!playerNick || !playerUuid) {
      setPendingProductId(productId);
      setIsModalOpen(true);
    } else {
      proceedToCheckout(productId, playerNick, playerUuid);
    }
  };

  const proceedToCheckout = async (productId: string, nick: string, uuid: string) => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          playerNick: nick,
          playerUuid: uuid,
          couponCode: couponCode.trim(),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redireciona pro Stripe
      } else {
        alert(data.error || "Erro ao iniciar checkout.");
        setIsCheckingOut(false);
      }
    } catch {
      alert("Erro de conexão ao processar compra.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-wood">
      <PlayerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPendingProductId(null);
        }}
        onSuccess={handlePlayerSuccess}
      />
      {/* ═══ SIDEBAR (desktop) ═══ */}
      <aside className="hidden lg:flex lg:w-72 xl:w-80 fixed inset-y-0 left-0 z-30 flex-col store-sidebar-container">
        <StoreSidebar
          activeCategory={active}
          onCategoryChange={(cat) => setActive(cat as Category)}
          playerNick={playerNick || undefined}
          playerUuid={playerUuid || undefined}
          onChangeNick={() => setIsModalOpen(true)}
        />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 lg:hidden store-sidebar-container ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StoreSidebar
          activeCategory={active}
          onCategoryChange={(cat) => setActive(cat as Category)}
          onClose={() => setSidebarOpen(false)}
          playerNick={playerNick || undefined}
          playerUuid={playerUuid || undefined}
          onChangeNick={() => {
            setIsModalOpen(true);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 lg:ml-72 xl:ml-80 min-h-screen stars-bg relative">
        {/* Toast Notification */}
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 lg:left-[calc(50%+9rem)] xl:left-[calc(50%+10rem)] z-50 transition-all duration-500 ease-out ${showSuccessToast ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'}`}>
          <div className="bg-forest-deep/95 backdrop-blur-md border border-leaf-light/50 p-4 rounded-xl shadow-2xl shadow-roots-green/20 flex items-center gap-4 min-w-[320px] max-w-[90vw]">
            <div className="w-10 h-10 rounded-full bg-leaf-light/20 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-leaf-light">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-gold text-lg mb-0.5">Pagamento Aprovado!</h3>
              <p className="text-warm-muted text-sm font-inter leading-tight">Seus itens serão entregues em instantes.</p>
            </div>
            <button onClick={() => setShowSuccessToast(false)} className="ml-auto text-warm-dim hover:text-warm p-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        {/* Green ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(27,94,59,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(196,162,101,0.05) 0%, transparent 50%)",
          }}
        />

        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 lg:hidden glass-header px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col gap-1 p-2"
              aria-label="Abrir menu"
            >
              <span className="block w-5 h-0.5 bg-warm-muted" />
              <span className="block w-5 h-0.5 bg-warm-muted" />
              <span className="block w-5 h-0.5 bg-warm-muted" />
            </button>
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/svg/logo-rootssky.svg"
                alt="RootsSky"
                className="h-8 w-auto"
              />
            </Link>
            <div className="w-9" />
          </div>
        </div>

        {/* Store content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="font-cinzel font-black text-3xl sm:text-4xl lg:text-5xl mb-4 uppercase tracking-wide">
              <span className="text-gradient-gold">Loja</span>{" "}
              <span className="text-warm">Premium</span>
            </h1>
            <p className="text-warm-muted font-inter max-w-xl mx-auto text-sm sm:text-base">
              Melhore sua experiência Skyblock com ranks exclusivos, moedas e
              pacotes. Todas as compras apoiam o servidor.
            </p>
          </div>

          <div className="gold-divider mb-8" />

          {/* Store Stats Widget */}
          <StoreStats />

          {/* Category Tabs */}
          <div
            className="flex justify-center gap-3 mb-10 animate-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            {([
              { key: "ranks" as Category, label: "🌿 Ranks" },
              { key: "keys" as Category, label: "🔑 Chaves" },
            ]).map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 sm:px-6 py-2.5 rounded-lg font-cinzel font-bold text-xs sm:text-sm transition-all duration-300 ${
                  active === cat.key
                    ? "bg-gradient-to-r from-forest-glow to-roots-green text-warm border border-leaf-light/40 shadow-lg shadow-roots-green/20"
                    : "bg-wood border border-gold/20 text-warm-muted hover:text-gold hover:border-gold/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Coupon Input */}
          <div className="flex justify-center mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-wood/50 border border-gold/20 p-2 rounded-lg flex items-center gap-2 max-w-sm w-full">
              <span className="text-xl px-2">🎟️</span>
              <input 
                type="text" 
                placeholder="Cupom de Desconto" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="bg-transparent border-none text-warm-light placeholder:text-warm-dim/50 focus:outline-none flex-grow uppercase font-cinzel font-bold text-sm"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
              const selectedOptionId = selectedOptions[item.id] || (item.options ? item.options[0].id : item.id);
              const currentItem = item.options ? item.options.find(o => o.id === selectedOptionId) || item.options[0] : item;

              return (
              <div
                key={item.id}
                className={`medieval-panel p-5 sm:p-6 flex flex-col group animate-slide-up ${
                  item.popular ? "ring-1 ring-gold/30" : ""
                }`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {/* Badge row */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  {currentItem.badge || item.badge ? (
                    <CardBadge variant={item.badgeVariant || "emerald"}>
                      {currentItem.badge || item.badge}
                    </CardBadge>
                  ) : (
                    <span />
                  )}
                  {item.popular && (
                    <span className="text-[10px] font-cinzel font-bold text-gold uppercase tracking-wider">
                      ★ Popular
                    </span>
                  )}
                </div>

                {/* Name & Description */}
                <h3 className="relative z-10 font-cinzel font-bold text-xl text-gold-shine mb-1 group-hover:text-gold-light transition-colors uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="relative z-10 text-sm text-warm-muted font-inter mb-4 flex-grow leading-relaxed">
                  {item.description}
                </p>

                {/* Perks */}
                {item.perks && (
                  <ul className="relative z-10 space-y-2 mb-6">
                    {item.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-sm text-warm/80 font-inter"
                      >
                        <span className="text-leaf-light text-xs mt-0.5 flex-shrink-0">
                          ✓
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Options Selector if available */}
                {item.options && (
                  <div className="relative z-10 mb-4">
                    <label className="block text-xs font-cinzel text-warm-dim mb-1 uppercase tracking-wider">Quantidade:</label>
                    <select
                      value={selectedOptionId}
                      onChange={(e) => setSelectedOptions(prev => ({ ...prev, [item.id]: e.target.value }))}
                      className="w-full bg-dark-wood border border-gold/30 rounded-md py-2 px-3 text-warm font-inter text-sm focus:outline-none focus:border-gold/60"
                    >
                      {item.options.map(opt => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Price & CTA */}
                <div className="relative z-10 mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-cinzel font-black text-2xl text-gradient-gold">
                      {currentItem.price}
                    </span>
                    {currentItem.originalPrice && (
                      <span className="text-sm text-warm-dim line-through font-inter">
                        {currentItem.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    variant={item.popular ? "premium" : "primary"}
                    className="w-full text-center justify-center"
                    onClick={() => handlePurchaseClick(selectedOptionId)}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut && pendingProductId === selectedOptionId ? "Aguarde..." : "Comprar Agora"}
                  </Button>
                </div>
              </div>
            )})}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-warm-dim/60 font-inter">
              Todas as compras são finais. Ao comprar, você concorda com nossos
              Termos de Serviço. Pagamentos processados com segurança.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-wood flex items-center justify-center text-gold font-cinzel">Carregando Loja...</div>}>
      <StorePageContent />
    </Suspense>
  );
}
