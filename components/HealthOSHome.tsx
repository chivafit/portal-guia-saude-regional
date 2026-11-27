import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Building2, CalendarDays, FlaskConical, Headphones, Hospital, Landmark, MapPin, Mic2, Newspaper, Pill, Search, SlidersHorizontal, Smile, Stethoscope } from "lucide-react";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { publishedOrganizations, publishedProfessionals } from "@/lib/public-directory";
import { articles, magazineEditions, organizations, professionals } from "@/lib/data";
import { SuggestInput } from "@/components/search/SuggestInput";
import { buildSuggestionIndex } from "@/lib/search-suggestions";
import { whatsappLink } from "@/lib/whatsapp";
import { podcastCatalogEpisodes } from "@/lib/public-podcasts";
import { PodcastCover } from "@/components/podcast/PodcastCover";
import { isFeaturedProfessional } from "@/lib/featured-professionals";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

/* Home do app nativo — recriação fiel da referência de design 2b:
   contexto de cidade, busca dominante, categorias e destaque com contato. */

const categoryCards = [
  { label: "Médicos", hint: "Especialistas", href: "/buscar?cidade=piumhi&tipo=professionals&profissao=M%C3%A9dico", Icon: Stethoscope },
  { label: "Dentistas", hint: "Saúde bucal", href: "/buscar?cidade=piumhi&tipo=professionals&q=Dentista", Icon: Smile },
  { label: "Psicólogos", hint: "Saúde mental", href: "/buscar?cidade=piumhi&tipo=professionals&q=Psicologia", Icon: Brain },
  { label: "UBS e SUS", hint: "Rede pública", href: "/empresas?categoria=servicos-publicos", Icon: Landmark },
  { label: "Hospitais", hint: "Pronto atendimento", href: "/empresas?categoria=hospitais", Icon: Hospital },
  { label: "Clínicas", hint: "Consultórios", href: "/empresas?categoria=clinicas", Icon: Building2 },
  { label: "Farmácias", hint: "Remédios", href: "/empresas?categoria=farmacias", Icon: Pill },
  { label: "Exames", hint: "Laboratórios", href: "/empresas?categoria=laboratorios", Icon: FlaskConical },
];

const quickSpecialties = ["Pediatria", "Oftalmologia", "Psicologia", "Odontologia", "Cardiologia", "Ginecologia", "Dermatologia", "Ortopedia"];

function neighborhood(organization?: string | null) {
  if (!organization) return "Piumhi";
  const tail = organization.split(",").map((p) => p.trim()).filter(Boolean).at(-1) ?? "";
  return tail && tail.length <= 22 && !/\d/.test(tail) ? `${tail} · Piumhi` : "Piumhi";
}

/** Contato direto só quando o profissional tem WhatsApp ou telefone confirmado. */
function contactFor(whatsapp?: string, phone?: string) {
  const w = (whatsapp ?? "").replace(/\D/g, "");
  if (w.length >= 10) return { href: whatsappLink(w, "professional"), label: "WhatsApp" };
  const t = (phone ?? "").replace(/\D/g, "");
  if (t.length >= 10) return { href: `tel:+55${t}`, label: "Ligar" };
  return null;
}
function episodeDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return y && m && d ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" }).format(new Date(y, m - 1, d, 12)) : "";
}

