"use client";

import { DoctorCard } from "@/components/doctor/DoctorCard";
import { SuggestInput } from "@/components/search/SuggestInput";
import type { Suggestion } from "@/lib/search-suggestions";
import Link from "next/link";
import { useRef, type ComponentType } from "react";
import { ArrowLeft, ArrowRight, Building2, ChevronDown, Dumbbell, Eye, FlaskConical, HeartPulse, Hospital, Landmark, MapPin, Navigation, Phone, Pill, Search, SlidersHorizontal, Smile, Sparkles, Stethoscope, X } from "lucide-react";
import { isFeaturedOrganization } from "@/lib/search";
import { categoryForOrganization } from "@/lib/service-taxonomy";
import type { Organization, Professional } from "@/lib/data";

/* Busca no celular (app), no layout do design de referência:
   título curto, busca com limpar, filtros ativos como etiquetas removíveis,
   contagem e ordenação numa linha e cartões com contato direto. */

type Icon = ComponentType<{ size?: number; strokeWidth?: number }>;
type Choice = { key: string; label: string; count?: number };
type Contact = { href: string; label: string } | null;

export type MobileSearchProps = {
  q: string;
  suggestions: Suggestion[];
  typeParam: string;
  type: "todos" | "profissionais" | "servicos";
  profession: string;
  specialty: string;
  category: string;
  bairro: string;
  onlyContact: boolean;
  onlyFeatured: boolean;
  isLanding: boolean;
  professionals: Professional[];
  organizations: Organization[];
  visibleCount: number;
  onMore: () => void;
  orderBy: string;
  onOrderBy: (value: string) => void;
  professions: string[];
  specialtyChoices: string[];
  categoryChoices: Choice[];
  bairroChoices: string[];
  quickSpecialties: { label: string; query: string; Icon: Icon }[];
  clearHref: (key: string) => string;
  contactFor: (item: Professional) => Contact;
  neighborhoodOf: (organization?: string) => string;
  registrationOf: (registration?: string) => string;
  isFeatured: (slug: string) => boolean;
  publicAddress: (address?: string) => string;
};

/** Ícone da categoria da clínica ou serviço (componentes fixos, sem criar componentes na renderização). */
export function OrganizationIcon({ item, size = 24 }: { item: Organization; size?: number }) {
  const key = categoryForOrganization(item)?.key ?? "";
  switch (key) {
    case "odontologia": return <Smile size={size} />;
    case "hospitais": return <Hospital size={size} />;
    case "academias": return <Dumbbell size={size} />;
    case "pilates":
    case "fisioterapia-reabilitacao": return <HeartPulse size={size} />;
    case "farmacias": return <Pill size={size} />;
    case "oticas": return <Eye size={size} />;
    case "laboratorios": return <FlaskConical size={size} />;
    case "estetica": return <Sparkles size={size} />;
    case "servicos-publicos": return <Landmark size={size} />;
    default: return <Building2 size={size} />;
  }
}

const shortcuts: { label: string; href: string; Icon: Icon }[] = [
  { label: "Médicos", href: "/buscar?cidade=piumhi&tipo=professionals&profissao=M%C3%A9dico", Icon: Stethoscope },
  { label: "Clínicas", href: "/buscar?cidade=piumhi&tipo=services", Icon: Building2 },
  { label: "Exames", href: "/buscar?q=exames&cidade=piumhi&tipo=services", Icon: FlaskConical },
  { label: "Farmácias", href: "/buscar?categoria=farmacias&cidade=piumhi&tipo=services", Icon: Pill },
];

