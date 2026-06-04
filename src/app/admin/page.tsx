"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, LogOut, Plus, Star, Zap, Edit2, ImagePlus, ChevronLeft } from 'lucide-react';
import PagesAdmin from '@/components/admin/PagesAdmin';
import CouponsAdmin from '@/components/admin/CouponsAdmin';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<'updates' | 'suggestions' | 'pages' | 'coupons'>('updates');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [updates, setUpdates] = useState<any[]>([]);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("Admin");
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [editingUpdateId, setEditingUpdateId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [sugTitle, setSugTitle] = useState("");
  const [sugDesc, setSugDesc] = useState("");
  const [sugType, setSugType] = useState<'updown' | 'poll'>('updown');
  const [sugOptions, setSugOptions] = useState([{ label: "" }, { label: "" }]);
  const [isSubmittingSug, setIsSubmittingSug] = useState(false);
  const [editingSugId, setEditingSugId] = useState<string | null>(null);

  useEffect(() => {
    // Verificar autenticacao na montagem
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      // Tentar buscar algo que requer auth (ex: postar ou apagar algo ficticio falharia com 401)
      // Como o GET de updates é publico, vamos fazer um GET de suggestions (que é publico) mas 
      // precisaremos de um endpoint check auth. Como nao criamos endpoint de check GET, 
      // vamos apenas assumir false se não houver cookie. O cookie é http-only, então não podemos
      // ler via JS. O jeito é testar se conseguimos realizar uma acao de admin, 
      // ou criar a variavel isAuthenticated controlada pelo login.
      // Para o MVP: só exibimos o painel se logar na sessao atual, ou adicionamos 
      // um simples dummy request para checar (ex: tentar apagar um ID 'check' vai dar 401 se nao logado)
      const res = await fetch('/api/admin/updates/check', { method: 'DELETE' });
      if (res.status !== 401) {
        setIsAuthenticated(true);
        fetchData();
      }
    } catch {
      // ignore
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Senha incorreta");
      }
    } catch {
      setLoginError("Erro de conexão");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
    } catch {}
  };

  const fetchData = () => {
    fetchUpdates();
    fetchSuggestions();
  };

  // --- UPDATES LOGIC ---
  const fetchUpdates = async () => {
    const res = await fetch('/api/admin/updates');
    if (res.ok) setUpdates(await res.json());
  };

  const handleCreateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingUpdate(true);
    try {
      const url = editingUpdateId ? `/api/admin/updates/${editingUpdateId}` : '/api/admin/updates';
      const method = editingUpdateId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updateTitle, content: updateContent, author: updateAuthor })
      });
      if (res.ok) {
        setUpdateTitle("");
        setUpdateContent("");
        setEditingUpdateId(null);
        fetchUpdates();
        alert(editingUpdateId ? "Atualização editada!" : "Atualização publicada!");
      } else {
        alert("Erro ao publicar");
      }
    } catch {
      alert("Erro de conexão");
    } finally {
      setIsSubmittingUpdate(false);
    }
  };

  const cancelEditUpdate = () => {
    setUpdateTitle("");
    setUpdateContent("");
    setEditingUpdateId(null);
  };

  const handleDeleteUpdate = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar esta atualização?")) return;
    try {
      const res = await fetch(`/api/admin/updates/${id}`, { method: 'DELETE' });
      if (res.ok) fetchUpdates();
    } catch {}
  };

  // --- SUGGESTIONS LOGIC ---
  const fetchSuggestions = async () => {
    const res = await fetch('/api/suggestions?status=all');
    if (res.ok) setSuggestions(await res.json());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSug = (sug: any) => {
    setEditingSugId(sug.id);
    setSugTitle(sug.title);
    setSugDesc(sug.description || "");
    setSugType(sug.type);
    if (sug.type === 'poll' && sug.options) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSugOptions(sug.options.map((o:any) => ({ label: o.label })));
    }
  };

  const cancelEditSug = () => {
    setEditingSugId(null);
    setSugTitle("");
    setSugDesc("");
    setSugType('updown');
    setSugOptions([{ label: "" }, { label: "" }]);
  };

  const handleDeleteSug = async (id: string) => {
    if (!confirm("Tem certeza que deseja apagar esta sugestão/enquete?")) return;
    try {
      const res = await fetch(`/api/suggestions/${id}`, { method: 'DELETE' });
      if (res.ok) fetchSuggestions();
    } catch {}
  };

  const handleCreateSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sugType === 'poll') {
      const validOptions = sugOptions.filter(o => o.label.trim() !== '');
      if (validOptions.length < 2) {
        alert("Enquetes precisam de pelo menos 2 opções válidas.");
        return;
      }
    }

    setIsSubmittingSug(true);
    try {
      const url = editingSugId ? `/api/suggestions/${editingSugId}` : '/api/suggestions';
      const method = editingSugId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: sugTitle, 
          description: sugDesc, 
          type: sugType,
          options: sugType === 'poll' ? sugOptions.filter(o => o.label.trim() !== '') : undefined
        })
      });
      
      if (res.ok) {
        setSugTitle("");
        setSugDesc("");
        setSugOptions([{ label: "" }, { label: "" }]);
        setEditingSugId(null);
        fetchSuggestions();
        alert(editingSugId ? "Sugestão editada!" : "Sugestão/Enquete criada!");
      } else {
        const d = await res.json();
        alert(d.error || "Erro ao criar");
      }
    } catch {
      alert("Erro de conexão");
    } finally {
      setIsSubmittingSug(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/suggestions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchSuggestions();
    } catch {}
  };

  // --- RENDER ---
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-[#0D0A07] flex items-center justify-center">Verificando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-12 flex items-center justify-center relative bg-[#0D0A07]">
        <div className="fixed inset-0 -z-10 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
        <div className="medieval-panel p-8 max-w-sm w-full mx-4">
          <div className="flex justify-center mb-6">
            <Image src="/svg/logo-rootssky.svg" alt="Logo" width={150} height={50} />
          </div>
          <h2 className="font-cinzel text-xl text-gold text-center mb-6">Acesso Restrito</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Senha de Administrador"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-gold/20 rounded-lg px-4 py-3 text-warm focus:border-gold/50 focus:outline-none"
            />
            {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
            <button type="submit" className="btn-premium w-full flex justify-center py-3">
              Entrar
            </button>
          </form>
          <div className="mt-6 text-center">
             <Link href="/" className="text-warm-dim text-xs hover:text-gold">Voltar ao site</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 relative bg-[#0D0A07]">
      <div className="fixed inset-0 -z-10 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-warm-dim hover:text-gold font-inter text-sm">
            <ChevronLeft size={16} /> Voltar ao site
          </Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
            <LogOut size={16} /> Sair
          </button>
        </div>

        <h1 className="font-cinzel text-3xl text-gold-shine mb-8">Painel Administrativo</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gold/20 pb-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('updates')}
            className={`font-cinzel uppercase text-sm tracking-wider pb-2 px-2 transition-all whitespace-nowrap ${activeTab === 'updates' ? 'text-gold border-b-2 border-gold' : 'text-warm-dim hover:text-warm'}`}
          >
            Atualizações
          </button>
          <button 
            onClick={() => setActiveTab('suggestions')}
            className={`font-cinzel uppercase text-sm tracking-wider pb-2 px-2 transition-all whitespace-nowrap ${activeTab === 'suggestions' ? 'text-gold border-b-2 border-gold' : 'text-warm-dim hover:text-warm'}`}
          >
            Enquetes
          </button>
          <button 
            onClick={() => setActiveTab('pages')}
            className={`font-cinzel uppercase text-sm tracking-wider pb-2 px-2 transition-all whitespace-nowrap ${activeTab === 'pages' ? 'text-gold border-b-2 border-gold' : 'text-warm-dim hover:text-warm'}`}
          >
            Páginas
          </button>
          <button 
            onClick={() => setActiveTab('coupons')}
            className={`font-cinzel uppercase text-sm tracking-wider pb-2 px-2 transition-all whitespace-nowrap ${activeTab === 'coupons' ? 'text-gold border-b-2 border-gold' : 'text-warm-dim hover:text-warm'}`}
          >
            Cupons
          </button>
        </div>

        {/* --- TAB: PAGES --- */}
        {activeTab === 'pages' && <PagesAdmin />}

        {/* --- TAB: COUPONS --- */}
        {activeTab === 'coupons' && <CouponsAdmin />}

        {/* --- TAB: UPDATES --- */}
        {activeTab === 'updates' && (
          <div className="space-y-8">
            <div className="medieval-panel p-6">
              <h2 className="text-gold font-cinzel mb-4">
                {editingUpdateId ? "Editar Atualização" : "Nova Atualização"}
              </h2>

              {!editingUpdateId && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <button 
                    onClick={() => {
                      setUpdateTitle("Atualização de Conteúdo");
                      setUpdateContent("## 🌟 GRANDE ATUALIZAÇÃO: NOVA ERA\n\nAventureiros, os ventos mudaram! Uma nova expansão acaba de chegar nas ilhas celestes.\n\n![Nova Dugeon](https://minhas-imagens.com/dungeon.jpg)\n\n### ⚔️ Novas Funcionalidades\n- **Novo Sistema de Dungeons**: Explore ruínas antigas nas ilhas inferiores.\n- **Novos Itens Místicos**: Armaduras forjadas com lágrimas de ghast.\n\n### 🛠️ Balanceamento & Economia\n- O preço da _Cenoura Dourada_ na loja foi reduzido.\n- Spawners de Iron Golem agora têm tempo de recarga maior.\n\n### 🐛 Correções\n- Corrigido o bug onde a água desaparecia no bioma do Nether.\n\n[Assista ao Trailer da Atualização](https://youtube.com/...)");
                    }}
                    className="text-xs bg-gold/10 hover:bg-gold/20 text-gold px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                  >
                    <Star size={12} /> Preset: Grande Atualização
                  </button>
                  <button 
                    onClick={() => {
                      setUpdateTitle("Pequenos Ajustes");
                      setUpdateContent("### 🔧 Ajustes e Manutenção\n\nFizemos algumas correções rápidas para melhorar sua jogabilidade nas ilhas.\n\n- **Economia**: Ajustado o valor de venda das plantações (buff de 5%).\n- **Correção**: Jogadores não perdem mais itens ao cair no void com o pet ativo.\n- **Visual**: Nova cor para as tags de [VIP] e [MVP] no chat.");
                    }}
                    className="text-xs bg-cyan-900/40 hover:bg-cyan-900/60 text-cyan-400 px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
                  >
                    <Zap size={12} /> Preset: Ajustes Rápidos
                  </button>
                </div>
              )}

              <form onSubmit={handleCreateUpdate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  required
                  value={updateTitle}
                  onChange={e => setUpdateTitle(e.target.value)}
                  className="w-full bg-black/40 border border-gold/20 rounded p-3 text-warm focus:border-gold/50 focus:outline-none font-outfit"
                />
                <div className="relative">
                  <textarea
                    placeholder="Conteúdo (Aceita Markdown para negrito, vídeos, etc)..."
                    required
                    rows={4}
                    value={updateContent}
                    onChange={e => setUpdateContent(e.target.value)}
                    className="w-full bg-black/40 border border-gold/20 rounded p-3 text-warm focus:border-gold/50 focus:outline-none font-inter resize-y pb-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setUpdateContent(prev => prev + '\n\n![Sua Imagem Aqui](https://link-da-imagem.com/img.jpg)\n')}
                    className="absolute bottom-3 left-3 text-warm-dim hover:text-gold transition-colors flex items-center gap-1 text-xs"
                    title="Adicionar Imagem/Vídeo (Markdown)"
                  >
                    <ImagePlus size={14} /> Anexar Imagem (URL)
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="Autor"
                    value={updateAuthor}
                    onChange={e => setUpdateAuthor(e.target.value)}
                    className="bg-black/40 border border-gold/20 rounded p-2 text-sm text-warm focus:border-gold/50 focus:outline-none w-48"
                  />
                  <div className="flex gap-2">
                    {editingUpdateId && (
                      <button type="button" onClick={cancelEditUpdate} className="bg-red-900/40 hover:bg-red-900/60 text-red-400 px-4 py-2 rounded text-sm transition-colors border border-red-500/20">
                        Cancelar
                      </button>
                    )}
                    <button type="submit" disabled={isSubmittingUpdate} className="btn-premium px-6 py-2">
                      {isSubmittingUpdate ? "Salvando..." : (editingUpdateId ? "Salvar Edição" : "Publicar")}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-warm-dim font-cinzel">Atualizações Publicadas</h3>
              {updates.length === 0 ? <p className="text-warm-dim/50 text-sm">Nenhuma atualização.</p> : null}
              {updates.map(u => (
                <div key={u.id} className="medieval-panel p-4 flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-gold font-bold">{u.title}</h4>
                    <p className="text-warm-dim text-sm mt-1 line-clamp-2">{u.content}</p>
                    <div className="text-xs text-warm-dim/50 mt-2">Por {u.author} em {new Date(u.createdAt).toLocaleString('pt-BR')}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => {
                      setEditingUpdateId(u.id);
                      setUpdateTitle(u.title);
                      setUpdateContent(u.content);
                      setUpdateAuthor(u.author);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} className="text-blue-400 hover:text-blue-300 p-2 bg-blue-400/10 rounded" title="Editar">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteUpdate(u.id)} className="text-red-400 hover:text-red-300 p-2 bg-red-400/10 rounded" title="Apagar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: SUGGESTIONS --- */}
        {activeTab === 'suggestions' && (
          <div className="space-y-8">
            <div className="medieval-panel p-6">
              <h2 className="text-gold font-cinzel mb-4">
                {editingSugId ? "Editar Sugestão/Enquete" : "Nova Sugestão (Para Votação)"}
              </h2>
              <form onSubmit={handleCreateSuggestion} className="space-y-4">
                <input
                  type="text"
                  placeholder="Título (ex: 'Nova Ilha de Mineração?')"
                  required
                  value={sugTitle}
                  onChange={e => setSugTitle(e.target.value)}
                  className="w-full bg-black/40 border border-gold/20 rounded p-3 text-warm focus:border-gold/50 focus:outline-none font-outfit"
                />
                <div className="relative">
                  <textarea
                    placeholder="Descrição opcional (aceita imagens)..."
                    rows={2}
                    value={sugDesc}
                    onChange={e => setSugDesc(e.target.value)}
                    className="w-full bg-black/40 border border-gold/20 rounded p-3 text-warm focus:border-gold/50 focus:outline-none font-inter resize-y pb-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setSugDesc(prev => prev + '\n\n![Exemplo de Sugestão](https://link-da-imagem.com/img.jpg)\n')}
                    className="absolute bottom-3 left-3 text-warm-dim hover:text-gold transition-colors flex items-center gap-1 text-xs"
                    title="Adicionar Imagem/Vídeo (Markdown)"
                  >
                    <ImagePlus size={14} /> Anexar Imagem (URL)
                  </button>
                </div>
                
                <div className="flex items-center gap-4 py-2 border-y border-white/5">
                  <label className="text-warm text-sm flex items-center gap-2">
                    <input type="radio" checked={sugType === 'updown'} onChange={() => !editingSugId && setSugType('updown')} disabled={!!editingSugId} /> 
                    Curtir / Não Curtir
                  </label>
                  <label className="text-warm text-sm flex items-center gap-2">
                    <input type="radio" checked={sugType === 'poll'} onChange={() => !editingSugId && setSugType('poll')} disabled={!!editingSugId} /> 
                    Enquete (Opções)
                  </label>
                </div>

                {sugType === 'poll' && (
                  <div className="space-y-2 bg-black/20 p-4 rounded border border-white/5">
                    <label className="text-warm-dim text-sm">Opções da Enquete:</label>
                    {sugOptions.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Opção ${i+1}`}
                          value={opt.label}
                          onChange={e => {
                            const newOpts = [...sugOptions];
                            newOpts[i].label = e.target.value;
                            setSugOptions(newOpts);
                          }}
                          className="flex-1 bg-black/40 border border-gold/20 rounded p-2 text-warm text-sm"
                        />
                        {sugOptions.length > 2 && (
                          <button type="button" onClick={() => setSugOptions(sugOptions.filter((_, idx) => idx !== i))} className="text-red-400 p-2">✕</button>
                        )}
                      </div>
                    ))}
                    {!editingSugId && (
                      <button type="button" onClick={() => setSugOptions([...sugOptions, {label: ""}])} className="text-gold text-sm flex items-center gap-1 mt-2">
                        <Plus size={14} /> Adicionar Opção
                      </button>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {editingSugId && (
                    <button type="button" onClick={cancelEditSug} className="bg-red-900/40 hover:bg-red-900/60 text-red-400 px-4 py-2 rounded text-sm transition-colors border border-red-500/20">
                      Cancelar
                    </button>
                  )}
                  <button type="submit" disabled={isSubmittingSug} className="btn-premium px-6 py-2">
                    {isSubmittingSug ? "Salvando..." : (editingSugId ? "Salvar Edição" : "Criar para Votação")}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-warm-dim font-cinzel">Gerenciar Sugestões</h3>
              {suggestions.length === 0 ? <p className="text-warm-dim/50 text-sm">Nenhuma sugestão.</p> : null}
              {suggestions.map(sug => (
                <div key={sug.id} className="medieval-panel p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gold font-bold">{sug.title}</h4>
                      <span className="text-xs bg-white/10 px-1.5 rounded text-warm-dim">{sug.type === 'updown' ? 'Up/Down' : 'Enquete'}</span>
                    </div>
                    <div className="text-xs text-warm-dim/70">
                      Total de Votos: {sug.totalVotes}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    <select 
                      value={sug.status} 
                      onChange={(e) => handleStatusChange(sug.id, e.target.value)}
                      className="bg-black/40 border border-gold/30 rounded p-1.5 text-sm text-warm focus:outline-none w-full sm:w-auto"
                    >
                      <option value="open">Aberta</option>
                      <option value="reviewing">Em Análise</option>
                      <option value="approved">Aprovada</option>
                      <option value="rejected">Recusada</option>
                      <option value="cancelled">Cancelada</option>
                      <option value="implemented">Implementada</option>
                    </select>
                    
                    <div className="flex gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                      <button onClick={() => {
                        handleEditSug(sug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="text-blue-400 hover:text-blue-300 p-2 bg-blue-400/10 rounded" title="Editar">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteSug(sug.id)} className="text-red-400 hover:text-red-300 p-2 bg-red-400/10 rounded" title="Apagar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
