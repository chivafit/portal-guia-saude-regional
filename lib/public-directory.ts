import { organizations, professionals, type Organization, type Professional } from "./data";
import { publicProfessionals } from "./public-professionals";

/**
 * Fonte pública do diretório para a edição estática hospedada no GitHub Pages.
 * Para publicar ou atualizar um perfil, a equipe edita lib/data.ts e envia a
 * alteração ao GitHub. Não há banco de dados ou servidor envolvidos.
 */
export async function publishedProfessionals(fallback: Professional[] = professionals) {
  return fallback.filter(isPublicProfessional);
}

/**
 * Critério de exposição pública do diretório profissional.
 * Dados administrativos e cadastros sem contato/registro confirmado permanecem
 * no inventário interno até receberem confirmação adequada.
 */
export function isPublicProfessional(item: Professional) {
  const hasValidContact = /\d{8,}/.test(`${item.phone ?? ""} ${item.whatsapp ?? ""}`);
  const hasConfirmedRegistration = Boolean(item.registration) && !/(a validar|aguardando|pendente|confirmar|revis[aã]o)/i.test(item.registration);
  return item.city === "Piumhi"
    && item.publicationStatus === "published"
    && item.verificationStatus !== "needs-review"
    && Boolean(item.name && item.profession && item.specialty)
    && hasValidContact
    && hasConfirmedRegistration
    && Boolean(item.sourceUrls?.length || item.source);
}

/** Lista estática que pode ser usada em componentes client-side sem expor rascunhos. */
export { publicProfessionals };

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback.filter((item) => item.city === "Piumhi" && item.publicationStatus === "published" && Boolean(item.phone));
}

export async function findPublishedOrganization(slug: string, fallback: Organization[] = organizations) {
  return (await publishedOrganizations(fallback)).find((item) => item.slug === slug) ?? null;
}

export async function findPublishedProfessional(slug: string, fallback: Professional[] = professionals) {
  return fallback.find((item) => item.slug === slug && isPublicProfessional(item)) ?? null;
}
