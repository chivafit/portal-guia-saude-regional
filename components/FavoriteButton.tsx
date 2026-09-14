"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  favoritesChangedEvent,
  type FavoriteProfessional,
  readFavorites,
  writeFavorites,
} from "@/lib/favorites";

export function FavoriteButton({ professional, compact = false }: { professional: FavoriteProfessional; compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const messageTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => setSaved(readFavorites().some((item) => item.slug === professional.slug));
    update();
    window.addEventListener(favoritesChangedEvent, update);
    return () => {
      window.removeEventListener(favoritesChangedEvent, update);
      if (messageTimer.current) window.clearTimeout(messageTimer.current);
    };
  }, [professional.slug]);

  function toggle() {
    const favorites = readFavorites();
    const isSaved = favorites.some((item) => item.slug === professional.slug);

    try {
      writeFavorites(isSaved
        ? favorites.filter((item) => item.slug !== professional.slug)
        : [professional, ...favorites.filter((item) => item.slug !== professional.slug)]);
      setSaved(!isSaved);
      setMessage(isSaved ? "Removido dos favoritos" : "Salvo nos favoritos");
      if (messageTimer.current) window.clearTimeout(messageTimer.current);
      messageTimer.current = window.setTimeout(() => setMessage(""), 1800);
    } catch {
      setMessage("Não foi possível salvar agora");
    }
  }

  return (
    <div className={`favorite-control${compact ? " favorite-control-compact" : ""}`}>
      <button type="button" onClick={toggle} aria-pressed={saved} aria-label={saved ? `Remover ${professional.name} dos favoritos` : `Salvar ${professional.name} nos favoritos`}>
        <Heart size={compact ? 17 : 18} fill={saved ? "currentColor" : "none"} />
        {compact ? null : <span>{saved ? "Salvo" : "Salvar"}</span>}
      </button>
      <span className="sr-only" aria-live="polite">{message}</span>
    </div>
  );
}
