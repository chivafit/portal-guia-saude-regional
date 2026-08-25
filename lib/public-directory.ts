import { organizations, professionals, type Organization, type Professional } from "./data";

/**
 * Fonte pública do diretório para a edição estática hospedada no GitHub Pages.
 * Para publicar ou atualizar um perfil, a equipe edita lib/data.ts e envia a
 * alteração ao GitHub. Não há banco de dados ou servidor envolvidos.
 */
export async function publishedProfessionals(fallback: Professional[] = professionals) {
  return fallback;
}

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback;
}

export async function findPublishedProfessional(slug: string, fallback: Professional[] = professionals) {
  return fallback.find((item) => item.slug === slug) ?? null;
}
