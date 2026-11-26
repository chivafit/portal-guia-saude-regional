"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Building2, Clock3, Search, Stethoscope, UserRound, X } from "lucide-react";
import { matchSuggestions, type Suggestion } from "@/lib/search-suggestions";

const RECENT_KEY = "guia-saude:buscas-recentes";

function readRecent(): string[] {
  try { const value = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); return Array.isArray(value) ? value.filter((item) => typeof item === "string").slice(0, 5) : []; } catch { return []; }
}
export function rememberSearch(term: string) {
  const clean = term.trim();
  if (clean.length < 2) return;
  try { localStorage.setItem(RECENT_KEY, JSON.stringify([clean, ...readRecent().filter((item) => item.toLocaleLowerCase("pt-BR") !== clean.toLocaleLowerCase("pt-BR"))].slice(0, 5))); } catch { /* sem armazenamento: segue sem recentes */ }
}

/** Campo de busca com sugestões enquanto digita (especialidades, profissionais e locais)
 *  e as buscas recentes quando está vazio. Fica dentro do <form> de busca existente:
 *  Enter continua enviando o formulário normalmente. */
export function SuggestInput({ index, defaultValue = "", placeholder, label, name = "q", clearable = true }: { index: Suggestion[]; defaultValue?: string; placeholder: string; label: string; name?: string; clearable?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const listId = useId();
  const wrap = useRef<HTMLSpanElement>(null);
  const suggestions = useMemo(() => matchSuggestions(index, value), [index, value]);
  const showRecent = !value.trim() && recent.length > 0;
  const items: { label: string; sub?: string; href: string; kind?: Suggestion["kind"]; recent?: boolean }[] = showRecent
    ? recent.map((term) => ({ label: term, href: `/buscar?q=${encodeURIComponent(term)}&cidade=piumhi`, recent: true }))
    : suggestions;
  const visible = open && items.length > 0;

  useEffect(() => {
    const close = (event: PointerEvent) => { if (!wrap.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const go = (item: (typeof items)[number]) => { rememberSearch(item.recent || item.kind === "specialty" ? item.label : value); setOpen(false); router.push(item.href); };
  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!visible) { if (event.key === "Enter") rememberSearch(value); return; }
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((i) => (i + 1) % items.length); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setActive((i) => (i <= 0 ? items.length - 1 : i - 1)); }
    else if (event.key === "Escape") { setOpen(false); }
    else if (event.key === "Enter") { if (active >= 0) { event.preventDefault(); go(items[active]); } else rememberSearch(value); }
  };

  return <span className="sg" ref={wrap}>
    <input name={name} value={value} placeholder={placeholder} aria-label={label} autoComplete="off" enterKeyHint="search"
      role="combobox" aria-expanded={visible} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={visible && active >= 0 ? `${listId}-${active}` : undefined}
      onFocus={() => { setRecent(readRecent()); setOpen(true); }} onChange={(event) => { setValue(event.target.value); setOpen(true); setActive(-1); }} onKeyDown={onKey} />
    {clearable && value ? <button type="button" className="sg-clear" aria-label="Limpar busca" onClick={() => { setValue(""); setActive(-1); setOpen(true); }}><X size={16} /></button> : null}
    {visible ? <ul className="sg-list" id={listId} role="listbox" aria-label={showRecent ? "Buscas recentes" : "Sugestões"}>
      {showRecent ? <li className="sg-title" role="presentation">Buscas recentes</li> : null}
      {items.map((item, i) => {
        return <li key={`${item.href}-${i}`} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
          <Link href={item.href} className={i === active ? "is-active" : undefined} onClick={(event) => { event.preventDefault(); go(item); }} onPointerEnter={() => setActive(i)}>
            <span className="sg-ic" aria-hidden="true">{item.recent ? <Clock3 size={17} /> : item.kind === "place" ? <Building2 size={17} /> : item.kind === "professional" ? <UserRound size={17} /> : <Stethoscope size={17} />}</span>
            <span className="sg-text"><strong>{item.label}</strong>{item.sub ? <small>{item.sub}</small> : null}</span>
          </Link>
        </li>;
      })}
      {!showRecent ? <li role="presentation"><button type="submit" className="sg-all"><Search size={15} aria-hidden="true" />Buscar “{value.trim()}”</button></li> : null}
    </ul> : null}
  </span>;
}
