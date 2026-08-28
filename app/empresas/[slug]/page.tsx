import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizations } from "@/lib/data";
import { findPublishedOrganization, publishedOrganizations } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";
export async function generateStaticParams() { return (await publishedOrganizations(organizations)).map((organization) => ({ slug: organization.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const item = await findPublishedOrganization((await params).slug); return item ? pageMetadata(item.name, `${item.category} em Piumhi. ${item.services.join(", ")}.`, `/empresas/${item.slug}`) : pageMetadata("Serviço não encontrado", "Este serviço não está disponível.", "/empresas"); }

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await findPublishedOrganization((await params).slug);
  if (!item) notFound();
  const digits = item.phone.replace(/\D/g, "");
  return <><SiteHeader /><main className="section shell profile-page"><Link className="back-link" href="/empresas"><ArrowLeft size={16} /> Voltar para clínicas e serviços</Link><section className="profile-hero"><p className="eyebrow">{item.category}</p><h1>{item.name}</h1><p>{item.summary}</p><div className="doctor-pills"><span><MapPin size={14} /> {item.address}, Piumhi — MG</span></div><div className="profile-actions">{digits.length >= 10 ? <a href={`tel:+55${digits}`}><Phone size={16} /> Ligar</a> : null}{item.source ? <a href={item.source} target="_blank" rel="noreferrer">Fonte pública <ExternalLink size={15} /></a> : null}</div></section><section className="profile-section"><h2>Serviços informados</h2><ul>{item.services.map((service) => <li key={service}>{service}</li>)}</ul></section></main><SiteFooter /></>;
}
