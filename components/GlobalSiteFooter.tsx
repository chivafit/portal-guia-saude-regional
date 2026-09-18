"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";

const routesWithLocalFooter = [
  "/anuncie",
  "/cidades/",
  "/empresas",
  "/inclusao",
  "/sobre",
  "/privacidade",
  "/termos",
  "/politica-editorial",
  "/correcoes",
];

export function GlobalSiteFooter() {
  const pathname = usePathname();
  const hasLocalFooter = routesWithLocalFooter.some((route) => route === "/cidades/" ? pathname.startsWith(route) : pathname === route);
  if (pathname === "/" || hasLocalFooter) return null;
  return <SiteFooter />;
}
