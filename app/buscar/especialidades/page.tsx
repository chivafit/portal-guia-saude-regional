import Link from "next/link";
import { ArrowLeft, ChevronRight, Search, Stethoscope } from "lucide-react";
import { publicProfessionals } from "@/lib/public-professionals";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

export default async function SpecialtiesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const counts = new Map<string, number>();
  publicProfessionals.filter((item) => item.city === "Piumhi" && item.specialty).forEach((item) => {
    counts.set(item.specialty, (counts.get(item.specialty) ?? 0) + 1);
  });
  const all = Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  const visible = q ? all.filter(([label]) => normalize(label).includes(normalize(q))) : all;

  return <main className="native-specialties-screen">
    <div className="native-search-aura" aria-hidden="true" />
    <div className="native-specialties-shell">
      <header className="native-search-header">
        <Link className="native-search-back" href="/buscar" aria-label="Voltar"><ArrowLeft size={20} /></Link>
        <div className="native-search-title"><h1>Especialidades</h1><p>Explore as especialidades disponíveis no Guia Saúde em Piumhi.</p></div>
      </header>
      <form className="native-search-form" action="/buscar/especialidades" role="search">
        <Search size={19} aria-hidden="true" />
        <input name="q" defaultValue={q} autoComplete="off" enterKeyHint="search" aria-label="Buscar especialidade" placeholder="Buscar especialidade" />
        <button type="submit" aria-label="Buscar"><Search size={19} /></button>
      </form>
      <div className="native-specialties-meta"><strong>{visible.length}</strong><span>{visible.length === 1 ? "especialidade disponível" : "especialidades disponíveis"}</span></div>
      {visible.length ? <section className="native-specialties-list" aria-label="Todas as especialidades">
        {visible.map(([label, count]) => <Link key={label} href={`/buscar?especialidade=${encodeURIComponent(label)}&cidade=piumhi&tipo=professionals`}>
          <span className="native-specialties-icon"><Stethoscope size={19} /></span>
          <div><strong>{label}</strong><small>{count} {count === 1 ? "profissional" : "profissionais"}</small></div>
          <ChevronRight size={17} />
        </Link>)}
      </section> : <section className="native-empty-state"><span><Search size={24} /></span><h2>Especialidade não encontrada</h2><p>Tente outro termo. A lista mostra somente especialidades presentes nos perfis reais do guia.</p><Link href="/buscar/especialidades">Ver todas</Link></section>}
    </div>
  </main>;
}
