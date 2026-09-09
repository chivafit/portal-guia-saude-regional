"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { ProfessionalImage } from "@/components/ProfessionalImage";

type FeaturedProfessional = {
  slug: string;
  name: string;
  specialty: string;
  organization: string;
  registration: string;
  imageUrl?: string;
};

export function FeaturedProfessionalsRotator({ professionals }: { professionals: FeaturedProfessional[] }) {
  const visible = professionals.slice(0, 6);

  return (
    <div className="home-featured-professionals-grid">
      {visible.map((item, index) => (
        <Link key={item.slug} href={`/profissionais/${item.slug}`} className="home-featured-professional-card">
          <span className={`home-featured-professional-avatar${item.imageUrl ? " has-photo" : ""}`} aria-hidden="true">
            {item.imageUrl ? <ProfessionalImage src={item.imageUrl} sizes="(max-width: 640px) 64px, 76px" eager={index < 3} /> : null}
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
