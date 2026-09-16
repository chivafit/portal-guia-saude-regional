import { PodcastCatalog } from "@/components/PodcastCatalog";
import { publicPodcasts } from "@/lib/public-podcasts";
import { publicProfessionals } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Podcast Conexão Saúde", "Episódios e entrevistas do Conexão Saúde com profissionais da região.", "/podcast");

export default function PodcastPage() {
  const professionalImages = Object.fromEntries(
    publicProfessionals
      .filter((professional) => Boolean(professional.imageUrl))
      .map((professional) => [professional.slug, professional.imageUrl as string]),
  );

  const episodes = publicPodcasts.map((episode) => ({
    ...episode,
    imageUrl: episode.professionalSlugs?.map((slug) => professionalImages[slug]).find(Boolean) ?? episode.imageUrl,
  }));

  return <PodcastCatalog episodes={episodes} />;
}
