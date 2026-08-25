import Link from "next/link";
import { ArrowRight, HeartPulse, Newspaper, Stethoscope } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { articles, articleImage } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Matérias",
  "Matérias, entrevistas e orientações de saúde, prevenção, bem-estar e especialistas da região.",
  "/materias",
);

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function topicFor(category: string) {
  if (/preven|medicamento|pele|oftalmo|saúde bucal/i.test(category)) return "Prevenção";
  if (/alimenta|mental|reabilita|bem-estar|atividade/i.test(category)) return "Bem-estar";
  return "Especialistas";
}

export default async function MateriasPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const selectedTopic = typeof params.tema === "string" ? params.tema : "Todos";
  const editorialCards = articles.map((item) => ({
    slug: item.slug,
    href: `/materias/${item.slug}`,
    category: item.category,
    title: item.title,
    excerpt: item.excerpt,
    author: item.author,
    readingTime: item.readingTime,
    image: articleImage(item),
    topic: topicFor(item.category),
  }));
  const fullCatalog = editorialCards;
  const catalog = selectedTopic === "Todos" ? fullCatalog : fullCatalog.filter((item) => item.topic === selectedTopic);
  const feature = catalog.find((item) => item.href) ?? catalog[0];
  const remainingCatalog = feature
    ? catalog.filter((item) => item.slug !== feature.slug)
    : catalog;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="content-hero portal-section-hero">
          <div className="shell portal-section-hero-grid">
            <div>
              <p className="eyebrow">Conteúdo editorial</p>
              <h1>Informação para cuidar melhor.</h1>
              <p>Matérias, entrevistas e orientações produzidas com especialistas da região para aproximar conhecimento e comunidade.</p>
            </div>
            <aside className="portal-section-summary">
              <strong>Conteúdo sobre:</strong>
              <span><HeartPulse size={17} /> Prevenção e bem-estar</span>
              <span><Stethoscope size={17} /> Orientações de especialistas</span>
              <span><Newspaper size={17} /> Saúde em linguagem acessível</span>
              <small>Use os temas para encontrar rapidamente o que precisa.</small>
            </aside>
          </div>
        </section>
        <section className="shell content-section">
          <div className="content-tabs" aria-label="Filtrar matérias">
            {["Todos", "Prevenção", "Bem-estar", "Especialistas"].map((topic) => (
              <Link key={topic} className={selectedTopic === topic ? "active" : ""} href={topic === "Todos" ? "/materias" : `/materias?tema=${encodeURIComponent(topic)}`}>{topic === "Todos" ? "Mais recentes" : topic}</Link>
            ))}
          </div>

          {feature ? (
            <Link className="featured-article featured-article-link" href={feature.href}>
              {feature.image ? (
                <span className="article-visual has-photo" style={{ backgroundImage: `url(${feature.image})` }} role="img" aria-label={feature.title} />
              ) : (
                <div className="article-visual article-visual-fallback"><Newspaper size={42} /><span>Conteúdo Guia Saúde</span></div>
              )}
              <div>
                <p className="eyebrow">Em destaque</p>
                <h2>{feature.title}</h2>
                <p>{feature.excerpt}</p>
                <span>
                  {feature.author ? `${feature.author} · ` : ""}{feature.readingTime || "Ler matéria"} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ) : null}

          <div className="content-card-grid">
            {remainingCatalog.map((item, index) => {
              const inner = (
                <>
                  <div
                    className={`content-card-art tone-${index % 3}${item.image ? " has-photo" : ""}`}
                    style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
                  >
                    <span>{item.category}</span>
                    {!item.image ? <Newspaper className="content-card-fallback-icon" size={30} /> : null}
                  </div>
                  <small>{item.category}{item.readingTime ? ` · ${item.readingTime}` : ""}</small>
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                  <span>Ler matéria <ArrowRight size={13} /></span>
                </>
              );
              return item.href ? (
                <Link key={`${item.slug}-${index}`} href={item.href} className="content-card-link">{inner}</Link>
              ) : (
                <article key={`${item.slug}-${index}`}>{inner}</article>
              );
            })}
          </div>

        </section>
      </main>
      <SiteFooter />
    </>
  );
}
