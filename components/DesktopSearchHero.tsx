import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";
import { ProfessionalImage } from "@/components/ProfessionalImage";

const chips = [
  { label: "Cardiologia", q: "Cardiologia" },
  { label: "Pediatria", q: "Pediatria" },
  { label: "Odontologia", q: "Dentista" },
  { label: "Exames", q: "exames" },
  { label: "Farmácias", q: "farmacia" },
];

type HeroProfessional = {
  slug: string;
  name: string;
  specialty: string;
  registration?: string;
  organization?: string;
  imageUrl?: string;
};

export function DesktopSearchHero({ professionalCount, organizationCount, professionals = [] }: { professionalCount:number; organizationCount:number; professionals?:HeroProfessional[] }) {
  const stats = [
    { value: `${professionalCount}`, label: "profissionais publicados" },
    { value: `${organizationCount}`, label: "clínicas e serviços" },
    { value: "Piumhi", label: "diretório local" },
  ];
  const spotlight = professionals.slice(0, 3);

  return <section className="gs-hero">
    <div>
      <span className="gs-hero-eyebrow">GUIA DE SAÚDE DE PIUMHI E REGIÃO</span>
      <h1>Encontre o cuidado certo, <em>perto de você.</em></h1>
      <p className="gs-hero-lede">Profissionais, clínicas e serviços de saúde da região, com informação organizada e contato direto.</p>
      <form className="gs-hero-form" action="/buscar" role="search">
        <input type="hidden" name="cidade" value="piumhi" />
        <label className="gs-hero-field"><Search size={20} aria-hidden="true"/><input name="q" aria-label="Especialidade, profissional ou serviço" placeholder="Especialidade, profissional ou serviço" autoComplete="off" enterKeyHint="search" /></label>
        <span className="gs-hero-divider" aria-hidden="true" />
        <span className="gs-hero-city"><MapPin size={17} aria-hidden="true"/> Piumhi <ChevronDown size={15} aria-hidden="true"/></span>
        <button type="submit">Buscar <ArrowRight size={18} aria-hidden="true"/></button>
      </form>
      <nav className="gs-hero-chips" aria-label="Buscas frequentes">{chips.map(chip=><Link key={chip.label} href={`/buscar?cidade=piumhi&q=${encodeURIComponent(chip.q)}`}>{chip.label}</Link>)}</nav>
      <div className="gs-hero-stats">{stats.map(stat=><div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </div>

    <aside className="gs-hero-directory" aria-label="Profissionais em destaque no Guia Saúde">
      <div className="gs-hero-directory-head"><span>NO GUIA SAÚDE</span><strong>Profissionais da região</strong><Link href="/profissionais-destaque">Ver todos <ArrowRight size={14}/></Link></div>
      <div className="gs-hero-directory-list">{spotlight.map((item,index)=><Link className="gs-hero-person" href={`/profissionais/${item.slug}`} key={item.slug}>
        <ProfessionalImage src={item.imageUrl} alt={item.name} name={item.name} priority={index===0}/>
        <span><strong>{item.name}</strong><small>{item.specialty}</small>{item.registration?<em>{item.registration}</em>:item.organization?<em>{item.organization}</em>:null}</span>
        <ArrowRight size={16}/>
      </Link>)}</div>
      <Link className="gs-hero-directory-search" href="/buscar?cidade=piumhi&tipo=professionals"><Search size={16}/> Buscar todos os profissionais</Link>
    </aside>
  </section>;
}
