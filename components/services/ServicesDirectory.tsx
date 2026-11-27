"use client";

import Link from "next/link";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { OrganizationCard, OrganizationIcon } from "@/components/search/MobileSearch";
import { filterOrganizations } from "@/lib/search";
import { categoryForOrganization, resolveServiceCategory } from "@/lib/service-taxonomy";
import type { Organization } from "@/lib/data";

type Category = { key: string; label: string; count: number };

function publicAddress(address?: string) {
  return address && !/endere[cç]o\s+(aguardando validação|a validar|a confirmar)/i.test(address) ? address : "";
}

/** Clínicas e serviços no layout do design de referência. O filtro roda no navegador
 *  porque o site é estático (o servidor não recebe ?categoria= nem ?q=). */
export function ServicesDirectory({ organizations, categories }: { organizations: Organization[]; categories: Category[] }) {
  const sheet = useRef<HTMLDetailsElement>(null);
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const category = resolveServiceCategory(params.get("categoria") ?? "")?.key ?? "";
  const results = filterOrganizations(organizations, { city: "Piumhi", category, query: q, type: "services" });
  const active = categories.find((item) => item.key === category);
  const filtered = Boolean(category || q);
  const sample = (key: string) => organizations.find((item) => categoryForOrganization(item)?.key === key);

  return <div className={`cs-shell${filtered ? " ms cs-filtered" : ""}`}>
    <header className="ms-header"><Link className="ms-back" href="/" aria-label="Voltar ao início"><ArrowLeft size={20}/></Link><div><h1>{active?.label ?? "Clínicas e serviços"}</h1><p>Piumhi · MG</p></div></header>

    <form className="ms-search" action="/empresas" role="search">
      <Search size={19} aria-hidden="true" />
      <input name="q" defaultValue={q} placeholder={active?.label ?? "Qual serviço você procura?"} aria-label="Buscar clínicas e serviços" autoComplete="off" enterKeyHint="search" />
      {category ? <input type="hidden" name="categoria" value={category} /> : null}
      {q ? <Link className="ms-clear" href={category ? `/empresas?categoria=${category}` : "/empresas"} aria-label="Limpar busca"><X size={17} /></Link> : <button className="ms-go" type="submit" aria-label="Buscar"><ArrowRight size={18}/></button>}
    </form>

    <div className="ms-chips"><details className="ms-filter" ref={sheet}><summary><SlidersHorizontal size={16}/> Filtros{category ? " · 1" : ""}</summary><div className="ms-filter-backdrop" onClick={()=>{if(sheet.current) sheet.current.open=false;}}/><form className="ms-filter-panel" action="/empresas"><header><div><h2>Filtros</h2><p>Refine sua busca por serviços.</p></div><button type="button" aria-label="Fechar filtros" onClick={()=>{if(sheet.current) sheet.current.open=false;}}><X size={18}/></button></header><div className="ms-filter-fields"><label>Busca<input name="q" defaultValue={q}/></label><label>Tipo de serviço<select name="categoria" defaultValue={category}><option value="">Todos</option>{categories.map(item=><option key={item.key} value={item.key}>{item.label}</option>)}</select></label></div><footer className="ms-filter-footer"><Link href="/empresas">Limpar filtros</Link><button className="ms-filter-apply" type="submit">Aplicar filtros</button></footer></form></details>{active ? <Link className="ms-chip" href={q ? `/empresas?q=${encodeURIComponent(q)}` : "/empresas"}>{active.label}<X size={14}/></Link> : null}</div>
    {!filtered ? <nav className="cs-categories" aria-label="Categorias">
      {categories.map((item) => {
        const example = sample(item.key);
        return <Link key={item.key} href={item.key === category ? "/empresas" : `/empresas?categoria=${item.key}`} className={item.key === category ? "active" : undefined} aria-current={item.key === category ? "page" : undefined}>
          <span className="cs-category-icon" aria-hidden="true">{example ? <OrganizationIcon item={example} size={22} /> : null}</span>
          <strong>{item.label}</strong>
          <small>{item.count} {item.count === 1 ? "local" : "locais"}</small>
        </Link>;
      })}
    </nav> : null}

    <div className={filtered ? "ms-count ms-results-toolbar" : "cs-list-head"}>
      {!filtered ? <h2>Todos os locais</h2> : null}
      <span>{results.length} {results.length === 1 ? "local" : "locais"}</span>
      {active || q ? <Link href="/empresas">Ver todos</Link> : null}
    </div>

    {results.length ? <div className={filtered ? "ms-list" : "cs-list"}>{results.map((item) => <OrganizationCard key={item.slug} item={item} address={publicAddress(item.address)} />)}</div>
      : <div className="ms-empty"><Search size={24} /><strong>Nenhum local encontrado</strong><p>Tente outro termo ou outra categoria.</p><Link href="/empresas">Ver todos os locais</Link></div>}

    <p className="cs-inclusion">Seu estabelecimento ainda não aparece no Guia Saúde? <Link href="/inclusao?tipo=organization">Solicitar inclusão</Link></p>
  </div>;
}
