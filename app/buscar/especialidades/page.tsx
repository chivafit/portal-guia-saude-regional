"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight, Search, Stethoscope } from "lucide-react";
import { publicProfessionals } from "@/lib/public-professionals";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";

function normalize(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR"); }

function SpecialtiesDirectory() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const counts = new Map<string, number>();
  publicProfessionals.filter((item) => item.city === "Piumhi" && item.specialty).forEach((item) => counts.set(item.specialty, (counts.get(item.specialty) ?? 0) + 1));
  const all = Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  const visible = q ? all.filter(([label]) => normalize(label).includes(normalize(q))) : all;
  return <main className="native-specialties-screen hos-standard-screen"><div className="native-search-aura" aria-hidden="true" /><div className="native-specialties-shell hos-standard-shell">
    <HealthOSSectionHeader eyebrow="BUSCA GUIA SAÚDE" title="Especialidades" description="Explore as especialidades disponíveis no Guia Saúde em Piumhi." backHref="/buscar" meta={`${visible.length} disponíveis`} />
    <form className="native-search-form" action="/buscar/especialidades" role="search"><Search size={19} aria-hidden="true" /><input name="q" defaultValue={q} autoComplete="off" enterKeyHint="search" aria-label="Buscar especialidade" placeholder="Buscar especialidade" /><button type="submit" aria-label="Buscar"><Search size={19} /></button></form>
    {visible.length ? <section className="native-specialties-list" aria-label="Todas as especialidades">{visible.map(([label, count]) => <Link key={label} href={`/buscar?especialidade=${encodeURIComponent(label)}&cidade=piumhi&tipo=professionals`}><span className="native-specialties-icon"><Stethoscope size={19} /></span><div><strong>{label}</strong><small>{count} {count === 1 ? "profissional" : "profissionais"}</small></div><ChevronRight size={17} /></Link>)}</section> : <section className="native-empty-state"><span><Search size={24} /></span><h2>Especialidade não encontrada</h2><p>Tente outro termo. A lista mostra somente especialidades presentes nos perfis reais do guia.</p><Link href="/buscar/especialidades">Ver todas</Link></section>}
  </div></main>;
}

export default function SpecialtiesPage() { return <Suspense fallback={<main className="native-specialties-screen"><div className="native-search-loading">Carregando especialidades…</div></main>}><SpecialtiesDirectory /></Suspense>; }
