import Link from "next/link";
import { Archive, ArrowRight, BookOpen, CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { editionArticles, magazineEditions, type Article } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Revista digital",
  "Edições da Revista Guia Saúde com histórias, especialistas, entrevistas e conteúdo regional de saúde.",
  "/revista",
);

export default async function RevistaPage() {
  const editions = magazineEditions.map((edition) => ({
      slug: edition.slug,
      number: edition.number,
      year: edition.year,
      title: edition.title,
      description: edition.description,
      featured: edition.featured,
      articles: editionArticles(edition),
      coverUrl: edition.coverUrl,
      hasDigital: Boolean(edition.pdfUrl || edition.flipbook),
    }));
  const featured = editions[0];
  const isUpcoming = !featured.hasDigital;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero magazine-hero portal-section-hero">
          <div className="shell portal-section-hero-grid">
            <div>
              <p className="eyebrow">Revista Guia Saúde</p>
              <h1>Histórias que circulam. Conteúdo que permanece.</h1>
              <p>Acompanhe o próximo lançamento ou encontre rapidamente uma publicação anterior no acervo.</p>
            </div>
            <aside className="portal-section-summary">
              <strong>Na revista:</strong>
              <span><BookOpen size={17} /> Leitura digital para folhear</span>
              <span><Archive size={17} /> {Math.max(editions.length - 1, 0)} edições no acervo</span>
              <span><CalendarDays size={17} /> Próximo lançamento em novembro</span>
              <small>Escolha uma edição e leia diretamente pelo portal.</small>
            </aside>
          </div>
        </section>
        <section className="shell content-section">
          <article className="magazine-feature magazine-feature-current">
            <Link className={`edition-cover edition-cover-real${isUpcoming ? " edition-cover-upcoming" : ""}`} href={featured.slug ? `/revista/${featured.slug}` : "/revista"} aria-label={`Abrir ${featured.number} edição`}>
              <span className="edition-cover-badge">{isUpcoming ? "Lançamento em breve" : "Edição atual"}</span>
              <span className="edition-cover-year">{featured.year} · {featured.number} EDIÇÃO</span>
              <span className="edition-cover-brand">guia <b>saúde</b></span>
              {isUpcoming ? <span className="edition-cover-launch">EM BREVE</span> : null}
              <span className="edition-cover-theme">Uma nova<br />edição está<br /><em>chegando</em></span>
              <span className="edition-cover-footer">LANÇAMENTO • 07 DE NOVEMBRO • PIUMHI</span>
            </Link>
            <div className="magazine-feature-copy">
              <p className="eyebrow">{isUpcoming ? "Próximo lançamento" : "Edição atual"} · {featured.number} · {featured.year}</p>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              {featured.articles.length ? (
                <div className="edition-summary">
                  <small>Nesta edição</small>
                  <ul>
                    {featured.articles.map((article: Article) => (
                      <li key={article.slug}>
                        <Link href={`/materias/${article.slug}`}>{article.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="edition-actions">
                {featured.slug && featured.hasDigital ? (
                  <Link className="edition-read-btn" href={`/revista/${featured.slug}`}><BookOpen size={16} /> Ler edição digital</Link>
                ) : (
                  <span className="edition-preparing">Lançamento em 7 de novembro</span>
                )}
                {featured.slug && featured.hasDigital ? (
                  <Link href={`/revista/${featured.slug}#sumario`}>Conhecer o sumário <ArrowRight size={14} /></Link>
                ) : null}
              </div>
            </div>
          </article>
          <div className="content-title magazine-archive-title">
            <div>
              <p className="eyebrow">Acervo</p>
              <h2>Edições anteriores</h2>
            </div>
            <span>{Math.max(editions.length - 1, 0)} publicações no acervo</span>
          </div>
          <div className="magazine-archive magazine-archive-grid">
            {editions.slice(1).map((edition, index) => {
              const inner = (
                <>
                  <div
                    className={`archive-edition-mark archive-edition-cover ${edition.coverUrl ? "has-cover" : `cover-${index % 3}`}`}
                    style={edition.coverUrl ? { backgroundImage: `url('${edition.coverUrl}')` } : undefined}
                  >
                    {!edition.coverUrl ? <><strong>{edition.number}</strong><span>{edition.year}</span></> : null}
                  </div>
                  <div className="archive-edition-copy archive-edition-grid-copy">
                    <small><CalendarDays size={13} /> Publicada em {edition.year}</small>
                    <h3>{edition.title}</h3>
                    <p>{edition.description}</p>
                  </div>
                  {edition.slug ? <span className="archive-edition-open">Folhear edição <ArrowRight size={15} /></span> : null}
                </>
              );
              return edition.slug ? (
                <Link key={`${edition.number}-${index}`} href={`/revista/${edition.slug}`} className="archive-edition-row archive-edition-card">{inner}</Link>
              ) : (
                <article key={`${edition.number}-${index}`} className="archive-edition-row archive-edition-card">{inner}</article>
              );
            })}
          </div>
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
