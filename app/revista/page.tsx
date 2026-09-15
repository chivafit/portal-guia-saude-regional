import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { magazineEditions } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import "./revista.css";
export const metadata = pageMetadata("Revista digital", "Edições da Revista Guia Saúde com histórias, especialistas, entrevistas e conteúdo regional de saúde.", "/revista");
export default function RevistaPage(){
  const published=magazineEditions.filter(item=>item.flipbook||item.coverUrl);
  const featured=published[0]??magazineEditions[0];
  return <main className="native-magazine-screen"><div className="native-magazine-shell">
    <header className="native-magazine-topbar"><Link href="/materias" aria-label="Voltar"><ArrowLeft size={18}/></Link><span>Revista Guia Saúde</span><BookOpen size={18}/></header>
    <section className="native-magazine-intro"><small>Biblioteca digital</small><h1>Informação para cuidar melhor.</h1><p>Leia as edições do Guia Saúde em uma experiência feita para o app.</p></section>
    {featured ? <Link className="native-magazine-feature" href={`/revista/${featured.slug}`}><span className="native-magazine-feature-cover" style={featured.coverUrl?{backgroundImage:`url(${featured.coverUrl})`}:undefined}>{!featured.coverUrl?<BookOpen size={34}/>:null}</span><span className="native-magazine-feature-copy"><small>Edição em destaque · {featured.year}</small><strong>{featured.title}</strong><p>{featured.description}</p><em>Folhear agora <ArrowRight size={14}/></em></span></Link>:null}
    <section className="native-magazine-library"><header><div><small>Acervo</small><h2>Todas as edições</h2></div><span>{published.length}</span></header><div className="native-magazine-grid">{published.map(item=><Link key={item.slug} href={`/revista/${item.slug}`}><span className="native-magazine-cover" style={item.coverUrl?{backgroundImage:`url(${item.coverUrl})`}:undefined}>{!item.coverUrl?<BookOpen size={26}/>:null}</span><strong>{item.number} edição</strong><small>{item.year}</small></Link>)}</div></section>
  </div></main>;
}
