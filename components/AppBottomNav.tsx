"use client";

import Link from "next/link";
import { Heart, Home, Mic2, Newspaper, Search } from "lucide-react";
import { usePathname } from "next/navigation";

function tactile(ms = 8) { if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms); }

type NavItemProps = { href: string; label: string; active: boolean; children: React.ReactNode };
function NavItem({ href, label, active, children }: NavItemProps) {
  return <Link href={href} onPointerDown={() => tactile()} className={`hos-nav-item gsm-dock-item${active ? " is-active" : ""}`} aria-label={label} aria-current={active ? "page" : undefined}>
    <span className="hos-nav-icon gsm-dock-ic" aria-hidden="true">{children}</span><span className="hos-nav-label gsm-dock-label">{label}</span>
  </Link>;
}

export function AppBottomNav() {
  const pathname = usePathname();
  const homeActive = pathname === "/" || pathname.startsWith("/cidades/");
  const searchActive = pathname.startsWith("/buscar") || pathname.startsWith("/profissionais/") || pathname.startsWith("/empresas/");
  const contentActive = pathname.startsWith("/materias");
  const podcastActive = pathname.startsWith("/podcast");
  const savedActive = pathname.startsWith("/favoritos");

  return <nav className="app-bottom-nav health-os-dock hos-navbar gsm-dock" aria-label="Navegação principal">
    <NavItem href="/" label="Início" active={homeActive}><Home /></NavItem>
    <NavItem href="/buscar?cidade=piumhi" label="Buscar" active={searchActive}><Search /></NavItem>
    <NavItem href="/materias" label="Conteúdo" active={contentActive}><Newspaper /></NavItem>
    <NavItem href="/podcast" label="Podcast" active={podcastActive}><Mic2 /></NavItem>
    <NavItem href="/favoritos" label="Salvos" active={savedActive}><Heart /></NavItem>
  </nav>;
}
