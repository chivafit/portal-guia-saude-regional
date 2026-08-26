"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Mic2, Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type EditorialArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author?: string;
  authorRole?: string;
  date?: string;
  readingTime?: string;
  professionalSlug?: string;
  image?: string;
};

const topics = [
  "Mais recentes", "Prevenção", "Saúde da mulher", "Saúde infantil", "Saúde bucal", "Alimentação",
  "Saúde mental", "Pele", "Cardiologia", "Ortopedia", "Oftalmologia", "Bem-estar",
];

function topicsFor(article: EditorialArticle) {
  const content = `${article.category} ${article.title} ${article.excerpt}`.toLocaleLowerCase("pt-BR");
  const matched: string[] = [];
  const mapping: [string, RegExp][] = [
    ["Prevenção", /preven|medicamento/],
    ["Saúde da mulher", /mulher|gineco|gesta/],
    ["Saúde infantil", /infância|infantil|pediatr/],
    ["Saúde bucal", /bucal|odonto|implant/],
    ["Alimentação", /alimenta|nutri/],
    ["Saúde mental", /mental|vínculo|psican/],
    ["Pele", /pele|dermat/],
    ["Cardiologia", /cardio/],
    ["Ortopedia", /ortoped|lesão/],
    ["Oftalmologia", /oftalmo|olho|cirurgia refrativa/],
    ["Bem-estar", /reabilita|vida saudável|respirat|qualidade de vida/],
  ];
  mapping.forEach(([topic, expression]) => {
    if (expression.test(content)) matched.push(topic);
  });
  return matched;
}

function byline(article: EditorialArticle) {
  if (!article.author || article.author === "Redação Guia Saúde") return "Conteúdo editorial Guia Saúde";
  return `Por ${article.author}${article.authorRole ? ` · ${article.authorRole}` : ""}${article.readingTime ? ` · ${article.readingTime}` : ""}`;
}

function ArticleImage({ article, featured = false }: { article: EditorialArticle; featured?: boolean }) {
  return article.image ? (
    <div className={`editorial-image${featured ? " editorial-image-featured" : ""}`} style={{ backgroundImage: `url(${article.image})` }} role="img" aria-label={article.title} />
  ) : (
    <div className={`editorial-image editorial-image-fallback${featured ? " editorial-image-featured" : ""}`} aria-hidden="true"><BookOpen size={featured ? 44 : 28} /></div>
  );
}

