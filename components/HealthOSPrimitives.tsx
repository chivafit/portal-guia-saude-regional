import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { ArrowRight, LoaderCircle, Search } from "lucide-react";

type Tone = "primary" | "secondary" | "ghost" | "emerald";
type Size = "sm" | "md" | "lg";
type Surface = "glass" | "solid" | "image";
type CardVariant = "professional" | "organization" | "content" | "magazine" | "podcast" | "featured" | "compact";
type HeaderVariant = "catalog" | "search" | "detail" | "reader";

type CommonState = { active?:boolean; loading?:boolean };

export function HOSButton({ children, tone="primary", size="md", loading=false, className="", disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?:Tone; size?:Size; loading?:boolean }) {
  return <button className={`hos-button is-${tone} is-${size}${loading?" is-loading":""} ${className}`.trim()} disabled={disabled||loading} aria-busy={loading||undefined} {...props}>{loading?<LoaderCircle className="hos-spinner" aria-hidden="true"/>:null}<span>{children}</span></button>;
}

export function HOSLinkButton({ href, children, tone="primary", size="md", className="" }: { href:string; children:ReactNode; tone?:Tone; size?:Size; className?:string }) {
  return <Link href={href} className={`hos-button is-${tone} is-${size} ${className}`.trim()}>{children}</Link>;
}

export function HOSIconButton({ label, children, size="md", active=false, loading=false, className="", disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label:string; children:ReactNode; size?:Size } & CommonState) {
  return <button type="button" aria-label={label} aria-pressed={active||undefined} aria-busy={loading||undefined} disabled={disabled||loading} className={`hos-icon-button is-${size}${active?" is-active":""}${loading?" is-loading":""} ${className}`.trim()} {...props}>{loading?<LoaderCircle className="hos-spinner" aria-hidden="true"/>:children}</button>;
}

export function HOSPill({ children, active=false, tone="neutral", size="md", className="" }: { children:ReactNode; active?:boolean; tone?:"neutral"|"emerald"|"graphite"; size?:"sm"|"md"; className?:string }) {
  return <span className={`hos-pill is-${tone} is-${size}${active?" is-active":""} ${className}`.trim()}>{children}</span>;
}

export function HOSSearchField({ className="", actionLabel="Buscar", variant="default", ...props }: InputHTMLAttributes<HTMLInputElement> & { actionLabel?:string; variant?:"default"|"compact" }) {
  return <label className={`hos-search-field is-${variant} ${className}`.trim()}><Search aria-hidden="true"/><input {...props}/><span className="hos-search-submit" aria-label={actionLabel}><ArrowRight aria-hidden="true"/></span></label>;
}

export function HOSSurface({ children, className="", as="div", surface="glass", card="compact", selected=false }: { children:ReactNode; className?:string; as?:"div"|"article"|"section"; surface?:Surface; card?:CardVariant; selected?:boolean }) {
  const Tag=as;
  return <Tag className={`hos-surface is-${surface} card-${card}${selected?" is-selected":""} ${className}`.trim()}>{children}</Tag>;
}

export function HOSSectionHeading({ eyebrow, title, trailing, variant="catalog" }: { eyebrow?:string; title:string; trailing?:ReactNode; variant?:HeaderVariant }) {
  return <header className={`hos-section-heading is-${variant}`}><div>{eyebrow?<small>{eyebrow}</small>:null}<h2>{title}</h2></div>{trailing?<span>{trailing}</span>:null}</header>;
}
