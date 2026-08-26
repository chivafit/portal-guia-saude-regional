import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MagazineCatalog } from "@/components/MagazineCatalog";
import { magazineEditions } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Revista digital", "Edições da Revista Guia Saúde com histórias, especialistas, entrevistas e conteúdo regional de saúde.", "/revista");
export default function RevistaPage(){return <><SiteHeader advertiseLabel="Anuncie no Guia"/><MagazineCatalog editions={magazineEditions}/><SiteFooter/></>}
