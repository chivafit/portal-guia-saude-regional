import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Building2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { cities, organizations } from "@/lib/data";
import { publishedOrganizations } from "@/lib/directory";
import { pageMetadata } from "@/lib/seo";
import { cityAdCode } from "@/lib/city-utils";

export const metadata = pageMetadata(
  "Empresas e serviços",
  "Diretório regional de clínicas, laboratórios, farmácias, óticas, estética, academias e serviços de saúde.",
  "/empresas",
);

const categoryOptions = [
  "Clínica multiprofissional",
  "Laboratório",
  "Diagnóstico por imagem",
  "Clínica odontológica",
  "Hospital",
  "Farmácia",
  "Ótica",
  "Estética e bem-estar",
  "Academia e atividade física",
  "Home care",
];

const ecosystemTags = ["Clínicas", "Laboratórios", "Farmácias", "Óticas", "Estética", "Academias", "Home care", "Diagnóstico"];

type SearchParams = Promise<{ cidade?: string; categoria?: string; q?: string }>;

export default async function CompaniesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const city = params.cidade ?? "";
  const category = params.categoria ?? "";
  const q = (params.q ?? "").trim().toLowerCase();
  const activeFilters = [city, category, q ? `Busca: ${q}` : ""].filter(Boolean);
  const source = await publishedOrganizations(organizations);
  const results = source.filter((item) => {
    const haystack = [item.name, item.category, item.city, item.summary, item.services.join(" ")].join(" ").toLowerCase();
    return (!city || item.city === city) && (!category || item.category === category) && (!q || haystack.includes(q));
  });

  return (
    <>
      <SiteHeader />
      <main>
        <section className="directory-hero company-directory-hero">
          <div className="shell">
            <div className="directory-hero-grid">
              <div>
                <p className="eyebrow">Empresas e serviços</p>
                <h1>Encontre estruturas de saúde na região</h1>
                <p>Clínicas, laboratórios, farmácias, óticas, estética, academias e outros negócios ligados à saúde organizados por cidade e categoria.</p>
              </div>
              <div className="directory-note">
                <span>Diretório comercial</span>
                <strong>Perfis informativos</strong>
                <p>O portal apresenta dados de contato, serviços e localização. A validação da base será feita antes da publicação oficial.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section shell company-layout">
          <aside className="filters directory-filters company-filters">
            <h2>Refinar empresas</h2>
            <form action="/empresas">
              <label>
                Nome, serviço ou categoria
                <input name="q" defaultValue={params.q ?? ""} placeholder="Ex.: laboratório, exames..." />
              </label>
              <label>
                Cidade
                <select name="cidade" defaultValue={city}>
                  <option value="">Todas as cidades</option>
                  {cities.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                Categoria
                <select name="categoria" defaultValue={category}>
                  <option value="">Todas as categorias</option>
                  {categoryOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <button type="submit">Aplicar filtros</button>
            </form>
            <div className="filter-pills">
              {ecosystemTags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </aside>

          <div className="company-results">
            <AdSlot code={city ? cityAdCode(city) : "COMPANY_DIRECTORY_TOP"} compact />
            <div className="result-toolbar">
              <div>
                <strong>{results.length} empresas no guia</strong>
                <span>{activeFilters.length ? activeFilters.join(" · ") : "Toda a região"}</span>
              </div>
              <Link href="/inclusao">Solicitar inclusão</Link>
            </div>

            {results.length ? (
              <div className="business-card-list">
                {results.map((item) => (
                  <article className="business-card" key={item.slug}>
                    <div className="business-icon business-logo" style={{backgroundImage:`url(${item.logoUrl || "/placeholders/company-logo.svg"})`}} aria-label={`Logo de ${item.name}`}><Building2 size={0} /></div>
                    <div className="business-main">
                      <div className="business-head">
                        <div>
                          <p>{item.category}</p>
                          <h2>{item.name}</h2>
                        </div>
                        <span className="status-pill pending"><ShieldCheck size={14} /> Validação pendente</span>
                      </div>
                      <div className="doctor-pills">
                        <span><MapPin size={13} /> {item.city}</span>
                        <span>{item.address}</span>
                      </div>
                      <p className="doctor-summary">{item.services.slice(0, 2).join(" · ")}</p>
                    </div>
                    <aside className="business-side">
                      <small><Phone size={14} /> Contato</small>
                      <strong>{item.phone}</strong>
                      <Link href="/inclusao">Ver detalhes <ArrowUpRight size={14} /></Link>
                    </aside>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state company-empty">
                <h2>Nenhuma empresa nesta demonstração</h2>
                <p>Essa lacuna ajuda a priorizar novas categorias e cidades na formação da base regional.</p>
                <Link href="/empresas">Limpar filtros</Link>
              </div>
            )}
          </div>
        </section>

        <section className="section shell business-ecosystem">
          <div>
            <p className="eyebrow">Categorias previstas</p>
            <h2>Um guia para todo o ecossistema de saúde.</h2>
            <p>Além de médicos e dentistas, o portal precisa mapear empresas e serviços que influenciam a jornada de cuidado da população regional.</p>
          </div>
          <div className="ecosystem-grid">
            {ecosystemTags.map((tag) => <span key={tag}><BadgeCheck size={14} />{tag}</span>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
