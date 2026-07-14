import Link from "next/link";
import { Activity, Apple, ArrowRight, ArrowUpRight, BookOpen, Brain, Building2, Dumbbell, Ear, HeartPulse, MapPin, Mic, Newspaper, Play, Smile, Stethoscope, Syringe } from "lucide-react";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, professions, professionals } from "@/lib/data";
import { publishedProfessionals } from "@/lib/directory";

const professionIcons = [Stethoscope, Smile, Brain, Activity, Apple, Ear, Syringe, HeartPulse, Dumbbell];
const localGuideHighlights = [
  { icon: Newspaper, title: "Matérias da cidade", text: "Conteúdos de saúde, prevenção, campanhas e entrevistas com recorte local.", href: "/materias" },
  { icon: Stethoscope, title: "Profissionais", text: "Busca objetiva por especialidade, cidade e área de atendimento.", href: "/buscar" },
  { icon: Building2, title: "Empresas e serviços", text: "Clínicas, farmácias, laboratórios, óticas e estruturas da rede local.", href: "/empresas" },
  { icon: Mic, title: "Podcast", text: "Conversas e episódios ligados aos temas de saúde da região.", href: "/podcast" },
  { icon: BookOpen, title: "Revista", text: "Conteúdo impresso com continuidade no portal digital.", href: "/revista" },
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
            <p className="edition-tag">Portal Guia Saúde Regional</p>
            <h1>Encontre saúde<br />pela sua <em>cidade.</em></h1>
            <p className="hero-intro">Selecione sua cidade e acesse um guia local com matérias, profissionais, empresas de saúde, podcast, revista e serviços próximos.</p>
            <SearchForm />
            <div className="hero-footnote"><MapPin size={14} /> Selecione a cidade e veja o portal local com profissionais, empresas e mídia regional.</div>
          </div>
        </section>

        <section className="shell home-top-banner">
          <div className="home-top-banner-media" aria-hidden="true" />
          <div className="home-top-banner-copy">
            <span>Especial Guia Saúde</span>
            <h2>Conteúdo local, especialistas e serviços de saúde em um só portal.</h2>
            <p>Matérias, podcast, revista e guia profissional organizados por cidade para quem busca informação e referência regional.</p>
            <div>
              <Link href="/materias">Ver matérias <ArrowRight size={14} /></Link>
              <Link href="/buscar">Buscar especialistas <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        </section>

        <section className="section shell commercial-highlights compact-home-section">
          <div className="section-kicker"><span>01</span><p>Guia local</p></div>
          <div className="commercial-highlights-head">
            <h2>Depois da cidade, o portal vira um guia de saúde local.</h2>
            <p>Matérias, busca, profissionais, empresas, podcast e revista aparecem organizados para a realidade de cada município.</p>
          </div>
          <div className="commercial-highlight-grid">
            {localGuideHighlights.map((item) => {
              const Icon = item.icon;
              return <Link href={item.href} key={item.title}><Icon size={21} /><strong>{item.title}</strong><p>{item.text}</p><span>Acessar <ArrowRight size={13} /></span></Link>;
            })}
          </div>
        </section>

        <section className="section shell home-featured compact-home-section">
          <div className="section-kicker"><span>02</span><p>Conteúdo e presença</p></div>
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
              <Link href="/revista"><BookOpen size={18} /><span>Revista impressa</span><strong>Edições, entrevistas e histórias locais.</strong></Link>
              <Link href="/buscar"><Stethoscope size={18} /><span>Guia local</span><strong>Profissionais e serviços por cidade.</strong></Link>
            </div>
          </div>
        </section>

        <section className="section shell quick-access compact-home-section">
          <div className="section-kicker"><span>03</span><p>Encontre o cuidado certo</p></div>
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

        <section className="editorial-feature compact-home-section" id="materias">
          <div className="shell">
            <div className="section-kicker light"><span>04</span><p>Informação para viver melhor</p></div>
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

        <section className="directory-section compact-home-section">
          <div className="shell">
            <div className="section-kicker light"><span>06</span><p>Profissionais perto de você</p></div>
            <div className="directory-title"><h2>Quem cuida<br /><em>da nossa região.</em></h2><Link href="/buscar">Ver guia completo <ArrowRight size={14} /></Link></div>
            <div className="profile-preview-grid">{featuredProfessionals.slice(0,3).map((item, index) => <article className="profile-preview" key={item.slug}><div className={`portrait portrait-${index+1}`}><Stethoscope size={42} /></div><div><span>{item.profession} · {item.city}</span><h3>{item.name}</h3><p>{item.specialty}</p><Link href={`/profissionais/${item.slug}`}>Ver perfil <ArrowUpRight size={14} /></Link></div></article>)}</div>
          </div>
        </section>

        <section className="media-section compact-home-section" id="podcast">
          <div className="shell media-grid">
            <div className="podcast-card"><p>CONEXÃO SAÚDE <Mic size={14} /> PODCAST</p><div className="sound-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div><small>PRÓXIMO AO VIVO · 14/07 ÀS 19H</small><h2>Radiologia odontológica: como a tecnologia transforma tratamentos.</h2><p>Com Rodrigo Soares Costa, tecnólogo em radiologia.</p><button aria-label="Conhecer o episódio do Conexão Saúde"><Play size={20} fill="currentColor" /></button></div>
            <div className="magazine-card" id="revista"><div className="mag-cover"><span>Guia</span><strong>Saúde</strong><small>REVISTA IMPRESSA</small><b>O FUTURO<br />DO CUIDADO<br /><em>É PERTO.</em></b><p>14ª EDIÇÃO</p></div><div><p className="eyebrow">Revista Guia Saúde</p><h2>Histórias, especialistas e marcas em uma edição impressa regional.</h2><span>Conhecer a revista <ArrowRight size={14} /></span></div></div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
