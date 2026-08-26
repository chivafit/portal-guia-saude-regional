"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

const whatsappNumber = "5537999474443";

export function CommercialProposalForm() {
  const [consent, setConsent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    const data = new FormData(event.currentTarget);
    const message = `Olá! Conheci as opções de divulgação pelo site do Guia Saúde e gostaria de receber uma proposta.\n\nNome: ${data.get("name")}\nWhatsApp: ${data.get("phone")}\nProfissão ou empresa: ${data.get("business")}\nCidade: ${data.get("city")}\nFormato de interesse: ${data.get("format")}\nO que desejo divulgar: ${data.get("details") || ""}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <form className="commercial-proposal-form" onSubmit={submit}>
    <label>Nome*<input name="name" required autoComplete="name" /></label>
    <label>WhatsApp*<input name="phone" required type="tel" autoComplete="tel" /></label>
    <label>Profissão, empresa ou marca*<input name="business" required /></label>
    <label>Cidade*<input name="city" required defaultValue="Piumhi" /></label>
    <label>Formato de interesse*<select name="format" required defaultValue=""><option value="" disabled>Selecione</option><option>Perfil em destaque</option><option>Banner no portal</option><option>Conteúdo patrocinado</option><option>Podcast</option><option>Revista</option><option>Ainda não sei</option></select></label>
    <label className="commercial-proposal-details">Conte brevemente o que você deseja divulgar<textarea name="details" rows={3} /></label>
    <label className="commercial-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /> Autorizo o contato do Guia Saúde sobre esta solicitação.</label>
    <button type="submit" disabled={!consent}>Solicitar proposta <ArrowRight size={16} /></button>
  </form>;
}
