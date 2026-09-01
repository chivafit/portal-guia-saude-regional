"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cities, organizations, professions } from "@/lib/data";
import { publicProfessionals } from "@/lib/public-directory";

const categories = ["Clínica multiprofissional", "Laboratório", "Diagnóstico por imagem", "Clínica odontológica", "Farmácia", "Ótica", "Estética e bem-estar", "Academia e atividade física", "Home care"];
type FormState = { entityType: "professional" | "organization"; profile: string; name: string; category: string; cityName: string; contactName: string; contactEmail: string; contactPhone: string; whatsapp: string; address: string; organization: string; website: string; instagram: string; services: string; message: string; privacy: boolean };

export function InclusionForm() {
  const searchParams = useSearchParams();
  const profileSlug = searchParams.get("perfil") ?? "";
  const requestedType = searchParams.get("tipo") === "organization" ? "organization" : "professional";
  const profile = useMemo(() => {
    if (!profileSlug) return null;
    return requestedType === "professional" ? publicProfessionals.find((item) => item.slug === profileSlug) ?? null : organizations.find((item) => item.slug === profileSlug) ?? null;
  }, [profileSlug, requestedType]);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>(() => ({
    entityType: requestedType, profile: profileSlug, name: profile?.name ?? "",
    category: profile?.category ?? (profile && "profession" in profile ? profile.profession : requestedType === "professional" ? "Médico" : "Clínica multiprofissional"),
    cityName: profile?.city ?? "", contactName: "", contactEmail: "", contactPhone: "", whatsapp: "",
    address: profile && "address" in profile ? profile.address : "", organization: profile && "organization" in profile ? profile.organization : "",
    website: profile && "website" in profile ? profile.website ?? "" : "", instagram: profile && "instagram" in profile ? profile.instagram ?? "" : "",
    services: profile?.services.join(", ") ?? "", message: "", privacy: false,
  }));
  const set = (patch: Partial<FormState>) => setForm((current) => ({ ...current, ...patch }));
  const options = form.entityType === "professional" ? professions : categories;
  const isUpdate = Boolean(profileSlug);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`${isUpdate ? "Atualização de perfil" : "Solicitação de inclusão"} — ${form.name}`);
    const body = encodeURIComponent([
      `Perfil no Guia Saúde: ${form.profile || "Novo cadastro"}`, `Tipo: ${form.entityType === "professional" ? "Profissional" : "Clínica, empresa ou serviço"}`,
      `Nome público: ${form.name}`, `Profissão ou categoria: ${form.category}`, `Cidade: ${form.cityName}`,
      form.entityType === "professional" ? `Local de atendimento: ${form.organization}` : "", `Endereço: ${form.address}`,
      `Telefone: ${form.contactPhone}`, `WhatsApp: ${form.whatsapp}`, `E-mail: ${form.contactEmail}`, `Site: ${form.website}`,
      `Instagram: ${form.instagram}`, `Especialidades ou serviços: ${form.services}`, `Responsável pelo envio: ${form.contactName}`, "", `Outras correções ou informações: ${form.message}`,
    ].filter(Boolean).join("\n"));
    window.location.href = `mailto:rmproguia@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  if (sent) return <div className="inclusion-success"><strong>Abra seu e-mail para enviar a atualização.</strong><p>Preparamos a mensagem com os dados do perfil para a revisão da equipe Guia Saúde.</p></div>;
  return <form className="inclusion-form" onSubmit={submit}>
    {isUpdate ? <div className="inclusion-profile-context"><strong>Atualização do perfil</strong><span>{profile?.name ?? profileSlug}</span></div> : <label>Tipo de cadastro<select value={form.entityType} onChange={(event) => set({ entityType: event.target.value as FormState["entityType"], category: event.target.value === "professional" ? "Médico" : "Clínica multiprofissional" })}><option value="professional">Profissional</option><option value="organization">Clínica, empresa ou serviço</option></select></label>}
    <label>{form.entityType === "professional" ? "Nome público do profissional" : "Nome da empresa ou serviço"}<input required value={form.name} onChange={(event) => set({ name: event.target.value })} /></label>
    <label>{form.entityType === "professional" ? "Profissão" : "Categoria"}<select value={form.category} onChange={(event) => set({ category: event.target.value })}>{options.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Cidade<select required value={form.cityName} onChange={(event) => set({ cityName: event.target.value })}><option value="">Selecione</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
    {form.entityType === "professional" ? <label>Clínica, consultório ou local de atendimento<input value={form.organization} onChange={(event) => set({ organization: event.target.value })} /></label> : null}
    <label>Endereço completo<input value={form.address} onChange={(event) => set({ address: event.target.value })} placeholder="Rua, número, bairro" /></label>
    <label>Telefone público<input required value={form.contactPhone} onChange={(event) => set({ contactPhone: event.target.value })} placeholder="(37) 99999-9999" inputMode="tel" /></label>
    <label>WhatsApp<input value={form.whatsapp} onChange={(event) => set({ whatsapp: event.target.value })} placeholder="(37) 99999-9999" inputMode="tel" /></label>
    <label>E-mail de contato<input required type="email" value={form.contactEmail} onChange={(event) => set({ contactEmail: event.target.value })} /></label>
    <label>Responsável pelo envio<input required value={form.contactName} onChange={(event) => set({ contactName: event.target.value })} /></label>
    <label>Site<input type="url" value={form.website} onChange={(event) => set({ website: event.target.value })} placeholder="https://" /></label>
    <label>Instagram<input value={form.instagram} onChange={(event) => set({ instagram: event.target.value })} placeholder="@perfil ou link" /></label>
    <label>Especialidades e serviços<textarea rows={3} value={form.services} onChange={(event) => set({ services: event.target.value })} placeholder="Separe os itens por vírgula." /></label>
    <label>Observações ou correções adicionais<textarea rows={4} value={form.message} onChange={(event) => set({ message: event.target.value })} placeholder="Ex.: foto atualizada, registro profissional, horário ou informação a remover." /></label>
    <label className="form-consent"><input required type="checkbox" checked={form.privacy} onChange={(event) => set({ privacy: event.target.checked })} /> Li e concordo com a <Link href="/privacidade">Política de Privacidade</Link>.</label>
    <button type="submit">Preparar e-mail para revisão</button>
  </form>;
}
