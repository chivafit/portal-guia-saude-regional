"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
  // Mantém os primeiros seis no HTML estático e sorteia somente depois da hidratação.
  // Assim evitamos mismatch e preservamos conteúdo/SEO quando JavaScript estiver indisponível.
  const [visible, setVisible] = useState(() => professionals.slice(0, 6));

  useEffect(() => {
    if (professionals.length > 6) setVisible(shuffle(professionals).slice(0, 6));
  }, [professionals]);

  return (
    <div className="city-featured-grid">
      {visible.map((item) => (
        <Link key={item.slug} href={`/profissionais/${item.slug}`} className="city-featured-card">
          <span
            className={`city-featured-avatar${item.imageUrl ? " has-photo" : ""}`}
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
          <span className="city-featured-tag">★ Profissional Destaque</span>
          <strong>{item.name}</strong>
          <small>{item.specialty}</small>
          <span className="city-featured-org">{item.organization}</span>
          {item.registration ? <span className="city-featured-org city-featured-registration">{item.registration}</span> : null}
          <em>Ver perfil <ArrowUpRight size={13} /></em>
        </Link>
      ))}
    </div>
  );
}
