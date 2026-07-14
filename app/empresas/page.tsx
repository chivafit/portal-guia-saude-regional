import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizations } from "@/lib/data";

export default function CompaniesPage() {
  return <><SiteHeader /><main><section className="page-intro"><div className="shell"><p className="eyebrow">Empresas e serviços</p><h1>Encontre estruturas de saúde na região</h1><p>Clínicas, hospitais, laboratórios e outros estabelecimentos serão organizados por cidade e categoria.</p></div></section><section className="section shell company-grid">{organizations.map(item => <article className="company-card" key={item.slug}><p className="eyebrow">{item.category}</p><h2>{item.name}</h2><strong>{item.city}</strong><p>{item.summary}</p><ul>{item.services.map(service => <li key={service}>{service}</li>)}</ul><span>Perfil demonstrativo</span></article>)}</section></main><SiteFooter /></>;
}
