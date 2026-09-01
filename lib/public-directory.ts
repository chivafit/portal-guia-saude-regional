import { organizations, professionals, type Organization, type Professional } from "./data";
import { piumhiProfessionalAdditions } from "./data/professional-additions";
import { applyProfessionalOverride } from "./data/professional-overrides";

/**
 * Fonte pública do diretório para a edição estática hospedada no GitHub Pages.
 * Registros legados recebem correções editoriais antes da exposição pública e
 * profissionais novos validados entram por uma lista auditável separada.
 */
function professionalDirectory(source: Professional[] = professionals) {
  const enriched = source.map(applyProfessionalOverride);
  return source === professionals ? [...enriched, ...piumhiProfessionalAdditions] : enriched;
}

export async function publishedProfessionals(fallback?: Professional[]) {
  return professionalDirectory(fallback).filter(isPublicProfessional).map(publicProfessional);
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
export const publicProfessionals: Professional[] = professionalDirectory()
  .filter(isPublicProfessional)
  .map(publicProfessional);

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback.filter((item) => item.city === "Piumhi"
    && item.publicationStatus === "published"
    && Boolean(item.phone)
    // Nunca publicamos um estabelecimento quando o endereço ainda é um texto
    // administrativo. Isso evita enviar informação assumidamente incompleta ao Google.
    && !/(endere[cç]o\s+(aguardando validação|a validar|a confirmar)|pendente|em revisão)/i.test(item.address));
}

export async function findPublishedOrganization(slug: string, fallback: Organization[] = organizations) {
  return (await publishedOrganizations(fallback)).find((item) => item.slug === slug) ?? null;
}

export async function findPublishedProfessional(slug: string, fallback?: Professional[]) {
  const item = professionalDirectory(fallback).find((candidate) => candidate.slug === slug && isPublicProfessional(candidate));
  return item ? publicProfessional(item) : null;
}
