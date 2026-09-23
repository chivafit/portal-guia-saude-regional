import Link from "next/link";
import { Activity, ArrowRight, Baby, Bone, BookOpen, Brain, Eye, Headphones, HeartPulse, MapPin, Phone, Sparkles } from "lucide-react";
import { publishedProfessionals } from "@/lib/public-directory";
import { organizations, professionals } from "@/lib/data";
import { isFeaturedProfessional } from "@/lib/featured-professionals";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { DesktopSearchHero } from "@/components/DesktopSearchHero";
import { ProfessionalImage } from "@/components/ProfessionalImage";
import { HomeFooter } from "@/components/HomeFooter";

/* Home desktop — recriação fiel da referência de design 2a:
   hero de busca, especialidades mais procuradas, profissionais em destaque,
   faixa editorial e rodapé institucional. */

const specialtyDefs = [
  { label: "Cardiologia", Icon: HeartPulse, re: /cardio/i },
  { label: "Pediatria", Icon: Baby, re: /pediatr/i },
  { label: "Oftalmologia", Icon: Eye, re: /oftalmo/i },
  { label: "Odontologia", Icon: Activity, re: /odonto|dentist|dr[ií]a?\.?\s|dente/i },
  { label: "Psicologia", Icon: Brain, re: /psicolog/i },
  { label: "Ortopedia", Icon: Bone, re: /ortoped/i },
] as const;

function initials(name: string) {
  return name.replace(/^(dr|dra|sr|sra)\.?\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function registrationLabel(registration?: string | null) {
  if (!registration) return "Atendimento em Piumhi";
  const body = registration.split("·")[0].trim();
  return /\d/.test(body) ? `${body} · Atendimento em Piumhi` : "Atendimento em Piumhi";
}

export async function DesktopHome() {
  const source = await publishedProfessionals(professionals);
  const piumhi = source.filter((i) => i.city === "Piumhi");
  const featured = piumhi.filter((i) => isFeaturedProfessional(i.slug)).slice(0, 4);
  const specialties = specialtyDefs
    .map(({ label, Icon, re }) => ({ label, Icon, count: piumhi.filter((p) => re.test(`${p.specialty} ${p.profession}`)).length }))
    .filter((s) => s.count > 0)
    .slice(0, 6);
  const organizationCount = organizations.filter((i) => i.city === "Piumhi").length;

  return <main className="desktop-home gsd-home">
    <header className="gsd-nav">
      <Link href="/" className="gsd-brand"><GuiaSaudeLogo /></Link>
      <nav className="gsd-links">
        <Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link>
        <Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link>
        <Link href="/materias">Conteúdos</Link>
        <Link href="/podcast">Podcast</Link>
        <Link href="/revista">Revista</Link>
      </nav>
      <span className="gsd-city"><MapPin size={17} /> Piumhi · MG</span>
      <Link className="gsd-cta" href="/anuncie">Anuncie <ArrowRight size={16} /></Link>
    </header>

    <DesktopSearchHero professionalCount={piumhi.length} organizationCount={organizationCount} />

    <section className="gsd-section">
      <div className="gsd-head">
        <div><span>COMECE POR AQUI</span><h2>Especialidades mais procuradas</h2></div>
        <Link href="/buscar/especialidades">Ver todas as especialidades <ArrowRight size={17} /></Link>
      </div>
      <div className="gsd-spec-grid">
        {specialties.map(({ label, Icon, count }) => (
          <Link key={label} href={`/buscar?cidade=piumhi&tipo=professionals&q=${encodeURIComponent(label)}`}>
            <Icon /><div><strong>{label}</strong><small>{count} {count === 1 ? "profissional" : "profissionais"}</small></div>
          </Link>
        ))}
      </div>
    </section>

    <section className="gsd-section">
      <div className="gsd-head">
        <div><span>SELEÇÃO GUIA SAÚDE</span><h2>Profissionais em destaque</h2></div>
        <Link href="/profissionais-destaque">Ver todos <ArrowRight size={17} /></Link>
      </div>
      <div className="gsd-pro-grid">
        {featured.map((p, i) => (
          <article className="gsd-pro-card" key={p.slug}>
            <div className={`gsd-pro-photo${p.imageUrl ? "" : " is-initials"}`}>
              {p.imageUrl ? <ProfessionalImage src={p.imageUrl} sizes="300px" eager={i < 2} /> : <span>{initials(p.name)}</span>}
              {i === 0 ? <span className="gsd-pro-badge">DESTAQUE</span> : null}
            </div>
            <div className="gsd-pro-body">
              <small>{p.specialty}</small>
              <h3>{p.name}</h3>
              <p>{registrationLabel(p.registration)}</p>
              <div className="gsd-pro-actions">
                <Link className="gsd-pro-see" href={`/profissionais/${p.slug}`}>Ver perfil</Link>
                <Link className="gsd-pro-phone" href={`/profissionais/${p.slug}`} aria-label={`Contato de ${p.name}`}><Phone size={18} /></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="gsd-editorial">
      <div className="gsd-editorial-glow" aria-hidden="true" />
      <div className="gsd-editorial-head">
        <div>
          <span>CONTEÚDO GUIA SAÚDE</span>
          <h2>Informação também é cuidado.</h2>
          <p>Matérias, entrevistas, podcast e a Revista Guia Saúde — feitos com profissionais da região.</p>
        </div>
        <Link href="/materias">Explorar conteúdos <ArrowRight size={17} /></Link>
      </div>
      <div className="gsd-editorial-grid">
        <Link href="/materias" className="gsd-ed-card"><span className="gsd-ed-cover"><BookOpen /></span><div><small>MATÉRIAS</small><strong>Conteúdo para decisões mais informadas</strong><span>Explorar matérias</span></div></Link>
        <Link href="/podcast" className="gsd-ed-card"><span className="gsd-ed-cover"><Headphones /></span><div><small>PODCAST</small><strong>Conexão Saúde: conversas com quem entende</strong><span>Novos episódios</span></div></Link>
        <Link href="/revista" className="gsd-ed-card"><span className="gsd-ed-cover"><Sparkles /></span><div><small>REVISTA</small><strong>O Guia Saúde também para folhear</strong><span>Edição atual</span></div></Link>
      </div>
    </section>

    <section className="gsd-business">
      <div><span>PARA PROFISSIONAIS E EMPRESAS</span><h2>Faça parte do Guia Saúde.</h2><p>Apresente seu trabalho para quem está procurando saúde na sua região.</p></div>
      <Link href="/anuncie">Anunciar no Guia Saúde <ArrowRight size={18} /></Link>
    </section>

    <HomeFooter />
  </main>;
}
