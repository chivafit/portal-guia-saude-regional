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

const termSynonyms = {
  cardiologista: ["cardiologia"],
  psicologo: ["psicologia"],
  fisioterapeuta: ["fisioterapia"],
  nutricionista: ["nutricao"],
  oftalmologista: ["oftalmologia"],
  ginecologista: ["ginecologia"],
  ortopedista: ["ortopedia"],
  farmacia: ["farmacias", "drogaria", "drogarias", "medicamento", "medicamentos"],
  farmacias: ["farmacia", "drogaria", "drogarias", "medicamento", "medicamentos"],
  drogaria: ["drogarias", "farmacia", "farmacias", "medicamento", "medicamentos"],
  drogarias: ["drogaria", "farmacia", "farmacias", "medicamento", "medicamentos"],
  remedio: ["remedios", "medicamento", "medicamentos", "farmacia", "farmacias", "drogaria", "drogarias"],
  remedios: ["remedio", "medicamento", "medicamentos", "farmacia", "farmacias", "drogaria", "drogarias"],
  medicamento: ["medicamentos", "remedio", "remedios", "farmacia", "farmacias", "drogaria", "drogarias"],
  medicamentos: ["medicamento", "remedio", "remedios", "farmacia", "farmacias", "drogaria", "drogarias"],
};

// Vocabulário de áreas, com formas femininas e plurais. Não expande sintomas
// nem associa uma especialidade clínica a outra (ex.: neurologia/psiquiatria).
const professionalTerms = [
  ["cardiologista", "cardiologia"], ["psicologo", "psicologa", "psicologia"],
  ["fisioterapeuta", "fisioterapia"], ["nutricionista", "nutricao"],
  ["oftalmologista", "oftalmologia"], ["ginecologista", "ginecologia"],
  ["ortopedista", "ortopedia"], ["traumatologista", "traumatologia"],
  ["neurologista", "neurologia"], ["dermatologista", "dermatologia"],
  ["endocrinologista", "endocrinologia"], ["urologista", "urologia"],
  ["reumatologista", "reumatologia"], ["pneumologista", "pneumologia"],
  ["otorrino", "otorrinolaringologista", "otorrinolaringologia"],
  ["psiquiatra", "psiquiatria"], ["pediatra", "pediatria"],
  ["geriatra", "geriatria"], ["gastroenterologista", "gastroenterologia"],
  ["angiologista", "angiologia"], ["mastologista", "mastologia"],
  ["radiologista", "radiologia"], ["anestesiologista", "anestesista", "anestesiologia"],
  ["dentista", "odontologo", "odontologa", "odontologia"],
  ["fonoaudiologo", "fonoaudiologa", "fonoaudiologia"],
  ["enfermeiro", "enfermeira", "enfermagem"],
  ["farmaceutico", "farmaceutica"], ["psicanalista", "psicanalise"],
  ["medico", "medica"], ["cirurgiao", "cirurgia", "cirurgioes"],
  ["terapeuta", "terapia"], ["ocupacional", "ocupacionais"],
];
for (const group of professionalTerms) {
  for (const term of group) {
    termSynonyms[term] = [...new Set([...(termSynonyms[term] ?? []), ...group])];
    termSynonyms[`${term}s`] = termSynonyms[term];
  }
}

/**
 * A busca textual exige todos os termos, sem depender de acentos, caixa ou pontuação.
 * @param {string} haystack
 * @param {string} query
 */
export function matchesSearchTerms(haystack, query) {
  const normalizedHaystack = normalizeSearchValue(haystack);
  const terms = searchTerms(query);
  return terms.length === 0 || terms.every((term) => {
    const equivalents = [term, ...(termSynonyms[term] ?? [])];
    return equivalents.some((equivalent) => normalizedHaystack.includes(equivalent));
  });
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
