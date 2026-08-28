import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizations } from "@/lib/data";
import { findPublishedOrganization, publishedOrganizations } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export async function generateStaticParams() { return (await publishedOrganizations(organizations)).map((organization) => ({ slug: organization.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const item = await findPublishedOrganization((await params).slug); return item ? pageMetadata(item.name, `${item.category} em Piumhi. ${item.services.join(", ")}.`, `/empresas/${item.slug}`) : pageMetadata("Serviço não encontrado", "Este serviço não está disponível.", "/empresas"); }

function updateRequestHref(name: string) {
  const subject = encodeURIComponent(`Atualização de cadastro — ${name}`);
  const body = encodeURIComponent(`Estabelecimento: ${name}\n\nSou responsável por este estabelecimento e gostaria de solicitar uma atualização no Guia Saúde.\n\nInformações a corrigir ou complementar:`);
  return `mailto:rmproguia@gmail.com?subject=${subject}&body=${body}`;
}

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await findPublishedOrganization((await params).slug);
  if (!item) notFound();
  const digits = item.phone.replace(/\D/g, "");
  const whatsappDigits = (item.whatsapp ?? "").replace(/\D/g, "");
  const publicUrl = `https://guiasaude.app.br/empresas/${item.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: item.name,
    description: item.summary,
    url: publicUrl,
    telephone: digits.length >= 10 ? `+55${digits}` : undefined,
    address: { "@type": "PostalAddress", streetAddress: item.address, addressLocality: "Piumhi", addressRegion: "MG", addressCountry: "BR" },
    sameAs: [item.website, item.instagram, item.mapUrl].filter(Boolean),
  };
  return <><SiteHeader /><main className="section shell profile-page"><Link className="back-link" href="/empresas"><ArrowLeft size={16} /> Voltar para clínicas e serviços</Link><section className="profile-hero"><p className="eyebrow">{item.category}</p><h1>{item.name}</h1><p>{item.summary}</p><div className="doctor-pills"><span><MapPin size={14} /> {item.address}, Piumhi — MG</span></div><div className="profile-actions">{digits.length >= 10 ? <a href={`tel:+55${digits}`}><Phone size={16} /> Ligar</a> : null}{whatsappDigits.length >= 10 ? <a href={`https://wa.me/${whatsappDigits.startsWith("55") ? whatsappDigits : `55${whatsappDigits}`}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a> : null}{item.website ? <a href={item.website} target="_blank" rel="noreferrer">Site <ExternalLink size={15} /></a> : null}{item.instagram ? <a href={item.instagram} target="_blank" rel="noreferrer">Instagram <ExternalLink size={15} /></a> : null}{item.mapUrl ? <a href={item.mapUrl} target="_blank" rel="noreferrer">Como chegar <MapPin size={15} /></a> : null}</div></section><section className="profile-section"><h2>Serviços informados</h2><ul>{item.services.map((service) => <li key={service}>{service}</li>)}</ul></section><p className="directory-update-request">Representa este estabelecimento? <a href={updateRequestHref(item.name)}>Solicite uma atualização.</a></p></main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteFooter /></>;
}
