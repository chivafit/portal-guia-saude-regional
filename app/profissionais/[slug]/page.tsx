import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { professionals } from "@/lib/data";

export default async function ProfessionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = professionals.find(profile => profile.slug === slug);
  if (!item) notFound();
  return <><SiteHeader /><main><section className="profile-hero"><div className="shell profile-hero-grid"><div className="profile-avatar">GS</div><div><p className="eyebrow">Perfil profissional demonstrativo</p><h1>{item.name}</h1><p className="profile-specialty">{item.profession} · {item.specialty}</p><span className="verification pending">Validação documental pendente</span></div><div className="profile-contact"><span>{item.city}</span><strong>{item.organization}</strong><p>{item.phone}</p><button type="button" disabled>Solicitar atendimento</button><small>Disponível após validação do contato</small></div></div></section><section className="section shell profile-content"><article><h2>Sobre o perfil</h2><p>{item.summary}</p><h2>Serviços declarados</h2><ul className="service-list">{item.services.map(service => <li key={service}>{service}</li>)}</ul><h2>Locais de atendimento</h2><div className="location-card"><strong>{item.organization}</strong><span>{item.city} · endereço profissional aguardando conferência</span></div></article><aside><div className="information-card"><p className="eyebrow">Verificação</p><dl><div><dt>Registro</dt><dd>{item.registration}</dd></div><div><dt>Fonte</dt><dd>Cadastro demonstrativo</dd></div><div><dt>Revisão</dt><dd>Pendente</dd></div><div><dt>Publicidade</dt><dd>Nenhum destaque contratado</dd></div></dl><Link href="/admin">Ver fluxo de revisão</Link></div></aside></section><div className="shell"><AdSlot code="PROFILE_CONTENT_END" /></div></main><SiteFooter /></>;
}
