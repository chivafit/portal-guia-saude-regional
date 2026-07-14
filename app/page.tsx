import Link from "next/link";
import { Activity, Apple, ArrowRight, ArrowUpRight, BookOpen, Brain, Building2, Dumbbell, Ear, HeartPulse, MapPin, Megaphone, Mic, Newspaper, Play, Smile, Stethoscope, Syringe } from "lucide-react";
import { SearchForm } from "@/components/SearchForm";
import { CityGateway } from "@/components/CityGateway";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, cities, professions, professionals } from "@/lib/data";
import { publishedProfessionals } from "@/lib/directory";
import { citySlug } from "@/lib/city-utils";

const professionIcons = [Stethoscope, Smile, Brain, Activity, Apple, Ear, Syringe, HeartPulse, Dumbbell];
const portalPillars = [
  {
    icon: Building2,
    label: "Diretório",
    title: "Profissionais, clínicas e empresas por cidade",
    text: "Busca regional com filtros por área, cidade e serviço. O portal informa e direciona o contato, sem intermediar agendamento.",
  },
  {
    icon: Newspaper,
    label: "Conteúdo",
    title: "Matérias, guias e pautas locais",
    text: "Uma frente editorial para prevenção, bem-estar, tecnologia, especialidades e histórias da saúde regional.",
  },
  {
    icon: Megaphone,
    label: "Mídia",
    title: "Revista, podcast, banners e campanhas",
    text: "Inventário comercial organizado para marcas que querem presença qualificada no ecossistema de saúde.",
  },
];
const cityMetrics = [
  ["7", "cidades prioritárias"],
  ["5+", "categorias profissionais"],
  ["4", "frentes de mídia"],
  ["100%", "portal informativo"],
];
const adFormats = [
  { title: "Banner topo", place: "Home + páginas principais", code: "970 × 250", image: "/ads/banner-topo.svg" },
  { title: "Banner por cidade", place: "Páginas locais", code: "Cidade patrocinada", image: "/ads/banner-cidade.svg" },
  { title: "Perfil em destaque", place: "Busca e diretório", code: "Card premium", image: "/ads/perfil-destaque.svg" },
  { title: "Matéria patrocinada", place: "Conteúdo editorial", code: "Publieditorial", image: "/ads/materia-patrocinada.svg" },
  { title: "Podcast apoiado", place: "Conexão Saúde", code: "Cota de apoio", image: "/ads/podcast-apoiado.svg" },
  { title: "Revista digital", place: "Edição e acervo", code: "Página de marca", image: "/ads/revista-digital.svg" },
];

