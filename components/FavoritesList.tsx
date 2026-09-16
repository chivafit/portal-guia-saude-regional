"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, MapPin, Search, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProfessionalImage } from "@/components/ProfessionalImage";
import { favoritesChangedEvent, type FavoriteProfessional, readFavorites } from "@/lib/favorites";

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteProfessional[] | null>(null);

  useEffect(() => {
    const update = () => setFavorites(readFavorites());
    update();
    window.addEventListener(favoritesChangedEvent, update);
    return () => window.removeEventListener(favoritesChangedEvent, update);
  }, []);

  if (favorites === null) return <div className="favorites-loading" aria-label="Carregando favoritos"><span /></div>;

  if (!favorites.length) {
    return <section className="favorites-empty">
      <div><Heart size={27} /></div>
      <small>AINDA NÃO HÁ FAVORITOS</small>
      <h2>Monte sua lista de profissionais</h2>
      <p>Toque no coração de um perfil para encontrá-lo rapidamente depois.</p>
      <Link href="/buscar?cidade=piumhi&tipo=professionals"><Search size={17} /> Encontrar profissionais</Link>
    </section>;
  }

  return <section className="favorites-grid" aria-label={`${favorites.length} ${favorites.length === 1 ? "profissional favorito" : "profissionais favoritos"}`}>
    <div className="favorites-count"><strong>{favorites.length}</strong><span>{favorites.length === 1 ? "profissional salvo" : "profissionais salvos"}</span></div>
    {favorites.map((item) => {
      const initials = item.name.replace(/^(dr|dra)\.?\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
      return <article className="favorite-card" key={item.slug}>
        <div className={`favorite-card-avatar${item.imageUrl ? " has-photo" : ""}`} aria-hidden="true">{item.imageUrl ? <ProfessionalImage src={item.imageUrl} sizes="68px" /> : <span>{initials}</span>}</div>
        <div className="favorite-card-copy"><small>{item.profession}</small><h2>{item.name}</h2><div className="favorite-card-meta"><span><Stethoscope size={12} /> {item.specialty}</span><span><MapPin size={12} /> {item.city}</span></div>{item.organization ? <p>{item.organization}</p> : null}</div>
        <div className="favorite-card-save"><FavoriteButton professional={item} compact /></div>
        <Link className="favorite-card-open" href={`/profissionais/${item.slug}`} aria-label={`Ver perfil de ${item.name}`}><ArrowUpRight size={15} /></Link>
      </article>;
    })}
  </section>;
}
