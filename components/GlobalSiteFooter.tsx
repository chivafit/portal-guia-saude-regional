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
  // Static export usa trailing slash (ex.: "/inclusao/"), então normalizamos antes de
  // comparar — sem isto o match exato falha e o rodapé global soma ao rodapé local (duplicado).
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const hasLocalFooter = routesWithLocalFooter.some((route) => route === "/cidades/" ? path.startsWith("/cidades") : path === route);
  if (path === "/" || hasLocalFooter) return null;
  return <SiteFooter />;
}
