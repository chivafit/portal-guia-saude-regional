"use client";

import { useState } from "react";
import { ArrowRight, LockKeyhole, Phone, X } from "lucide-react";

export function ContactReveal({
  entityType, entitySlug, entityName, category, cityName, phone, whatsapp = "#",
}: {
  entityType: "professional" | "organization";
  entitySlug: string;
  entityName: string;
  category: string;
  cityName: string;
  phone: string;
  whatsapp?: string;
}) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ visitorName: "", visitorWhatsapp: "", visitorCity: cityName, interest: "Contato" });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, entityType, entitySlug, entityName, category, cityName, sourcePath: window.location.pathname, consent: true }),
    });
    if (!response.ok) {
      setError("Não foi possível liberar o contato. Verifique os campos.");
      return;
    }
    setRevealed(true);
  }

  return (
    <div className="contact-reveal">
      {revealed ? (
        <div className="revealed-contact">
          <span><Phone size={14} /> {phone}</span>
          {whatsapp !== "#" ? <a href={whatsapp} target="_blank" rel="noreferrer">Abrir WhatsApp <ArrowRight size={13} /></a> : null}
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)}><LockKeyhole size={14} /> Ver contato</button>
      )}
      {open && !revealed ? (
        <div className="lead-modal" role="dialog" aria-modal="true" aria-label="Liberar contato">
          <div className="lead-modal-card">
            <button className="lead-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar"><X size={17} /></button>
            <p className="eyebrow">Liberar contato</p>
            <h2>{entityName}</h2>
            <p>Informe seus dados para acessar o contato. O Guia Saúde registra essa solicitação para melhorar o portal e medir interesse pelos perfis.</p>
            <form onSubmit={submit}>
              <label>Nome<input required value={form.visitorName} onChange={event => setForm({ ...form, visitorName: event.target.value })} /></label>
              <label>WhatsApp<input required value={form.visitorWhatsapp} onChange={event => setForm({ ...form, visitorWhatsapp: event.target.value })} placeholder="(37) 99999-9999" /></label>
              <label>Cidade<input value={form.visitorCity} onChange={event => setForm({ ...form, visitorCity: event.target.value })} /></label>
              <label>Interesse<select value={form.interest} onChange={event => setForm({ ...form, interest: event.target.value })}><option>Contato</option><option>Consulta</option><option>Orçamento</option><option>Informação</option></select></label>
              <small>Ao continuar, você autoriza o Guia Saúde a armazenar estes dados para liberar o contato e registrar sua solicitação.</small>
              {error ? <span className="lead-error">{error}</span> : null}
              <button type="submit">Liberar contato <ArrowRight size={14} /></button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