export async function HealthOSHome() {
  const source = await publishedProfessionals(professionals);
  const featured = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).slice(0, 8);
  const latestEpisode = podcastCatalogEpisodes().find((episode) => episode.episodeUrl || episode.audioUrl);
  const suggestions = buildSuggestionIndex(source, await publishedOrganizations(organizations));
  const latestEdition = magazineEditions.find((edition) => edition.flipbook);
  const latestArticle = articles[0];
  const featuredCards = featured.slice(0, 4);
  return <main className="gsm-home hm">
    <div className="gsm-shell">
      <header className="gsm-top">
        <span className="gsm-brand"><GuiaSaudeLogo compact /></span>
        <span className="gsm-city"><MapPin size={15} /> Piumhi · MG</span>
      </header>
      <section className="hm-intro" aria-labelledby="hm-title">
        <span className="hm-hello"><span className="hm-dot" aria-hidden="true" />Olá! Guia de saúde de Piumhi</span>
        <h1 id="hm-title" className="gsm-h1 hm-title">Qual <em>cuidado</em> você procura hoje?</h1>
        <p className="hm-sub">{source.length} profissionais e serviços de saúde com contato direto.</p>
      </section>
      <div className="hm-search-row">
        <form className="gsm-search" action="/buscar" role="search">
          <input type="hidden" name="cidade" value="piumhi" />
          <Search size={20} />
          <SuggestInput index={suggestions} placeholder="Buscar profissional ou especialidade" label="Buscar profissional ou especialidade" clearable={false} />
        </form>
        <Link className="hm-filter" href="/buscar?cidade=piumhi&tipo=professionals" aria-label="Busca com filtros"><SlidersHorizontal size={20} /></Link>
      </div>


      <nav className="hm-cats" aria-label="Encontre por tipo de atendimento">
        {categoryCards.map(({ label, href, Icon, hint }) => <Link key={label} href={href}><span className="hm-cat-ic" aria-hidden="true"><Icon size={24} /></span><strong>{label}</strong><small>{hint}</small></Link>)}
      </nav>

      <div className="gsm-feature-head">
        <h2>Especialidades</h2>
        <Link href="/buscar/especialidades">Ver todas</Link>
      </div>
      <nav className="gsm-chips hm-pills" aria-label="Especialidades e serviços">
        <Link className="is-active" href="/buscar?cidade=piumhi&tipo=professionals">Todos</Link>
        {quickSpecialties.map((item) => <Link key={item} href={`/buscar?q=${encodeURIComponent(item)}&cidade=piumhi&tipo=professionals`}>{item}</Link>)}
      </nav>

      <div className="gsm-feature-head">
        <h2>Profissionais em destaque</h2>
        <Link href="/profissionais-destaque">Ver todos</Link>
      </div>
      <div className="hm-doctors">
        {featuredCards.map((p, index) => <DoctorCard key={p.slug} item={p} meta={neighborhood(p.organization)} contact={contactFor(p.locations?.[0]?.whatsapp, p.locations?.[0]?.phone)} highlight={index === 0} eager={index < 2} />)}
      </div>

      {latestEpisode ? <section className="hm-hero" aria-label="Episódio novo do podcast">
        <div className="hm-hero-top">
          <span className="hm-hero-cover"><PodcastCover episode={latestEpisode} /></span>
          <span className="hm-hero-id"><strong>{latestEpisode.guest}</strong><small>{latestEpisode.guestArea || latestEpisode.role || "Convidado do Conexão Saúde"}</small></span>
          <Link className="hm-hero-ic" href="/podcast" aria-label="Todos os episódios"><Mic2 size={20} /></Link>
        </div>
        <div className="hm-hero-info">
          <span><CalendarDays size={18} aria-hidden="true" /><span><small>Episódio novo</small>{episodeDate(latestEpisode.publishedAt)}</span></span>
          <span><Headphones size={18} aria-hidden="true" /><span><small>Podcast</small>Conexão Saúde</span></span>
        </div>
        <div className="hm-hero-actions">
          <Link className="hm-hero-btn" href={`/podcast?episodio=${encodeURIComponent(latestEpisode.slug)}`}>Ouvir agora</Link>
          <Link className="hm-hero-btn hm-hero-btn-soft" href="/podcast">Ver episódios</Link>
        </div>
      </section> : null}

      <div className="gsm-feature-head gsm-content-head">
        <h2>Para cuidar melhor</h2>
        <Link href="/materias">Ver conteúdos</Link>
      </div>
      <nav className="gsm-content" aria-label="Conteúdos do Guia Saúde">
        {latestEdition ? <Link href={`/revista/${latestEdition.slug}`}><BookOpen size={20} /><span><small>Revista · {latestEdition.number} edição</small><strong>{latestEdition.title}</strong></span><ArrowRight size={16} /></Link> : null}
        {latestArticle ? <Link href={`/materias/${latestArticle.slug}`}><Newspaper size={20} /><span><small>Matéria · {latestArticle.category}</small><strong>{latestArticle.title}</strong></span><ArrowRight size={16} /></Link> : null}
      </nav>
    </div>
  </main>;
}
