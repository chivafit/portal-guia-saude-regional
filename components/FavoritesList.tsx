"use client";

import Link from "next/link";
import { Heart, MapPin, Search, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { favoritesChangedEvent, type FavoriteProfessional, readFavorites } from "@/lib/favorites";

export function FavoritesList() {
  const [favorites, setFavorites] = useState<FavoriteProfessional[] | null>(null);

  useEffect(() => {
    const update = () => setFavorites(readFavorites());
    update();
    window.addEventListener(favoritesChangedEvent, update);
    return () => window.removeEventListener(favoritesChangedEvent, update);
  }, []);

  if (favorites === null) return <div className="favorites-loading" aria-label="Carregando favoritos" />;

  if (!favorites.length) {
    return (
      <section className="favorites-empty">
        <div><Heart size={28} /></div>
        <h2>Seus profissionais favoritos aparecerão aqui</h2>
        <p>Salve perfis para encontrar rapidamente contatos, especialidades e locais de atendimento.</p>
        <Link href="/buscar?cidade=piumhi"><Search size={17} /> Encontrar profissionais</Link>
      </section>
    );
  }

  return (
    <section className="favorites-grid" aria-label={`${favorites.length} ${favorites.length === 1 ? "profissional favorito" : "profissionais favoritos"}`}>
      {favorites.map((item) => (
        <article className="favorite-card" key={item.slug}>
          <div className="favorite-card-head">
            <div className="favorite-card-avatar" aria-hidden="true">{item.name.replace(/^(dr|dra)\.?\s+/i, "").split(/\s+/).slice(0, 2).map((part) => part[0]).join("")}</div>
            <FavoriteButton professional={item} compact />
          </div>
          <p>{item.profession}</p>
          <h2>{item.name}</h2>
          <div className="favorite-card-meta">
            <span><Stethoscope size={14} /> {item.specialty}</span>
            <span><MapPin size={14} /> {item.city}</span>
          </div>
          <small>{item.organization}</small>
          <Link href={`/profissionais/${item.slug}`}>Ver perfil</Link>
        </article>
      ))}
    </section>
  );
}
