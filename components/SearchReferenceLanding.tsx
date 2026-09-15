"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowLeft, Bone, Brain, HeartPulse, Search, Sparkles, Stethoscope } from "lucide-react";

const specialties = [
  { label: "Cardiologia", icon: HeartPulse, tone: "mint" },
  { label: "Dermatologia", icon: Sparkles, tone: "lime" },
  { label: "Ginecologia", icon: Stethoscope, tone: "blue" },
  { label: "Ortopedia", icon: Bone, tone: "aqua" },
  { label: "Pediatria", icon: HeartPulse, tone: "rose" },
  { label: "Psicologia", icon: Brain, tone: "violet" },
] as const;

export function SearchReferenceLanding() {
  const pathname = usePathname();
  const params = useSearchParams();
  const hasSearchState = ["q", "profissao", "especialidade", "categoria", "tipo"].some((key) => Boolean(params.get(key)));
  if (pathname !== "/buscar" || hasSearchState) return null;

  return (
    <main className="search-reference-landing" aria-label="Buscar no Guia Saúde">
      <div className="search-reference-shell">
        <Link className="search-reference-back" href="/" aria-label="Voltar para o início"><ArrowLeft size={20} /></Link>
        <header className="search-reference-heading">
          <h1>Buscar</h1>
          <p>Encontre profissionais, clínicas,<br />exames e muito mais.</p>
        </header>
        <form className="search-reference-form" action="/buscar" role="search">
          <Search size={19} aria-hidden="true" />
          <input name="q" aria-label="O que você está buscando?" placeholder="O que você está buscando?" />
          <input type="hidden" name="cidade" value="piumhi" />
          <button type="submit" aria-label="Buscar"><Search size={19} /></button>
        </form>
        <nav className="search-reference-tabs" aria-label="Modalidade de busca">
          <Link className="active" href="/buscar">Todos</Link>
          <Link href="/buscar?tipo=professionals&cidade=piumhi">Profissionais</Link>
          <Link href="/buscar?tipo=services&cidade=piumhi">Clínicas</Link>
        </nav>
        <section className="search-reference-specialties">
          <div className="search-reference-section-head"><h2>Especialidades</h2><Link href="/buscar?tipo=professionals&cidade=piumhi">Ver todos <span>›</span></Link></div>
          <div className="search-reference-grid">
            {specialties.map(({ label, icon: Icon, tone }) => (
              <Link key={label} className={`search-reference-card tone-${tone}`} href={`/buscar?q=${encodeURIComponent(label)}&cidade=piumhi&tipo=professionals`}>
                <span className="search-reference-card-icon"><Icon size={25} strokeWidth={1.7} /></span><strong>{label}</strong>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
