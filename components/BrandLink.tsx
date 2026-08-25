"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cities } from "@/lib/data";
import { citySlug } from "@/lib/city-utils";
import { GuiaSaudeLogo } from "@/components/GuiaSaudeLogo";
import { isCityAvailable } from "@/lib/cities";

const storageKey = "guia-saude:selected-city";

function cityFromUrl() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const queryCity = params.get("cidade");
  if (queryCity) return queryCity;
  const match = window.location.pathname.match(/^\/cidades\/([^/]+)/);
  if (!match) return "";
  return cities.find((city) => citySlug(city) === match[1]) ?? "";
}

// Logo do topo: leva à página da cidade selecionada (mesmo destino do popup de
// cidade). Sem cidade escolhida, cai na home.
export function BrandLink() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    const update = () => {
      const city = cityFromUrl() || window.localStorage.getItem(storageKey) || "";
      setHref(isCityAvailable(city) ? `/cidades/${citySlug(city)}` : "/");
    };
    update();
    window.addEventListener("guia-saude:city-change", update);
    return () => window.removeEventListener("guia-saude:city-change", update);
  }, []);

  return (
    <Link href={href} className="brand" aria-label="Portal Guia Saúde — abrir guia da cidade">
      <GuiaSaudeLogo />
    </Link>
  );
}
