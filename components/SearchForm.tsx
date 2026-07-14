"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cities, professions } from "@/lib/data";

export function SearchForm({ compact = false }: { compact?: boolean }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryCity = params.get("cidade");
    const savedCity = window.localStorage.getItem("guia-saude:selected-city") || "";
    queueMicrotask(() => setCity(queryCity || savedCity));
    const listener = (event: Event) => setCity((event as CustomEvent<string>).detail || "");
    window.addEventListener("guia-saude:city-change", listener);
    return () => window.removeEventListener("guia-saude:city-change", listener);
  }, []);

  function persistCity() {
    if (city) window.localStorage.setItem("guia-saude:selected-city", city);
    else window.localStorage.removeItem("guia-saude:selected-city");
  }

  return (
    <form className={`portal-search ${compact ? "portal-search-compact" : ""}`} action="/buscar" onSubmit={persistCity}>
      <label><span>Buscar</span><input name="q" placeholder="Especialidade, profissional, clínica ou exame" /></label>
      <label><span>Cidade</span><select name="cidade" value={city} onChange={(event) => setCity(event.target.value)}><option value="">Toda a região</option>{cities.map(city => <option key={city}>{city}</option>)}</select></label>
      {!compact && <label><span>Área</span><select name="profissao" defaultValue=""><option value="">Todas as áreas</option>{professions.map(item => <option key={item}>{item}</option>)}</select></label>}
      <button type="submit">Buscar <ArrowRight size={15} /></button>
    </form>
  );
}
