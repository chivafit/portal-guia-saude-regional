// Índice pequeno para as sugestões da busca (especialidades, profissionais e locais).
// Roda no servidor (início) e no navegador (página de busca), sem dependências.

export type Suggestion = { kind: "specialty" | "professional" | "place"; label: string; sub: string; href: string; key: string };

type ProfessionalLike = { slug: string; name: string; profession: string; specialty: string; city: string };
type OrganizationLike = { slug: string; name: string; category: string; city: string };

export function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLocaleLowerCase("pt-BR").trim();
}

export function buildSuggestionIndex(professionals: ProfessionalLike[], organizations: OrganizationLike[], city = "Piumhi"): Suggestion[] {
  const pros = professionals.filter((item) => item.city === city);
  const counts = new Map<string, number>();
  for (const item of pros) for (const area of [item.specialty, item.profession]) if (area) counts.set(area, (counts.get(area) ?? 0) + 1);
  const specialties: Suggestion[] = [...counts].sort((a, b) => b[1] - a[1]).map(([area, count]) => ({
    kind: "specialty", label: area, sub: `${count} ${count === 1 ? "profissional" : "profissionais"}`,
    href: `/buscar?q=${encodeURIComponent(area)}&cidade=piumhi&tipo=professionals`, key: normalize(area),
  }));
  const people: Suggestion[] = pros.map((item) => ({
    kind: "professional", label: item.name, sub: item.specialty || item.profession,
    href: `/profissionais/${item.slug}`, key: normalize(item.name.replace(/^(dra?|dr)\.?\s+/i, "")),
  }));
  const places: Suggestion[] = organizations.filter((item) => item.city === city).map((item) => ({
    kind: "place", label: item.name, sub: item.category.split("•")[0].trim(),
    href: `/empresas/${item.slug}`, key: normalize(item.name),
  }));
  return [...specialties, ...people, ...places];
}

/** Até `limit` sugestões: primeiro as que começam com o termo, depois as que o contêm. */
export function matchSuggestions(index: Suggestion[], term: string, limit = 7) {
  const q = normalize(term);
  if (q.length < 2) return [];
  const starts: Suggestion[] = [];
  const contains: Suggestion[] = [];
  for (const item of index) {
    if (item.key.startsWith(q) || item.key.split(/\s+/).some((word) => word.startsWith(q))) starts.push(item);
    else if (item.key.includes(q)) contains.push(item);
  }
  return [...starts, ...contains].slice(0, limit);
}
