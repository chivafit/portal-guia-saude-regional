import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { ArrowRight, Search } from "lucide-react";

type Tone = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export function HOSButton({ children, tone="primary", size="md", className="", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?:Tone; size?:Size }) {
  return <button className={`hos-button is-${tone} is-${size} ${className}`.trim()} {...props}>{children}</button>;
}

export function HOSLinkButton({ href, children, tone="primary", size="md", className="" }: { href:string; children:ReactNode; tone?:Tone; size?:Size; className?:string }) {
  return <Link href={href} className={`hos-button is-${tone} is-${size} ${className}`.trim()}>{children}</Link>;
}

export function HOSIconButton({ label, children, className="", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label:string; children:ReactNode }) {
  return <button type="button" aria-label={label} className={`hos-icon-button ${className}`.trim()} {...props}>{children}</button>;
}

export function HOSPill({ children, active=false, className="" }: { children:ReactNode; active?:boolean; className?:string }) {
  return <span className={`hos-pill${active?" is-active":""} ${className}`.trim()}>{children}</span>;
}

export function HOSSearchField({ className="", actionLabel="Buscar", ...props }: InputHTMLAttributes<HTMLInputElement> & { actionLabel?:string }) {
  return <label className={`hos-search-field ${className}`.trim()}><Search aria-hidden="true"/><input {...props}/><span className="hos-search-submit" aria-label={actionLabel}><ArrowRight aria-hidden="true"/></span></label>;
}

export function HOSSurface({ children, className="", as="div" }: { children:ReactNode; className?:string; as?:"div"|"article"|"section" }) {
  const Tag=as;
  return <Tag className={`hos-surface ${className}`.trim()}>{children}</Tag>;
}

export function HOSSectionHeading({ eyebrow, title, trailing }: { eyebrow?:string; title:string; trailing?:ReactNode }) {
  return <header className="hos-section-heading"><div>{eyebrow?<small>{eyebrow}</small>:null}<h2>{title}</h2></div>{trailing?<span>{trailing}</span>:null}</header>;
}
