"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

type FeaturedProfessional = {
  slug: string;
  name: string;
  specialty: string;
  organization: string;
  registration: string;
  imageUrl?: string;
};

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function FeaturedProfessionalsRotator({ professionals }: { professionals: FeaturedProfessional[] }) {
  const [visible, setVisible] = useState(() => professionals.slice(0, 6));

  useEffect(() => {
    if (professionals.length > 6) setVisible(shuffle(professionals).slice(0, 6));
  }, [professionals]);

  return (
    <div className="home-featured-professionals-grid">
      {visible.map((item) => (
        <Link key={item.slug} href={`/profissionais/${item.slug}`} className="home-featured-professional-card">
          <span
            className={`home-featured-professional-avatar${item.imageUrl ? " has-photo" : ""}`}
            style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}
            aria-hidden="true"
          >
            {!item.imageUrl
              ? item.name
                  .split(" ")
                  .filter((word) => !/^dr\.?|^dra\.?$/i.test(word))
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
              : null}
          </span>

          <div className="home-featured-professional-copy">
            <div className="home-featured-professional-name">
              <strong>{item.name}</strong>
              <span aria-label="Profissional em destaque" title="Profissional em destaque"><Star size={14} fill="currentColor" /></span>
            </div>
            <small>{item.specialty}</small>
            {item.organization ? <span className="home-featured-professional-org">{item.organization}</span> : null}
            <em>Ver perfil <ArrowUpRight size={13} /></em>
          </div>
        </Link>
      ))}
    </div>
  );
}
