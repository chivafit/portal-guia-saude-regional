"use client";

import Link from "next/link";
import { BookOpen, Home, Mic2, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const searchHref = "/buscar?cidade=piumhi";

export function AppBottomNav() {
  const pathname = usePathname();
  const homeActive = pathname === "/" || pathname.startsWith("/cidades/");
  const searchActive = pathname.startsWith("/buscar") || pathname.startsWith("/profissionais/") || pathname.startsWith("/empresas/");
  const podcastActive = pathname.startsWith("/podcast");
  const magazineActive = pathname.startsWith("/revista");

  return <nav className="app-bottom-nav health-os-dock" aria-label="Navegação do aplicativo">
    <Link href="/" aria-current={homeActive ? "page" : undefined}><span className="app-bottom-nav-icon"><Home size={20} strokeWidth={homeActive?2.4:1.8}/></span><span>Início</span></Link>
    <Link href="/podcast" aria-current={podcastActive ? "page" : undefined}><span className="app-bottom-nav-icon"><Mic2 size={20} strokeWidth={podcastActive?2.4:1.8}/></span><span>Podcast</span></Link>
    <Link href={searchHref} className={`health-os-brand-action health-os-search-action${searchActive?" is-active":""}`} aria-label="Buscar profissionais, clínicas e serviços" aria-current={searchActive?"page":undefined}><span className="health-os-liquid-orb" aria-hidden="true"><i/><b/><Search size={24}/></span><span className="health-os-orb-label">Buscar</span></Link>
    <Link href="/revista" aria-current={magazineActive ? "page" : undefined}><span className="app-bottom-nav-icon"><BookOpen size={20} strokeWidth={magazineActive?2.4:1.8}/></span><span>Revista</span></Link>
    <Link href={searchHref} aria-current={searchActive ? "page" : undefined}><span className="app-bottom-nav-icon"><Search size={20} strokeWidth={searchActive?2.4:1.8}/></span><span>Explorar</span></Link>
  </nav>;
}
