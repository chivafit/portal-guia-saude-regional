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
  location,
  meta,
}: HealthOSSectionHeaderProps) {
  const hasContext = Boolean(location || meta);
  return <>
    <header className="hos-section-header">
      <Link className="hos-section-back" href={backHref} aria-label="Voltar"><ArrowLeft size={20} /></Link>
      <div className="hos-section-title">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
    {hasContext ? <div className="hos-section-context">
      {location ? <span><MapPin size={15} />{location}</span> : <span aria-hidden="true" />}
      {meta ? <strong>{meta}</strong> : null}
    </div> : null}
  </>;
}
