import Link from "next/link";
import { ArrowRight, BookOpen, Building2, FlaskConical, HeartPulse, MapPin, Newspaper, Pill, Podcast, Search, Stethoscope } from "lucide-react";
import { ToothIcon } from "@/components/ProfessionIcon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { activeCities, isCityAvailable } from "@/lib/cities";
import { articles, magazineEditions, organizations, podcasts, professionals } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Encontre atendimento de saúde perto de você",
  "Busque profissionais, empresas, especialidades e serviços de saúde no Centro-Oeste de Minas.",
  "/",
);

export default function Home() {
  const shortcuts = [
    { label: "Médicos", href: "/buscar?profissao=M%C3%A9dico&tipo=profissionais", icon: Stethoscope },
    { label: "Dentistas", href: "/buscar?profissao=Dentista&tipo=profissionais", icon: ToothIcon },
    { label: "Psicólogos", href: "/buscar?profissao=Psic%C3%B3logo&tipo=profissionais", icon: HeartPulse },
    { label: "Clínicas", href: "/buscar?q=cl%C3%ADnica&tipo=empresas", icon: Building2 },
    { label: "Farmácias", href: "/buscar?q=farm%C3%A1cia&tipo=empresas", icon: Pill },
    { label: "Laboratórios", href: "/buscar?q=laborat%C3%B3rio&tipo=empresas", icon: FlaskConical },
  ];
  const latestEpisode = podcasts[0];
  const featuredEdition = magazineEditions.find((edition) => edition.featured) ?? magazineEditions[0];
  const latestArticle = articles[0];
  const availableCities = activeCities.filter(isCityAvailable);
  const upcomingCities = activeCities.filter((city) => !isCityAvailable(city));
  const featuredProfessionals = professionals.filter((item) => item.city === "Piumhi").slice(0, 3);
  const featuredServices = organizations.filter((item) => item.city === "Piumhi").slice(0, 2);
  return (
    <>
      <SiteHeader />
      <main>
        <section className="city-choose">
          <div className="shell home-hero-layout">
            <div className="home-hero-copy">
              <p className="eyebrow">Guia Saúde · Centro-Oeste de Minas</p>
              <h1>Encontre o cuidado que você precisa, perto de você.</h1>
              <p className="city-choose-lead">Profissionais, clínicas e serviços de saúde do Centro-Oeste de Minas reunidos em um só lugar.</p>
              <form action="/buscar" className="home-quick-search">
                <label><Search size={18} /><span>O que você procura?</span><input name="q" aria-label="O que você procura?" placeholder="Cardiologista, dentista, psicólogo, clínica ou exame" /></label>
                <label className="home-city-field"><MapPin size={17} /><select name="cidade" required defaultValue=""><option value="" disabled>Escolha sua cidade</option>{availableCities.map((city) => <option key={city.slug} value={city.name}>{city.name}</option>)}</select></label>
                <button type="submit">Encontrar atendimento</button>
              </form>
              <div className="home-shortcuts" aria-label="Buscas rápidas">
              {shortcuts.map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href}><Icon size={17} /> {label}</Link>
              ))}
              </div>
            </div>
            <aside className="home-hero-photo" role="img" aria-label="Atendimento de saúde acolhedor"><span>Informação e cuidado<br />para a nossa região</span></aside>

            <div className="home-city-heading">
              <strong>Encontre atendimento na sua cidade</strong>
              <span>Veja somente os atendimentos e conteúdos daquele município.</span>
            </div>
            <div className="city-choose-grid">
              {availableCities.map((city) => (
                <Link key={city.slug} href={`/cidades/${city.slug}`} className="city-choose-card">
                  <span className="city-choose-pin"><MapPin size={18} /></span>
                  <span className="city-choose-name">{city.name}</span>
                  <small className="city-choose-region">{city.region}</small>
                  <em className="city-choose-cta">Ver saúde na cidade <ArrowRight size={14} /></em>
                </Link>
              ))}
            </div>
            <div className="city-coming-list" aria-label="Próximas cidades do Guia Saúde">
              <span>Em breve</span>
              <p>{upcomingCities.map((city) => city.name).join(" · ")}</p>
            </div>
          </div>
        </section>

        <section className="shell home-help-section">
          <div className="home-section-head"><p className="eyebrow">Como o Guia Saúde ajuda</p><h2>Uma navegação simples para cuidar melhor de você.</h2></div>
          <div className="home-help-grid">
            <article><Search size={22}/><strong>Encontre atendimento</strong><p>Pesquise profissionais, clínicas, exames e serviços perto de você.</p></article>
            <article><MapPin size={22}/><strong>Consulte informações</strong><p>Veja especialidades, endereços e formas de contato.</p></article>
            <article><Newspaper size={22}/><strong>Cuide-se com informação</strong><p>Acompanhe matérias, podcast e revista sobre saúde e bem-estar.</p></article>
          </div>
        </section>

        {(featuredProfessionals.length || featuredServices.length) ? <section className="shell home-directory-section"><div className="home-section-head"><p className="eyebrow">Piumhi</p><h2>Profissionais e serviços em destaque</h2></div><div className="home-directory-grid">{featuredProfessionals.map((item)=><Link key={item.slug} href={`/profissionais/${item.slug}`}><span>{item.profession}</span><strong>{item.name}</strong><small>{item.specialty} · {item.organization}</small><em>Ver perfil <ArrowRight size={13}/></em></Link>)}{featuredServices.map((item)=><Link key={item.slug} href={`/buscar?cidade=Piumhi&q=${encodeURIComponent(item.name)}&tipo=empresas`}><span>{item.category}</span><strong>{item.name}</strong><small>{item.address}</small><em>Ver detalhes <ArrowRight size={13}/></em></Link>)}</div></section> : null}

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
