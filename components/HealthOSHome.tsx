import Link from "next/link";
import { ArrowRight, Building2, FlaskConical, MapPin, Pill, Search, Sparkles } from "lucide-react";
import { FeaturedProfessionalsRotator } from "@/components/FeaturedProfessionalsRotator";
import { publishedProfessionals } from "@/lib/public-directory";
import { professionals } from "@/lib/data";
import { isFeaturedProfessional } from "@/lib/featured-professionals";

const shortcuts = [
  { label: "Profissionais", href: "/buscar?cidade=piumhi&tipo=professionals", icon: Search },
  { label: "Clínicas", href: "/buscar?cidade=piumhi&tipo=services&categoria=clinicas", icon: Building2 },
  { label: "Exames", href: "/buscar?cidade=piumhi&tipo=services&q=exames", icon: FlaskConical },
  { label: "Farmácias", href: "/buscar?cidade=piumhi&tipo=services&q=farmacia", icon: Pill },
];

export async function HealthOSHome() {
  const source = await publishedProfessionals(professionals);
  const featured = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).map((item) => ({ slug: item.slug, name: item.name, specialty: item.specialty, organization: item.organization, registration: item.registration, imageUrl: item.imageUrl }));
  return <main className="health-os-home"><div className="health-os-aura health-os-aura-one" aria-hidden="true" /><div className="health-os-aura health-os-aura-two" aria-hidden="true" /><section className="health-os-shell">
    <header className="health-os-topbar"><div className="health-os-location" aria-label="Localização atual: Piumhi, Minas Gerais"><MapPin size={14} /><span>Piumhi · MG</span></div></header>
    <div className="health-os-intro"><span>Olá!</span><h1>Como podemos<br /><em>cuidar de você</em> hoje?</h1></div>
    <form className="health-os-search" action="/buscar"><input type="hidden" name="cidade" value="piumhi" /><Search size={20} /><input name="q" aria-label="Buscar" placeholder="Profissional, especialidade ou serviço" /><button type="submit" aria-label="Pesquisar"><ArrowRight size={19} /></button></form>
    <nav className="health-os-shortcuts" aria-label="Atalhos de saúde">{shortcuts.map(({ label, href, icon: Icon }) => <Link href={href} key={label}><span><Icon size={21} /></span><small>{label}</small></Link>)}</nav>
    <Link href="/buscar?cidade=piumhi" className="health-os-feature"><div className="health-os-feature-copy"><span><Sparkles size={14} /> GUIA SAÚDE</span><h2>Saúde mais perto de você</h2><p>Descubra profissionais e serviços da sua região.</p></div><span className="health-os-feature-orb" aria-hidden="true" /><span className="health-os-feature-arrow"><ArrowRight size={19} /></span></Link>
    <section className="health-os-section"><div className="health-os-section-head"><div><span>SELEÇÃO GUIA SAÚDE</span><h2>Profissionais em destaque</h2></div><Link href="/profissionais-destaque">Ver todos <ArrowRight size={13} /></Link></div><FeaturedProfessionalsRotator professionals={featured} /></section>
    <Link href="/materias" className="health-os-content-card" aria-label="Explorar conteúdos do Guia Saúde"><div><span>CONTEÚDOS</span><h2>Informação para cuidar melhor.</h2><p>Matérias, podcast e revista com profissionais da região.</p></div><span>Explorar <ArrowRight size={15} /></span></Link>
  </section></main>;
}
