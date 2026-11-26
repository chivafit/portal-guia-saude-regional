import { podcasts, type PodcastEpisode } from "./data";
import { professionalSlugsForEpisode } from "./podcast-guests";
import { publicProfessionals } from "./public-directory";
import { isGeneratedImage } from "./avatars";

/** Episódios serializados para a página pública já com todos os perfis vinculados. */
export const publicPodcasts: PodcastEpisode[] = podcasts.map((episode) => ({
  ...episode,
  professionalSlugs: professionalSlugsForEpisode(episode),
}));

/** Lista exibida na página do podcast: usa a foto do perfil do convidado quando existe.
 *  `guestPhoto` só recebe foto real (nunca a miniatura do YouTube): é ela que entra na
 *  capa padrão do Conexão Saúde (components/podcast/PodcastCover.tsx). */
export function podcastCatalogEpisodes(): (PodcastEpisode & { guestPhoto?: string; guestArea?: string })[] {
  const professionalImages = new Map(
    publicProfessionals
      .filter((professional) => !isGeneratedImage(professional.imageUrl))
      .map((professional) => [professional.slug, professional.imageUrl as string]),
  );
  const professionalAreas = new Map(publicProfessionals.map((professional) => [professional.slug, professional.specialty || professional.profession]));
  return publicPodcasts.map((episode) => {
    const guestPhoto = episode.professionalSlugs?.map((slug) => professionalImages.get(slug)).find(Boolean);
    return {
      ...episode,
      imageUrl: guestPhoto ?? episode.imageUrl,
      guestPhoto,
      guestArea: episode.role || episode.professionalSlugs?.map((slug) => professionalAreas.get(slug)).find(Boolean) || "",
    };
  });
}
