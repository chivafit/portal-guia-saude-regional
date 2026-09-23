import Link from "next/link";
import { Apple, ArrowRight, BookOpen, Building2, Headphones, Heart, Play, Search, Sparkles, Stethoscope } from "lucide-react";
import { publishedProfessionals } from "@/lib/public-directory";
import { professionals } from "@/lib/data";
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

export async function DesktopHome() {
  const source = await publishedProfessionals(professionals);
  const featured = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).slice(0, 3);

  return <main className="desktop-home official-home">
    <header className="official-nav">
      <Link href="/" className="official-brand"><GuiaSaudeLogo /></Link>
      <nav><Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link><Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link><Link href="/materias">Conteúdos</Link><Link href="/podcast">Podcast</Link><Link href="/revista">Revista</Link><Link href="/anuncie">Anuncie</Link></nav>
      <Link className="official-search-link" href="/buscar" aria-label="Buscar"><Search size={19}/></Link><Link className="official-nav-cta" href="/anuncie">Anuncie</Link>
    </header>

    <section className="official-editorial">
      <div className="official-editorial-copy"><span>CONTEÚDO GUIA SAÚDE</span><h1>Informação também é cuidado.</h1><p>Matérias, entrevistas, podcast e a Revista Guia Saúde reunidos em uma experiência editorial feita para a região.</p><Link href="/materias">Explorar conteúdos <ArrowRight size={16}/></Link></div>
      <div className="official-editorial-cards"><Link href="/materias"><BookOpen/><small>MATÉRIAS</small><strong>Conteúdo para decisões mais informadas.</strong><ArrowRight/></Link><Link href="/podcast"><Headphones/><small>PODCAST</small><strong>Conversas com quem entende de saúde.</strong><ArrowRight/></Link><Link href="/revista"><Sparkles/><small>REVISTA</small><strong>O Guia Saúde também para folhear.</strong><ArrowRight/></Link></div>
    </section>

    <section className="official-app" id="aplicativo">
      <div className="official-app-copy"><span>GUIA SAÚDE NO SEU CELULAR</span><h2>Leve sua rede de<br/>saúde <em>com você.</em></h2><p>Acesse profissionais, serviços, conteúdos, podcast e revista em uma experiência criada para o seu dia a dia.</p><div className="official-store-buttons"><span><Apple/><span><small>Em breve na</small><b>App Store</b></span></span><span><Play/><span><small>Em breve no</small><b>Google Play</b></span></span></div><div className="official-app-benefits"><span><Heart/> Salve seus profissionais</span><span><Search/> Encontre serviços rapidamente</span><span><BookOpen/> Conteúdo sempre por perto</span></div></div>
      <div className="official-app-visual" aria-label="Prévia do Guia Saúde no celular"><div className="official-app-orb"/><div className="official-app-phone"><div><small>PIUMHI · MG</small><h3>Como podemos <em>cuidar de você</em></h3><span><Search/> Profissional ou serviço</span><i/><i/><i/></div></div><div className="official-app-favorite"><Heart/><span><b>Favoritos</b><small>sempre à mão</small></span></div></div>
    </section>

    <section className="official-discovery"><div className="official-section-title"><span>ENCONTRE O QUE PRECISA</span><h2>Saúde local, sem complicação.</h2><p>Comece por uma categoria ou pesquise diretamente pelo que você precisa.</p></div><div className="official-category-grid"><Link href="/buscar?cidade=piumhi&tipo=professionals"><Stethoscope/><div><strong>Profissionais</strong><small>Médicos e especialistas</small></div><ArrowRight/></Link><Link href="/buscar?cidade=piumhi&tipo=services"><Building2/><div><strong>Clínicas e serviços</strong><small>Atendimento perto de você</small></div><ArrowRight/></Link><Link href="/materias"><BookOpen/><div><strong>Conteúdos</strong><small>Informação para cuidar melhor</small></div><ArrowRight/></Link><Link href="/podcast"><Headphones/><div><strong>Podcast</strong><small>Conversas sobre saúde</small></div><ArrowRight/></Link></div></section>

    <section className="official-featured"><div className="official-featured-head"><div><span>SELEÇÃO GUIA SAÚDE</span><h2>Profissionais em destaque</h2></div><Link href="/profissionais-destaque">Ver todos <ArrowRight size={15}/></Link></div><div className="official-professional-grid">{featured.map((item, index) => <Link href={`/profissionais/${item.slug}`} key={item.slug}><span className={`official-professional-photo${item.imageUrl ? "" : " is-initials"}`}>{item.imageUrl ? <ProfessionalImage src={item.imageUrl} sizes="142px" eager={index < 2}/> : initials(item.name)}</span><span className="official-professional-copy"><small>{item.specialty}</small><strong>{item.name}</strong><em>{registrationLabel(item.registration)}</em><span><b>Atendimento em Piumhi</b><ArrowRight size={16}/></span></span></Link>)}</div></section>

    <section className="official-business"><div><span>PARA PROFISSIONAIS E EMPRESAS</span><h2>Faça parte do Guia Saúde.</h2><p>Apresente seu trabalho para pessoas que estão procurando saúde e bem-estar na sua região.</p></div><Link href="/anuncie">Anuncie no Guia Saúde <ArrowRight size={16}/></Link></section>

    <footer className="official-footer"><div className="official-footer-top"><Link href="/" className="official-brand"><GuiaSaudeLogo /></Link><p>Conectando pessoas à saúde da nossa região com informação, confiança e proximidade.</p><div className="official-footer-links"><div><b>Encontre</b><Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link><Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link></div><div><b>Conteúdo</b><Link href="/materias">Matérias</Link><Link href="/podcast">Podcast</Link><Link href="/revista">Revista</Link></div><div><b>Guia Saúde</b><Link href="/anuncie">Anuncie</Link><Link href="/sobre">Sobre</Link></div></div></div><div className="official-footer-bottom"><span>© 2026 Guia Saúde. Piumhi · MG</span><nav><Link href="/privacidade">Privacidade</Link><span>·</span><Link href="/termos">Termos de uso</Link><span>·</span><Link href="/politica-editorial">Política editorial</Link><span>·</span><Link href="/correcoes">Correções</Link></nav><span>Saúde mais perto de você.</span></div></footer>
  </main>;
}
