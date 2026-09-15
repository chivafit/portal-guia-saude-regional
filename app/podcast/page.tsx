import { PodcastCatalog } from "@/components/PodcastCatalog";
import { publicPodcasts } from "@/lib/public-podcasts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Podcast Conexão Saúde", "Episódios e entrevistas do Conexão Saúde com profissionais da região.", "/podcast");

export default function PodcastPage() {
  return <PodcastCatalog episodes={publicPodcasts} />;
}
