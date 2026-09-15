import { podcastProfessionalSlugs } from "./podcast-guests";

/**
 * Curadoria independente dos Profissionais em Destaque.
 * A lista nasce com a seleção editorial já existente, mas daqui em diante
 * pode ser alterada sem mudar participantes, episódios ou regras do podcast.
 */
export const featuredProfessionalSlugs = new Set<string>(podcastProfessionalSlugs);

export function isFeaturedProfessional(slug: string): boolean {
  return featuredProfessionalSlugs.has(slug);
}
