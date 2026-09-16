"use client";

import Link from "next/link";
import { BookOpen, Home, Mic2, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

const searchHref = "/buscar?cidade=piumhi";
function tactile(ms=8){ if(typeof navigator!=="undefined" && "vibrate" in navigator) navigator.vibrate(ms); }

type NavItemProps = { href:string; label:string; active:boolean; children:React.ReactNode };
function NavItem({ href, label, active, children }:NavItemProps){
  return <Link href={href} onPointerDown={()=>tactile()} className={`hos-nav-item${active?" is-active":""}`} aria-label={label} aria-current={active?"page":undefined}>
    <span className="hos-nav-icon" aria-hidden="true">{children}</span><span className="hos-nav-label">{label}</span>
  </Link>;
}

export function AppBottomNav() {
  const pathname = usePathname();
  const homeActive = pathname === "/" || pathname.startsWith("/cidades/");
  const contentActive = pathname.startsWith("/materias");
  const searchActive = pathname.startsWith("/buscar") || pathname.startsWith("/profissionais/") || pathname.startsWith("/empresas/");
  const podcastActive = pathname.startsWith("/podcast");
  const magazineActive = pathname.startsWith("/revista");

  return <nav className="app-bottom-nav health-os-dock hos-navbar" aria-label="Navegação principal">
    <NavItem href="/" label="Início" active={homeActive}><Home /></NavItem>
    <NavItem href="/materias" label="Conteúdos" active={contentActive}><Newspaper /></NavItem>
    <Link href={searchHref} onPointerDown={()=>tactile(12)} className={`health-os-brand-action health-os-search-action hos-nav-orb${searchActive?" is-active":""}`} aria-label="Buscar profissionais, clínicas e serviços" aria-current={searchActive?"page":undefined}>
      <span className="health-os-liquid-orb" aria-hidden="true"><i/><b/></span>
    </Link>
    <NavItem href="/podcast" label="Podcast" active={podcastActive}><Mic2 /></NavItem>
    <NavItem href="/revista" label="Revista" active={magazineActive}><BookOpen /></NavItem>
  </nav>;
}
