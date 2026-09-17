"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type FeaturedProfessional = {
  slug: string;
  name: string;
  specialty: string;
  registration?: string | null;
  organization?: string | null;
  imageUrl?: string | null;
};

export function DesktopFeaturedCarousel({ professionals }: { professionals: FeaturedProfessional[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = professionals.length;
  const visible = useMemo(() => {
    if (!total) return [];
    return Array.from({ length: Math.min(3, total) }, (_, offset) => professionals[(activeIndex + offset) % total]);
  }, [activeIndex, professionals, total]);

  const move = useCallback((direction: number) => {
    setActiveIndex((current) => (current + direction + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = window.setInterval(() => move(1), 5200);
    return () => window.clearInterval(timer);
  }, [move, paused, total]);

  if (!total) return null;

  return (
    <div
      className="desktop-featured-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      aria-label="Profissionais em destaque"
    >
      <div className="desktop-pro-grid" aria-live="polite">
        {visible.map((professional) => (
          <Link className="desktop-pro-card" href={`/profissionais/${professional.slug}`} key={professional.slug}>
            <div className="desktop-pro-photo">
              {professional.imageUrl ? <img src={professional.imageUrl} alt={professional.name} /> : <span>{professional.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</span>}
            </div>
            <div className="desktop-pro-copy">
              <small>{professional.specialty}</small>
              <h3>{professional.name}</h3>
              {professional.registration && <p>{professional.registration}</p>}
              <div><span>{professional.organization || "Atendimento em Piumhi"}</span><ArrowRight size={16} /></div>
            </div>
          </Link>
        ))}
      </div>
      {total > 3 && (
        <div className="desktop-featured-controls">
          <span>{paused ? "Pausado" : "Mudando automaticamente"}</span>
          <div>
            <button type="button" onClick={() => move(-1)} aria-label="Profissionais anteriores"><ArrowLeft size={15} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Próximos profissionais"><ArrowRight size={15} /></button>
          </div>
          <div className="desktop-featured-dots" aria-label="Selecionar grupo de profissionais">
            {professionals.map((professional, index) => (
              <button key={professional.slug} type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)} aria-label={`Mostrar ${professional.name}`} aria-pressed={index === activeIndex} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
