// Busca do portal: normaliza acentos e caixa para comparações tolerantes.
// Ex.: "cardiologia", "Cardiología" e "CARDIOLOGIA" batem com "Cardiologia".
import type { PublicOrganization, PublicProfessional } from "./directory";
import { categoryForOrganization, normalizeTaxonomyValue, organizationSearchText, resolveServiceCategory } from "./service-taxonomy";

export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Divide a busca em termos e exige que todos apareçam (AND), em qualquer ordem.
function matchesTerms(haystack: string, query: string): boolean {
  const normalizedHaystack = normalize(haystack);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return terms.every((term) => normalizedHaystack.includes(term));
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
      (!query || matchesTerms(haystack, query)) &&
      (!city || item.city === city) &&
      (!profession || item.profession === profession) &&
      (!specialty || item.specialty === specialty)
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
      (!query || matchesTerms(haystack, query)) &&
      (!city || normalizeTaxonomyValue(item.city) === normalizedCity) &&
      categoryMatch
    );
  });
}
