"use client";

import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";
import { isCityAvailable } from "@/lib/cities";

const storageKey = "guia-saude:selected-city";
const modalSeenKey = "guia-saude:city-entry-seen";
const openEventName = "guia-saude:open-city-entry";

function currentCityFromUrl() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const queryCity = params.get("cidade");
  if (queryCity) return queryCity;
  const match = window.location.pathname.match(/^\/cidades\/([^/]+)/);
  if (!match) return "";
  return cities.find((city) => citySlug(city) === match[1]) ?? "";
}

export function CitySelector() {
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const city = currentCityFromUrl() || window.localStorage.getItem(storageKey) || "";
    queueMicrotask(() => setSelectedCity(isCityAvailable(city) ? city : ""));
  }, []);

  function applyCity(city: string) {
    setSelectedCity(city);
    if (city) window.localStorage.setItem(storageKey, city);
    else window.localStorage.removeItem(storageKey);
    window.localStorage.setItem(modalSeenKey, "1");
    window.dispatchEvent(new CustomEvent("guia-saude:city-change", { detail: city }));
    if (city) window.location.assign(`/cidades/${citySlug(city)}`);
  }

  const selectedSlug = selectedCity ? citySlug(selectedCity) : "";

  return (
    <div className="city-selector">
      <button type="button" aria-label="Selecionar cidade" onClick={() => window.dispatchEvent(new CustomEvent(openEventName))}>
        <MapPin size={15} />
        <span>{selectedCity || "Piumhi"}</span>
        <ChevronDown size={14} />
      </button>
      <div className="city-selector-menu">
        {cities.map((city) => (
          <button type="button" key={city} disabled={!isCityAvailable(city)} onClick={() => applyCity(city)} className={selectedCity === city ? "active" : ""}>
            <span>{city}</span>{!isCityAvailable(city) ? <small>EM BREVE</small> : null}
          </button>
        ))}
        <Link href={selectedSlug ? `/cidades/${selectedSlug}` : "/buscar"}>{selectedSlug ? "Ver saúde na cidade" : "Abrir busca regional"}</Link>
      </div>
    </div>
  );
}
