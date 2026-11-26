import Link from "next/link";
import { ArrowRight, BookOpen, Building2, FlaskConical, Headphones, MapPin, MessageCircle, Newspaper, Phone, Pill, Search, Stethoscope } from "lucide-react";
import { publishedProfessionals } from "@/lib/public-directory";
import { articles, magazineEditions, podcasts, professionals } from "@/lib/data";
import { FavoriteButton } from "@/components/FavoriteButton";
import { isFeaturedProfessional } from "@/lib/featured-professionals";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { ProfessionalImage } from "@/components/ProfessionalImage";

/* Home do app nativo — recriação fiel da referência de design 2b:
   contexto de cidade, busca dominante, categorias e destaque com contato. */

const shortcuts = [
  { label: "Médicos", href: "/buscar?cidade=piumhi&tipo=professionals", Icon: Stethoscope },
  { label: "Clínicas", href: "/buscar?cidade=piumhi&tipo=services&categoria=clinicas", Icon: Building2 },
  { label: "Exames", href: "/buscar?cidade=piumhi&tipo=services&q=exames", Icon: FlaskConical },
  { label: "Farmácias", href: "/buscar?cidade=piumhi&tipo=services&q=farmacia", Icon: Pill },
];

const quickSpecialties = ["Pediatria", "Oftalmologia", "Psicologia", "Odontologia", "Cardiologia", "Ginecologia", "Dermatologia", "Ortopedia"];

function initials(name: string) {
  return name.replace(/^(dr|dra|sr|sra)\.?\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function neighborhood(organization?: string | null) {
  if (!organization) return "Piumhi";
  const tail = organization.split(",").map((p) => p.trim()).filter(Boolean).at(-1) ?? "";
  return tail && tail.length <= 22 && !/\d/.test(tail) ? `${tail} · Piumhi` : "Piumhi";
}

/** Botão de contato só quando o profissional tem WhatsApp ou telefone direto confirmado. */
function directContact(whatsapp?: string, phone?: string) {
  const w = (whatsapp ?? "").replace(/\D/g, "");
  if (w.length >= 10) return <a className="gsm-pro-ic" href={`https://wa.me/${w.startsWith("55") ? w : `55${w}`}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>;
  const t = (phone ?? "").replace(/\D/g, "");
  if (t.length >= 10) return <a className="gsm-pro-ic" href={`tel:+55${t}`} aria-label="Ligar"><Phone size={18} /></a>;
  return null;
}

export async function HealthOSHome() {
  const source = await publishedProfessionals(professionals);
  const featured = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).slice(0, 2);
  const latestEpisode = podcasts.find((episode) => episode.episodeUrl || episode.audioUrl);
  const latestEdition = magazineEditions.find((edition) => edition.flipbook);
  const latestArticle = articles[0];
  return <main className="gsm-home">
    <div className="gsm-orb" aria-hidden="true" />
    <div className="gsm-shell">
      <header className="gsm-top">
        <span className="gsm-brand"><GuiaSaudeLogo compact /></span>
        <span className="gsm-city"><MapPin size={15} /> Piumhi · MG</span>
      </header>
      <p className="gsm-hello">Olá!</p>
      <h1 className="gsm-h1">Qual cuidado você procura hoje?</h1>
      <form className="gsm-search" action="/buscar" role="search">
        <input type="hidden" name="cidade" value="piumhi" />
        <Search size={20} />
        <input name="q" aria-label="Especialidade ou profissional" placeholder="Especialidade ou profissional" autoComplete="off" enterKeyHint="search" />
        <button type="submit" aria-label="Buscar"><ArrowRight size={20} /></button>
      </form>
      <nav className="gsm-cats" aria-label="Categorias de saúde">
        {shortcuts.map(({ label, href, Icon }) => <Link key={label} href={href}><Icon size={22} /><small>{label}</small></Link>)}
      </nav>
      <nav className="gsm-chips" aria-label="Especialidades mais buscadas">
        {quickSpecialties.map((item) => <Link key={item} href={`/buscar?q=${encodeURIComponent(item)}&cidade=piumhi&tipo=professionals`}>{item}</Link>)}
      </nav>
      <div className="gsm-feature-head">
        <h2>Em destaque</h2>
        <Link href="/profissionais-destaque">Ver todos</Link>
      </div>
      <div className="gsm-feature-list">
        {featured.map((p) => (
          <article className="gsm-pro" key={p.slug}>
            <span className={`gsm-pro-photo${p.imageUrl ? "" : " is-initials"}`}>
              {p.imageUrl ? <ProfessionalImage src={p.imageUrl} sizes="72px" /> : <b>{initials(p.name)}</b>}
            </span>
            <div className="gsm-pro-body">
              <small>{p.specialty}</small>
              <strong>{p.name}</strong>
              <span className="gsm-pro-loc">{neighborhood(p.organization)}</span>
              <div className="gsm-pro-actions">
                <Link className="gsm-pro-see" href={`/profissionais/${p.slug}`}>Ver perfil</Link>
                {directContact(p.locations?.[0]?.whatsapp, p.locations?.[0]?.phone)}
                <FavoriteButton compact professional={{ slug: p.slug, name: p.name, profession: p.profession, specialty: p.specialty, city: p.city, organization: p.organization, imageUrl: p.imageUrl }} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="gsm-feature-head gsm-content-head">
        <h2>Para cuidar melhor</h2>
        <Link href="/materias">Ver conteúdos</Link>
      </div>
      <nav className="gsm-content" aria-label="Conteúdos do Guia Saúde">
        {latestEpisode ? <Link href="/podcast"><Headphones size={20} /><span><small>Podcast · episódio novo</small><strong>{latestEpisode.topic}</strong></span><ArrowRight size={16} /></Link> : null}
        {latestEdition ? <Link href={`/revista/${latestEdition.slug}`}><BookOpen size={20} /><span><small>Revista · {latestEdition.number} edição</small><strong>{latestEdition.title}</strong></span><ArrowRight size={16} /></Link> : null}
        {latestArticle ? <Link href={`/materias/${latestArticle.slug}`}><Newspaper size={20} /><span><small>Matéria · {latestArticle.category}</small><strong>{latestArticle.title}</strong></span><ArrowRight size={16} /></Link> : null}
      </nav>
    </div>
  </main>;
}
