"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  entityType: string;
  entityName: string;
  category: string | null;
  cityName: string | null;
  visitorName: string;
  visitorWhatsapp: string;
  visitorCity: string | null;
  interest: string | null;
  sourcePath: string | null;
  createdAt: string;
};

export function LeadsManager() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [counters, setCounters] = useState({ total: 0, recent: 0, professional: 0, organization: 0 });

  useEffect(() => {
    let active = true;
    async function fetchLeads() {
      const response = await fetch("/api/admin/leads");
      if (!active) return;
      if (!response.ok) {
        setError("Não foi possível carregar os leads.");
        setLoading(false);
        return;
      }
      const data = await response.json();
      if (!active) return;
      const nextItems = (data.items ?? []) as Lead[];
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      setItems(nextItems);
      setCounters({
        total: nextItems.length,
        recent: nextItems.filter(item => new Date(item.createdAt).getTime() >= sevenDaysAgo).length,
        professional: nextItems.filter(item => item.entityType === "professional").length,
        organization: nextItems.filter(item => item.entityType === "organization").length,
      });
      setLoading(false);
    }
    void fetchLeads();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="cms leads-admin">
      <div className="admin-metrics">
        <span><b>{counters.total}</b>Leads</span>
        <span><b>{counters.recent}</b>Últimos 7 dias</span>
        <span><b>{counters.professional}</b>Profissionais</span>
        <span><b>{counters.organization}</b>Empresas</span>
      </div>
      <section className="cms-list leads-list">
        <div className="cms-list-head">
          <div>
            <small>INTERESSE COMERCIAL</small>
            <h2>Contatos liberados</h2>
          </div>
          <span>{items.length} registros</span>
        </div>
        {loading ? <p className="cms-empty">Carregando...</p> : null}
        {error ? <p className="cms-error">{error}</p> : null}
        {!loading && !items.length ? <p className="cms-empty">Nenhum contato liberado ainda.</p> : null}
        {items.map(item => (
          <article key={item.id} className="lead-card">
            <div>
              <small>{item.interest || "Contato"} · {item.cityName || "Regional"} · {item.entityType === "professional" ? "Profissional" : "Empresa"}</small>
              <h3>{item.visitorName}</h3>
              <p><strong>WhatsApp:</strong> {item.visitorWhatsapp}{item.visitorCity ? ` · ${item.visitorCity}` : ""}</p>
              <p><strong>Procurou:</strong> {item.entityName}{item.category ? ` · ${item.category}` : ""}</p>
              <p className="request-date">Registrado em {new Date(item.createdAt).toLocaleString("pt-BR")}{item.sourcePath ? ` · ${item.sourcePath}` : ""}</p>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
