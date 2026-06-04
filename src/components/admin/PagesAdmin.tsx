import React, { useState, useEffect } from "react";

export default function PagesAdmin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pages, setPages] = useState<any[]>([]);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await fetch("/api/admin/pages");
    if (res.ok) setPages(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/admin/pages/${editingId}` : "/api/admin/pages";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, content }),
      });
      if (res.ok) {
        setSlug("");
        setTitle("");
        setContent("");
        setEditingId(null);
        fetchPages();
        alert(editingId ? "Página atualizada!" : "Página criada!");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar página");
      }
    } catch {
      alert("Erro de conexão");
    } finally {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setSlug(p.slug);
    setTitle(p.title);
    setContent(p.content);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apagar página permanentemente?")) return;
    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      if (res.ok) fetchPages();
    } catch {}
  };

  return (
    <div className="space-y-8">
      <div className="medieval-panel p-6">
        <h2 className="text-gold font-cinzel mb-4">
          {editingId ? "Editar Página" : "Nova Página"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Slug (ex: regras, termos)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Título da Página"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Conteúdo (suporta Markdown)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none font-mono text-sm"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary px-6 py-2">
              {isSubmitting ? "Salvando..." : "Salvar Página"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setSlug("");
                  setTitle("");
                  setContent("");
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
        {pages.map((p) => (
          <div key={p.id} className="medieval-panel p-4 flex justify-between items-start group">
            <div>
              <h3 className="text-warm-light font-bold">{p.title} <span className="text-warm-dim text-xs ml-2">/{p.slug}</span></h3>
            </div>
            <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(p)} className="p-2 hover:bg-gold/20 rounded text-gold">Editar</button>
              <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-500/20 rounded text-red-400">Apagar</button>
            </div>
          </div>
        ))}
        {pages.length === 0 && <p className="text-warm-dim text-center py-4">Nenhuma página criada.</p>}
      </div>
    </div>
  );
}
