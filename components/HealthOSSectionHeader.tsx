import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { ReactNode } from "react";

type HealthOSSectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  location?: string;
  meta?: ReactNode;
};

export function HealthOSSectionHeader({
  eyebrow,
  title,
  description,
  backHref = "/",
  location = "Piumhi · MG",
  meta,
}: HealthOSSectionHeaderProps) {
  return <>
    <header className="hos-section-header">
      <Link className="hos-section-back" href={backHref} aria-label="Voltar"><ArrowLeft size={20} /></Link>
      <div className="hos-section-title">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
    <div className="hos-section-context">
      <span><MapPin size={15} />{location}</span>
      {meta ? <strong>{meta}</strong> : null}
    </div>
  </>;
}
