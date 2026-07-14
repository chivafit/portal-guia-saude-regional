import { cities, professions } from "@/lib/data";

export function SearchForm({ compact = false }: { compact?: boolean }) {
  return (
    <form className={`portal-search ${compact ? "portal-search-compact" : ""}`} action="/buscar">
      <label><span>O que você procura?</span><input name="q" placeholder="Ex.: cardiologista, clínica, exame..." /></label>
      <label><span>Em qual cidade?</span><select name="cidade" defaultValue=""><option value="">Toda a região</option>{cities.map(city => <option key={city}>{city}</option>)}</select></label>
      {!compact && <label><span>Categoria</span><select name="profissao" defaultValue=""><option value="">Todas as áreas</option>{professions.map(item => <option key={item}>{item}</option>)}</select></label>}
      <button type="submit">Buscar <span>→</span></button>
    </form>
  );
}
