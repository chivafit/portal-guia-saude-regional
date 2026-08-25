import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articleImage, editionArticles, magazineEditions } from "@/lib/data";
import { MagazineFlip } from "@/components/MagazineFlip";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return magazineEditions.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edition = magazineEditions.find((item) => item.slug === slug);
  if (!edition) return pageMetadata("Edição não encontrada", "Edição não encontrada na Revista Guia Saúde.", `/revista/${slug}`);
  return pageMetadata(`${edition.number} edição — ${edition.title}`, edition.description, `/revista/${slug}`);
}

export default async function EditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const edition = magazineEditions.find((item) => item.slug === slug);
  if (!edition) notFound();

  const summary = editionArticles(edition);
  const publishedEditions = magazineEditions.filter((item) => item.flipbook);
  const flipPages = edition.flipbook
    ? Array.from(
        { length: edition.flipbook.pages },
        (_, i) => `${edition.flipbook!.dir}/page-${String(i + 1).padStart(3, "0")}.jpg?v=20260731-crop2`,
      )
    : [];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero">
          <div className="shell">
            <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Revista", href: "/revista" }, { label: `${edition.number} edição` }]} />
            <p className="eyebrow">Revista Guia Saúde · {edition.year}</p>
            <h1>{edition.title}</h1>
            <p>{edition.description}</p>
          </div>
        </section>

        <section className="shell content-section">
          <article className="magazine-feature">
            <div className={`edition-cover${edition.coverUrl ? " edition-cover-published" : ""}`} style={edition.coverUrl ? { backgroundImage: `url('${edition.coverUrl}')` } : undefined}>
              {!edition.coverUrl ? <><small>REVISTA</small><strong>Guia<br />Saúde</strong><span>{edition.number} edição</span><p>SAÚDE, BEM-ESTAR<br />E QUALIDADE DE VIDA</p></> : null}
            </div>
            <div>
              <p className="eyebrow">Editorial</p>
              <h2>{edition.number} edição</h2>
              {edition.editorial ? <p>{edition.editorial}</p> : <p>{edition.description}</p>}
              <div className="edition-actions">
                {edition.flipbook ? (
                  <Link className="edition-read-btn" href="#folhear">Folhear a edição <BookOpen size={14} /></Link>
                ) : summary.length ? (
                  <Link className="edition-read-btn" href="#sumario">Ver o sumário <ArrowRight size={14} /></Link>
                ) : (
                  <span className="edition-preparing">Lançamento em breve</span>
                )}
                <Link href="/revista">Todas as edições</Link>
              </div>
            </div>
          </article>

          <nav className="edition-shelf" aria-label="Todas as edições publicadas">
            <div className="edition-shelf-head">
              <div><p className="eyebrow">Acervo digital</p><h2>Todas as edições</h2></div>
              <span>Escolha uma capa para ler</span>
            </div>
            <div className="edition-shelf-track">
              {publishedEditions.map((item) => (
                <Link key={item.slug} href={`/revista/${item.slug}`} className={`edition-shelf-item${item.slug === edition.slug ? " active" : ""}`} aria-current={item.slug === edition.slug ? "page" : undefined}>
                  <span className="edition-shelf-cover" style={item.coverUrl ? { backgroundImage: `url('${item.coverUrl}')` } : undefined} />
                  <strong>{item.number} edição</strong>
                  <small>{item.year}</small>
                </Link>
              ))}
            </div>
          </nav>

          {flipPages.length ? (
            <div id="folhear" className="edition-reader">
              <div className="reader-magazine-brand">
                <div className="reader-masthead">
                  <small>GUIA</small>
                  <strong>saúde</strong>
                  <span>INFORMAÇÃO QUE TRANSFORMA</span>
                </div>
                <div className="reader-issue">
                  <span>REVISTA {edition.year}</span>
                  <i aria-hidden="true" />
                  <strong>{edition.number} EDIÇÃO</strong>
                </div>
              </div>
              <div className="edition-reader-stage"><MagazineFlip pages={flipPages} /></div>
              <p className="edition-reader-hint"><strong>Como folhear:</strong> arraste a página, clique nas bordas ou use as setas.</p>
            </div>
          ) : null}

          {summary.length ? (
            <div id="sumario">
              <div className="content-title">
                <div>
                  <p className="eyebrow">{edition.flipbook ? "No portal" : "Nesta edição"}</p>
                  <h2>{edition.flipbook ? "Matérias relacionadas" : "Sumário"}</h2>
                </div>
                <span>{summary.length} matérias</span>
              </div>
              <div className="content-card-grid">
                {summary.map((article, index) => {
                  const image = articleImage(article);
                  return (
                    <Link key={article.slug} href={`/materias/${article.slug}`} className="content-card-link">
                      <div
                        className={`content-card-art tone-${index % 3}${image ? " has-photo" : ""}`}
                        style={image ? { backgroundImage: `url(${image})` } : undefined}
                      >
                        <span>{article.category}</span>
                      </div>
                      <small>{article.category}{article.readingTime ? ` · ${article.readingTime}` : ""}</small>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                      <span>Ler matéria <ArrowUpRight size={13} /></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="advertiser-strip">
            <div>
              <small>PARA MARCAS E PROFISSIONAIS</small>
              <strong>Faça parte da próxima edição.</strong>
            </div>
            <p>Conteúdo, entrevistas e presença publicitária conectados ao público regional.</p>
            <a href="/anuncie">Conhecer oportunidades <ArrowRight size={14} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