export default async function Home() {
  const featuredProfessionals = await publishedProfessionals(professionals);
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero hero-editorial">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="shell hero-content">
            <p className="edition-tag">Guia Saúde Regional</p>
            <h1>Saúde, reputação<br />e cuidado <em>local.</em></h1>
            <p className="hero-intro">Uma plataforma editorial para encontrar especialistas, clínicas, serviços e informação de saúde com curadoria regional.</p>
            <SearchForm />
            <div className="hero-footnote"><MapPin size={14} /> Miniportais por cidade · perfis revisados · publicidade identificada</div>
          </div>
        </section>

        <section className="announcement">
          <div className="shell announcement-inner">
            <span>PUBLICIDADE</span><strong>Presença qualificada para marcas, clínicas e profissionais da saúde.</strong>
            <Link href="/anuncie">Conheça os formatos <ArrowRight size={15} /></Link>
          </div>
        </section>

        <CityGateway />

        <section className="section shell home-featured">
          <div className="section-kicker"><span>00</span><p>Em destaque</p></div>
          <div className="featured-board">
            <article className="featured-main">
              <div className="featured-main-media" aria-label="Imagem editorial de saúde regional" />
              <div>
                <span><BookOpen size={15} /> Especial regional</span>
                <h2>Informação, profissionais e serviços reunidos em uma experiência só.</h2>
                <p>Uma vitrine editorial para orientar a população e fortalecer a presença de quem atua na saúde regional.</p>
                <Link href="/materias">Ver matérias <ArrowUpRight size={15} /></Link>
              </div>
            </article>
            <div className="featured-side">
              <Link href="/podcast"><Mic size={18} /><span>Podcast</span><strong>Conversas com profissionais da região.</strong></Link>
              <Link href="/revista"><BookOpen size={18} /><span>Revista digital</span><strong>Edições, entrevistas e histórias locais.</strong></Link>
              <Link href="/anuncie"><Megaphone size={18} /><span>Mídia regional</span><strong>Banners e campanhas com segmentação.</strong></Link>
            </div>
          </div>
        </section>

        <section className="section shell portal-overview" aria-labelledby="portal-overview-title">
          <div className="section-kicker"><span>01</span><p>Plataforma regional</p></div>
            <div className="portal-overview-head">
            <h2 id="portal-overview-title">Um portal regional com padrão editorial.</h2>
            <p>O Guia Saúde combina busca local, conteúdo, revista, podcast e mídia paga em uma experiência feita para pacientes exigentes e profissionais que valorizam reputação.</p>
          </div>
          <div className="pillar-grid">
            {portalPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.label}>
                  <Icon size={22} />
                  <span>{pillar.label}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              );
            })}
          </div>
          <div className="metric-strip">
            {cityMetrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section shell quick-access">
          <div className="section-kicker"><span>02</span><p>Encontre o cuidado certo</p></div>
          <div className="section-heading editorial-heading">
            <h2>Por onde você<br />quer começar?</h2>
            <p>Uma busca simples para descobrir profissionais e serviços próximos, organizados por área e cidade.</p>
          </div>
          <div className="profession-grid">
            {professions.map((item, index) => (
              <Link key={item} href={`/buscar?profissao=${encodeURIComponent(item)}`} className="profession-card">
                {(() => { const Icon = professionIcons[index] ?? HeartPulse; return <span className="profession-icon"><Icon className="lucide-card-icon" size={24} strokeWidth={1.7} /></span>; })()}<strong>{item}</strong><small>Ver profissionais <ArrowUpRight size={14} /></small>
              </Link>
            ))}
          </div>
          <Link className="outline-link" href="/buscar">Explorar todas as especialidades</Link>
        </section>

        <section className="editorial-feature" id="materias">
          <div className="shell">
            <div className="section-kicker light"><span>03</span><p>Informação para viver melhor</p></div>
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
          <div className="section-kicker"><span>04</span><p>Saúde feita de proximidade</p></div>
          <div className="city-intro"><h2>Sete cidades.<br /><em>Uma região conectada.</em></h2><p>Conheça o ecossistema de saúde de cada município: profissionais, serviços, notícias e oportunidades.</p></div>
          <div className="city-grid">{cities.map((city, i) => <Link key={city} href={`/cidades/${citySlug(city)}`}><span>0{i+1}</span><strong>{city}</strong><p>Guia local em construção</p><small>Explorar a cidade <ArrowUpRight size={13} /></small></Link>)}</div>
        </section>

        <section className="directory-section">
          <div className="shell">
            <div className="section-kicker light"><span>05</span><p>Profissionais perto de você</p></div>
            <div className="directory-title"><h2>Quem cuida<br /><em>da nossa região.</em></h2><Link href="/buscar">Ver guia completo <ArrowRight size={14} /></Link></div>
            <div className="profile-preview-grid">{featuredProfessionals.slice(0,3).map((item, index) => <article className="profile-preview" key={item.slug}><div className={`portrait portrait-${index+1}`}><Stethoscope size={42} /></div><div><span>{item.profession} · {item.city}</span><h3>{item.name}</h3><p>{item.specialty}</p><Link href={`/profissionais/${item.slug}`}>Ver perfil <ArrowUpRight size={14} /></Link></div></article>)}</div>
          </div>
        </section>

        <section className="media-section" id="podcast">
          <div className="shell media-grid">
            <div className="podcast-card"><p>CONEXÃO SAÚDE <Mic size={14} /> PODCAST</p><div className="sound-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div><small>PRÓXIMO AO VIVO · 14/07 ÀS 19H</small><h2>Radiologia odontológica: como a tecnologia transforma tratamentos.</h2><p>Com Rodrigo Soares Costa, tecnólogo em radiologia.</p><button aria-label="Conhecer o episódio do Conexão Saúde"><Play size={20} fill="currentColor" /></button></div>
            <div className="magazine-card" id="revista"><div className="mag-cover"><span>Guia</span><strong>Saúde</strong><small>REVISTA REGIONAL</small><b>O FUTURO<br />DO CUIDADO<br /><em>É PERTO.</em></b><p>14ª EDIÇÃO</p></div><div><p className="eyebrow">Revista Guia Saúde</p><h2>Histórias, especialistas e ideias que transformam a saúde regional.</h2><span>Conhecer a revista <ArrowRight size={14} /></span></div></div>
          </div>
        </section>

        <section className="section shell media-marketplace">
          <div className="marketplace-copy">
            <p className="eyebrow">Espaços para anunciantes</p>
            <h2>Vitrine comercial pronta para apresentar e vender.</h2>
            <p>Modelos visuais de mídia para demonstrar formatos, posições e possibilidades de presença dentro do portal.</p>
          </div>
          <div className="ad-showcase-grid">
            {adFormats.map((format, index) => (
              <article className={`ad-showcase-card ad-showcase-${index + 1}`} style={{ backgroundImage: `url(${format.image})` }} key={format.title}>
                <span>PUBLICIDADE</span>
                <strong>{format.title}</strong>
                <p>{format.place}</p>
                <small>{format.code}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="commercial-cta"><div className="shell commercial-grid"><div><p className="eyebrow">Presença regional</p><h2>Sua marca no centro da conversa sobre saúde.</h2></div><p>Banners, conteúdo de marca, revista, podcast e perfis em uma plataforma feita para a região.</p><Link href="/anuncie">Quero anunciar <ArrowRight size={14} /></Link></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
