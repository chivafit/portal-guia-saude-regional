"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type SearchMode = "professionals" | "services";

type Props = {
  professions: string[];
  categories: { key: string; label: string; count: number }[];
};

export function RootGuideSearch({ professions, categories }: Props) {
  const [mode, setMode] = useState<SearchMode>("professionals");
  const isProfessional = mode === "professionals";

  return (
    <div className="root-guide-search-wrap">
      <div className="root-guide-search-tabs" role="tablist" aria-label="Tipo de busca">
        <button type="button" role="tab" aria-selected={isProfessional} className={isProfessional ? "is-active" : ""} onClick={() => setMode("professionals")}>Profissionais</button>
        <button type="button" role="tab" aria-selected={!isProfessional} className={!isProfessional ? "is-active" : ""} onClick={() => setMode("services")}>Clínicas e serviços</button>
      </div>
      <form className="root-guide-search" action="/buscar">
        <input type="hidden" name="cidade" value="piumhi" />
        <input type="hidden" name="tipo" value={mode} />
        <label className="root-guide-query">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{isProfessional ? "Nome, profissão ou especialidade" : "Nome da clínica, empresa ou serviço"}</span>
          <input name="q" placeholder={isProfessional ? "Nome, profissão ou especialidade" : "Nome da clínica, empresa ou serviço"} />
        </label>
        <label className="root-guide-field">
          <span>Cidade</span>
          <select name="cidade-display" value="Piumhi" disabled aria-label="Cidade selecionada"><option>Piumhi</option></select>
        </label>
        <label className="root-guide-field">
          <span>{isProfessional ? "Categoria" : "Tipo de serviço"}</span>
          {isProfessional ? (
            <select name="profissao" defaultValue=""><option value="">Todas as categorias</option>{professions.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          ) : (
            <select name="categoria" defaultValue=""><option value="">Todos os serviços</option>{categories.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select>
          )}
        </label>
        <button type="submit">Buscar no Guia Saúde</button>
      </form>
    </div>
  );
}
