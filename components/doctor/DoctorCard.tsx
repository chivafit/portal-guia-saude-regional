import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProfessionalImage } from "@/components/ProfessionalImage";
import { initialsFor, isGeneratedImage } from "@/lib/avatars";

export type DoctorCardData = {
  slug: string;
  name: string;
  profession: string;
  specialty: string;
  city: string;
  organization?: string;
  imageUrl?: string;
};

/** Cartão grande de profissional (referência da equipe, 2026-11): nome e especialidade
 *  à esquerda, foto grande à direita, coração num círculo e, embaixo, o contato direto
 *  e a seta para o perfil. `highlight` pinta o cartão com a cor da marca. */
export function DoctorCard({ item, meta, contact, featured = false, highlight = false, eager = false }: {
  item: DoctorCardData;
  meta?: string;
  contact?: { href: string; label: string } | null;
  featured?: boolean;
  highlight?: boolean;
  eager?: boolean;
}) {
  const href = `/profissionais/${item.slug}`;
  const isWhats = contact?.label === "WhatsApp";
  return <article className={`dc${highlight ? " dc-brand" : ""}`}>
    <div className="dc-text">
      <span className="dc-spec">{item.specialty || item.profession}</span>
      <h3 className="dc-name"><Link href={href}>{item.name}</Link></h3>
      {meta ? <p className="dc-meta">{meta}</p> : null}
      {featured ? <span className="dc-badge">Destaque</span> : null}
    </div>
    <Link className="dc-photo" href={href} tabIndex={-1} aria-hidden="true">
      {item.imageUrl && !isGeneratedImage(item.imageUrl) ? <ProfessionalImage src={item.imageUrl} sizes="(max-width: 600px) 45vw, 220px" eager={eager} /> : <span className="dc-initials">{initialsFor(item.name)}</span>}
    </Link>
    <div className="dc-fav"><FavoriteButton compact professional={{ slug: item.slug, name: item.name, profession: item.profession, specialty: item.specialty, city: item.city, organization: item.organization ?? "", imageUrl: item.imageUrl }} /></div>
    <div className="dc-bar">
      {contact ? <a className="dc-contact" href={contact.href} target={isWhats ? "_blank" : undefined} rel={isWhats ? "noreferrer" : undefined}>{isWhats ? <MessageCircle size={18} aria-hidden="true" /> : <Phone size={18} aria-hidden="true" />}{contact.label}</a> : <Link className="dc-contact dc-contact-soft" href={href}>Ver perfil</Link>}
      <Link className="dc-go" href={href} aria-label={`Ver perfil de ${item.name}`}><ArrowUpRight size={20} aria-hidden="true" /></Link>
    </div>
  </article>;
}
