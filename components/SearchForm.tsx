import { cities, professions } from "@/lib/data";

export function SearchForm({ compact = false }: { compact?: boolean }) {
  return (
    <form className={`portal-search ${compact ? "portal-search-compact" : ""}`} action="/buscar">
      <label><span>O que você procura?</span><input name="q" placeholder="Especialidade, profissional ou serviço" /></label>
      <label><span>Cidade</span><select name="cidade" defaultValue=""><option value="">Todas as cidades</option>{cities.map(city => <option key={city}>{city}</option>)}</select></label>
      {!compact && <label><span>Profissão</span><select name="profissao" defaultValue=""><option value="">Todas as profissões</option>{professions.map(item => <option key={item}>{item}</option>)}</select></label>}
      <button type="submit">Buscar no Guia</button>
    </form>
  );
}
