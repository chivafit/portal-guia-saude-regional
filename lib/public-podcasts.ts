import { podcasts, type PodcastEpisode } from "./data";
import { professionalSlugsForEpisode } from "./podcast-guests";

/** Episódios serializados para a página pública já com todos os perfis vinculados. */
export const publicPodcasts: PodcastEpisode[] = podcasts.map((episode) => ({
  ...episode,
  professionalSlugs: professionalSlugsForEpisode(episode),
}));
