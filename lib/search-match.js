// Regras compartilhadas de comparação da busca pública.
// Mantidas em JavaScript para também serem executadas pelos validadores Node.

/** @param {string} value */
export function normalizeSearchValue(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** @param {string} value */
export function searchTerms(value) {
  return normalizeSearchValue(value).split(" ").filter(Boolean);
}

/**
 * A busca textual exige todos os termos, sem depender de acentos, caixa ou pontuação.
 * @param {string} haystack
 * @param {string} query
 */
export function matchesSearchTerms(haystack, query) {
  const normalizedHaystack = normalizeSearchValue(haystack);
  const terms = searchTerms(query);
  return terms.length === 0 || terms.every((term) => normalizedHaystack.includes(term));
}

/** @param {string} left @param {string} right */
export function matchesExactSearchValue(left, right) {
  return normalizeSearchValue(left) === normalizeSearchValue(right);
}

/**
 * Especialidade funciona como área de cobertura, não como rótulo exato.
 * Ex.: filtro "Pediatria" inclui "Pediatria e Pneumologia Infantil".
 * Serviços confirmados também podem tornar o profissional recuperável pela área.
 * @param {{specialty?: string, services?: string[]}} item
 * @param {string} requestedSpecialty
 */
export function matchesProfessionalSpecialty(item, requestedSpecialty) {
  if (!requestedSpecialty) return true;
  const specialtyHaystack = `${item.specialty ?? ""} ${(item.services ?? []).join(" ")}`;
  return matchesSearchTerms(specialtyHaystack, requestedSpecialty);
}
