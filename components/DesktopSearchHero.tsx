import Link from "next/link";
import { ArrowRight, ChevronDown, Eye, HeartPulse, MapPin, Search } from "lucide-react";

/* Hero de busca da home desktop.
   Hoje DesktopHome abre direto no bloco editorial: não existe campo de busca
   acima da dobra, apesar de o CSS legado ter regras .desktop-hero não usadas.
   Este componente entra como primeiro filho de <main className="desktop-home">,
   imediatamente após <header className="desktop-nav">.

   O form aponta para /buscar com cidade=piumhi, igual ao form da home nativa
   em components/HealthOSHome.tsx. */

const chips = [
  { label: "Cardiologia", q: "Cardiologia" },
  { label: "Pediatria", q: "Pediatria" },
  { label: "Odontologia", q: "Dentista" },
  { label: "Exames", q: "exames" },
  { label: "Farmácias", q: "farmacia" },
];

type Stat = { value: string; label: string };
type Trending = { label: string; count: string; href: string; icon: "eye" | "pulse" };

export function DesktopSearchHero({
  professionalCount,
  organizationCount,
  trending = [
    { label: "Oftalmologia", count: "7 profissionais em Piumhi", href: "/buscar?cidade=piumhi&tipo=professionals&q=Oftalmologia", icon: "eye" },
    { label: "Fisioterapia", count: "5 profissionais em Piumhi", href: "/buscar?cidade=piumhi&tipo=professionals&q=Fisioterapia", icon: "pulse" },
  ],
  photoUrl,
}: {
  professionalCount: number;
  organizationCount: number;
  trending?: Trending[];
  photoUrl?: string;
}) {
  const stats: Stat[] = [
    { value: `${professionalCount}`, label: "profissionais publicados" },
    { value: `${organizationCount}`, label: "clínicas e serviços" },
    { value: "100%", label: "fontes públicas verificadas" },
  ];

  return (
    <section className="gs-hero">
      <div>
        <span className="gs-hero-eyebrow">GUIA DE SAÚDE DE PIUMHI E REGIÃO</span>
        <h1>Encontre o cuidado certo, <em>perto de você.</em></h1>
        <p className="gs-hero-lede">
          Profissionais, clínicas e serviços de saúde da região — com informação verificada, conteúdo e contato direto.
        </p>

        <form className="gs-hero-form" action="/buscar" role="search">
          <input type="hidden" name="cidade" value="piumhi" />
          <label className="gs-hero-field">
            <Search size={20} aria-hidden="true" />
            <input name="q" aria-label="Especialidade, profissional ou serviço" placeholder="Especialidade, profissional ou serviço" autoComplete="off" enterKeyHint="search" />
          </label>
          <span className="gs-hero-divider" aria-hidden="true" />
          <span className="gs-hero-city"><MapPin size={17} aria-hidden="true" /> Piumhi <ChevronDown size={15} aria-hidden="true" /></span>
          <button type="submit">Buscar <ArrowRight size={18} aria-hidden="true" /></button>
        </form>

        <nav className="gs-hero-chips" aria-label="Buscas frequentes">
          {chips.map((chip) => (
            <Link key={chip.label} href={`/buscar?cidade=piumhi&q=${encodeURIComponent(chip.q)}`}>{chip.label}</Link>
          ))}
        </nav>

        <div className="gs-hero-stats">
          {stats.map((stat) => (
            <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
        </div>
      </div>

      <div className="gs-hero-visual" aria-hidden={!photoUrl}>
        <div className="gs-hero-glow" />
        <div className="gs-hero-photo">
          {photoUrl ? <img src={photoUrl} alt="Atendimento de saúde em Piumhi" /> : null}
        </div>
        <div className="gs-hero-trending">
          <span>MAIS BUSCADO ESTA SEMANA</span>
          {trending.map((item) => (
            <Link href={item.href} key={item.label}>
              <i>{item.icon === "eye" ? <Eye size={22} /> : <HeartPulse size={22} />}</i>
              <span><strong>{item.label}</strong><small>{item.count}</small></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
