import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Mic2, Stethoscope } from "lucide-react";
import { articles, articleImage, podcasts } from "@/lib/data";
import { publicProfessionals } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";
import { ProfessionalImage } from "@/components/ProfessionalImage";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = articles.find((item) => item.slug === slug); return article ? pageMetadata(article.title, article.excerpt, `/materias/${slug}`) : pageMetadata("Matéria não encontrada", "Conteúdo não encontrado no Guia Saúde.", `/materias/${slug}`); }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const episode = article.episodeSlug ? podcasts.find((item) => item.slug === article.episodeSlug) : undefined;
  const related = articles.filter((item) => item.slug !== article.slug && item.category === article.category);
  const suggestions = (related.length ? related : articles.filter((item) => item.slug !== article.slug)).slice(0, 3);
  const body = article.body ?? [article.excerpt];
  const cover = articleImage(article);
  const professionalSlug = article.professionalSlug ?? episode?.professionalSlugs?.[0];
  const professional = professionalSlug ? publicProfessionals.find((item) => item.slug === professionalSlug) : undefined;

  return <main className="native-article-screen">
    <div className="native-article-shell">
      <header className="native-article-topbar"><Link href="/materias" aria-label="Voltar para matérias"><ArrowLeft size={18}/></Link><span>Guia Saúde</span><Link href="/materias" aria-label="Biblioteca de conteúdos"><BookOpen size={18}/></Link></header>
      <article className="native-article-story">
        <header className="native-article-hero">
          <div className="native-article-cover" style={cover ? { backgroundImage:`url(${cover})` } : undefined}>{!cover ? <BookOpen size={34}/> : null}<span>{article.category}</span></div>
          <div className="native-article-heading"><p>{article.category}</p><h1>{article.title}</h1><strong>{article.excerpt}</strong><div>{article.author ? <span>{article.author}</span> : null}{article.date ? <span>{article.date}</span> : null}{article.readingTime ? <span>{article.readingTime}</span> : null}</div></div>
        </header>
        <section className="native-article-body">{body.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</section>
        {professional ? <Link className="native-article-professional" href={`/profissionais/${professional.slug}`}><span className="native-article-professional-photo">{professional.imageUrl ? <ProfessionalImage src={professional.imageUrl} sizes="54px"/> : <Stethoscope size={20}/>}</span><span><small>Especialista participante</small><strong>{professional.name}</strong><em>{professional.specialty}</em></span><ArrowUpRight size={17}/></Link> : null}
        {episode ? <Link className="native-article-podcast" href={`/podcast?episodio=${encodeURIComponent(episode.slug)}`}><Mic2 size={20}/><span><small>Continue no Podcast</small><strong>{episode.topic}</strong><em>{episode.guest}</em></span><ArrowRight size={17}/></Link> : null}
        <aside className="native-article-note"><strong>Compromisso editorial</strong><p>Conteúdo de caráter informativo. Não substitui avaliação, diagnóstico ou orientação de um profissional de saúde.</p></aside>
      </article>
      {suggestions.length ? <section className="native-article-related"><header><div><small>Continue lendo</small><h2>Outras matérias</h2></div><Link href="/materias">Ver todas</Link></header><div>{suggestions.map(item=><Link key={item.slug} href={`/materias/${item.slug}`}><span style={articleImage(item)?{backgroundImage:`url(${articleImage(item)})`}:undefined}/><div><small>{item.category}</small><strong>{item.title}</strong><em>{item.readingTime ?? "Ler matéria"}</em></div><ArrowRight size={15}/></Link>)}</div></section> : null}
    </div>
  </main>;
}
