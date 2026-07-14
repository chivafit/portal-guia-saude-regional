import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, ClipboardCheck, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { ContactReveal } from "@/components/ContactReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { professionals } from "@/lib/data";
import { findPublishedProfessional } from "@/lib/directory";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await findPublishedProfessional(slug, professionals);
  if (!item) return pageMetadata("Profissional não encontrado", "Perfil profissional não encontrado no Guia Saúde.", `/profissionais/${slug}`);
  return pageMetadata(
    `${item.name} — ${item.specialty}`,
    `${item.profession} em ${item.city}. Perfil informativo no Guia Saúde, sem agendamento online.`,
    `/profissionais/${slug}`,
  );
}

export default async function ProfessionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await findPublishedProfessional(slug, professionals);
  if (!item) notFound();
  const initials = item.name.split(" ").slice(0, 2).map(part => part[0]).join("");
  return <><SiteHeader /><main><section className="profile-hero profile-directory-hero premium-profile-hero" style={{backgroundImage:`linear-gradient(135deg,rgba(248,251,252,.92),rgba(237,245,248,.94)),url(${item.coverImageUrl || "/placeholders/clinic-cover.svg"})`}}><div className="shell profile-premium-grid"><div className="profile-premium-portrait profile-photo-large" style={{backgroundImage:`url(${item.imageUrl || "/placeholders/professional-photo.svg"})`}}><span>{initials}</span><Stethoscope size={0} /></div><div className="profile-heading"><Link href="/buscar" className="back-link"><ArrowLeft size={14} /> Voltar para busca</Link><p className="eyebrow">Perfil profissional</p><h1>{item.name}</h1><p className="profile-specialty">{item.summary}</p><div className="profile-pill-row"><span><Stethoscope size={14} /> {item.profession}</span><span><BadgeCheck size={14} /> {item.specialty}</span><span><MapPin size={14} /> {item.city}</span></div><span className={item.verified ? "status-pill verified" : "status-pill pending"}>{item.verified ? <BadgeCheck size={14} /> : <ShieldCheck size={14} />}{item.verified ? "Perfil verificado" : "Validação documental pendente"}</span></div><aside className="profile-contact-card premium-contact-card"><small>CONTATO PROFISSIONAL</small><strong>{item.organization}</strong><ContactReveal entityType="professional" entitySlug={item.slug} entityName={item.name} category={item.specialty} cityName={item.city} phone={item.phone} whatsapp={item.whatsapp} /><span>Portal informativo, sem intermediação de consulta.</span></aside></div></section><section className="section shell profile-directory-content premium-profile-content"><article><div className="profile-section-head"><p className="eyebrow">Atuação profissional</p><h2>Áreas de atendimento e informações do perfil</h2></div><div className="profile-service-pills">{item.services.map(service => <span key={service}>{service}</span>)}</div><div className="profile-info-grid"><section><ClipboardCheck size={20} /><small>Especialidade</small><strong>{item.specialty}</strong><p>Área declarada para organização do guia e busca por pacientes.</p></section><section><Stethoscope size={20} /><small>Categoria</small><strong>{item.profession}</strong><p>Categoria profissional usada na navegação regional.</p></section><section><MapPin size={20} /><small>Cidade</small><strong>{item.city}</strong><p>Município principal de atendimento informado.</p></section></div><h2>Local de atendimento</h2><div className="location-card profile-location"><Building2 size={22} /><div><strong>{item.organization}</strong><span>{item.city} · endereço profissional aguardando conferência</span><p>Antes da publicação definitiva, dados de localização, contato e vínculo profissional passam por revisão editorial.</p></div></div></article><aside><div className="information-card profile-verification"><p className="eyebrow">Credenciais</p><dl><div><dt>Registro</dt><dd>{item.registration}</dd></div><div><dt>Fonte</dt><dd>Cadastro demonstrativo</dd></div><div><dt>Revisão</dt><dd>Pendente</dd></div><div><dt>Publicidade</dt><dd>Nenhum destaque contratado</dd></div></dl><Link href="/inclusao">Solicitar atualização <ArrowRight size={14} /></Link></div><div className="profile-disclaimer"><strong>Nota editorial</strong><p>O Guia Saúde é um portal informativo. Não realiza triagem, diagnóstico, prescrição ou agendamento de consultas.</p></div><AdSlot code="PROFILE_CONTENT_END" compact /></aside></section></main><SiteFooter /></>;
}
