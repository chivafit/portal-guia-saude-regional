"use client";

import Link from "next/link";
import { ArrowRight, Building2, MapPin, Megaphone, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";

const storageKey = "guia-saude:selected-city";

export function CityGateway() {
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey) || "";
    queueMicrotask(() => setSelectedCity(saved));
    const listener = (event: Event) => setSelectedCity((event as CustomEvent<string>).detail || "");
    window.addEventListener("guia-saude:city-change", listener);
    return () => window.removeEventListener("guia-saude:city-change", listener);
  }, []);

  function selectCity(city: string) {
    setSelectedCity(city);
    window.localStorage.setItem(storageKey, city);
    window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: city }));
  }

  const cityQuery = selectedCity ? `?cidade=${encodeURIComponent(selectedCity)}` : "";
  const selectedSlug = selectedCity ? citySlug(selectedCity) : "";

  return (
    <section className="shell city-gateway" aria-label="Selecionar cidade do portal">
      <div className="city-gateway-copy">
        <p className="eyebrow">Escolha sua cidade</p>
        <h2>{selectedCity ? `Portal de saúde em ${selectedCity}` : "Comece pela sua cidade."}</h2>
        <p>Ao selecionar uma cidade, a busca, os profissionais, empresas e espaços comerciais passam a trabalhar com contexto local.</p>
      </div>
      <div className="city-gateway-panel">
        <div className="city-choice-grid">
          {cities.map((city) => (
            <button type="button" key={city} onClick={() => selectCity(city)} className={selectedCity === city ? "active" : ""}>
              <MapPin size={15} />
              {city}
            </button>
          ))}
        </div>
        <div className="city-gateway-actions">
          <Link href={`/buscar${cityQuery}`}><Stethoscope size={16} /> Especialistas <ArrowRight size={14} /></Link>
          <Link href={`/empresas${cityQuery}`}><Building2 size={16} /> Empresas <ArrowRight size={14} /></Link>
          <Link href={selectedSlug ? `/cidades/${selectedSlug}` : "/anuncie"}><Megaphone size={16} /> Marketing local <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}
