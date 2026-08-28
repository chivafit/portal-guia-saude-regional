import { organizations, professionals, type Organization, type Professional } from "./data";

/**
 * Fonte pública do diretório para a edição estática hospedada no GitHub Pages.
 * Para publicar ou atualizar um perfil, a equipe edita lib/data.ts e envia a
 * alteração ao GitHub. Não há banco de dados ou servidor envolvidos.
 */
export async function publishedProfessionals(fallback: Professional[] = professionals) {
  return fallback.filter(isPublicProfessional).map(publicProfessional);
}

/**
 * Critério de exposição pública do diretório profissional.
 * A publicação é uma decisão editorial independente da procedência registrada
 * para cada dado; informações internas nunca aparecem como selo no site.
 */
export function isPublicProfessional(item: Professional) {
  return item.city === "Piumhi"
    && item.publicationStatus === "published"
    && Boolean(item.name && item.profession && item.specialty);
}

function publicRegistration(registration: string) {
  return registration
    .replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente de confirmação|a confirmar)[^·]*/gi, "")
    .trim();
}

function publicOrganization(organization: string) {
  return organization
    .replace(/\s*(?:—|-)?\s*endere[cç]o\s+(a validar|aguardando validação|a confirmar)/gi, "")
    .trim();
}

/**
 * Separa o inventário editorial do objeto serializado nas páginas públicas.
 * Assim, observações administrativas legadas não são enviadas ao navegador.
 */
export function publicProfessional(item: Professional): Professional {
  const { sourceUrls, lastVerifiedAt, updatedAt, claimed, ...visible } = item;
  const summary = /(a validar|aguardando validação|pendente|em revisão|a confirmar|sujeit[oa]s?\s+à\s+confirmação|levantamento editorial|contato em validação|especialidade pendente|endereço a confirmar)/i.test(item.summary)
    ? ""
    : item.summary;

  return {
    ...visible,
    registration: publicRegistration(item.registration),
    organization: publicOrganization(item.organization),
    summary,
  };
}

/** Lista estática que pode ser usada em componentes client-side sem expor rascunhos. */
export const publicProfessionals: Professional[] = professionals
  .filter(isPublicProfessional)
  .map(publicProfessional);

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback.filter((item) => item.city === "Piumhi" && item.publicationStatus === "published" && Boolean(item.phone));
}

export async function findPublishedOrganization(slug: string, fallback: Organization[] = organizations) {
  return (await publishedOrganizations(fallback)).find((item) => item.slug === slug) ?? null;
}

export async function findPublishedProfessional(slug: string, fallback: Professional[] = professionals) {
  const item = fallback.find((candidate) => candidate.slug === slug && isPublicProfessional(candidate));
  return item ? publicProfessional(item) : null;
}
