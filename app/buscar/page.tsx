"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, BadgeCheck, Building2, MapPin, Phone, ShieldCheck, SlidersHorizontal, Stethoscope, X } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizations, professions, professionals } from "@/lib/data";
import { ProfessionIcon } from "@/components/ProfessionIcon";
import { filterOrganizations, filterProfessionals } from "@/lib/search";
import { categoryOptionsFor } from "@/lib/service-taxonomy";
import { cityAdCode } from "@/lib/city-utils";
import { ResponsiveFilterDisclosure } from "@/components/ResponsiveFilterDisclosure";

function param(value: string | null): string {
  return value ?? "";
}

function directContact(whatsapp?: string, phone?: string) {
  const whatsappDigits = (whatsapp ?? "").replace(/\D/g, "");
  if (whatsappDigits.length >= 10) return { href: `https://wa.me/${whatsappDigits.startsWith("55") ? whatsappDigits : `55${whatsappDigits}`}`, label: "WhatsApp" };
  const phoneDigits = (phone ?? "").replace(/\D/g, "");
  if (phoneDigits.length >= 10) return { href: `tel:+55${phoneDigits}`, label: "Ligar" };
  return null;
}

function SearchDirectory() {
  const params = useSearchParams();
  const q = param(params.get("q"));
  const requestedCity = param(params.get("cidade"));
  const city = requestedCity && requestedCity.toLocaleLowerCase("pt-BR") !== "piumhi" ? "" : "Piumhi";
  const profession = param(params.get("profissao"));
  const specialty = param(params.get("especialidade"));
  const category = param(params.get("categoria"));
  const typeParam = param(params.get("tipo"));
  const type = ({ profissionais: "profissionais", professionals: "profissionais", empresas: "servicos", services: "servicos" }[typeParam] ?? "todos") as
    | "todos"
    | "profissionais"
    | "servicos";

  const filters = { query: q, city, profession, specialty, category, type };
  const professionalSource = professionals.filter((item) => item.city === "Piumhi");
  const organizationSource = organizations.filter((item) => item.city === "Piumhi");
  const hasProfessionalFocus = Boolean(profession || specialty);

  const professionalResults = type === "servicos" ? [] : filterProfessionals(professionalSource, filters);
  const organizationResults =
    type === "profissionais" || (type === "todos" && hasProfessionalFocus)
      ? []
      : filterOrganizations(organizationSource, filters);
  const total = professionalResults.length + organizationResults.length;
  const showDirectoryLanding = !q && !profession && !specialty && !category && type === "todos";

  const serviceCategoryOptions = categoryOptionsFor(organizationSource);
  const cityProfessionals = filterProfessionals(professionalSource, { city });
  const cityOrganizations = filterOrganizations(organizationSource, { city });
  const specialtyChoices = Array.from(
    new Set(
      cityProfessionals
        .filter((item) => !profession || item.profession === profession)
        .map((item) => item.specialty)
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const professionChoices = professions
    .map((name) => ({ name, count: cityProfessionals.filter((item) => item.profession === name).length }))
    .filter((item) => item.count > 0);
  const categoryChoices = categoryOptionsFor(cityOrganizations).sort((a, b) => b.count - a.count);

  // Nas abas Profissionais/Empresas, escolher a área antes de listar (evita lista longa).
  const showProfessionChooser = type === "profissionais" && !profession && !specialty && !q && professionChoices.length > 0;
  const showCategoryChooser = type === "servicos" && !category && !q && categoryChoices.length > 0;

  const activeFilters = [
    q && { label: `Busca: ${q}`, key: "q" },
    city && { label: city, key: "cidade" },
    profession && { label: profession, key: "profissao" },
    specialty && { label: specialty, key: "especialidade" },
    category && { label: category, key: "categoria" },
  ].filter(Boolean) as { label: string; key: string }[];
  const typeTabs: { value: typeof type; label: string }[] = [
    { value: "todos", label: "Tudo" },
    { value: "profissionais", label: "Profissionais" },
    { value: "servicos", label: "Clínicas e serviços" },
  ];

  function tabHref(value: string) {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (city) search.set("cidade", city);
    if (profession) search.set("profissao", profession);
    if (specialty) search.set("especialidade", specialty);
    if (category) search.set("categoria", category);
    if (value !== "todos") search.set("tipo", value === "servicos" ? "services" : "professionals");
    const query = search.toString();
    return query ? `/buscar?${query}` : "/buscar";
  }

  function removeFilterHref(key: string) {
    const search = new URLSearchParams();
    if (q && key !== "q") search.set("q", q);
    if (city) search.set("cidade", city);
    if (profession && key !== "profissao") search.set("profissao", profession);
    if (specialty && key !== "especialidade" && key !== "profissao") search.set("especialidade", specialty);
    if (category && key !== "categoria") search.set("categoria", category);
    if (key === "cidade") search.delete("cidade");
    if (type !== "todos") search.set("tipo", type === "servicos" ? "services" : "professionals");
    const query = search.toString();
    return query ? `/buscar?${query}` : "/buscar";
  }

  function choiceHref(kind: "profissao" | "categoria", value: string) {
    const search = new URLSearchParams();
    if (city) search.set("cidade", city);
    search.set(kind, value);
    search.set("tipo", kind === "profissao" ? "professionals" : "services");
    return `/buscar?${search.toString()}`;
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="directory-hero directory-hero-refined">
          <div className="shell">
            <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: city || "Todas as cidades" }, { label: "Encontrar atendimento" }]} />
            <div className="directory-hero-refined-head">
              <p className="eyebrow">Encontre atendimento</p>
              <div>
                <span>{city || "Região"}</span>
              </div>
            </div>
            <h1>Encontre profissionais e empresas de saúde</h1>
            <p>Busque por especialidade, nome, clínica, exame ou cidade. O portal exibe contatos e perfis informativos, sem agendamento online.</p>
          </div>
        </section>

        <section className="section shell results-layout doctoralia-layout">
          <aside className="filters directory-filters">
            <ResponsiveFilterDisclosure>
              <summary><SlidersHorizontal size={18} /> Filtrar resultados</summary>
              <div className="filter-panel">
              <form action="/buscar">
              <label>
                Especialidade, nome, exame ou serviço
                <input name="q" defaultValue={q} placeholder="Ex.: cardiologia, laboratório" />
              </label>
              <label>
                Cidade
                <select name="cidade" defaultValue={city}>
                  <option value="">Selecione</option>
                  <option value="Piumhi">Piumhi</option>
                </select>
              </label>
              <label>
                Categoria profissional
                <select name="profissao" defaultValue={profession}>
                  <option value="">Todas as categorias</option>
                  {professions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                Especialidade
                <select name="especialidade" defaultValue={specialty}>
                  <option value="">Todas as especialidades</option>
                  {specialtyChoices.map((item) => <option key={item}>{item}</option>)}
                </select>
                <small className="filter-help">
                  {profession
                    ? `Especialidades de ${profession.toLowerCase()}`
                    : "Escolha Médico ou Dentista acima para reduzir esta lista"}
                </small>
              </label>
              <label>
                Tipo de empresa
                <select name="categoria" defaultValue={category}>
                  <option value="">Todas as empresas</option>
                  {serviceCategoryOptions.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </label>
              {type !== "todos" ? <input type="hidden" name="tipo" value={type === "servicos" ? "services" : "professionals"} /> : null}
              <button type="submit">Aplicar filtros</button>
              </form>
              </div>
              <div className="filter-pills">
                <span><ShieldCheck size={13} /> Sem agendamento</span>
                <span><BadgeCheck size={13} /> Perfis revisados</span>
              </div>
            </ResponsiveFilterDisclosure>
          </aside>

          <div className="results directory-results">
            <AdSlot code={city ? cityAdCode(city) : "DIRECTORY_TOP"} compact />

            <div className="search-type-tabs">
              {typeTabs.map((tab) => (
                <Link key={tab.value} href={tabHref(tab.value)} className={type === tab.value ? "active" : ""}>
                  {tab.label}
                </Link>
              ))}
            </div>

            {activeFilters.length ? (
              <div className="active-filter-row" aria-label="Filtros selecionados">
                {activeFilters.map((filter) => (
                  <Link key={filter.key} href={removeFilterHref(filter.key)}>
                    {filter.label} <X size={13} aria-label="Remover filtro" />
                  </Link>
                ))}
                <Link href="/buscar" className="clear-filters">Limpar filtros</Link>
              </div>
            ) : null}

            {showDirectoryLanding ? (
              <section className="directory-choice-hub">
                <div className="directory-choice-intro">
                  <p className="eyebrow">Por onde você quer começar?</p>
                  <h2>Escolha o tipo de atendimento</h2>
                  <p>Os cadastros aparecem somente depois que você selecionar uma área ou fizer uma busca.</p>
                </div>
                <div className="directory-choice-columns">
                  <article>
                    <div className="directory-choice-title">
                      <span><Stethoscope size={20} /></span>
                      <div><strong>Profissionais</strong><small>Escolha a especialidade</small></div>
                    </div>
                    <div className="directory-choice-links">
                      {professionChoices.map((item) => (
                        <Link key={item.name} href={choiceHref("profissao", item.name)}>
                          <span>{item.name}</span><ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                    <Link className="directory-choice-all" href={tabHref("profissionais")}>Ver todos os profissionais</Link>
                  </article>
                  <article>
                    <div className="directory-choice-title">
                      <span><Building2 size={20} /></span>
                      <div><strong>Clínicas e serviços</strong><small>Escolha a categoria</small></div>
                    </div>
                    <div className="directory-choice-links">
                      {categoryChoices.slice(0, 9).map((item) => (
                        <Link key={item.key} href={choiceHref("categoria", item.key)}>
                          <span>{item.label}</span><ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                    <Link className="directory-choice-all" href={tabHref("servicos")}>Ver todas as clínicas e serviços</Link>
                  </article>
                </div>
              </section>
            ) : null}

            {showProfessionChooser ? (
              <section className="directory-choice-hub">
                <div className="directory-choice-intro">
                  <p className="eyebrow">Escolha uma especialidade</p>
                  <h2>Qual profissional você procura?</h2>
                  <p>Selecione a área para ver os profissionais{city ? ` de ${city}` : ""}.</p>
                </div>
                <div className="directory-choice-columns single">
                  <article>
                    <div className="directory-choice-title">
                      <span><Stethoscope size={20} /></span>
                      <div><strong>Profissionais</strong><small>Escolha a especialidade</small></div>
                    </div>
                    <div className="directory-choice-links choice-grid">
                      {professionChoices.map((item) => (
                        <Link key={item.name} href={choiceHref("profissao", item.name)}>
                          <span>{item.name}</span><ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                  </article>
                </div>
              </section>
            ) : null}

            {showCategoryChooser ? (
              <section className="directory-choice-hub">
                <div className="directory-choice-intro">
                  <p className="eyebrow">Escolha uma categoria</p>
                  <h2>Que tipo de estabelecimento?</h2>
                  <p>Selecione a categoria para ver as clínicas e serviços{city ? ` de ${city}` : ""}.</p>
                </div>
                <div className="directory-choice-columns single">
                  <article>
                    <div className="directory-choice-title">
                      <span><Building2 size={20} /></span>
                      <div><strong>Clínicas e serviços</strong><small>Escolha a categoria</small></div>
                    </div>
                    <div className="directory-choice-links choice-grid">
                      {categoryChoices.map((item) => (
                        <Link key={item.key} href={choiceHref("categoria", item.key)}>
                          <span>{item.label}</span><ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                  </article>
                </div>
              </section>
            ) : null}

            {!showDirectoryLanding && !showProfessionChooser && !showCategoryChooser && total === 0 ? (
              <div className="empty-state">
                <h2>Nenhum resultado encontrado</h2>
                <p>Tente buscar em todas as cidades, usar um termo mais amplo ou limpar os filtros selecionados.</p>
                <div className="empty-state-actions">
                  <Link href="/buscar">Limpar filtros</Link>
                  <Link href="/inclusao">Indicar um profissional</Link>
                </div>
              </div>
            ) : null}

            {!showDirectoryLanding && !showProfessionChooser && professionalResults.length ? (
              <>
                {type === "todos" ? <h3 className="results-group-title">Profissionais</h3> : null}
                <div className="doctor-card-list">
                  {professionalResults.map((item) => {
                    const contact = directContact(item.whatsapp, item.phone);
                    return <article className="doctor-card" key={item.slug}>
                      <div className="doctor-avatar doctor-profession-icon" aria-hidden="true">
                        <ProfessionIcon profession={item.profession} />
                      </div>
                      <div className="doctor-main">
                        <div className="doctor-card-head">
                          <div>
                            <p>{item.profession}</p>
                            <h2>{item.name}</h2>
                          </div>
                          <span className={item.verified ? "status-pill verified" : "status-pill pending"}>
                            {item.verified ? <BadgeCheck size={14} /> : <ShieldCheck size={14} />}
                            {item.verified ? "Verificado" : "Cadastro em revisão"}
                          </span>
                        </div>
                        <div className="doctor-pills">
                          <span><MapPin size={13} /> {item.city}</span>
                          <span>{item.specialty}</span>
                        </div>
                        <p className="doctor-summary">{item.organization}</p>
                      </div>
                      <aside className="doctor-side">
                        {contact ? <a className="direct-contact-btn" href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noreferrer" : undefined}><Phone size={14} /> {contact.label}</a> : <span className="contact-pending">Contato em validação</span>}
                        <Link href={`/profissionais/${item.slug}`}>Ver perfil <ArrowUpRight size={14} /></Link>
                      </aside>
                    </article>;
                  })}
                </div>
              </>
            ) : null}

            {!showDirectoryLanding && !showCategoryChooser && organizationResults.length ? (
              <>
                {type === "todos" ? <h3 className="results-group-title">Clínicas e serviços</h3> : null}
                <div className="business-card-list">
                  {organizationResults.map((item) => {
                    const contact = directContact(undefined, item.phone);
                    return <article className="business-card" key={item.slug}>
                      <div
                        className="business-icon business-logo"
                        style={{ backgroundImage: `url(${item.logoUrl || "/placeholders/company-logo.svg"})` }}
                        aria-label={`Logo de ${item.name}`}
                      />
                      <div className="business-main">
                        <div className="business-head">
                          <div>
                            <p>{item.category}</p>
                            <h2>{item.name}</h2>
                          </div>
                          <span className="status-pill verified"><BadgeCheck size={14} /> Dados publicados</span>
                        </div>
                        <div className="doctor-pills">
                          <span><MapPin size={13} /> {item.city}</span>
                          <span>{item.address}</span>
                        </div>
                        <p className="doctor-summary">{item.services.slice(0, 2).join(" · ")}</p>
                      </div>
                      <aside className="business-side">
                        <small><Phone size={14} /> Contato</small>
                        {contact ? <a className="direct-contact-btn" href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noreferrer" : undefined}><Phone size={14} /> {contact.label}</a> : null}
                        <Link href={`/empresas/${item.slug}`}>Ver detalhes <ArrowUpRight size={14} /></Link>
                      </aside>
                    </article>;
                  })}
                </div>
                <div className="directory-inclusion-call">
                  <p>Seu estabelecimento ainda não aparece no Guia Saúde?</p>
                  <Link href="/inclusao?tipo=organization">Solicitar inclusão <ArrowUpRight size={14} /></Link>
                </div>
              </>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="section shell"><p>Carregando busca…</p></main>}>
      <SearchDirectory />
    </Suspense>
  );
}
