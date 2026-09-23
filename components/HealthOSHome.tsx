import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, FlaskConical, Heart, MapPin, Phone, Pill, Search, Stethoscope } from "lucide-react";
import { publishedProfessionals } from "@/lib/public-directory";
import { professionals } from "@/lib/data";
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

function initials(name: string) {
  return name.replace(/^(dr|dra|sr|sra)\.?\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function neighborhood(organization?: string | null) {
  if (!organization) return "Piumhi";
  const tail = organization.split(",").map((p) => p.trim()).filter(Boolean).at(-1) ?? "";
  return tail && tail.length <= 22 && !/\d/.test(tail) ? `${tail} · Piumhi` : "Piumhi";
}

export async function HealthOSHome() {
  const source = await publishedProfessionals(professionals);
  const featured = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).slice(0, 2);
  return <main className="gsm-home">
    <div className="gsm-orb" aria-hidden="true" />
    <div className="gsm-shell">
      <header className="gsm-top">
        <span className="gsm-brand"><GuiaSaudeLogo compact /></span>
        <span className="gsm-city"><MapPin size={15} /> Piumhi <ChevronDown size={14} /></span>
      </header>
      <h1 className="gsm-h1">Qual cuidado você procura hoje?</h1>
      <p className="gsm-lede">Profissionais e serviços de saúde de Piumhi e região.</p>
      <form className="gsm-search" action="/buscar" role="search">
        <input type="hidden" name="cidade" value="piumhi" />
        <Search size={20} />
        <input name="q" aria-label="Especialidade ou profissional" placeholder="Especialidade ou profissional" autoComplete="off" enterKeyHint="search" />
        <button type="submit" aria-label="Buscar"><ArrowRight size={20} /></button>
      </form>
      <nav className="gsm-cats" aria-label="Categorias de saúde">
        {shortcuts.map(({ label, href, Icon }) => <Link key={label} href={href}><Icon size={22} /><small>{label}</small></Link>)}
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
                <Link className="gsm-pro-ic" href={`/profissionais/${p.slug}`} aria-label={`Contato de ${p.name}`}><Phone size={18} /></Link>
                <Link className="gsm-pro-ic" href={`/profissionais/${p.slug}`} aria-label={`Salvar ${p.name}`}><Heart size={18} /></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </main>;
}
