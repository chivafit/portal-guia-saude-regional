"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
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
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const category = resolveServiceCategory(params.get("categoria") ?? "")?.key ?? "";
  const results = filterOrganizations(organizations, { city: "Piumhi", category, query: q, type: "services" });
  const active = categories.find((item) => item.key === category);
  const sample = (key: string) => organizations.find((item) => categoryForOrganization(item)?.key === key);

  return <div className="cs-shell">
    <header className="cs-header"><p className="cs-eyebrow">Piumhi · MG</p><h1>Clínicas e serviços</h1></header>

    <form className="cs-search" action="/empresas" role="search">
      <Search size={19} aria-hidden="true" />
      <input name="q" defaultValue={q} placeholder="Clínica, laboratório, farmácia..." aria-label="Buscar clínicas e serviços" autoComplete="off" enterKeyHint="search" />
      {category ? <input type="hidden" name="categoria" value={category} /> : null}
      {q ? <Link className="cs-clear" href={category ? `/empresas?categoria=${category}` : "/empresas"} aria-label="Limpar busca"><X size={17} /></Link> : null}
    </form>

    <nav className="cs-categories" aria-label="Categorias">
      {categories.map((item) => {
        const example = sample(item.key);
        return <Link key={item.key} href={item.key === category ? "/empresas" : `/empresas?categoria=${item.key}`} className={item.key === category ? "active" : undefined} aria-current={item.key === category ? "page" : undefined}>
          <span className="cs-category-icon" aria-hidden="true">{example ? <OrganizationIcon item={example} size={22} /> : null}</span>
          <strong>{item.label}</strong>
          <small>{item.count} {item.count === 1 ? "local" : "locais"}</small>
        </Link>;
      })}
    </nav>

    <div className="cs-list-head">
      <h2>{active ? active.label : q ? `Resultados para “${q}”` : "Todos os locais"}</h2>
      <span>{results.length} {results.length === 1 ? "local" : "locais"}</span>
      {active || q ? <Link href="/empresas">Ver todos</Link> : null}
    </div>

    {results.length ? <div className="cs-list">{results.map((item) => <OrganizationCard key={item.slug} item={item} address={publicAddress(item.address)} />)}</div>
      : <div className="ms-empty"><Search size={24} /><strong>Nenhum local encontrado</strong><p>Tente outro termo ou outra categoria.</p><Link href="/empresas">Ver todos os locais</Link></div>}

    <p className="cs-inclusion">Seu estabelecimento ainda não aparece no Guia Saúde? <Link href="/inclusao?tipo=organization">Solicitar inclusão</Link></p>
  </div>;
}
