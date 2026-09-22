import Link from "next/link";
import { Activity, ArrowRight, Baby, BookOpen, Bone, Brain, Eye, Headphones, HeartPulse, MapPin, Sparkles } from "lucide-react";
import { publishedProfessionals } from "@/lib/public-directory";
import { professionals, organizations } from "@/lib/data";
import { isFeaturedProfessional } from "@/lib/featured-professionals";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { DesktopFeaturedCarousel } from "@/components/DesktopFeaturedCarousel";
import { DesktopSearchHero } from "@/components/DesktopSearchHero";

const specialties=[
  {label:"Cardiologia",q:"Cardiologia",Icon:HeartPulse},
  {label:"Pediatria",q:"Pediatria",Icon:Baby},
  {label:"Oftalmologia",q:"Oftalmologia",Icon:Eye},
  {label:"Odontologia",q:"Dentista",Icon:Activity},
  {label:"Psicologia",q:"Psicologia",Icon:Brain},
  {label:"Ortopedia",q:"Ortopedia",Icon:Bone},
];

export async function DesktopHome(){
  const source=await publishedProfessionals(professionals);
  const piumhi=source.filter(i=>i.city==="Piumhi");
  const featured=piumhi.filter(i=>isFeaturedProfessional(i.slug)).slice(0,4);
  const countFor=(q:string)=>piumhi.filter(i=>JSON.stringify(i).toLocaleLowerCase("pt-BR").includes(q.toLocaleLowerCase("pt-BR"))).length;
  return <main className="desktop-home desktop-home-reference-2a">
    <header className="desktop-nav desktop-nav-reference">
      <Link href="/" className="desktop-brand desktop-brand-new"><GuiaSaudeLogo /></Link>
      <nav><Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link><Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link><Link href="/materias">Conteúdos</Link><Link href="/podcast">Podcast</Link><Link href="/revista">Revista</Link></nav>
      <span className="desktop-city-pill"><MapPin size={17}/> Piumhi · MG</span>
      <Link className="desktop-download" href="/anuncie">Anuncie <ArrowRight size={16}/></Link>
    </header>

    <DesktopSearchHero professionalCount={piumhi.length} organizationCount={organizations.filter(i=>i.city==="Piumhi").length} />

    <section className="desktop-section desktop-specialties-reference">
      <div className="desktop-section-head"><div><span>COMECE POR AQUI</span><h2>Especialidades mais procuradas</h2></div><Link href="/buscar/especialidades?cidade=piumhi">Ver todas as especialidades <ArrowRight size={17}/></Link></div>
      <div className="desktop-specialties-grid">{specialties.map(({label,q,Icon})=><Link key={label} href={`/buscar?cidade=piumhi&tipo=professionals&q=${encodeURIComponent(q)}`}><Icon/><div><strong>{label}</strong><small>{countFor(q)} profissionais</small></div></Link>)}</div>
    </section>

    <section className="desktop-section desktop-featured">
      <div className="desktop-section-head"><div><span>SELEÇÃO GUIA SAÚDE</span><h2>Profissionais em destaque</h2></div><Link href="/profissionais-destaque">Ver todos <ArrowRight size={17}/></Link></div>
      <DesktopFeaturedCarousel professionals={featured} />
    </section>

    <section className="desktop-reference-editorial desktop-reference-editorial-2a">
      <div className="desktop-editorial-copy"><span>CONTEÚDO GUIA SAÚDE</span><h2>Informação também é cuidado.</h2><p>Matérias, entrevistas, podcast e a Revista Guia Saúde — feitos com profissionais da região.</p></div>
      <Link className="desktop-editorial-cta" href="/materias">Explorar conteúdos <ArrowRight size={16}/></Link>
      <div className="desktop-editorial-cards">
        <Link href="/materias"><BookOpen/><small>MATÉRIAS</small><strong>Conteúdo para decisões mais informadas</strong><span>12 publicações</span></Link>
        <Link href="/podcast"><Headphones/><small>PODCAST</small><strong>Conexão Saúde: conversas com quem entende</strong><span>Novos episódios</span></Link>
        <Link href="/revista"><Sparkles/><small>REVISTA</small><strong>O Guia Saúde também para folhear</strong></Link>
      </div>
    </section>

    <section className="desktop-business"><div><span>PARA PROFISSIONAIS E EMPRESAS</span><h2>Faça parte do Guia Saúde.</h2><p>Apresente seu trabalho para quem está procurando saúde na sua região.</p></div><Link href="/anuncie">Anunciar no Guia Saúde <ArrowRight size={16}/></Link></section>

    <footer className="desktop-footer"><div className="desktop-footer-top"><Link href="/" className="desktop-brand desktop-brand-new"><GuiaSaudeLogo /></Link><p>Conectando pessoas à saúde da nossa região com informação, confiança e proximidade.</p><div className="desktop-footer-links"><div><b>Encontre</b><Link href="/buscar?cidade=piumhi&tipo=professionals">Profissionais</Link><Link href="/buscar?cidade=piumhi&tipo=services">Clínicas e serviços</Link><Link href="/buscar?cidade=piumhi&tipo=services&q=farmacia">Farmácias</Link></div><div><b>Conteúdo</b><Link href="/materias">Matérias</Link><Link href="/podcast">Podcast</Link><Link href="/revista">Revista</Link></div><div><b>Guia Saúde</b><Link href="/sobre">Sobre</Link><Link href="/anuncie">Anuncie</Link><Link href="/cadastre-se">Cadastre-se</Link></div><div><b>Políticas</b><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link><Link href="/politica-editorial">Política editorial</Link></div></div></div><div className="desktop-footer-bottom"><span>© 2026 RM Produções e Eventos · Guia Saúde · Piumhi · MG</span><span>Portal informativo · não substitui avaliação profissional</span></div></footer>
  </main>
}
