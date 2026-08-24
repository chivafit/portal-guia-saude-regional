"use client";

import { ArrowRight, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";
import { isCityAvailable } from "@/lib/cities";

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

  useEffect(() => {
    const cityFromUrl = cityFromCurrentUrl();
    const savedCity = window.localStorage.getItem(storageKey) || "";
    const candidateCity = cityFromUrl || savedCity;
    const initialCity = isCityAvailable(candidateCity) ? candidateCity : "";
    queueMicrotask(() => setSelectedCity(initialCity));
    if (initialCity) {
      window.localStorage.setItem(storageKey, initialCity);
      window.localStorage.setItem(modalSeenKey, "1");
      window.sessionStorage.setItem(sessionSeenKey, "1");
      window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: initialCity }));
      return;
    }
    // A escolha de cidade continua disponível no cabeçalho, sem interromper
    // automaticamente quem entrou no portal para fazer uma busca direta.
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

  if (!open) return null;

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
          <div className="city-entry-grid">
            {cities.map((city) => (
              <button type="button" key={city} disabled={!isCityAvailable(city)} onClick={() => chooseCity(city)} className={selectedCity === city ? "active" : ""}>
                <span className="city-entry-pin"><MapPin size={18} /></span>
                <span className="city-entry-name">{city}</span>
                <small>{isCityAvailable(city) ? <>Abrir guia <ArrowRight size={14} /></> : "EM BREVE"}</small>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
