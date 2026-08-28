import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, articleImage, podcasts } from "@/lib/data";
import { publicProfessionals } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return pageMetadata("Matéria não encontrada", "Conteúdo não encontrado no Guia Saúde.", `/materias/${slug}`);
  return pageMetadata(article.title, article.excerpt, `/materias/${slug}`);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const episode = article.episodeSlug ? podcasts.find((item) => item.slug === article.episodeSlug) : undefined;
  const related = articles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3);
  const fallbackRelated = articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  const suggestions = related.length ? related : fallbackRelated;
  const body = article.body ?? [article.excerpt];
  const cover = articleImage(article);
  const participatingProfessionalSlug = article.professionalSlug ?? episode?.professionalSlugs?.[0];
  const participatingProfessional = participatingProfessionalSlug
    ? publicProfessionals.find((professional) => professional.slug === participatingProfessionalSlug)
    : undefined;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero article-hero">
          <div className="shell">
            <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Matérias", href: "/materias" }, { label: article.category }]} />
            <p className="eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
            <div className="article-meta">
              {article.author ? (
                <span>
                  <strong>{article.author}</strong>
                  {article.authorRole ? ` · ${article.authorRole}` : ""}
                </span>
              ) : null}
              {article.date ? <span>{article.date}</span> : null}
              {article.readingTime ? <span>{article.readingTime}</span> : null}
            </div>
          </div>
        </section>

        {cover ? (
          <div className="shell article-cover-wrap">
            <span className="article-cover" style={{ backgroundImage: `url(${cover})` }} role="img" aria-label={article.title} />
          </div>
        ) : null}

        <section className="shell content-section article-layout">
          <article className="article-read">
            {body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {participatingProfessional ? (
              <Link className="article-inline-link" href={`/profissionais/${participatingProfessionalSlug}`}>
                Ver o perfil de {article.author} no Guia <ArrowUpRight size={14} />
              </Link>
            ) : null}

            {article.author && article.author !== "Redação Guia Saúde" ? (
              <p className="article-participation">Conteúdo produzido com a participação de profissional da região.</p>
            ) : null}

            {participatingProfessional ? (
              <section className="article-professional-panel">
                <p className="eyebrow">Especialista participante</p>
                <strong>Conheça o profissional que participou deste conteúdo</strong>
                <div>
                  {participatingProfessional.imageUrl ? <span className="article-professional-avatar" style={{ backgroundImage: `url(${participatingProfessional.imageUrl})` }} aria-hidden="true" /> : null}
                  <span><b>{participatingProfessional.name}</b><small>{participatingProfessional.specialty} · {participatingProfessional.city}</small></span>
                  <Link href={`/profissionais/${participatingProfessional.slug}`}>Ver perfil no Guia Saúde <ArrowRight size={14} /></Link>
                </div>
              </section>
            ) : null}

            <div className="editorial-note">
              <strong>Compromisso editorial</strong>
              <p>Conteúdo de caráter informativo. Não substitui avaliação, diagnóstico ou orientação de um profissional de saúde.</p>
            </div>
          </article>

          <aside className="article-side">
            {episode ? (
              <div className="article-side-card">
                <p className="eyebrow">No podcast</p>
                <strong>{episode.topic}</strong>
                <small>{episode.guest} · {episode.role}</small>
                {episode.episodeUrl ? (
                  <a className="podcast-watch-btn" href={episode.episodeUrl} target="_blank" rel="noreferrer">
                    <Play size={15} fill="currentColor" /> Assistir episódio
                  </a>
                ) : (
                  <Link href="/podcast">Ver no Conexão Saúde <ArrowRight size={13} /></Link>
                )}
              </div>
            ) : (
              <div className="article-side-card">
                <p className="eyebrow">Conexão Saúde</p>
                <strong>Ouça os especialistas da região</strong>
                <small>Entrevistas semanais sobre prevenção, tratamentos e qualidade de vida.</small>
                <Link href="/podcast">Ver episódios <ArrowRight size={13} /></Link>
              </div>
            )}

            <div className="article-side-card soft">
              <p className="eyebrow">Encontrar atendimento</p>
              <strong>Profissionais de {article.category.toLowerCase()}</strong>
              <small>Busque especialistas e serviços da sua cidade no diretório.</small>
              <Link href="/buscar">Abrir a busca <ArrowRight size={13} /></Link>
            </div>
          </aside>
        </section>

        {suggestions.length ? (
          <section className="shell content-section">
            <div className="content-title">
              <div>
                <p className="eyebrow">Continue lendo</p>
                <h2>Outras matérias</h2>
              </div>
              <Link href="/materias">Ver todas <ArrowRight size={14} /></Link>
            </div>
            <div className="content-card-grid">
              {suggestions.map((item, index) => (
                <Link key={item.slug} href={`/materias/${item.slug}`} className="content-card-link">
                  <div
                    className={`content-card-art tone-${index % 3}${articleImage(item) ? " has-photo" : ""}`}
                    style={articleImage(item) ? { backgroundImage: `url(${articleImage(item)})` } : undefined}
                  >
                    <span>{item.category}</span>
                  </div>
                  <small>{item.category}</small>
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                  <span>Ler matéria <ArrowRight size={13} /></span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
