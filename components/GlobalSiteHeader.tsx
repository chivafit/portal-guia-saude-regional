"use client";

import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";

const navigation = [
  { label: "Profissionais", href: "/buscar?cidade=piumhi&tipo=professionals" },
  { label: "Clínicas e serviços", href: "/buscar?cidade=piumhi&tipo=services" },
  { label: "Conteúdos", href: "/materias" },
  { label: "Podcast", href: "/podcast" },
  { label: "Revista", href: "/revista" },
  { label: "Anuncie", href: "/anuncie" },
];

export function GlobalSiteHeader() {
  const pathname = usePathname();

  // A home já possui o cabeçalho editorial próprio, exatamente igual ao aprovado.
  if (pathname === "/") return null;

  return (
    <header className="global-site-header">
      <div className="global-site-header-desktop">
        <Link href="/" className="desktop-brand desktop-brand-new" aria-label="Guia Saúde — voltar para a home">
          <GuiaSaudeLogo />
        </Link>
        <nav aria-label="Navegação principal">
          {navigation.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}
        </nav>
        <Link className="desktop-search-link" href="/buscar" aria-label="Buscar">
          <Search size={19} />
        </Link>
        <Link className="desktop-download" href="/anuncie">Anuncie</Link>
      </div>

      <div className="global-site-header-mobile">
        <span className="health-os-location" aria-label="Localização atual: Piumhi, Minas Gerais">
          <MapPin size={14} />
          <span>Piumhi · MG</span>
        </span>
        <Link href="/" className="health-os-brand-link" aria-label="Guia Saúde — voltar para a home">
          <GuiaSaudeLogo compact />
        </Link>
      </div>
    </header>
  );
}
