import { organizationsForProfessional } from "./public-directory";
// Busca do portal: normaliza acentos, caixa e pontuação para comparações tolerantes.
import type { PublicOrganization, PublicProfessional } from "./directory";
import { categoryForOrganization, normalizeTaxonomyValue, organizationSearchText, resolveServiceCategory } from "./service-taxonomy";
import { matchesExactSearchValue, matchesProfessionalSpecialty, matchesSearchTerms, normalizeSearchValue } from "./search-match.js";

export function normalize(value: string): string {
  return normalizeSearchValue(value);
}

export type SearchFilters = {
  query?: string;
  city?: string;
  profession?: string;
  specialty?: string;
  category?: string;
  type?: "todos" | "profissionais" | "servicos" | "empresas" | "professionals" | "services";
};

export function filterProfessionals(items: PublicProfessional[], filters: SearchFilters): PublicProfessional[] {
  const { query = "", city = "", profession = "", specialty = "" } = filters;
  return items.filter((item) => {
    const haystack = `${item.name} ${item.profession} ${item.specialty} ${item.organization} ${(item.aliases ?? []).join(" ")} ${(item.locations ?? []).map((location) => location.name).join(" ")} ${organizationsForProfessional(item).map((organization) => [organization.name, ...(organization.aliases ?? [])].join(" ")).join(" ")} ${item.city} ${item.services.join(" ")}`;
    return (
      (!query || matchesSearchTerms(haystack, query)) &&
      (!city || matchesExactSearchValue(item.city, city)) &&
      (!profession || matchesExactSearchValue(item.profession, profession)) &&
      matchesProfessionalSpecialty(item, specialty)
    );
  });
}

export function filterOrganizations(items: PublicOrganization[], filters: SearchFilters): PublicOrganization[] {
  const { query = "", city = "", category = "" } = filters;
  const requestedCategory = resolveServiceCategory(category);
  const normalizedCity = normalizeTaxonomyValue(city);
  const normalizedQuery = normalizeTaxonomyValue(query);
  // Quando o visitante digita exatamente um nome ou alias editorial, esse
  // estabelecimento prevalece sobre coincidências acidentais de palavras soltas.
  const hasExactEntityMatch = Boolean(normalizedQuery) && items.some((item) =>
    [item.name, ...(item.aliases ?? [])]
      .map(normalizeTaxonomyValue)
      .some((candidate) => candidate === normalizedQuery),
  );
  return items.filter((item) => {
    const categoryMatch = !category || (
      requestedCategory
        ? categoryForOrganization(item)?.key === requestedCategory.key
        : normalizeTaxonomyValue(item.category) === normalizeTaxonomyValue(category)
    );
    const haystack = organizationSearchText(item);
    const exactEntityMatch = [item.name, ...(item.aliases ?? [])]
      .map(normalizeTaxonomyValue)
      .some((candidate) => candidate === normalizedQuery);
    // Apelidos curtos, como “Tó”, não podem usar correspondência parcial:
    // a forma normalizada "to" ocorre em praticamente qualquer texto em português.
    const shortAliasMatch = normalizedQuery.length > 0 && normalizedQuery.length <= 2
      && [item.name, ...(item.aliases ?? [])]
        .map(normalizeTaxonomyValue)
        .some((candidate) => candidate === normalizedQuery);
    return (
      (!query || (hasExactEntityMatch ? exactEntityMatch : normalizedQuery.length <= 2 ? shortAliasMatch : matchesSearchTerms(haystack, query))) &&
      (!city || normalizeTaxonomyValue(item.city) === normalizedCity) &&
      categoryMatch
    );
  });
}