export function MobileSearch(props: MobileSearchProps) {
  const { q, typeParam, type, isLanding, professionals, organizations, visibleCount } = props;
  const sheet = useRef<HTMLDetailsElement>(null);
  const categoryLabel = props.categoryChoices.find((item) => item.key === props.category)?.label ?? props.category;
  const active: { key: string; label: string }[] = [
    props.profession ? { key: "profissao", label: props.profession } : null,
    props.specialty ? { key: "especialidade", label: props.specialty } : null,
    props.category ? { key: "categoria", label: categoryLabel } : null,
    props.bairro ? { key: "bairro", label: props.bairro } : null,
    props.onlyContact ? { key: "contato", label: "Com contato direto" } : null,
    props.onlyFeatured ? { key: "destaque", label: "Em destaque" } : null,
  ].filter((item): item is { key: string; label: string } => Boolean(item));
  const title = isLanding ? "Buscar" : type === "profissionais" ? "Profissionais" : type === "servicos" ? "Clínicas e serviços" : "Resultados";
  const total = professionals.length + organizations.length;
  const unit = type === "servicos" ? (total === 1 ? "serviço" : "serviços") : type === "profissionais" ? (total === 1 ? "profissional" : "profissionais") : (total === 1 ? "resultado" : "resultados");
  const visibleProfessionals = professionals.slice(0, visibleCount);
  const visibleOrganizations = organizations.slice(0, Math.max(0, visibleCount - visibleProfessionals.length));
  const hasMore = visibleProfessionals.length + visibleOrganizations.length < total;

  return <div className="ms">
    <header className="ms-header">
      <Link className="ms-back" href="/" aria-label="Voltar ao início"><ArrowLeft size={20} /></Link>
      <div><h1>{title}</h1><p>Piumhi · MG</p></div>
    </header>

    <form className="ms-search" action="/buscar" role="search">
      <Search size={19} aria-hidden="true" />
      <SuggestInput index={props.suggestions} defaultValue={q} clearable={false} placeholder="Quem você procura?" label="Especialidade, nome ou serviço" />
      <input type="hidden" name="cidade" value="piumhi" />
      {typeParam ? <input type="hidden" name="tipo" value={typeParam} /> : null}
      {q ? <Link className="ms-clear" href={props.clearHref("q")} aria-label="Limpar busca"><X size={17} /></Link> : <button type="submit" className="ms-go" aria-label="Buscar"><ArrowRight size={18} /></button>}
    </form>

      <div className="ms-chips">
        <details className="ms-filter" ref={sheet}>
          <summary><SlidersHorizontal size={16} /> Filtros{active.length ? ` · ${active.length}` : ""}</summary>
          <div className="ms-filter-backdrop" onClick={() => { if (sheet.current) sheet.current.open = false; }} />
          <form className="ms-filter-panel" action="/buscar">
            <header><div><h2>Filtros</h2><p>Encontre o cuidado que você precisa.</p></div><button type="button" aria-label="Fechar filtros" onClick={() => { if (sheet.current) sheet.current.open = false; }}><X size={18} /></button></header>
            <input type="hidden" name="cidade" value="piumhi" />
            {typeParam ? <input type="hidden" name="tipo" value={typeParam} /> : null}
            <div className="ms-filter-fields"><label>Busca<input name="q" defaultValue={q} placeholder="Nome ou especialidade" /></label>
            {type !== "servicos" ? <>
              <label>Profissão<select name="profissao" defaultValue={props.profession}><option value="">Todas</option>{props.professions.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>Especialidade<select name="especialidade" defaultValue={props.specialty}><option value="">Todas</option>{props.specialtyChoices.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>Bairro<select name="bairro" defaultValue={props.bairro}><option value="">Todos</option>{props.bairroChoices.map((item) => <option key={item}>{item}</option>)}</select></label>
            </> : null}
            {type !== "profissionais" ? <label>Tipo de serviço<select name="categoria" defaultValue={props.category}><option value="">Todos</option>{props.categoryChoices.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label> : null}
            {type !== "servicos" ? <>
              <label className="ms-check"><input type="checkbox" name="contato" value="1" defaultChecked={props.onlyContact} /> Com contato direto</label>
              <label className="ms-check"><input type="checkbox" name="destaque" value="1" defaultChecked={props.onlyFeatured} /> Perfis em destaque</label>
            </> : null}
            </div><footer className="ms-filter-footer"><button type="button" className="ms-filter-reset" onClick={(event) => { const form = event.currentTarget.form; if (!form) return; for (const field of Array.from(form.elements)) { if (field instanceof HTMLSelectElement) field.value = ""; if (field instanceof HTMLInputElement && field.type === "checkbox") field.checked = false; } }}>Limpar filtros</button><button type="submit" className="ms-filter-apply">Aplicar filtros</button></footer>
          </form>
        </details>
        {active.map((item) => <Link key={item.key} className="ms-chip" href={props.clearHref(item.key)} aria-label={`Remover filtro ${item.label}`}>{item.label}<X size={14} /></Link>)}
      </div>

    {isLanding ? <>
      <nav className="ms-shortcuts" aria-label="Atalhos">
        {shortcuts.map(({ label, href, Icon }) => <Link key={label} href={href}><Icon size={22} /><span>{label}</span></Link>)}
      </nav>
      <div className="ms-section-head"><h2>Especialidades</h2><Link href="/buscar/especialidades">Ver todas</Link></div>
      <div className="ms-specialties">
        {props.quickSpecialties.map(({ label, query, Icon }) => <Link key={label} href={query ? `/buscar?q=${encodeURIComponent(query)}&cidade=piumhi&tipo=professionals` : "/buscar/especialidades"}><span><Icon size={22} strokeWidth={1.7} /></span><strong>{label}</strong></Link>)}
      </div>
    </> : <>


      <div className="ms-count ms-results-toolbar">
        <p><strong>{total} {unit}</strong></p>
        {professionals.length > 1 ? <label className="ms-sort"><span className="sr-only">Ordenar</span><select value={props.orderBy} onChange={(event) => props.onOrderBy(event.target.value)}><option value="relevancia">Relevância</option><option value="nome">Nome (A–Z)</option></select><ChevronDown size={16} aria-hidden="true" /></label> : null}
      </div>

      {total === 0 ? <div className="ms-empty"><Search size={24} /><strong>Nada encontrado</strong><p>Tente outro termo ou remova alguns filtros.</p><Link href="/buscar?cidade=piumhi">Limpar busca</Link></div> : null}

      {visibleProfessionals.length ? <div className="ms-list">
        {type === "todos" && organizations.length ? <h2 className="ms-list-title">Profissionais</h2> : null}
        {visibleProfessionals.map((item, index) => {
          const contact = props.contactFor(item);
          const featured = props.isFeatured(item.slug);
          const neighborhood = props.neighborhoodOf(item.organization);
          const meta = [props.registrationOf(item.registration), neighborhood ? `${neighborhood}, Piumhi` : "Piumhi"].filter(Boolean).join(" · ");
          return <DoctorCard key={item.slug} item={item} meta={meta} contact={contact} featured={featured} eager={index < 2} />;
        })}
      </div> : null}

      {visibleOrganizations.length ? <div className="ms-list">
        {type === "todos" && professionals.length ? <h2 className="ms-list-title">Clínicas e serviços</h2> : null}
        {visibleOrganizations.map((item) => <OrganizationCard key={item.slug} item={item} address={props.publicAddress(item.address)} />)}
      </div> : null}

      {hasMore ? <button type="button" className="ms-more" onClick={props.onMore}>Ver mais resultados</button> : null}
      <p className="ms-inclusion">Não encontrou o que procura? <Link href={type === "servicos" ? "/inclusao?tipo=organization" : "/inclusao?tipo=professional"}>Solicitar inclusão</Link></p>
    </>}
  </div>;
}

/** Cartão de clínica ou serviço, usado na busca e em Clínicas e serviços. */
export function OrganizationCard({ item, address }: { item: Organization; address: string }) {
  const phone = (item.phone ?? "").replace(/\D/g, "");
  const neighborhood = item.neighborhood || (address.split(",").map((part) => part.trim()).filter(Boolean).at(-1) ?? "");
  const directions = item.mapUrl || (address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name}, ${address}, Piumhi - MG`)}` : "");
  return <article className={`ms-org${isFeaturedOrganization(item.slug) ? " is-featured" : ""}`}>
    <div className="ms-org-head">
      <span className="ms-org-icon" aria-hidden="true">{item.logoUrl && !item.logoUrl.startsWith("/placeholders/") ? <img src={item.logoUrl} alt="" /> : <OrganizationIcon item={item} />}</span>
      <div>{isFeaturedOrganization(item.slug) ? <span className="org-featured-label">★ Destaque</span> : null}<span className="ms-eyebrow">{item.category}</span><h3><Link href={`/empresas/${item.slug}`}>{item.name}</Link></h3></div>
    </div>
    {neighborhood || item.hours ? <p className="ms-org-meta">{neighborhood ? <span><MapPin size={15} />{neighborhood}</span> : null}{item.hours ? <span>{item.hours}</span> : null}</p> : null}
    <div className="ms-org-actions">
      {phone.length >= 10 ? <a className="ms-btn ms-btn-primary" href={`tel:+55${phone}`}><Phone size={17} />Ligar</a> : directions ? <a className="ms-btn ms-btn-primary" href={directions} target="_blank" rel="noreferrer"><Navigation size={17} />Como chegar</a> : null}
      <Link className="ms-btn ms-btn-outline" href={`/empresas/${item.slug}`}>Detalhes</Link>
    </div>
  </article>;
}
