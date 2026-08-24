import { podcasts, type PodcastEpisode } from "./data";
import { normalize } from "./search";

function cleanName(value: string): string {
  return normalize(value)
    .replace(/\b(dr|dra|doutor|doutora)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function podcastForProfessional(slug: string, name: string): PodcastEpisode | undefined {
  const professionalName = cleanName(name);
  return podcasts.find((episode) => {
    if (episode.professionalSlugs?.includes(slug)) return true;
    const guestName = cleanName(episode.guest);
    return guestName === professionalName || guestName.includes(professionalName) || professionalName.includes(guestName);
  });
}
