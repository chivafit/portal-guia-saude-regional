import { MateriasCatalog } from "@/components/MateriasCatalog";
import { articles, articleImage } from "@/lib/data";
import { podcastCatalogEpisodes } from "@/lib/public-podcasts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Matérias","Matérias, entrevistas e orientações de saúde, prevenção, bem-estar e especialistas da região.","/materias");

export default function MateriasPage(){
 const episode=podcastCatalogEpisodes().find((item)=>item.episodeUrl||item.audioUrl);
 return <MateriasCatalog articles={articles.map((article)=>({...article,image:articleImage(article)}))} latestEpisode={episode?{slug:episode.slug,topic:episode.topic,guest:episode.guest,role:episode.role,guestPhoto:episode.guestPhoto,guestArea:episode.guestArea}:undefined}/>;
}