function EditorialCard({ article }: { article: EditorialArticle }) {
  return (
    <Link href={`/materias/${article.slug}`} className="editorial-card">
      <ArticleImage article={article} />
      <div className="editorial-card-copy">
        <span className="editorial-category">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <small>{byline(article)}</small>
        <span className="editorial-read">Ler matéria <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}

export function MateriasCatalog({
  articles,
  podcastImage,
  magazineCover,
  magazineSlug,
}: {
  articles: EditorialArticle[];
  podcastImage?: string;
  magazineCover?: string;
  magazineSlug?: string;
}) {
  const [selectedTopic, setSelectedTopic] = useState("Mais recentes");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const catalog = useMemo(() => {
    const normalized = submittedQuery.trim().toLocaleLowerCase("pt-BR");
    return articles.filter((article) => {
      const matchesTopic = selectedTopic === "Mais recentes" || topicsFor(article).includes(selectedTopic);
      const searchable = `${article.title} ${article.excerpt} ${article.category} ${article.author ?? ""} ${article.authorRole ?? ""}`.toLocaleLowerCase("pt-BR");
      return matchesTopic && (!normalized || searchable.includes(normalized));
    });
  }, [articles, selectedTopic, submittedQuery]);

  const feature = catalog[0];
  const remaining = catalog.slice(1);
  const visibleArticles = remaining.slice(0, visibleCount);
  const applySearch = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(query);
    setVisibleCount(9);
  };
  const selectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setVisibleCount(9);
  };

  return (
    <main className="editorial-page">
      <section className="editorial-hero">
        <div className="shell editorial-hero-grid">
          <div>
            <p className="eyebrow">Conteúdo editorial</p>
            <h1>Informação para cuidar melhor.</h1>
            <p>Matérias, entrevistas e orientações produzidas com profissionais da região para aproximar conhecimento, cuidado e comunidade.</p>
          </div>
          <div className="editorial-hero-art" role="img" aria-label="Profissional de saúde organizando informações para uma matéria do Guia Saúde">
            <div><BookOpen size={27} /><span>Conhecimento próximo de você</span></div>
          </div>
        </div>
      </section>

      <section className="shell editorial-controls" aria-label="Buscar e filtrar matérias">
        <form className="editorial-search" onSubmit={applySearch}>
          <label>
            <Search size={19} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque uma matéria, especialidade ou tema" aria-label="Busque uma matéria, especialidade ou tema" />
          </label>
          <select value={selectedTopic} onChange={(event) => selectTopic(event.target.value)} aria-label="Categoria da matéria">
            <option value="Mais recentes">Todas as categorias</option>
            {topics.slice(1).map((topic) => <option key={topic} value={topic}>{topic}</option>)}
          </select>
          <button type="submit">Buscar <ArrowRight size={16} /></button>
        </form>
        <div className="editorial-topic-row" aria-label="Categorias de matérias">
          {topics.map((topic) => (
            <button key={topic} type="button" className={selectedTopic === topic ? "is-active" : ""} onClick={() => selectTopic(topic)}>{topic}</button>
          ))}
        </div>
      </section>

      <section className="shell editorial-listing">
        {feature ? (
          <article className="editorial-feature">
            <ArticleImage article={feature} featured />
            <div className="editorial-feature-copy">
              <p className="eyebrow">Destaque da semana</p>
              <span className="editorial-category">{feature.category}</span>
              <h2>{feature.title}</h2>
              <p>{feature.excerpt}</p>
              <small>{byline(feature)}</small>
              <Link href={`/materias/${feature.slug}`} className="editorial-primary-link">Ler matéria <ArrowRight size={16} /></Link>
            </div>
          </article>
        ) : (
          <div className="editorial-empty"><strong>Nenhuma matéria encontrada.</strong><p>Experimente buscar outro tema ou escolha uma categoria diferente.</p></div>
        )}

        {feature ? <div className="editorial-section-heading"><div><p className="eyebrow">Atualizações do Guia Saúde</p><h2>Conteúdos recentes</h2></div><span>{catalog.length} {catalog.length === 1 ? "matéria" : "matérias"}</span></div> : null}

        <div className="editorial-card-grid">
          {visibleArticles.map((article, index) => (
            <div key={article.slug} className="editorial-grid-item">
              {index === 6 ? <EditorialChannels podcastImage={podcastImage} magazineCover={magazineCover} magazineSlug={magazineSlug} /> : null}
              <EditorialCard article={article} />
            </div>
          ))}
        </div>

        {remaining.length > visibleCount ? <button type="button" className="editorial-load-more" onClick={() => setVisibleCount((count) => count + 6)}>Carregar mais matérias <ArrowRight size={16} /></button> : null}

        <section className="editorial-commercial" aria-label="Oportunidades para profissionais e marcas">
          <div><p className="eyebrow">Para profissionais e marcas</p><h2>Compartilhe conhecimento com a região.</h2><p>Participe de matérias, entrevistas, edições da revista e episódios do Podcast Conexão Saúde.</p></div>
          <div><Link href="/anuncie" className="editorial-primary-link">Conhecer oportunidades <ArrowRight size={16} /></Link><Link href="/anuncie" className="editorial-secondary-link">Anunciar no Guia <ArrowRight size={16} /></Link></div>
        </section>
      </section>
    </main>
  );
}

function EditorialChannels({ podcastImage, magazineCover, magazineSlug }: { podcastImage?: string; magazineCover?: string; magazineSlug?: string }) {
  return (
    <aside className="editorial-channels">
      <article className="editorial-channel podcast-channel" style={podcastImage ? { backgroundImage: `linear-gradient(90deg, rgba(9, 52, 55, .95), rgba(9, 52, 55, .48)), url(${podcastImage})` } : undefined}>
        <Mic2 size={21} /><div><strong>Ouça o Podcast Conexão Saúde</strong><p>Conversas com profissionais da região sobre saúde, prevenção e qualidade de vida.</p><Link href="/podcast">Ouvir episódios <ArrowRight size={14} /></Link></div>
      </article>
      <article className="editorial-channel magazine-channel">
        {magazineCover ? <span className="editorial-magazine-cover" style={{ backgroundImage: `url(${magazineCover})` }} aria-hidden="true" /> : <BookOpen size={28} />}
        <div><strong>Leia a Revista Guia Saúde</strong><p>Entrevistas, histórias e conteúdos produzidos para a comunidade.</p><Link href={magazineSlug ? `/revista/${magazineSlug}` : "/revista"}>Folhear revista <ArrowRight size={14} /></Link></div>
      </article>
    </aside>
  );
}
