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
    const haystack = `${item.name} ${item.profession} ${item.specialty} ${item.organization} ${item.services.join(" ")}`;
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
  return items.filter((item) => {
    const categoryMatch = !category || (
      requestedCategory
        ? categoryForOrganization(item)?.key === requestedCategory.key
        : normalizeTaxonomyValue(item.category) === normalizeTaxonomyValue(category)
    );
    const haystack = organizationSearchText(item);
    return (
      (!query || matchesSearchTerms(haystack, query)) &&
      (!city || normalizeTaxonomyValue(item.city) === normalizedCity) &&
      categoryMatch
    );
  });
}
