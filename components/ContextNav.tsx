"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";

const storageKey = "guia-saude:selected-city";

function cityFromPath() {
  const match = window.location.pathname.match(/^\/cidades\/([^/]+)/);
  if (!match) return "";
  return cities.find((city) => citySlug(city) === match[1]) || "";
}

export function ContextNav() {
  const [city, setCity] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params.get("cidade") || cityFromPath() || window.localStorage.getItem(storageKey) || "";
    queueMicrotask(() => setCity(selected));
    const update = (event: Event) => setCity((event as CustomEvent<string>).detail || "");
    window.addEventListener("guia-saude:city-change", update);
    return () => window.removeEventListener("guia-saude:city-change", update);
  }, []);

  const query = city ? `?cidade=${encodeURIComponent(city)}` : "";

  return (
    <nav className="main-nav" aria-label="Navegação principal">
      <Link href={`/buscar${query}`}>Encontrar atendimento</Link>
      <Link href={`/materias${query}`}>Conteúdos</Link>
      <Link href={`/podcast${query}`}>Podcast</Link>
      <Link href={`/revista${query}`}>Revista</Link>
      <Link href="/sobre">Sobre</Link>
    </nav>
  );
}
