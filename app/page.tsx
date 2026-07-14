import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, cities, professions, professionals } from "@/lib/data";

const icons = ["✚", "◉", "◇", "⌁", "○"];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero hero-editorial">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="shell hero-content">
            <p className="edition-tag">O portal de saúde do Centro-Oeste de Minas</p>
            <h1>Cuidado que<br />mora <em>perto.</em></h1>
            <p className="hero-intro">Encontre profissionais, clínicas e informação confiável nas cidades da nossa região.</p>
            <SearchForm />
            <div className="hero-footnote"><span>●</span> Piumhi, Capitólio, Pimenta, Arcos, Campo Belo, Bambuí e São Roque de Minas</div>
          </div>
        </section>

        <section className="announcement">
          <div className="shell announcement-inner">
            <span>PUBLICIDADE</span><strong>Sua marca falando com quem cuida da saúde na região.</strong>
            <Link href="/anuncie">Conheça os formatos <b>→</b></Link>
          </div>
        </section>

        <section className="section shell quick-access">
          <div className="section-kicker"><span>01</span><p>Encontre o cuidado certo</p></div>
          <div className="section-heading editorial-heading">
            <h2>Por onde você<br />quer começar?</h2>
            <p>Uma busca simples para descobrir profissionais e serviços próximos, organizados por área e cidade.</p>
          </div>
          <div className="profession-grid">
            {professions.map((item, index) => (
              <Link key={item} href={`/buscar?profissao=${encodeURIComponent(item)}`} className="profession-card">
                <i>{icons[index]}</i><strong>{item}</strong><small>Ver profissionais <span>↗</span></small>
              </Link>
            ))}
          </div>
          <Link className="outline-link" href="/buscar">Explorar todas as especialidades</Link>
        </section>

        <section className="editorial-feature" id="materias">
          <div className="shell">
            <div className="section-kicker light"><span>02</span><p>Informação para viver melhor</p></div>
            <div className="feature-grid">
              <article className="lead-story">
                <div className="lead-art"><span>EDIÇÃO ESPECIAL</span><b>Saúde<br />em cada<br /><em>fase.</em></b></div>
                <div className="story-copy"><p className="eyebrow">Longevidade</p><h2>O cuidado muda com o tempo. A atenção, não.</h2><p>Um guia sobre prevenção, escolhas e acompanhamento em cada etapa da vida.</p><span>Leitura de 6 minutos</span></div>
              </article>
              <div className="story-list">
                {articles.map((article, index) => <article key={article.slug}><span>0{index + 1}</span><div><p className="eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.excerpt}</p><small>Conteúdo demonstrativo · 4 min</small></div></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section shell city-section">
          <div className="section-kicker"><span>03</span><p>Saúde feita de proximidade</p></div>
          <div className="city-intro"><h2>Sete cidades.<br /><em>Uma região conectada.</em></h2><p>Conheça o ecossistema de saúde de cada município: profissionais, serviços, notícias e oportunidades.</p></div>
          <div className="city-grid">{cities.map((city, i) => <Link key={city} href={`/cidades/${city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replaceAll(" ", "-")}`}><span>0{i+1}</span><strong>{city}</strong><small>Explorar a cidade →</small></Link>)}</div>
        </section>

        <section className="directory-section">
          <div className="shell">
            <div className="section-kicker light"><span>04</span><p>Profissionais perto de você</p></div>
            <div className="directory-title"><h2>Quem cuida<br /><em>da nossa região.</em></h2><Link href="/buscar">Ver guia completo →</Link></div>
            <div className="profile-preview-grid">{professionals.slice(0,3).map((item, index) => <article className="profile-preview" key={item.slug}><div className={`portrait portrait-${index+1}`}>GS</div><div><span>{item.profession} · {item.city}</span><h3>{item.name}</h3><p>{item.specialty}</p><Link href={`/profissionais/${item.slug}`}>Ver perfil <b>↗</b></Link></div></article>)}</div>
            <p className="demo-disclaimer">Perfis demonstrativos. A base oficial será publicada após conferência das fontes e validação dos profissionais.</p>
          </div>
        </section>

        <section className="media-section" id="podcast">
          <div className="shell media-grid">
            <div className="podcast-card"><p>CONEXÃO SAÚDE <span>●</span> PODCAST</p><div className="sound-bars">▁▃▆▂▇▄▅▂▆▃▇▅▂▆▁</div><small>PRÓXIMO AO VIVO · 14/07 ÀS 19H</small><h2>Radiologia odontológica: como a tecnologia transforma tratamentos.</h2><p>Com Rodrigo Soares Costa, tecnólogo em radiologia.</p><button aria-label="Conhecer o episódio do Conexão Saúde">▶</button></div>
            <div className="magazine-card" id="revista"><div className="mag-cover"><span>Guia</span><strong>Saúde</strong><small>REVISTA REGIONAL</small><b>O FUTURO<br />DO CUIDADO<br /><em>É PERTO.</em></b><p>14ª EDIÇÃO</p></div><div><p className="eyebrow">Revista Guia Saúde</p><h2>Histórias, especialistas e ideias que transformam a saúde regional.</h2><span>Conhecer a revista →</span></div></div>
          </div>
        </section>

        <section className="commercial-cta"><div className="shell commercial-grid"><div><p className="eyebrow">Presença regional</p><h2>Sua marca no centro da conversa sobre saúde.</h2></div><p>Banners, conteúdo de marca, revista, podcast e perfis em uma plataforma feita para a região.</p><Link href="/anuncie">Quero anunciar <span>→</span></Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
