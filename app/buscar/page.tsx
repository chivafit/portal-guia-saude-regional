import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { cities, professions, professionals } from "@/lib/data";
import { publishedProfessionals } from "@/lib/directory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Buscar profissionais",
  "Encontre profissionais da saúde por cidade, categoria e especialidade no Guia Saúde Regional.",
  "/buscar",
);

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.toLocaleLowerCase("pt-BR") : "";
  const city = typeof params.cidade === "string" ? params.cidade : "";
  const profession = typeof params.profissao === "string" ? params.profissao : "";
  const source = await publishedProfessionals(professionals);
  const results = source.filter(item => {
    const text = `${item.name} ${item.profession} ${item.specialty} ${item.organization}`.toLocaleLowerCase("pt-BR");
    return (!q || text.includes(q)) && (!city || item.city === city) && (!profession || item.profession === profession);
  });
  const activeFilters = [q && `Busca: ${q}`, city && city, profession && profession].filter(Boolean);

  return <><SiteHeader /><main><section className="directory-hero"><div className="shell"><div className="directory-hero-grid"><div><p className="eyebrow">Diretório regional</p><h1>Encontre profissionais da saúde</h1><p>Busque por especialidade, cidade ou serviço. O Guia Saúde mostra perfis e informações revisadas, sem intermediação de agenda.</p></div><div className="directory-note"><span>Portal informativo</span><strong>Sem agendamento online</strong><p>O contato e as condições de atendimento aparecem no perfil de cada profissional.</p></div></div><SearchForm compact /></div></section><section className="section shell results-layout doctoralia-layout"><aside className="filters directory-filters"><h2>Refinar busca</h2><form action="/buscar"><label>Especialidade, nome ou serviço<input name="q" defaultValue={q} placeholder="Ex.: cardiologia" /></label><label>Cidade<select name="cidade" defaultValue={city}><option value="">Todas as cidades</option>{cities.map(item => <option key={item}>{item}</option>)}</select></label><label>Categoria profissional<select name="profissao" defaultValue={profession}><option value="">Todas as categorias</option>{professions.map(item => <option key={item}>{item}</option>)}</select></label><button type="submit">Aplicar filtros</button></form><div className="filter-pills"><span>Sem agendamento</span><span>Perfis revisados</span><span>Guia regional</span></div></aside><div className="results directory-results"><AdSlot code="DIRECTORY_TOP" compact /><div className="result-toolbar"><div><strong>{results.length} resultados no guia</strong><span>{activeFilters.length ? activeFilters.join(" · ") : "Toda a região"}</span></div><Link href="/inclusao">Solicitar inclusão</Link></div>{results.length ? <div className="doctor-card-list">{results.map(item => <article className="doctor-card" key={item.slug}><div className="doctor-avatar"><span>GS</span></div><div className="doctor-main"><div className="doctor-card-head"><div><p>{item.profession}</p><h2>{item.name}</h2></div><span className={item.verified ? "status-pill verified" : "status-pill pending"}>{item.verified ? "Perfil verificado" : "Validação pendente"}</span></div><div className="doctor-pills"><span>{item.specialty}</span><span>{item.city}</span><span>{item.registration}</span></div><p className="doctor-summary">{item.summary}</p><div className="service-pills">{item.services.map(service => <span key={service}>{service}</span>)}</div></div><aside className="doctor-side"><strong>{item.organization}</strong><small>{item.phone}</small><Link href={`/profissionais/${item.slug}`}>Ver perfil</Link><p>Portal informativo, sem opção de agendamento.</p></aside></article>)}</div> : <div className="empty-state"><h2>Nenhum resultado encontrado</h2><p>Isso ajuda a priorizar novas categorias e cidades na formação da base regional.</p><Link href="/buscar">Limpar filtros</Link></div>}</div></section></main><SiteFooter /></>;
}
