import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { cities, professions, professionals } from "@/lib/data";

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.toLocaleLowerCase("pt-BR") : "";
  const city = typeof params.cidade === "string" ? params.cidade : "";
  const profession = typeof params.profissao === "string" ? params.profissao : "";
  const results = professionals.filter(item => {
    const text = `${item.name} ${item.profession} ${item.specialty} ${item.organization}`.toLocaleLowerCase("pt-BR");
    return (!q || text.includes(q)) && (!city || item.city === city) && (!profession || item.profession === profession);
  });

  return <><SiteHeader /><main><section className="page-intro"><div className="shell"><p className="eyebrow">Diretório regional</p><h1>Encontre profissionais da saúde</h1><p>Os registros abaixo são demonstrativos e serão substituídos por cadastros revisados antes do lançamento.</p><SearchForm compact /></div></section><section className="section shell results-layout"><aside className="filters"><h2>Filtrar resultados</h2><form action="/buscar"><label>Termo<input name="q" defaultValue={q} /></label><label>Cidade<select name="cidade" defaultValue={city}><option value="">Todas</option>{cities.map(item => <option key={item}>{item}</option>)}</select></label><label>Profissão<select name="profissao" defaultValue={profession}><option value="">Todas</option>{professions.map(item => <option key={item}>{item}</option>)}</select></label><button type="submit">Aplicar filtros</button></form></aside><div className="results"><AdSlot code="DIRECTORY_TOP" compact /><div className="result-count"><strong>{results.length} resultados demonstrativos</strong><span>Ordenação objetiva · sem anúncios misturados</span></div>{results.length ? results.map(item => <article className="result-card" key={item.slug}><div className="initials">GS</div><div className="result-copy"><p className="eyebrow">{item.profession} · {item.city}</p><h2>{item.name}</h2><strong>{item.specialty}</strong><p>{item.organization}</p><small>{item.registration}</small></div><Link href={`/profissionais/${item.slug}`}>Ver perfil</Link></article>) : <div className="empty-state"><h2>Nenhum resultado nesta demonstração</h2><p>Isso será usado para identificar lacunas da base e priorizar novos cadastros.</p><Link href="/buscar">Limpar filtros</Link></div>}</div></section></main><SiteFooter /></>;
}
