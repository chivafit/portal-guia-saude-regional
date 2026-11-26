import { podcasts, type PodcastEpisode } from "./data";
import { professionalSlugsForEpisode } from "./podcast-guests";
import { publicProfessionals } from "./public-directory";
import { isGeneratedImage } from "./avatars";

/** Episódios serializados para a página pública já com todos os perfis vinculados. */
export const publicPodcasts: PodcastEpisode[] = podcasts.map((episode) => ({
  ...episode,
  professionalSlugs: professionalSlugsForEpisode(episode),
}));

/** Lista exibida na página do podcast: usa a foto do perfil do convidado quando existe. */
export function podcastCatalogEpisodes(): PodcastEpisode[] {
  const professionalImages = new Map(
    publicProfessionals
      .filter((professional) => !isGeneratedImage(professional.imageUrl))
      .map((professional) => [professional.slug, professional.imageUrl as string]),
  );
  return publicPodcasts.map((episode) => ({
    ...episode,
    imageUrl: episode.professionalSlugs?.map((slug) => professionalImages.get(slug)).find(Boolean) ?? episode.imageUrl,
  }));
}
