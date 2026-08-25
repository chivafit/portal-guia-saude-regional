"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";
import { isCityAvailable } from "@/lib/cities";

const storageKey = "guia-saude:selected-city";

// Cidade atual: query ?cidade= → path /cidades/[slug] → cidade salva.
// (o path é o que faltava — por isso a busca perdia a cidade na página da cidade)
function detectCity() {
  if (typeof window === "undefined") return "";
  const queryCity = new URLSearchParams(window.location.search).get("cidade");
  if (queryCity) return queryCity;
  const match = window.location.pathname.match(/^\/cidades\/([^/]+)/);
  if (match) {
    const fromPath = cities.find((city) => citySlug(city) === match[1]);
    if (fromPath) return fromPath;
  }
  return window.localStorage.getItem(storageKey) || "";
}

export function FooterNav() {
  const [city, setCity] = useState("");

  useEffect(() => {
    queueMicrotask(() => setCity(detectCity()));
    const update = (event: Event) => setCity((event as CustomEvent<string>).detail || detectCity());
    window.addEventListener("guia-saude:city-change", update);
    return () => window.removeEventListener("guia-saude:city-change", update);
  }, []);

  const query = isCityAvailable(city) ? `?cidade=${encodeURIComponent(city)}` : "";

  return (
    <div>
      <span>Navegue</span>
      <Link href={`/buscar${query}`}>Encontrar atendimento</Link>
      <Link href={`/empresas${query}`}>Empresas e serviços</Link>
      <Link href="/materias">Matérias</Link>
    </div>
  );
}
