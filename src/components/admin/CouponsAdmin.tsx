import React, { useState, useEffect } from "react";

export default function CouponsAdmin() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [code, setCode] = useState("");
  const [discountPct, setDiscountPct] = useState("");
  const [eligibleItems, setEligibleItems] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const res = await fetch("/api/admin/coupons");
    if (res.ok) setCoupons(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? \`/api/admin/coupons/\${editingId}\` : "/api/admin/coupons";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, discountPct, eligibleItems: eligibleItems || null, isActive }),
      });
      if (res.ok) {
        setCode("");
        setDiscountPct("");
        setEligibleItems("");
        setIsActive(true);
        setEditingId(null);
        fetchCoupons();
        alert(editingId ? "Cupom atualizado!" : "Cupom criado!");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar cupom");
      }
    } catch {
      alert("Erro de conexão");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (c: any) => {
    setEditingId(c.id);
    setCode(c.code);
    setDiscountPct(c.discountPct.toString());
    setEligibleItems(c.eligibleItems || "");
    setIsActive(c.isActive);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apagar cupom permanentemente?")) return;
    try {
      const res = await fetch(\`/api/admin/coupons/\${id}\`, { method: "DELETE" });
      if (res.ok) fetchCoupons();
    } catch {}
  };

  const toggleStatus = async (c: any) => {
    try {
      const res = await fetch(\`/api/admin/coupons/\${c.id}\`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...c, isActive: !c.isActive }),
      });
      if (res.ok) fetchCoupons();
    } catch {}
  };

  return (
    <div className="space-y-8">
      <div className="medieval-panel p-6">
        <h2 className="text-gold font-cinzel mb-4">
          {editingId ? "Editar Cupom" : "Novo Cupom"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Código (ex: LANCAMENTO20)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
              className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none uppercase"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Desconto (%) (ex: 15)"
              value={discountPct}
              onChange={(e) => setDiscountPct(e.target.value)}
              required
              className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-warm-dim text-xs mb-1 block">IDs Elegíveis (Separados por vírgula. Deixe em branco para todos os itens)</label>
            <input
              type="text"
              placeholder="Ex: raiz_ascendente,chave_rara"
              value={eligibleItems}
              onChange={(e) => setEligibleItems(e.target.value)}
              className="w-full bg-black/40 border border-gold/20 rounded px-4 py-2 text-warm focus:border-gold/50 focus:outline-none font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-gold w-4 h-4"
            />
            <label htmlFor="isActive" className="text-warm-light cursor-pointer">Cupom Ativo?</label>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={isSubmitting} className="btn-primary px-6 py-2">
              {isSubmitting ? "Salvando..." : "Salvar Cupom"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setCode("");
                  setDiscountPct("");
                  setEligibleItems("");
                  setIsActive(true);
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
        {coupons.map((c) => (
          <div key={c.id} className="medieval-panel p-4 flex justify-between items-center group">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-warm-light font-bold font-mono text-lg">{c.code}</h3>
                <span className="text-roots-green font-bold bg-roots-green/10 px-2 py-0.5 rounded text-sm">-{c.discountPct}%</span>
                {!c.isActive && <span className="text-red-400 text-xs border border-red-400/30 px-2 rounded">Inativo</span>}
              </div>
              <p className="text-warm-dim text-xs mt-1">Elegível: {c.eligibleItems || "Todos os itens da loja"}</p>
            </div>
            <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button onClick={() => toggleStatus(c)} className="p-2 hover:bg-gold/20 rounded text-gold-light text-sm">
                {c.isActive ? "Desativar" : "Ativar"}
              </button>
              <button onClick={() => handleEdit(c)} className="p-2 hover:bg-gold/20 rounded text-gold">Editar</button>
              <button onClick={() => handleDelete(c.id)} className="p-2 hover:bg-red-500/20 rounded text-red-400">Apagar</button>
            </div>
          </div>
        ))}
        {coupons.length === 0 && <p className="text-warm-dim text-center py-4">Nenhum cupom criado.</p>}
      </div>
    </div>
  );
}
