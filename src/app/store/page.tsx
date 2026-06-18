"use client";

import React, { useState, useEffect, Suspense } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StoreSidebar from "@/components/StoreSidebar";
import { CardBadge } from "@/components/Card";
import Button from "@/components/Button";
import PlayerModal from "@/components/PlayerModal";
import CheckoutConsentModal from "@/components/CheckoutConsentModal";
import StoreStats from "@/components/StoreStats";

import { Category, storeItems } from "@/lib/catalog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function StorePageContent() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Category>("ranks");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [couponCode, setCouponCode] = useState("");
  const [couponValidating, setCouponValidating] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ text: string, type: 'success'|'error' } | null>(null);
  const [activeCoupon, setActiveCoupon] = useState<{ code: string, discountPct: number, eligibleItems: string | null } | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<{code: string, discountPct: number, expiresAt?: string | null, maxUses?: number | null, uses?: number}[]>([]);
  const [isCouponDropdownOpen, setIsCouponDropdownOpen] = useState(false);


  // Player authentication state
  const [playerNick, setPlayerNick] = useState<string | null>(null);
  const [playerUuid, setPlayerUuid] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [consentProductId, setConsentProductId] = useState<string | null>(null);

  // Previews Modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewProductName, setPreviewProductName] = useState("");

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

  // Carrega coupons ativos
  useEffect(() => {
    fetch('/api/coupons/active')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setAvailableCoupons(data);
      })
      .catch(() => {});
  }, []);

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
    
    if (pendingProductId) {
      setConsentProductId(pendingProductId);
      setIsConsentModalOpen(true);
      setPendingProductId(null);
    }
  };

  const handlePurchaseClick = (productId: string) => {
    if (!playerNick || !playerUuid) {
      setPendingProductId(productId);
      setIsModalOpen(true);
    } else {
      setConsentProductId(productId);
      setIsConsentModalOpen(true);
    }
  };

  const proceedToCheckout = async (productId: string, nick: string, uuid: string, isAnonymous: boolean = false) => {
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
          isAnonymous,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redireciona pro Stripe
      } else {
        toast.error(data.error || "Erro ao iniciar checkout.");
        setIsCheckingOut(false);
      }
    } catch {
      toast.error("Erro de conexão ao processar compra.");
      setIsCheckingOut(false);
    }
  };

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponValidating(true);
    setCouponMsg(null);
    try {
      const res = await fetch(`/api/coupons/validate?code=${couponCode.trim()}`);
      const data = await res.json();
      if (res.ok && data.valid) {
        setCouponMsg({ text: `Cupom válido! -${data.discountPct}%`, type: 'success' });
        setActiveCoupon({ code: couponCode.trim(), discountPct: data.discountPct, eligibleItems: data.eligibleItems });
      } else {
        setCouponMsg({ text: data.error || "Cupom inválido", type: 'error' });
        setActiveCoupon(null);
      }
    } catch {
      setCouponMsg({ text: "Erro ao verificar cupom", type: 'error' });
    } finally {
      setCouponValidating(false);
    }
  };

  const handleOpenPreview = async (productId: string, productName: string) => {
    setPreviewProductName(productName);
    setPreviewContent("");
    setPreviewModalOpen(true);
    setPreviewLoading(true);
    try {
      const res = await fetch(`/api/previews/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setPreviewContent(data.content || "*Nenhum detalhe adicional configurado para este pacote.*");
      } else {
        setPreviewContent("*Nenhum detalhe adicional configurado para este pacote.*");
      }
    } catch {
      setPreviewContent("*Erro ao carregar detalhes do pacote.*");
    } finally {
      setPreviewLoading(false);
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
          <div className="flex flex-col items-center justify-center mb-8 animate-slide-up relative z-50" style={{ animationDelay: "0.2s" }}>
            
            <div className="relative bg-wood/50 border border-gold/20 p-2 rounded-lg flex items-center gap-2 max-w-sm w-full">
              <span className="text-xl px-2">🎟️</span>
              <input 
                type="text" 
                placeholder="Cupom de Desconto" 
                value={couponCode}
                onFocus={() => setIsCouponDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsCouponDropdownOpen(false), 200)}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  if (couponMsg) setCouponMsg(null);
                  setIsCouponDropdownOpen(true);
                }}
                className="bg-transparent border-none text-warm-light placeholder:text-warm-dim/50 focus:outline-none flex-grow uppercase font-cinzel font-bold text-sm min-w-0"
              />
              
              {isCouponDropdownOpen && availableCoupons.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-dark-wood border border-gold/30 rounded-lg shadow-2xl overflow-hidden z-50">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {availableCoupons.map(c => {
                      const usesLeft = c.maxUses ? c.maxUses - (c.uses || 0) : null;
                      const isLowUses = usesLeft !== null && usesLeft <= 5;
                      
                      const expiresInHours = c.expiresAt ? (new Date(c.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60) : null;
                      const isExpiringSoon = expiresInHours !== null && expiresInHours <= 48 && expiresInHours > 0;
                      
                      let timeStr = "";
                      if (expiresInHours !== null && expiresInHours > 0) {
                        if (expiresInHours < 1) timeStr = "< 1 hora";
                        else if (expiresInHours < 24) timeStr = `${Math.floor(expiresInHours)} horas`;
                        else timeStr = `${Math.floor(expiresInHours / 24)} dias`;
                      }

                      return (
                        <div 
                          key={c.code} 
                          onMouseDown={() => {
                            setCouponCode(c.code);
                            setIsCouponDropdownOpen(false);
                            if (couponMsg) setCouponMsg(null);
                          }}
                          className="p-3 border-b border-gold/10 hover:bg-gold/10 cursor-pointer flex flex-col gap-1 last:border-0 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-warm-light text-sm">{c.code}</span>
                            <span className="text-roots-green font-bold bg-roots-green/10 px-2 py-0.5 rounded text-xs">-{c.discountPct}%</span>
                          </div>
                          
                          {(isLowUses || isExpiringSoon) && (
                            <div className="flex gap-3 text-[11px] mt-1">
                              {isLowUses && (
                                <span className="flex items-center gap-1 text-red-400 font-inter">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                  Restam {usesLeft} {usesLeft === 1 ? 'uso' : 'usos'}!
                                </span>
                              )}
                              {isExpiringSoon && (
                                <span className="flex items-center gap-1 text-orange-400 font-inter">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Expira em {timeStr}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Botão de Seta para Abrir/Fechar Dropdown */}
              <button 
                type="button"
                onClick={() => setIsCouponDropdownOpen(!isCouponDropdownOpen)}
                className="text-warm-dim hover:text-gold p-1 transition-colors"
                title="Ver cupons disponíveis"
              >
                <svg className={`w-4 h-4 transition-transform ${isCouponDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {couponCode && (
                <button 
                  onClick={() => {
                    setCouponCode("");
                    setCouponMsg(null);
                    setActiveCoupon(null);
                  }}
                  className="text-warm-dim hover:text-red-400 p-1 mr-1 transition-colors"
                  title="Remover cupom"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleValidateCoupon}
                disabled={couponValidating || !couponCode.trim()}
                className="bg-gold/10 hover:bg-gold/20 text-gold-shine px-4 py-1.5 rounded text-sm font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {couponValidating ? "..." : "Aplicar"}
              </button>
            </div>
            {couponMsg && (
              <p className={`mt-2 text-sm font-bold ${couponMsg.type === 'success' ? 'text-roots-green' : 'text-red-400'}`}>
                {couponMsg.text}
              </p>
            )}
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
                  {item.description.split(/(\[Ascendente\]|\[Ancestral\]|\[Celeste\])/g).map((part, i) => {
                    if (part === "[Ascendente]") return <span key={i} className="text-roots-green font-bold">{part}</span>;
                    if (part === "[Ancestral]") return <span key={i} className="text-leaf-light font-bold">{part}</span>;
                    if (part === "[Celeste]") return <span key={i} className="text-cyan-400 font-bold">{part}</span>;
                    return part;
                  })}
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
                
                <div className="relative z-10 mb-4">
                  <button 
                    onClick={() => handleOpenPreview(currentItem.id, 'label' in currentItem ? `${item.name} - ${currentItem.label}` : item.name)}
                    className="text-xs text-gold/80 hover:text-gold transition-colors underline decoration-gold/30 hover:decoration-gold/80"
                  >
                    Ver Benefícios Detalhados
                  </button>
                </div>

                {/* Price & CTA */}
                <div className="relative z-10 mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    {(() => {
                      let displayPrice = currentItem.price;
                      let oldPrice = currentItem.originalPrice;
                      
                      if (activeCoupon) {
                        const isEligible = !activeCoupon.eligibleItems || activeCoupon.eligibleItems.split(",").includes(item.id) || activeCoupon.eligibleItems.split(",").includes(currentItem.id);
                        if (isEligible) {
                          const newRawPrice = currentItem.rawPrice * (1 - activeCoupon.discountPct / 100);
                          displayPrice = `R$ ${newRawPrice.toFixed(2).replace('.', ',')}`;
                          oldPrice = currentItem.originalPrice || currentItem.price;
                        }
                      }
                      
                      return (
                        <>
                          <span className="font-cinzel font-black text-2xl text-gradient-gold">
                            {displayPrice}
                          </span>
                          {oldPrice && (
                            <span className="text-sm text-red-400/80 line-through font-inter">
                              {oldPrice}
                            </span>
                          )}
                        </>
                      );
                    })()}
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

      {/* MODAL DE PREVIEW DOS BENEFÍCIOS */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-wood border-2 border-gold/40 rounded-xl shadow-2xl shadow-gold/20 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden relative">
            
            {/* Header Modal */}
            <div className="p-4 sm:p-6 border-b border-gold/20 flex justify-between items-center bg-black/20">
              <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-gold-shine uppercase tracking-wide">
                Benefícios: {previewProductName}
              </h2>
              <button 
                onClick={() => setPreviewModalOpen(false)}
                className="text-warm-dim hover:text-warm transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Content Modal */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {previewLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-gold">
                  <div className="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
                  <p className="font-cinzel text-sm animate-pulse uppercase tracking-widest">Carregando pergaminhos...</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-gold max-w-none font-inter text-warm-light/90 prose-headings:font-cinzel prose-headings:text-gold prose-img:rounded-lg prose-img:border prose-img:border-gold/20 prose-a:text-gold-light hover:prose-a:text-gold prose-strong:text-gold-shine text-sm sm:text-base">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {previewContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gold/20 bg-black/40 flex justify-end">
              <button 
                onClick={() => setPreviewModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-wood-light/20 text-warm hover:bg-wood-light/40 border border-gold/10 hover:border-gold/40 transition-all font-inter text-sm"
              >
                Fechar
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* MODAL DE CONSENTIMENTO LGPD E TERMOS */}
      <CheckoutConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        loading={isCheckingOut}
        onConfirm={(hideNick) => {
          if (consentProductId && playerNick && playerUuid) {
            proceedToCheckout(consentProductId, playerNick, playerUuid, hideNick);
          }
        }}
      />

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
