import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, cities, professions, professionals } from "@/lib/data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Saúde regional em um só lugar</p>
              <h1>Encontre cuidado, informação e serviços perto de você.</h1>
              <p className="hero-intro">Profissionais, clínicas, matérias, podcast e revista conectados às cidades da nossa região.</p>
            </div>
            <div className="hero-aside"><span>7 cidades</span><strong>Um portal feito para facilitar escolhas informadas.</strong><p>Cadastros com fonte, data de revisão e identificação clara de publicidade.</p></div>
          </div>
          <div className="shell"><SearchForm /></div>
        </section>

        <div className="shell"><AdSlot code="HOME_HERO_AFTER" /></div>

        <section className="section shell">
          <div className="section-heading"><div><p className="eyebrow">Comece sua busca</p><h2>Profissões em destaque</h2></div><Link href="/buscar">Ver todos os profissionais</Link></div>
          <div className="profession-grid">{professions.map((item, index) => <Link key={item} href={`/buscar?profissao=${encodeURIComponent(item)}`} className="profession-card"><span>0{index + 1}</span><strong>{item}</strong><small>Encontrar na região</small></Link>)}</div>
        </section>

        <section className="region-section">
          <div className="shell region-grid">
            <div><p className="eyebrow">Cobertura inicial</p><h2>Um guia construído cidade por cidade.</h2><p>O portal começa com sete municípios e cresce com revisão editorial, participação dos profissionais e dados de fontes públicas.</p></div>
            <div className="city-list">{cities.map(city => <Link key={city} href={`/buscar?cidade=${encodeURIComponent(city)}`}>{city}<span>→</span></Link>)}</div>
          </div>
        </section>

        <section className="section shell">
          <div className="section-heading"><div><p className="eyebrow">Diretório demonstrativo</p><h2>Como serão os perfis</h2></div><span className="demo-note">Dados fictícios até a revisão da base oficial</span></div>
          <div className="profile-preview-grid">{professionals.slice(0,3).map(item => <article className="profile-preview" key={item.slug}><div className="initials">GS</div><div><span>{item.profession} · {item.city}</span><h3>{item.name}</h3><p>{item.specialty}</p><Link href={`/profissionais/${item.slug}`}>Conhecer o modelo de perfil</Link></div></article>)}</div>
        </section>

        <section id="materias" className="editorial-section">
          <div className="shell"><div className="section-heading light"><div><p className="eyebrow">Conteúdo que orienta</p><h2>Informação regional com contexto.</h2></div></div><div className="article-grid">{articles.map((article, index) => <article key={article.slug}><div className={`article-art art-${index + 1}`}><span>{article.category}</span></div><p className="eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span className="text-link">Conteúdo demonstrativo →</span></article>)}</div></div>
        </section>

        <section id="podcast" className="section shell media-split"><div><p className="eyebrow">Podcast Conexão Saúde</p><h2>Vozes da região, conhecimento que aproxima.</h2><p>Episódios completos, convidados, transcrições e matérias relacionadas em uma experiência integrada.</p><span className="text-link">Em breve: biblioteca de episódios</span></div><div id="revista" className="magazine-card"><small>REVISTA DIGITAL</small><strong>14ª edição</strong><p>Acervo, sumário navegável e matérias da revista em páginas pesquisáveis.</p><span>Explorar modelo editorial →</span></div></section>

        <section className="commercial-cta"><div className="shell commercial-grid"><div><p className="eyebrow">Para profissionais e empresas</p><h2>Faça parte do novo Guia Saúde.</h2></div><p>Perfis verificados, conteúdo de autoridade, podcast, revista e campanhas segmentadas.</p><Link href="/anuncie">Conheça as possibilidades</Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
