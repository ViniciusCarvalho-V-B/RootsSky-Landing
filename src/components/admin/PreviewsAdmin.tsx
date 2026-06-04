import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { storeItems } from "@/lib/catalog";
import { toast } from "react-hot-toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

const allCatalogItems = [
  ...storeItems.ranks.map(cat => cat.options ? cat.options.map(o => ({ id: o.id, name: `${cat.name} - ${o.label}` })) : [{ id: cat.id, name: cat.name }]).flat(),
  ...storeItems.keys.map(cat => cat.options ? cat.options.map(o => ({ id: o.id, name: `${cat.name} - ${o.label}` })) : [{ id: cat.id, name: cat.name }]).flat()
];

export default function PreviewsAdmin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previews, setPreviews] = useState<any[]>([]);
  const [productId, setProductId] = useState(allCatalogItems[0]?.id || "");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPreviews();
  }, []);

  const fetchPreviews = async () => {
    const res = await fetch("/api/admin/previews");
    if (res.ok) setPreviews(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = "/api/admin/previews";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, content }),
      });
      if (res.ok) {
        setContent("");
        setEditingId(null);
        fetchPreviews();
        toast.success(editingId ? "Benefícios atualizados!" : "Benefícios criados!");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao salvar benefícios");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setProductId(p.productId);
    setContent(p.content);
    setViewMode("edit");
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/previews/${id}`, { method: "DELETE" });
      if (res.ok) fetchPreviews();
    } catch {}
  };

  return (
    <div className="space-y-8">
      <div className="medieval-panel p-6">
        <h2 className="text-gold font-cinzel mb-4">
          {editingId ? "Editar Benefícios (Preview)" : "Novos Benefícios (Preview)"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-warm-dim text-xs mb-1 block">Produto / Rank</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              disabled={!!editingId}
              className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none"
            >
              {allCatalogItems.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="border border-gold/20 rounded overflow-hidden">
            <div className="flex bg-black/40 border-b border-gold/20">
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-cinzel font-bold transition-colors ${viewMode === 'edit' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-warm-dim hover:text-warm'}`}
                onClick={() => setViewMode("edit")}
              >
                Escrever (Markdown)
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-cinzel font-bold transition-colors ${viewMode === 'preview' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-warm-dim hover:text-warm'}`}
                onClick={() => setViewMode("preview")}
              >
                Visualizar
              </button>
            </div>
            
            {viewMode === "edit" ? (
              <textarea
                placeholder="Conteúdo (suporta Markdown e Links de Imagem)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="w-full bg-black/20 p-4 text-warm focus:outline-none font-mono text-sm"
              />
            ) : (
              <div className="bg-black/20 p-4 min-h-[300px] text-warm font-inter prose prose-invert prose-gold max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || "*Nada para visualizar...*"}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary px-6 py-2">
              {isSubmitting ? "Salvando..." : "Salvar Benefícios"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setProductId(allCatalogItems[0]?.id || "");
                  setContent("");
                  setViewMode("edit");
                }}
                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-6 py-2 rounded-lg font-cinzel font-bold text-sm transition-colors border border-red-500/20"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid gap-4">
        {previews.map((p) => {
          const catItem = allCatalogItems.find(i => i.id === p.productId);
          return (
            <div key={p.id} className="medieval-panel p-4 flex justify-between items-start group">
              <div>
                <h3 className="text-warm-light font-bold">Produto: {catItem ? catItem.name : p.productId}</h3>
                <p className="text-xs text-warm-dim mt-1 truncate max-w-md">{p.content.substring(0, 80)}...</p>
              </div>
              <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <button onClick={() => {
                  handleEdit(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="text-gold hover:text-gold-shine px-2 py-1 bg-gold/10 rounded transition-colors text-xs font-bold">
                  Editar
                </button>
                <button onClick={() => setDeletingId(p.id)} className="text-red-400 hover:text-red-300 px-2 py-1 bg-red-400/10 rounded transition-colors text-xs font-bold">
                  Apagar
                </button>
              </div>
            </div>
          );
        })}
        {previews.length === 0 && <p className="text-warm-dim text-center py-4">Nenhum preview criado.</p>}
      </div>

      <ConfirmModal 
        isOpen={!!deletingId}
        title="Apagar Benefícios"
        message="Tem certeza que deseja apagar estes benefícios permanentemente?"
        onConfirm={() => {
          if (deletingId) handleDelete(deletingId);
          setDeletingId(null);
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
