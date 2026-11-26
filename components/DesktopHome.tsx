import Link from "next/link";
import { Apple, ArrowRight, BookOpen, Building2, Headphones, Heart, Play, Search, Sparkles, Stethoscope } from "lucide-react";
import { publishedOrganizations, publishedProfessionals } from "@/lib/public-directory";
import { organizations, podcasts, professionals } from "@/lib/data";
import { isFeaturedProfessional } from "@/lib/featured-professionals";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { ProfessionalImage } from "@/components/ProfessionalImage";

function initials(name: string) {
  return name.replace(/^(dr|dra|sr|sra)\.?\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function registrationLabel(value?: string | null) {
  if (!value) return "Registro profissional";
  const label = value.split("·")[0].trim();
  return /\d/.test(label) ? label : "Registro profissional";
}

const quickSearches = [
  { label: "Cardiologia", href: "/buscar?cidade=piumhi&q=Cardiologia" },
  { label: "Pediatria", href: "/buscar?cidade=piumhi&q=Pediatria" },
  { label: "Psicologia", href: "/buscar?cidade=piumhi&q=Psicologia" },
  { label: "Odontologia", href: "/buscar?cidade=piumhi&q=Dentista" },
  { label: "Ginecologia", href: "/buscar?cidade=piumhi&q=Ginecologia" },
  { label: "Farmácias", href: "/buscar?categoria=farmacias&cidade=piumhi&tipo=services" },
  { label: "Exames", href: "/buscar?q=exames&cidade=piumhi&tipo=services" },
];

export async function DesktopHome() {
  const source = await publishedProfessionals(professionals);
  const featured = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).slice(0, 3);
  const organizationCount = (await publishedOrganizations(organizations)).length;

  return <main className="desktop-home official-home">
    <header className="official-nav">
      <Link href="/" className="official-brand"><GuiaSaudeLogo /></Link>
      <nav><Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link><Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link><Link href="/materias">Conteúdos</Link><Link href="/podcast">Podcast</Link><Link href="/revista">Revista</Link><Link href="/anuncie" prefetch={false}>Anuncie</Link></nav>
      <Link className="official-search-link" href="/buscar" aria-label="Buscar"><Search size={19}/></Link><Link className="official-nav-cta" href="/anuncie" prefetch={false}>Anuncie</Link>
    </header>

    <section className="official-search-hero">
      <div className="official-search-copy">
        <span>Piumhi e região · MG</span>
        <h1>Encontre o cuidado certo, perto de você.</h1>
        <p>Profissionais, clínicas, farmácias e exames de Piumhi, com contato direto e informações conferidas em fontes públicas.</p>
        <form action="/buscar/" role="search" className="official-search-form">
          <input type="hidden" name="cidade" value="piumhi"/>
          <label><Search size={20} aria-hidden="true"/><input name="q" placeholder="Especialidade, profissional ou serviço" aria-label="Especialidade, profissional ou serviço" autoComplete="off" enterKeyHint="search"/></label>
          <button type="submit">Buscar <ArrowRight size={17} aria-hidden="true"/></button>
        </form>
        <nav className="official-search-chips" aria-label="Buscas rápidas">{quickSearches.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
      </div>
      <dl className="official-search-stats">
        <div><dt>Profissionais</dt><dd>{source.length}</dd></div>
        <div><dt>Clínicas e serviços</dt><dd>{organizationCount}</dd></div>
        <div><dt>Episódios do podcast</dt><dd>{podcasts.length}</dd></div>
      </dl>
    </section>

    <section className="official-discovery"><div className="official-section-title"><span>Encontre o que precisa</span><h2>Saúde local, sem complicação.</h2><p>Comece por uma categoria ou pesquise diretamente pelo que você precisa.</p></div><div className="official-category-grid"><Link href="/buscar?cidade=piumhi&tipo=professionals"><Stethoscope/><div><strong>Profissionais</strong><small>Médicos e especialistas</small></div><ArrowRight/></Link><Link href="/buscar?cidade=piumhi&tipo=services"><Building2/><div><strong>Clínicas e serviços</strong><small>Atendimento perto de você</small></div><ArrowRight/></Link><Link href="/materias"><BookOpen/><div><strong>Conteúdos</strong><small>Informação para cuidar melhor</small></div><ArrowRight/></Link><Link href="/podcast"><Headphones/><div><strong>Podcast</strong><small>Conversas sobre saúde</small></div><ArrowRight/></Link></div></section>

    <section className="official-featured"><div className="official-featured-head"><div><span>Seleção Guia Saúde</span><h2>Profissionais em destaque</h2></div><Link href="/profissionais-destaque">Ver todos <ArrowRight size={15}/></Link></div><div className="official-professional-grid">{featured.map((item, index) => <Link href={`/profissionais/${item.slug}`} key={item.slug}><span className={`official-professional-photo${item.imageUrl ? "" : " is-initials"}`}>{item.imageUrl ? <ProfessionalImage src={item.imageUrl} sizes="142px" eager={index < 2}/> : initials(item.name)}</span><span className="official-professional-copy"><small>{item.specialty}</small><strong>{item.name}</strong><em>{registrationLabel(item.registration)}</em><span><b>Atendimento em Piumhi</b><ArrowRight size={16}/></span></span></Link>)}</div></section>

    <section className="official-editorial">
      <div className="official-editorial-copy"><span>Conteúdo Guia Saúde</span><h2>Informação também é cuidado.</h2><p>Matérias, entrevistas, podcast e a Revista Guia Saúde reunidos em uma experiência editorial feita para a região.</p><Link href="/materias">Explorar conteúdos <ArrowRight size={16}/></Link></div>
      <div className="official-editorial-cards"><Link href="/materias"><BookOpen/><small>Matérias</small><strong>Conteúdo para decisões mais informadas.</strong><ArrowRight/></Link><Link href="/podcast"><Headphones/><small>Podcast</small><strong>Conversas com quem entende de saúde.</strong><ArrowRight/></Link><Link href="/revista"><Sparkles/><small>Revista</small><strong>O Guia Saúde também para folhear.</strong><ArrowRight/></Link></div>
    </section>

    <section className="official-app" id="aplicativo">
      <div className="official-app-copy"><span>Guia Saúde no seu celular</span><h2>Leve sua rede de<br/>saúde <em>com você.</em></h2><p>Acesse profissionais, serviços, conteúdos, podcast e revista em uma experiência criada para o seu dia a dia.</p><div className="official-store-buttons"><span><Apple/><span><small>Em breve na</small><b>App Store</b></span></span><span><Play/><span><small>Em breve no</small><b>Google Play</b></span></span></div><div className="official-app-benefits"><span><Heart/> Salve seus profissionais</span><span><Search/> Encontre serviços rapidamente</span><span><BookOpen/> Conteúdo sempre por perto</span></div></div>
      <div className="official-app-visual" aria-label="Prévia do Guia Saúde no celular"><div className="official-app-orb"/><div className="official-app-phone"><div><small>Piumhi · MG</small><h3>Como podemos <em>cuidar de você</em></h3><span><Search/> Profissional ou serviço</span><i/><i/><i/></div></div><div className="official-app-favorite"><Heart/><span><b>Favoritos</b><small>sempre à mão</small></span></div></div>
    </section>

    <section className="official-business"><div><span>Para profissionais e empresas</span><h2>Faça parte do Guia Saúde.</h2><p>Apresente seu trabalho para pessoas que estão procurando saúde e bem-estar na sua região.</p></div><Link href="/anuncie" prefetch={false}>Anuncie no Guia Saúde <ArrowRight size={16}/></Link></section>

    

    

    

    

    

    
  </main>;
}
