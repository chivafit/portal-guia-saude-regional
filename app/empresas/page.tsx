import Link from "next/link";
import { ArrowUpRight, Building2, Dumbbell, FlaskConical, HeartPulse, MapPin, Phone, Pill, Stethoscope } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { organizations } from "@/lib/data";
import { publishedOrganizations } from "@/lib/public-directory";
import { filterOrganizations } from "@/lib/search";
import { categoryOptionsFor, resolveServiceCategory } from "@/lib/service-taxonomy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Clínicas e serviços", "Encontre clínicas, hospitais, odontologia, academias e outros serviços de saúde publicados em Piumhi.", "/empresas");
export const dynamic = "force-static";
type SearchParams = Promise<{ cidade?: string; categoria?: string; q?: string }>;

function contactHref(phone: string) { const digits = phone.replace(/\D/g, ""); return digits.length >= 10 ? `tel:+55${digits}` : undefined; }
function publicAddress(address: string) { return /endere[cç]o\s+(aguardando validação|a validar|a confirmar)/i.test(address) ? "" : address; }
function directionsHref(mapUrl:string|undefined,address:string){if(mapUrl)return mapUrl;if(!address)return undefined;return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, Piumhi - MG`)}`;}
function CategoryIcon({label}:{label:string}){const value=label.toLocaleLowerCase("pt-BR");if(/farm/.test(value))return <Pill size={20}/>;if(/labor|exame|diagn/.test(value))return <FlaskConical size={20}/>;if(/academ|fitness|esport/.test(value))return <Dumbbell size={20}/>;if(/hospital|cl[ií]nica|m[eé]dic/.test(value))return <Stethoscope size={20}/>;if(/fisi|reabil/.test(value))return <HeartPulse size={20}/>;return <Building2 size={20}/>;}

export default async function CompaniesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = resolveServiceCategory(params.categoria)?.key ?? "";
  const source = await publishedOrganizations(organizations);
  const categories = categoryOptionsFor(source);
  const results = filterOrganizations(source, { city: "Piumhi", category, query: params.q ?? "", type: "services" });
  return <><main className="company-directory-page">
    <section className="directory-hero company-directory-hero"><div className="shell directory-hero-grid"><div><p className="eyebrow">Clínicas e serviços em Piumhi</p><h1>Encontre serviços de saúde</h1><p>Localize organizações publicadas com informações de contato e endereço.</p></div></div></section>
    <section className="section shell" style={{ paddingBottom: 0 }}><div className="company-category-grid">{categories.slice(0, 6).map((item) => <Link key={item.key} href={`/empresas?categoria=${encodeURIComponent(item.key)}`}><CategoryIcon label={item.label}/><strong>{item.label}</strong><small>{item.count} {item.count === 1 ? "serviço" : "serviços"}</small></Link>)}</div></section>
    <section className="section shell company-layout"><aside className="filters directory-filters company-filters"><form action="/empresas" className="filter-panel"><label>Nome ou serviço<input name="q" defaultValue={params.q ?? ""} placeholder="Ex.: pilates, clínica, exames" /></label><input type="hidden" name="cidade" value="piumhi" /><label>Categoria<select name="categoria" defaultValue={category}><option value="">Todas as categorias</option>{categories.map((item) => <option key={item.key} value={item.key}>{item.label} ({item.count})</option>)}</select></label><button type="submit">Aplicar filtros</button></form></aside>
      <div className="company-results"><div className="result-toolbar"><div><strong>{results.length} {results.length === 1 ? "resultado" : "resultados"}</strong><span>{params.q || category ? "Resultados para os filtros selecionados" : "Serviços publicados em Piumhi"}</span></div><Link href="/buscar?cidade=piumhi&tipo=services">Abrir busca completa <ArrowUpRight size={14} /></Link></div>
        {results.length ? <><div className="business-card-list">{results.map((item) => { const href = contactHref(item.phone); const address = publicAddress(item.address); const directions=directionsHref(item.mapUrl,address); return <article className="business-card" key={item.slug}><div className="business-icon business-logo" style={{ backgroundImage: `url(${item.logoUrl || "/placeholders/company-logo.svg"})` }} /><div className="business-main"><div className="business-head"><div><p>{item.category}</p><h2>{item.name}</h2></div><span className="status-pill verified">Dados publicados</span></div><div className="doctor-pills"><span><MapPin size={13} /> Piumhi</span>{address ? <span>{address}</span> : null}</div><p className="doctor-summary">{item.services.slice(0, 3).join(" · ")}</p></div><aside className="business-side"><div className="business-quick-actions">{href?<a className="direct-contact-btn" href={href}><Phone size={14}/> Ligar</a>:null}{directions?<a className="direct-contact-btn directions" href={directions} target="_blank" rel="noreferrer"><MapPin size={14}/> Como chegar</a>:null}</div><Link href={`/empresas/${item.slug}`}>Ver detalhes <ArrowUpRight size={14} /></Link></aside></article>; })}</div><div className="directory-inclusion-call"><p>Seu estabelecimento ainda não aparece no Guia Saúde?</p><Link href="/inclusao?tipo=organization">Solicitar inclusão <ArrowUpRight size={14} /></Link></div></> : <div className="empty-state company-empty"><h2>Nenhum serviço encontrado</h2><p>Não há registros publicados para essa combinação. Tente uma categoria diferente ou uma busca mais ampla.</p><Link href="/empresas">Limpar filtros</Link><Link href="/inclusao?tipo=organization">Solicitar inclusão</Link></div>}
      </div></section>
  </main><SiteFooter /></>;
}
