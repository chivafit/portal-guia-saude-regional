import type { Organization } from "./data";

export type ServiceCategory = {
  key: string;
  label: string;
  aliases: string[];
};

/** Taxonomia pública do diretório. Chaves são estáveis; rótulos podem evoluir. */
export const serviceTaxonomy: ServiceCategory[] = [
  { key: "clinicas", label: "Clínicas e consultórios", aliases: ["clinica", "clinicas", "consultorio", "consultorios", "especialidades"] },
  { key: "odontologia", label: "Clínicas odontológicas", aliases: ["odontologia", "odontologica", "dentista", "dentistas", "saude bucal"] },
  { key: "hospitais", label: "Hospitais e diagnóstico", aliases: ["hospital", "hospitais", "diagnostico", "imagem", "exames"] },
  { key: "academias", label: "Academias e atividade física", aliases: ["academia", "academias", "atividade fisica", "musculacao", "natacao", "hidroginastica"] },
  { key: "pilates", label: "Pilates e reabilitação", aliases: ["pilates", "reabilitacao", "fisioterapia", "quiropraxia"] },
  { key: "farmacias", label: "Farmácias", aliases: ["farmacia", "farmacias", "drogaria", "drogarias"] },
  { key: "oticas", label: "Óticas", aliases: ["otica", "oticas", "oculos", "lentes", "visao"] },
  { key: "laboratorios", label: "Laboratórios", aliases: ["laboratorio", "laboratorios", "coleta"] },
  { key: "estetica", label: "Estética e bem-estar", aliases: ["estetica", "bem estar", "bem-estar"] },
];

export function normalizeTaxonomyValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function resolveServiceCategory(value?: string): ServiceCategory | undefined {
  const normalized = normalizeTaxonomyValue(value ?? "");
  if (!normalized) return undefined;
  return serviceTaxonomy.find((category) =>
    [category.key, category.label, ...category.aliases]
      .map(normalizeTaxonomyValue)
      .some((candidate) => candidate === normalized || normalized.includes(candidate) || candidate.includes(normalized)),
  );
}

export function categoryForOrganization(organization: Organization): ServiceCategory | undefined {
  return serviceTaxonomy.find((category) => category.key === organization.categoryKey) ?? resolveServiceCategory(organization.category);
}

export function categoryOptionsFor(organizations: Organization[]) {
  return serviceTaxonomy
    .map((category) => ({
      ...category,
      count: organizations.filter((organization) => categoryForOrganization(organization)?.key === category.key).length,
    }))
    .filter((category) => category.count > 0);
}

export function organizationSearchText(organization: Organization): string {
  const category = categoryForOrganization(organization);
  return [
    organization.name,
    organization.category,
    category?.label,
    ...(category?.aliases ?? []),
    ...(organization.subcategories ?? []),
    ...(organization.keywords ?? []),
    organization.city,
    organization.summary,
    ...organization.services,
  ].filter(Boolean).join(" ");
}
