import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { articleImage, editionArticles, magazineEditions } from "@/lib/data";
import { MagazineFlip } from "@/components/MagazineFlip";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams(){return magazineEditions.map(edition=>({slug:edition.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const edition=magazineEditions.find(item=>item.slug===slug);return edition?pageMetadata(`${edition.number} edição — ${edition.title}`,edition.description,`/revista/${slug}`):pageMetadata("Edição não encontrada","Edição não encontrada na Revista Guia Saúde.",`/revista/${slug}`);}
export default async function EditionPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const edition=magazineEditions.find(item=>item.slug===slug);if(!edition)notFound();
 const summary=editionArticles(edition);const published=magazineEditions.filter(item=>item.flipbook);
 const pages=edition.flipbook?Array.from({length:edition.flipbook.pages},(_,i)=>`${edition.flipbook!.dir}/page-${String(i+1).padStart(3,"0")}.jpg?v=20260731-crop2`):[];
 return <main className="native-magazine-reader-screen"><div className="native-magazine-reader-shell">
   <header className="native-magazine-reader-topbar"><Link href="/revista" aria-label="Voltar à revista"><ArrowLeft size={18}/></Link><span>{edition.number} edição · {edition.year}</span><BookOpen size={18}/></header>
   <section className="native-magazine-reader-head"><span className="native-magazine-reader-cover" style={edition.coverUrl?{backgroundImage:`url(${edition.coverUrl})`}:undefined}/><div><small>Revista Guia Saúde</small><h1>{edition.title}</h1><p>{edition.description}</p></div></section>
   {pages.length?<section className="native-magazine-reader" id="folhear"><header><small>Leitor digital</small><strong>Folheie a edição</strong><p>Arraste a página ou use as setas para avançar.</p></header><MagazineFlip pages={pages}/></section>:<section className="native-magazine-reader-empty"><BookOpen size={28}/><strong>Edição em preparação</strong><p>O leitor digital desta edição ainda não está disponível.</p></section>}
   {published.length>1?<nav className="native-magazine-shelf" aria-label="Outras edições"><header><small>Acervo</small><h2>Outras edições</h2></header><div>{published.filter(item=>item.slug!==edition.slug).map(item=><Link key={item.slug} href={`/revista/${item.slug}`}><span style={item.coverUrl?{backgroundImage:`url(${item.coverUrl})`}:undefined}/><strong>{item.number} edição</strong><small>{item.year}</small></Link>)}</div></nav>:null}
   {summary.length?<section className="native-magazine-summary"><header><small>Nesta edição</small><h2>Matérias relacionadas</h2></header><div>{summary.map(article=><Link key={article.slug} href={`/materias/${article.slug}`}><span style={articleImage(article)?{backgroundImage:`url(${articleImage(article)})`}:undefined}/><div><small>{article.category}</small><strong>{article.title}</strong><em>{article.readingTime??"Ler matéria"}</em></div><ArrowRight size={15}/></Link>)}</div></section>:null}
 </div></main>;
}
