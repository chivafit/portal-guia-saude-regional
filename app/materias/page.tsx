import { MateriasCatalog } from "@/components/MateriasCatalog";
import { articles, articleImage, magazineEditions, podcasts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Matérias","Matérias, entrevistas e orientações de saúde, prevenção, bem-estar e especialistas da região.","/materias");

export default function MateriasPage(){
 const currentEdition=magazineEditions.find((edition)=>edition.coverUrl)??magazineEditions[0];
 return <MateriasCatalog articles={articles.map((article)=>({...article,image:articleImage(article)}))} podcastImage={podcasts[0]?.imageUrl} magazineCover={currentEdition?.coverUrl} magazineSlug={currentEdition?.slug}/>;
}
