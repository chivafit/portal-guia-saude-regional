import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, CalendarClock, Camera, ExternalLink, Globe, MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizations } from "@/lib/data";
import { findPublishedOrganization, organizationForProfessional, publicProfessionals, publishedOrganizations } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (await publishedOrganizations(organizations)).map((organization) => ({ slug: organization.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const item = await findPublishedOrganization((await params).slug);
  return item
    ? pageMetadata(item.name, `${item.category} em Piumhi. ${item.services.join(", ")}.`, `/empresas/${item.slug}`)
    : pageMetadata("Serviço não encontrado", "Este serviço não está disponível.", "/empresas");
}

function updateRequestHref(slug: string) {
  return `/inclusao?tipo=organization&perfil=${encodeURIComponent(slug)}&acao=atualizacao`;
}

function addressParts(address: string) {
  const segments = address.split(",").map((part) => part.trim()).filter(Boolean);
  if (segments.length < 2) return { street: address, neighborhood: "" };
  return { street: segments.slice(0, -1).join(", "), neighborhood: segments.at(-1) ?? "" };
}

function categoryLabels(category: string) {
  const [network, area] = category.split("•").map((part) => part.trim());
  return { network, area: area || network };
}

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await findPublishedOrganization((await params).slug);
  if (!item) notFound();

  const linkedProfessionals = publicProfessionals.filter((professional) => organizationForProfessional(professional)?.slug === item.slug);
  const visibleProfessionals = linkedProfessionals.slice(0, 6);
  const digits = item.phone.replace(/\D/g, "");
  const whatsappDigits = (item.whatsapp ?? "").replace(/\D/g, "");
  const phoneHref = digits.length >= 10 ? `tel:+55${digits}` : "";
  const whatsappHref = whatsappDigits.length >= 10 ? `https://wa.me/${whatsappDigits.startsWith("55") ? whatsappDigits : `55${whatsappDigits}`}` : "";
  const address = addressParts(item.address);
  const labels = categoryLabels(item.category);
  const isPublicHealthUnit =
    item.category.startsWith("Rede pública") ||
    /^(Gestão pública|Serviço público)/.test(item.category);
  const publicUrl = `https://guiasaude.app.br/empresas/${item.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: item.name,
    description: item.publicSummary ?? item.summary,
    url: publicUrl,
    telephone: phoneHref ? `+55${digits}` : undefined,
    address: { "@type": "PostalAddress", streetAddress: item.address, addressLocality: "Piumhi", addressRegion: "MG", addressCountry: "BR" },
    sameAs: [item.website, item.instagram, item.mapUrl].filter(Boolean),
  };

  return <>
    <SiteHeader />
    <main className="organization-page">
      <div className="shell organization-wrap">
        <Link className="organization-back" href="/empresas"><ArrowLeft size={16} aria-hidden="true" /> Voltar para clínicas e serviços</Link>
        <header className={`organization-hero${isPublicHealthUnit ? " is-public" : ""}`}>
          <div className="organization-hero-copy">
            <div className="organization-classification"><span>{labels.network}</span>{labels.area !== labels.network ? <span>{labels.area}</span> : null}</div>
            <h1>{item.name}</h1>
            <p className="organization-hero-location"><MapPin size={17} aria-hidden="true" /> {address.neighborhood ? `${address.neighborhood} · ` : ""}Piumhi/MG</p>
            {item.publicSummary ? <p className="organization-summary">{item.publicSummary}</p> : null}
            <nav className="organization-actions" aria-label="Ações do estabelecimento">
              {phoneHref ? <a className="organization-action primary" href={phoneHref}><Phone size={17} aria-hidden="true" /> Ligar</a> : null}
              {whatsappHref ? <a className="organization-action" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</a> : null}
              {item.mapUrl ? <a className="organization-action" href={item.mapUrl} target="_blank" rel="noreferrer"><MapPin size={17} aria-hidden="true" /> Ver localização</a> : null}
              {item.website ? <a className="organization-action" href={item.website} target="_blank" rel="noreferrer"><Globe size={17} aria-hidden="true" /> Site</a> : null}
            </nav>
          </div>
          <div className="organization-hero-mark" aria-hidden="true"><Building2 size={34} /></div>
        </header>

        <div className="organization-layout">
          <div className="organization-main">
            {item.services.length ? <section className="organization-section" aria-labelledby="services-title"><p className="organization-section-kicker">O que você encontra aqui</p><h2 id="services-title">Serviços disponíveis</h2><div className="organization-service-list">{item.services.map((service) => <span key={service}>{service}</span>)}</div></section> : null}
            {linkedProfessionals.length ? <section className="organization-section organization-professionals" aria-labelledby="professionals-title">
              <div className="organization-section-heading"><div><p className="organization-section-kicker">Equipe vinculada</p><h2 id="professionals-title">Profissionais que atendem aqui</h2></div><span>{linkedProfessionals.length} {linkedProfessionals.length === 1 ? "profissional" : "profissionais"}</span></div>
              <div className="organization-professional-grid">{visibleProfessionals.map((professional) => <Link href={`/profissionais/${professional.slug}`} className="organization-professional-card" key={professional.slug}><span className="organization-professional-photo" style={professional.imageUrl ? { backgroundImage: `url(${professional.imageUrl})` } : undefined} aria-hidden="true">{professional.imageUrl ? null : professional.name.split(" ").slice(0, 2).map((name) => name[0]).join("")}</span><span className="organization-professional-copy"><strong>{professional.name}</strong><small>{professional.specialty}</small>{professional.registration ? <em>{professional.registration}</em> : null}</span><ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>
              {linkedProfessionals.length > visibleProfessionals.length ? <Link className="organization-more-professionals" href={`/buscar?cidade=piumhi&tipo=professionals&q=${encodeURIComponent(item.name)}`}>Ver todos os {linkedProfessionals.length} profissionais <ArrowUpRight size={16} aria-hidden="true" /></Link> : null}
            </section> : null}
            {item.publicSummary ? <section className="organization-section organization-about" aria-labelledby="about-title"><p className="organization-section-kicker">Conheça o estabelecimento</p><h2 id="about-title">Sobre</h2><p>{item.publicSummary}</p></section> : null}
          </div>
          <aside className="organization-information" aria-label="Informações práticas"><p className="organization-section-kicker">Informações</p><h2>Planeje sua visita</h2><div className="organization-information-list">
            <div><MapPin size={18} aria-hidden="true" /><span><small>Endereço</small><strong>{address.street}</strong><p>{address.neighborhood ? `${address.neighborhood} · ` : ""}Piumhi/MG</p>{item.mapUrl ? <a href={item.mapUrl} target="_blank" rel="noreferrer">Ver localização <ArrowUpRight size={14} aria-hidden="true" /></a> : null}</span></div>
            {phoneHref ? <div><Phone size={18} aria-hidden="true" /><span><small>Telefone do estabelecimento</small><a className="organization-info-contact" href={phoneHref}>{item.phone}</a></span></div> : null}
            {whatsappHref ? <div><MessageCircle size={18} aria-hidden="true" /><span><small>WhatsApp do estabelecimento</small><a className="organization-info-contact" href={whatsappHref} target="_blank" rel="noreferrer">Conversar pelo WhatsApp</a></span></div> : null}
            {item.hours ? <div><CalendarClock size={18} aria-hidden="true" /><span><small>Horário de funcionamento</small><strong>{item.hours}</strong></span></div> : null}
            {item.website ? <div><Globe size={18} aria-hidden="true" /><span><small>Site</small><a className="organization-info-contact" href={item.website} target="_blank" rel="noreferrer">Visitar site <ExternalLink size={13} aria-hidden="true" /></a></span></div> : null}
            {item.instagram ? <div><Camera size={18} aria-hidden="true" /><span><small>Instagram</small><a className="organization-info-contact" href={item.instagram} target="_blank" rel="noreferrer">Abrir Instagram <ExternalLink size={13} aria-hidden="true" /></a></span></div> : null}
          </div></aside>
        </div>
        <div className="organization-footer-note"><p>Informações verificadas em fontes públicas{item.updatedAt ? ` · Última atualização: ${new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(`${item.updatedAt}T12:00:00`))}` : ""}.</p><p>Representa este estabelecimento? <Link href={updateRequestHref(item.slug)}>Solicite uma atualização.</Link></p></div>
      </div>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <SiteFooter hideCommercialCallout={isPublicHealthUnit} />
  </>;
}
