"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type SuggestionOption = {
  id: string;
  label: string;
  order: number;
  _count: { votes: number };
};

type Suggestion = {
  id: string;
  title: string;
  description: string | null;
  type: 'updown' | 'poll';
  status: 'open' | 'reviewing' | 'approved' | 'rejected' | 'cancelled' | 'implemented';
  createdAt: string;
  options: SuggestionOption[];
  totalVotes: number;
  upVotes?: number;
  downVotes?: number;
};

const statusConfig = {
  open: { label: "Aberta", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  reviewing: { label: "Em Análise", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  approved: { label: "Aprovada", color: "text-leaf-light bg-leaf-light/10 border-leaf-light/20" },
  rejected: { label: "Recusada", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  cancelled: { label: "Cancelada", color: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
  implemented: { label: "Implementada", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
};

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  // Auth state
  const [playerNick, setPlayerNick] = useState<string | null>(null);
  const [playerUuid, setPlayerUuid] = useState<string | null>(null);
  const [showNickModal, setShowNickModal] = useState(false);
  const [nickInput, setNickInput] = useState("");
  const [nickError, setNickError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Voting state (para saber em qual ele clicou antes de pedir nick)
  const [pendingVote, setPendingVote] = useState<{ id: string, type: string, optionId?: string } | null>(null);
  
  // Rastrear em quais ele ja votou nesta sessao/historico local
  const [votedIds, setVotedIds] = useState<Record<string, { type?: string, optionId?: string }>>({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Tenta recuperar o nick do localStorage
    const storedNick = localStorage.getItem("roots_nick");
    const storedUuid = localStorage.getItem("roots_uuid");
    if (storedNick && storedUuid) {
      setPlayerNick(storedNick);
      setPlayerUuid(storedUuid);
    }

    // Tenta recuperar historico de votos local (para UI rapida)
    const storedVotes = storedUuid ? localStorage.getItem(`roots_votes_${storedUuid}`) : null;
    if (storedVotes) {
      try { setVotedIds(JSON.parse(storedVotes)); } catch {}
    } else {
      const oldVotes = localStorage.getItem("roots_votes");
      if (oldVotes) { try { setVotedIds(JSON.parse(oldVotes)); } catch {} }
    }

    fetchSuggestions('all');
  }, []);

  const fetchSuggestions = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/suggestions?status=${status}&sort=votes`);
      if (res.ok) {
        setSuggestions(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    fetchSuggestions(tab);
  };

  const handleVerifyNick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickInput.trim()) return;

    setIsVerifying(true);
    setNickError("");

    try {
      const res = await fetch(`/api/player?nick=${nickInput}`);
      const data = await res.json();

      if (data.error) {
        setNickError("Jogador não encontrado ou erro na API.");
      } else {
        const nick = data.name;
        const uuid = data.uuid;
        
        setPlayerNick(nick);
        setPlayerUuid(uuid);
        localStorage.setItem("roots_nick", nick);
        localStorage.setItem("roots_uuid", uuid);
        
        const specificVotes = localStorage.getItem(`roots_votes_${uuid}`);
        if (specificVotes) {
          try { setVotedIds(JSON.parse(specificVotes)); } catch {}
        } else {
          setVotedIds({});
        }
        
        setShowNickModal(false);

        // Se tinha um voto pendente, executa agora
        if (pendingVote) {
          executeVote(pendingVote.id, pendingVote.type, pendingVote.optionId, nick, uuid);
          setPendingVote(null);
        }
      }
    } catch {
      setNickError("Erro ao verificar jogador.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVoteClick = (suggestionId: string, voteType: string, optionId?: string) => {
    if (!playerNick || !playerUuid) {
      setPendingVote({ id: suggestionId, type: voteType, optionId });
      setShowNickModal(true);
      return;
    }

    // Se ja votou, poderia ter logica para remover o voto, mas no MVP apenas previnimos click repetido se já soubermos.
    if (votedIds[suggestionId]) {
      toast.error("Você já votou nesta sugestão!");
      return;
    }

    executeVote(suggestionId, voteType, optionId, playerNick, playerUuid);
  };

  const executeVote = async (suggestionId: string, voteType: string, optionId: string | undefined, nick: string, uuid: string) => {
    try {
      const res = await fetch(`/api/suggestions/${suggestionId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerNick: nick, playerUuid: uuid, voteType, optionId })
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          // Já votou no servidor mas nao tinhamos no local storage
          const newVoted = { ...votedIds, [suggestionId]: { type: voteType, optionId } };
          setVotedIds(newVoted);
          localStorage.setItem(`roots_votes_${uuid}`, JSON.stringify(newVoted));
        }
        toast.error(data.error || "Erro ao computar voto.");
        return;
      }

      // Sucesso - atualiza UI localmente para refletir imediatamente sem refetch completo
      const newVoted = { ...votedIds, [suggestionId]: { type: voteType, optionId } };
      setVotedIds(newVoted);
      localStorage.setItem(`roots_votes_${uuid}`, JSON.stringify(newVoted));

      setSuggestions(prev => prev.map(sug => {
        if (sug.id !== suggestionId) return sug;
        
        const newSug = { ...sug, totalVotes: sug.totalVotes + 1 };
        
        if (sug.type === 'updown') {
          if (voteType === 'up') newSug.upVotes = (newSug.upVotes || 0) + 1;
          if (voteType === 'down') newSug.downVotes = (newSug.downVotes || 0) + 1;
        } else if (sug.type === 'poll' && optionId) {
          newSug.options = sug.options.map(opt => 
            opt.id === optionId ? { ...opt, _count: { votes: opt._count.votes + 1 } } : opt
          );
        }
        return newSug;
      }));

    } catch {
      console.error("Erro ao votar");
      toast.error("Erro ao votar.");
    }
  };

  return (
    <main className="min-h-screen pt-[120px] pb-24 relative selection:bg-gold/30">
      {/* Backgrounds */}
      <div className="fixed inset-0 bg-[#0A0D0A] -z-20" />
      <div 
        className="fixed inset-0 -z-10 opacity-30 mix-blend-overlay bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-islands.webp')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-deep/40 via-dark-wood/80 to-dark-wood opacity-90" />
      <div className="fixed inset-0 -z-10 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-warm-dim hover:text-gold transition-colors font-inter text-sm mb-8 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para Início
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-cinzel font-black text-3xl sm:text-4xl md:text-5xl text-gold-shine uppercase tracking-wider mb-4 drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
            Sugestões da Comunidade
          </h1>
          <p className="text-warm/80 font-inter max-w-2xl mx-auto text-sm sm:text-base">
            Ajude a moldar o futuro do RootsSky! Vote nas ideias que você quer ver no servidor.
            Apenas 1 voto por jogador em cada sugestão.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'open', label: 'Abertas' },
            { id: 'approved', label: 'Aprovadas' },
            { id: 'implemented', label: 'Implementadas' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded border font-inter text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-gold/10 border-gold/40 text-gold shadow-[0_0_10px_rgba(212,175,55,0.1)]' 
                  : 'bg-dark-wood/50 border-white/5 text-warm-dim hover:bg-white/5 hover:text-warm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
          </div>
        ) : suggestions.length === 0 ? (
          <div className="medieval-panel p-10 text-center">
            <h3 className="font-cinzel text-xl text-gold mb-2">Nenhuma sugestão</h3>
            <p className="text-warm-dim font-inter">Não encontramos nenhuma sugestão para esta categoria no momento.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {suggestions.map(sug => {
              const statusConf = statusConfig[sug.status] || statusConfig.open;
              const hasVoted = votedIds[sug.id];

              return (
                <div key={sug.id} className="medieval-panel p-5 sm:p-6 transition-all hover:border-gold/30">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-outfit font-bold text-xl text-gold-shine mb-2 group-hover:text-white transition-colors">
                        {sug.title}
                      </h3>
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${statusConf.color}`}>
                        {statusConf.label}
                      </span>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-warm-dim font-inter mb-1">
                        {new Date(sug.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm font-bold text-warm bg-black/30 px-3 py-1 rounded border border-white/5">
                        {sug.totalVotes} votos
                      </div>
                    </div>
                  </div>

                  {sug.description && (
                    <div className="text-warm/80 font-inter text-sm mb-6 whitespace-pre-wrap bg-black/20 p-4 rounded border border-white/5 prose prose-invert prose-gold max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {sug.description}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Votação Up/Down */}
                  {sug.type === 'updown' && (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleVoteClick(sug.id, 'up')}
                        disabled={sug.status !== 'open' || !!hasVoted}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all font-bold ${
                          hasVoted?.type === 'up' 
                            ? 'bg-leaf-light/20 border-leaf-light/50 text-leaf-light' 
                            : 'bg-dark-wood/80 border-white/5 text-warm hover:border-leaf-light/50 hover:text-leaf-light hover:bg-leaf-light/10 disabled:opacity-50 disabled:hover:border-white/5 disabled:hover:text-warm disabled:hover:bg-dark-wood/80'
                        }`}
                      >
                        <ThumbsUp size={18} className={hasVoted?.type === 'up' ? 'fill-leaf-light/20' : ''} /> {sug.upVotes || 0}
                      </button>
                      <button 
                        onClick={() => handleVoteClick(sug.id, 'down')}
                        disabled={sug.status !== 'open' || !!hasVoted}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all font-bold ${
                          hasVoted?.type === 'down' 
                            ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                            : 'bg-dark-wood/80 border-white/5 text-warm hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50 disabled:hover:border-white/5 disabled:hover:text-warm disabled:hover:bg-dark-wood/80'
                        }`}
                      >
                        <ThumbsDown size={18} className={hasVoted?.type === 'down' ? 'fill-red-500/20' : ''} /> {sug.downVotes || 0}
                      </button>
                    </div>
                  )}

                  {/* Votação Poll */}
                  {sug.type === 'poll' && (
                    <div className="space-y-3">
                      {sug.options.map(opt => {
                        const optVotes = opt._count.votes;
                        const percentage = sug.totalVotes > 0 ? Math.round((optVotes / sug.totalVotes) * 100) : 0;
                        const isVotedOption = hasVoted?.optionId === opt.id;

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleVoteClick(sug.id, 'poll', opt.id)}
                            disabled={sug.status !== 'open' || !!hasVoted}
                            className={`relative w-full text-left overflow-hidden rounded border transition-all ${
                              isVotedOption
                                ? 'border-gold bg-gold/5'
                                : 'border-white/5 bg-dark-wood/80 hover:border-gold/30 disabled:opacity-70 disabled:hover:border-white/5'
                            }`}
                          >
                            {/* Barra de progresso visual */}
                            <div 
                              className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                                isVotedOption ? 'bg-gold/20' : 'bg-white/5'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                            
                            <div className="relative z-10 flex justify-between items-center px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isVotedOption ? 'border-gold' : 'border-white/20'
                                }`}>
                                  {isVotedOption && <div className="w-2 h-2 rounded-full bg-gold" />}
                                </div>
                                <span className={`font-inter font-medium ${isVotedOption ? 'text-gold' : 'text-warm'}`}>
                                  {opt.label}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-warm-dim">
                                {percentage}% <span className="opacity-50 font-normal text-xs ml-1">({optVotes})</span>
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Nickname */}
      {showNickModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="medieval-panel p-6 sm:p-8 max-w-sm w-full animate-slide-up relative">
            <button 
              onClick={() => { setShowNickModal(false); setPendingVote(null); }}
              className="absolute top-4 right-4 text-warm-dim hover:text-white"
            >
              ✕
            </button>
            <h3 className="font-cinzel text-xl text-gold mb-2 text-center">Identifique-se</h3>
            <p className="text-warm-dim font-inter text-sm text-center mb-6">
              Para votar, digite seu nick original ou pirata do servidor. Só é permitido 1 voto por jogador.
            </p>
            
            <form onSubmit={handleVerifyNick} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={nickInput}
                  onChange={(e) => setNickInput(e.target.value)}
                  placeholder="Seu Nick no Minecraft"
                  className="w-full bg-black/40 border border-gold/20 rounded-lg px-4 py-3 text-warm font-inter placeholder:text-warm-dim/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                  required
                />
                {nickError && <p className="text-red-400 text-xs mt-2">{nickError}</p>}
              </div>
              
              <button 
                type="submit" 
                disabled={isVerifying || !nickInput.trim()}
                className="btn-premium w-full flex justify-center items-center py-3"
              >
                {isVerifying ? (
                  <div className="w-5 h-5 border-2 border-dark-wood/20 border-t-dark-wood rounded-full animate-spin" />
                ) : (
                  "Confirmar e Votar"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
