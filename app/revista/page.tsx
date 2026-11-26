import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { magazineEditions } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";
import { ContentTabs } from "@/components/content/ContentTabs";
import "./revista.css";
export const metadata = pageMetadata("Revista digital", "Edições da Revista Guia Saúde com histórias, especialistas, entrevistas e conteúdo regional de saúde.", "/revista");
export default function RevistaPage(){
  const published=magazineEditions.filter(item=>item.flipbook||item.coverUrl);
  const featured=published[0]??magazineEditions[0];
  const library=published.slice(0,9);
  return <main className="native-magazine-screen"><div className="native-magazine-shell">
    <ContentTabs active="revista"/>
    <HealthOSSectionHeader eyebrow="Biblioteca digital" title="Revista Guia Saúde" description="Todas as edições da Revista Guia Saúde para folhear no celular ou no computador." backHref="/materias" />
    {featured ? <Link className="native-magazine-feature" href={`/revista/${featured.slug}`}><span className="native-magazine-feature-cover" style={featured.coverUrl?{backgroundImage:`url(${featured.coverUrl})`}:undefined}>{!featured.coverUrl?<BookOpen size={34}/>:null}</span><span className="native-magazine-feature-copy"><small>Edição em destaque · {featured.year}</small><strong>{featured.title}</strong><p>{featured.description}</p><em>Folhear agora <ArrowRight size={14}/></em></span></Link>:null}
    <section className="native-magazine-library"><header><div><small>Acervo</small><h2>Todas as edições</h2></div></header><div className="native-magazine-grid">{library.map(item=><Link key={item.slug} href={`/revista/${item.slug}`}><span className="native-magazine-cover" style={item.coverUrl?{backgroundImage:`url(${item.coverUrl})`}:undefined}>{!item.coverUrl?<BookOpen size={26}/>:null}</span><strong>{item.number} edição</strong><small>{item.year}</small></Link>)}</div></section>
  </div></main>;
}
