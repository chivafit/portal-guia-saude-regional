import { MateriasCatalog } from "@/components/MateriasCatalog";
import { articles, articleImage, podcasts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Matérias","Matérias, entrevistas e orientações de saúde, prevenção, bem-estar e especialistas da região.","/materias");

export default function MateriasPage(){
 const episode=podcasts.find((item)=>item.episodeUrl||item.audioUrl);
 return <MateriasCatalog articles={articles.map((article)=>({...article,image:articleImage(article)}))} latestEpisode={episode?{slug:episode.slug,topic:episode.topic,guest:episode.guest}:undefined}/>;
}
