import Link from "next/link";
import { Activity, ArrowRight, BookOpen, Building2, FlaskConical, HeartPulse, MapPin, Newspaper, Pill, Podcast, Search, Stethoscope } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { activeCities, isCityAvailable } from "@/lib/cities";
import { articles, magazineEditions, podcasts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Encontre atendimento de saúde perto de você",
  "Busque profissionais, empresas, especialidades e serviços de saúde no Centro-Oeste de Minas.",
  "/",
);

export default function Home() {
  const shortcuts = [
    { label: "Médicos", href: "/buscar?profissao=M%C3%A9dico&tipo=profissionais", icon: Stethoscope },
    { label: "Dentistas", href: "/buscar?profissao=Dentista&tipo=profissionais", icon: Activity },
    { label: "Psicólogos", href: "/buscar?profissao=Psic%C3%B3logo&tipo=profissionais", icon: HeartPulse },
    { label: "Clínicas", href: "/buscar?q=cl%C3%ADnica&tipo=empresas", icon: Building2 },
    { label: "Farmácias", href: "/buscar?q=farm%C3%A1cia&tipo=empresas", icon: Pill },
    { label: "Laboratórios", href: "/buscar?q=laborat%C3%B3rio&tipo=empresas", icon: FlaskConical },
  ];
  const latestEpisode = podcasts[0];
  const featuredEdition = magazineEditions.find((edition) => edition.featured) ?? magazineEditions[0];
  const latestArticle = articles[0];
  return (
    <>
      <SiteHeader />
      <main>
        <section className="city-choose">
          <div className="shell">
            <p className="eyebrow">Portal Guia Saúde · Centro-Oeste de Minas</p>
            <h1>Encontre atendimento de saúde perto de você</h1>
            <p className="city-choose-lead">
              Procure diretamente por especialidade, profissional, clínica, exame ou serviço.
            </p>
            <form action="/buscar" className="home-quick-search">
              <label>
                <Search size={18} />
                <input name="q" aria-label="O que você procura?" placeholder="Especialidade, profissional, clínica ou exame" />
              </label>
              <button type="submit">Buscar</button>
            </form>
            <div className="home-shortcuts" aria-label="Buscas rápidas">
              {shortcuts.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href}><Icon size={17} /> {label}</Link>
              ))}
            </div>

            <div className="home-city-heading">
              <strong>Ou escolha uma cidade</strong>
              <span>Veja somente os atendimentos e conteúdos daquele município.</span>
            </div>
            <div className="city-choose-grid">
              {activeCities.map((city) => (
                isCityAvailable(city) ? <Link key={city.slug} href={`/cidades/${city.slug}`} className="city-choose-card">
                  <span className="city-choose-pin"><MapPin size={18} /></span>
                  <span className="city-choose-name">{city.name}</span>
                  <small className="city-choose-region">{city.region}</small>
                  <em className="city-choose-cta">Ver saúde na cidade <ArrowRight size={14} /></em>
                </Link> : <div key={city.slug} className="city-choose-card city-coming-soon" aria-disabled="true">
                  <span className="city-choose-pin"><MapPin size={18} /></span>
                  <span className="city-choose-name">{city.name}</span>
                  <small className="city-choose-region">{city.region}</small>
                  <em className="city-choose-cta">EM BREVE</em>
                </div>
              ))}
            </div>

            <Link className="city-choose-search" href="/buscar?cidade=Piumhi">
              <Activity size={16} /> Buscar em Piumhi
            </Link>
          </div>
        </section>

        <section className="section shell home-pillars">
          <div className="home-section-head">
            <p className="eyebrow">Além do diretório</p>
            <h2>Conteúdo de saúde da região</h2>
          </div>
          <div className="home-pillars-grid">
            <Link href="/podcast" className="home-pillar">
              <span className="home-pillar-tag"><Podcast size={15} /> Podcast</span>
              <strong>Conexão Saúde</strong>
              <p>{latestEpisode.topic}</p>
              <em>Ver episódios <ArrowRight size={14} /></em>
            </Link>
            <Link href="/revista" className="home-pillar">
              <span className="home-pillar-tag"><BookOpen size={15} /> Revista</span>
              <strong>{featuredEdition.number} edição</strong>
              <p>{featuredEdition.title}</p>
              <em>Folhear a revista <ArrowRight size={14} /></em>
            </Link>
            <Link href="/materias" className="home-pillar">
              <span className="home-pillar-tag"><Newspaper size={15} /> Matérias</span>
              <strong>{latestArticle.title}</strong>
              <p>{latestArticle.excerpt}</p>
              <em>Ler matérias <ArrowRight size={14} /></em>
            </Link>
          </div>
        </section>

        <section className="home-commercial">
          <div className="shell home-commercial-inner">
            <div>
              <p className="eyebrow">Para marcas e profissionais</p>
              <h2>Sua marca perto de quem busca saúde.</h2>
              <p>Anuncie no portal, nas páginas das cidades, no podcast e na revista.</p>
            </div>
            <Link href="/anuncie">Anunciar no Guia <ArrowRight size={15} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
