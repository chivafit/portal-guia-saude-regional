import Link from "next/link";
import { ArrowRight, ChevronDown, Eye, HeartPulse, MapPin, Search } from "lucide-react";

const chips=[{label:"Cardiologia",q:"Cardiologia"},{label:"Pediatria",q:"Pediatria"},{label:"Odontologia",q:"Dentista"},{label:"Exames",q:"exames"},{label:"Farmácias",q:"farmacia"}];
type Trending={label:string;count:string;href:string;icon:"eye"|"pulse"};
export function DesktopSearchHero({professionalCount,organizationCount,trending=[{label:"Oftalmologia",count:"7 profissionais em Piumhi",href:"/buscar?cidade=piumhi&tipo=professionals&q=Oftalmologia",icon:"eye"},{label:"Fisioterapia",count:"5 profissionais em Piumhi",href:"/buscar?cidade=piumhi&tipo=professionals&q=Fisioterapia",icon:"pulse"}],photoUrl}:{professionalCount:number;organizationCount:number;trending?:Trending[];photoUrl?:string}){
 return <section className="ref-home-hero">
  <div className="ref-home-hero-copy">
   <span className="ref-home-desktop-kicker">GUIA DE SAÚDE DE PIUMHI E REGIÃO</span>
   <span className="ref-home-mobile-kicker">Olá!</span>
   <h1 className="ref-home-desktop-title">Encontre o cuidado certo, <em>perto de você.</em></h1>
   <h1 className="ref-home-mobile-title">Qual cuidado você<br/><em>procura hoje?</em></h1>
   <p className="ref-home-lede">Profissionais, clínicas e serviços de saúde da região — com informação verificada, conteúdo e contato direto.</p>
   <form className="ref-home-search" action="/buscar" role="search"><input type="hidden" name="cidade" value="piumhi"/><label><Search size={20}/><input name="q" aria-label="Especialidade, profissional ou serviço" placeholder="Especialidade, profissional ou serviço"/></label><span className="ref-home-search-divider"/><span className="ref-home-search-city"><MapPin size={17}/> Piumhi <ChevronDown size={15}/></span><button type="submit"><span>Buscar</span><ArrowRight size={18}/></button></form>
   <nav className="ref-home-chips" aria-label="Buscas frequentes">{chips.map(c=><Link key={c.label} href={`/buscar?cidade=piumhi&q=${encodeURIComponent(c.q)}`}>{c.label}</Link>)}</nav>
   <div className="ref-home-stats"><div><strong>{professionalCount}</strong><span>profissionais publicados</span></div><div><strong>{organizationCount}</strong><span>clínicas e serviços</span></div><div><strong>100%</strong><span>fontes públicas verificadas</span></div></div>
  </div>
  <div className="ref-home-hero-visual"><div className="ref-home-glow"/><div className="ref-home-photo">{photoUrl?<img src={photoUrl} alt="Atendimento de saúde em Piumhi"/>:null}</div><div className="ref-home-trending"><span>MAIS BUSCADO ESTA SEMANA</span>{trending.map(i=><Link href={i.href} key={i.label}><i>{i.icon==="eye"?<Eye size={22}/>:<HeartPulse size={22}/>}</i><b><strong>{i.label}</strong><small>{i.count}</small></b></Link>)}</div></div>
 </section>
}