"use client";

import Link from "next/link";
import { BookOpen, Heart, Home, Mic2, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { favoritesChangedEvent, readFavorites } from "@/lib/favorites";

const items = [
  { href: "/", label: "Início", icon: Home, active: (path: string) => path === "/" || path.startsWith("/cidades/") },
  { href: "/buscar?cidade=piumhi", label: "Buscar", icon: Search, active: (path: string) => path.startsWith("/buscar") || path.startsWith("/profissionais/") || path.startsWith("/empresas/") },
  { href: "/favoritos", label: "Favoritos", icon: Heart, active: (path: string) => path.startsWith("/favoritos") },
  { href: "/podcast", label: "Podcast", icon: Mic2, active: (path: string) => path.startsWith("/podcast") },
  { href: "/revista", label: "Revista", icon: BookOpen, active: (path: string) => path.startsWith("/revista") },
] as const;

export function AppBottomNav() {
  const pathname = usePathname();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [routeHint, setRouteHint] = useState("");

  useEffect(() => {
    const update = () => setFavoriteCount(readFavorites().length);
    update();
    window.addEventListener(favoritesChangedEvent, update);
    return () => window.removeEventListener(favoritesChangedEvent, update);
  }, []);

  useEffect(() => {
    const detectRenderedRoute = () => {
      setRouteHint(document.querySelector(".app-search-page") ? "/buscar" : "");
    };
    detectRenderedRoute();
    const observer = new MutationObserver(detectRenderedRoute);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  const activePath = routeHint || pathname;

  return (
    <nav className="app-bottom-nav" aria-label="Navegação do aplicativo">
      {items.map((item) => {
        const Icon = item.icon;
        const selected = item.active(activePath);
        return (
          <Link key={item.href} href={item.href} aria-current={selected ? "page" : undefined}>
            <span className="app-bottom-nav-icon">
              <Icon size={21} strokeWidth={selected ? 2.4 : 1.9} fill={item.label === "Favoritos" && selected ? "currentColor" : "none"} />
              {item.label === "Favoritos" && favoriteCount > 0 ? <small aria-label={`${favoriteCount} favoritos`}>{favoriteCount > 9 ? "9+" : favoriteCount}</small> : null}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
