"use client";

import Link from "next/link";
import { ArrowRight, Building2, MapPin, Megaphone, Search, Stethoscope, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";

const storageKey = "guia-saude:selected-city";
const modalSeenKey = "guia-saude:city-entry-seen";

function cityFromCurrentUrl() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const queryCity = params.get("cidade");
  if (queryCity) return queryCity;
  const match = window.location.pathname.match(/^\/cidades\/([^/]+)/);
  if (!match) return "";
  return cities.find((city) => citySlug(city) === match[1]) ?? "";
}

export function CityEntryModal() {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const cityFromUrl = cityFromCurrentUrl();
    const savedCity = window.localStorage.getItem(storageKey) || "";
    const hasSeen = window.localStorage.getItem(modalSeenKey) === "1";
    const initialCity = cityFromUrl || savedCity;
    queueMicrotask(() => setSelectedCity(initialCity));
    if (cityFromUrl) {
      window.localStorage.setItem(storageKey, cityFromUrl);
      window.localStorage.setItem(modalSeenKey, "1");
      window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: cityFromUrl }));
      return;
    }
    if (!hasSeen && !savedCity) {
      const timer = window.setTimeout(() => setOpen(true), 450);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  function chooseCity(city: string) {
    setSelectedCity(city);
    window.localStorage.setItem(storageKey, city);
    window.localStorage.setItem(modalSeenKey, "1");
    window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: city }));
    window.location.assign(`/cidades/${citySlug(city)}`);
  }

  function dismiss() {
    window.localStorage.setItem(modalSeenKey, "1");
    setOpen(false);
  }

  function openLocalPortal() {
    if (selectedCity) chooseCity(selectedCity);
    dismiss();
  }

  if (!open) return null;

  const selectedSlug = selectedCity ? citySlug(selectedCity) : "";
  const destination = selectedSlug ? `/cidades/${selectedSlug}` : "/buscar";

  return (
    <div className="city-entry-overlay" role="dialog" aria-modal="true" aria-labelledby="city-entry-title">
      <div className="city-entry-backdrop" onClick={dismiss} />
      <section className="city-entry-modal">
        <button className="city-entry-close" type="button" onClick={dismiss} aria-label="Fechar seleção de cidade">
          <X size={17} />
        </button>
        <div className="city-entry-copy">
          <p className="eyebrow">Portal regional por cidade</p>
          <h2 id="city-entry-title">Escolha sua cidade para abrir o portal local.</h2>
          <p>Especialistas, empresas, matérias e publicidade passam a aparecer com recorte da cidade selecionada.</p>
          <div className="city-entry-benefits" aria-label="O que muda ao escolher a cidade">
            <span><Stethoscope size={15} /> Profissionais</span>
            <span><Building2 size={15} /> Empresas</span>
            <span><Megaphone size={15} /> Banners locais</span>
          </div>
        </div>
        <div className="city-entry-panel">
          <div className="city-entry-grid">
            {cities.map((city) => (
              <button type="button" key={city} onClick={() => chooseCity(city)} className={selectedCity === city ? "active" : ""}>
                <MapPin size={15} />
                <span>{city}</span>
              </button>
            ))}
          </div>
          <div className="city-entry-actions">
            <Link href={destination} onClick={openLocalPortal}>
              {selectedCity ? `Abrir portal de ${selectedCity}` : "Ver portal geral"} <ArrowRight size={14} />
            </Link>
            <button type="button" onClick={dismiss}>
              Entrar sem escolher <Search size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
