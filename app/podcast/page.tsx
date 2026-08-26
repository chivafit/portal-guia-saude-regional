import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PodcastCatalog } from "@/components/PodcastCatalog";
import { podcasts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Podcast Conexão Saúde", "Episódios e entrevistas do Conexão Saúde com profissionais da região.", "/podcast");

export default function PodcastPage() {
  return <><SiteHeader advertiseLabel="Anuncie no Guia" /><PodcastCatalog episodes={podcasts} /><SiteFooter /></>;
}
