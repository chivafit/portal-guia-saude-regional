"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [["/buscar", "Encontrar profissionais"], ["/materias", "Conteúdos"], ["/podcast", "Podcast"], ["/revista", "Revista"], ["/sobre", "Sobre"], ["/anuncie", "Anuncie no Guia"]] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !panel.current) return;
      const focusables = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button:not([disabled])"));
      const first = focusables[0]; const last = focusables.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); button.current?.focus(); };
  }, [open]);

  return <div className="mobile-menu">
    <button ref={button} type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X size={21} /> : <Menu size={22} />}</button>
    {open && <><button className="mobile-menu-backdrop" aria-label="Fechar menu" onClick={() => setOpen(false)} /><nav ref={panel} id="mobile-navigation" aria-label="Menu principal" className="mobile-menu-panel">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav></>}
  </div>;
}
