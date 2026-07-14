"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Building2, MapPin, Search, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { cities, organizations, professionals } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";

const storageKey = "guia-saude:selected-city";
const modalSeenKey = "guia-saude:city-entry-seen";

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
    window.localStorage.setItem(modalSeenKey, "1");
    window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: city }));
  }

  const cityQuery = selectedCity ? `?cidade=${encodeURIComponent(selectedCity)}` : "";
  const selectedSlug = selectedCity ? citySlug(selectedCity) : "";
  const localProfessionals = selectedCity ? professionals.filter((item) => item.city === selectedCity).length : professionals.length;
  const localOrganizations = selectedCity ? organizations.filter((item) => item.city === selectedCity).length : organizations.length;

  return (
    <section className="shell city-gateway" aria-label="Selecionar cidade do portal">
      <div className="city-gateway-copy">
        <p className="eyebrow">Portal por cidade</p>
        <h2>{selectedCity ? `Portal de saúde em ${selectedCity}` : "Comece pela sua cidade."}</h2>
        <p>Selecione o município para ver matérias, especialistas, empresas, podcast, revista e serviços locais.</p>
        <Link className="city-gateway-primary" href={`/buscar${cityQuery}`}><Search size={16} /> Buscar agora <ArrowRight size={14} /></Link>
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
          <Link href={selectedSlug ? `/cidades/${selectedSlug}` : "/materias"}><BookOpen size={16} /> Guia local <ArrowRight size={14} /></Link>
        </div>
        <div className="city-live-preview">
          <div><strong>{localProfessionals}</strong><span>{selectedCity ? "especialistas no recorte local" : "especialistas na região"}</span></div>
          <div><strong>{localOrganizations}</strong><span>{selectedCity ? "empresas e serviços locais" : "empresas e serviços"}</span></div>
          <div><strong>{selectedCity ? "Local" : "Regional"}</strong><span>matérias, podcast e revista</span></div>
        </div>
      </div>
    </section>
  );
}
