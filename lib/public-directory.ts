import { organizations, professionals, type Organization, type Professional } from "./data";

/**
 * Fonte pública do diretório para a edição estática hospedada no GitHub Pages.
 * Para publicar ou atualizar um perfil, a equipe edita lib/data.ts e envia a
 * alteração ao GitHub. Não há banco de dados ou servidor envolvidos.
 */
export async function publishedProfessionals(fallback: Professional[] = professionals) {
  return fallback.filter((item) => item.city === "Piumhi");
}

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback.filter((item) => item.city === "Piumhi" && item.publicationStatus === "published" && Boolean(item.phone));
}

export async function findPublishedOrganization(slug: string, fallback: Organization[] = organizations) {
  return (await publishedOrganizations(fallback)).find((item) => item.slug === slug) ?? null;
}

export async function findPublishedProfessional(slug: string, fallback: Professional[] = professionals) {
  return fallback.find((item) => item.city === "Piumhi" && item.slug === slug) ?? null;
}
