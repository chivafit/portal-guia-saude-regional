import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço acessado não existe ou foi alterado.",
};

export default function NotFound() {
  return <><SiteHeader /><main className="not-found-page"><section className="shell"><p className="eyebrow">Erro 404</p><h1>Página não encontrada</h1><p>O endereço acessado não existe ou foi alterado.</p><div><Link href="/">Voltar ao início</Link><Link href="/buscar/"><Search size={16} /> Encontrar profissionais</Link><Link href="/materias/">Ver conteúdos</Link></div></section></main><SiteFooter /></>;
}
