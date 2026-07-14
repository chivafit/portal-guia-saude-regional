"use client";

import Link from "next/link";
import { MapPin, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";

const storageKey = "guia-saude:selected-city";
const modalSeenKey = "guia-saude:city-entry-seen";
const sessionSeenKey = "guia-saude:city-entry-session-seen";
const openEventName = "guia-saude:open-city-entry";

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
  const [query, setQuery] = useState("");

  useEffect(() => {
    const cityFromUrl = cityFromCurrentUrl();
    const savedCity = window.localStorage.getItem(storageKey) || "";
    const hasSeenThisSession = window.sessionStorage.getItem(sessionSeenKey) === "1";
    const initialCity = cityFromUrl || savedCity;
    queueMicrotask(() => setSelectedCity(initialCity));
    if (cityFromUrl) {
      window.localStorage.setItem(storageKey, cityFromUrl);
      window.localStorage.setItem(modalSeenKey, "1");
      window.sessionStorage.setItem(sessionSeenKey, "1");
      window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: cityFromUrl }));
      return;
    }
    if (!hasSeenThisSession) {
      const timer = window.setTimeout(() => setOpen(true), 450);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(openEventName, handleOpen);
    return () => window.removeEventListener(openEventName, handleOpen);
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
    window.sessionStorage.setItem(sessionSeenKey, "1");
    window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: city }));
    window.location.assign(`/cidades/${citySlug(city)}`);
  }

  function dismiss() {
    window.localStorage.setItem(modalSeenKey, "1");
    window.sessionStorage.setItem(sessionSeenKey, "1");
    setOpen(false);
  }

  function openLocalPortal() {
    if (selectedCity) chooseCity(selectedCity);
    dismiss();
  }

  if (!open) return null;

  const selectedSlug = selectedCity ? citySlug(selectedCity) : "";
  const destination = selectedSlug ? `/cidades/${selectedSlug}` : "/buscar";
  const visibleCities = cities.filter((city) => city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

  return (
    <div className="city-entry-overlay" role="dialog" aria-modal="true" aria-labelledby="city-entry-title">
      <div className="city-entry-backdrop" onClick={dismiss} />
      <section className="city-entry-modal">
        <header className="city-entry-top">
          <div>
            <h2 id="city-entry-title">Onde você quer cuidar da sua saúde?</h2>
            <p>Escolha sua cidade para começar</p>
          </div>
          <button className="city-entry-close" type="button" onClick={dismiss} aria-label="Fechar seleção de cidade">
            <X size={18} />
          </button>
        </header>
        <div className="city-entry-panel">
          <label className="city-entry-search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar cidade..." autoFocus />
          </label>
          <div className="city-entry-grid">
            {visibleCities.map((city, index) => (
              <button type="button" key={city} onClick={() => chooseCity(city)} className={selectedCity === city ? "active" : ""}>
                <span className={`city-entry-image city-entry-image-${index % 7}`} />
                <span>{city}</span>
                <small><MapPin size={13} /> Abrir guia local</small>
              </button>
            ))}
            {!visibleCities.length ? <p className="city-entry-empty">Nenhuma cidade encontrada.</p> : null}
          </div>
          <Link className="city-entry-region-link" href={destination} onClick={openLocalPortal}>
            {selectedCity ? `Abrir portal de ${selectedCity}` : "Continuar vendo toda a região"}
          </Link>
        </div>
      </section>
    </div>
  );
}
