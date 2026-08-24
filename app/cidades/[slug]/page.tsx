import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, Glasses, ListFilter, MapPin, Megaphone, Pill, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, cityDetails, organizations, professions, professionals } from "@/lib/data";
import { publishedOrganizations, publishedProfessionals } from "@/lib/directory";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = cityDetails[slug];
  if (!city) return pageMetadata("Cidade não encontrada", "Página de cidade não encontrada no Guia Saúde.", `/cidades/${slug}`);
  return pageMetadata(
    `Saúde em ${city.name}`,
    `${city.intro} Encontre profissionais, empresas, matérias, podcast e revista em ${city.name}.`,
    `/cidades/${slug}`,
  );
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = cityDetails[slug];
  if (!city) notFound();

  const professionalSource = await publishedProfessionals(professionals);
  const organizationSource = await publishedOrganizations(organizations);
  const localProfessionals = professionalSource.filter((item) => item.city === city.name);
  const localOrganizations = organizationSource.filter((item) => item.city === city.name);
  const localArticles = articles.filter((item) => item.city === city.name || item.city === "Regional");
  const localSpecialties = Array.from(
    new Set(
      localProfessionals
        .filter((item) => item.profession === "Médico" || item.profession === "Dentista")
        .map((item) => item.specialty)
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const cityQuery = encodeURIComponent(city.name);

  // Inventário comercial: profissionais em destaque (um por especialidade-chave).
  const featuredProfessions = ["Médico", "Dentista", "Psicólogo", "Fisioterapeuta", "Nutricionista", "Fonoaudiólogo"];
  const featuredProfessionals = featuredProfessions
    .map((profession) => localProfessionals.find((item) => item.profession === profession))
    .filter((item): item is (typeof localProfessionals)[number] => Boolean(item))
    .slice(0, 6);
  const featuredPharmacy = localOrganizations.find((item) => /farm[áa]cia|drogaria/i.test(item.category));
  const featuredClinic = localOrganizations.find(
    (item) =>
      /cl[íi]nica|laborat[óo]rio|diagn[óo]stico|est[ée]tica/i.test(item.category) &&
      !/b[áa]sica|p[úu]blica|gest[ãa]o|secretaria/i.test(`${item.category} ${item.name}`) &&
      item.slug !== featuredPharmacy?.slug,
  );
  const isPiumhi = slug === "piumhi";
  const commercialPharmacy = isPiumhi
    ? { name: "Drogaria Americana", address: "Rua Padre Abel, 365 · Centro", mapUrl: "https://www.google.com/maps/search/?api=1&query=Drogaria+Americana+Rua+Padre+Abel+365+Piumhi+MG" }
    : featuredPharmacy
      ? { name: featuredPharmacy.name, address: featuredPharmacy.address, mapUrl: `/buscar?cidade=${cityQuery}&tipo=empresas` }
      : null;
  const commercialOptical = isPiumhi
    ? { name: "Ótica Star", address: "Praça Guia Lopes, 12 · Centro", mapUrl: "https://www.google.com/maps/search/?api=1&query=Otica+Star+Praca+Guia+Lopes+12+Piumhi+MG" }
    : null;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="city-hero city-portal-hero">
          <div className={`city-portal-hero-bg${isPiumhi ? " city-portal-hero-bg-piumhi" : ""}`} aria-hidden="true" />
          <div className={`city-portal-hero-shade${isPiumhi ? " city-portal-hero-shade-piumhi" : ""}`} aria-hidden="true" />
          <div className="shell city-portal-grid city-portal-landing-grid">
            <div className="city-landing-copy">
              <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: city.name }]} />
              <p className="eyebrow">{city.region}</p>
              <h1>{city.name}</h1>
              <p>Encontre profissionais, clínicas e informações de saúde em {city.name}.</p>
              <div className="city-hero-actions">
                <Link href="/"><MapPin size={16} /> Alterar cidade</Link>
              </div>
              <form className="city-search-panel city-search-panel-hero" action="/buscar">
                <input type="hidden" name="cidade" value={city.name} />
                <label><span><ListFilter size={16} /> Área</span><select name="profissao" defaultValue=""><option value="">Todas as áreas</option>{professions.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label><span><ListFilter size={16} /> Especialidade</span><select name="especialidade" defaultValue=""><option value="">Todas</option>{localSpecialties.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label><span><Search size={16} /> O que procura?</span><input name="q" placeholder="Ex.: cardiologia, clínica..." /></label>
                <button type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </section>

        <section className="shell content-section city-portal-section">
          <div className="city-sell-layout">
            <div className="city-sell-main" id="profissionais">
              <div className="city-block-head">
                <p className="eyebrow">Profissionais em destaque</p>
                <h2>Destaques de {city.name}</h2>
                <span className="city-featured-criterion">Cadastros com informações mais completas</span>
              </div>

              {featuredProfessionals.length ? (
                <div className="city-featured-grid">
                  {featuredProfessionals.map((item) => (
                    <Link key={item.slug} href={`/profissionais/${item.slug}`} className="city-featured-card">
                      <span className="city-featured-tag">{item.profession}</span>
                      <strong>{item.name}</strong>
                      <small>{item.specialty}</small>
                      <span className="city-featured-org">{item.organization}</span>
                      <em>Ver perfil <ArrowUpRight size={13} /></em>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="city-empty-card">
                  <strong>Base da cidade em formação</strong>
                  <p>Os profissionais desta cidade serão organizados por especialidade, com fonte e contato revisados.</p>
                  <Link href="/inclusao">Indicar um profissional →</Link>
                </div>
              )}

              <Link className="city-list-all" href={`/buscar?cidade=${cityQuery}&tipo=profissionais`}>
                Ver todos os profissionais <ArrowRight size={14} />
              </Link>

              <Link className="city-sell-banner" href="/anuncie" aria-label={`Anuncie em ${city.name}`}>
                <div>
                  <span>Publicidade</span>
                  <strong>Sua marca em {city.name}</strong>
                  <small>Banner na página da cidade, visto por quem procura saúde aqui.</small>
                </div>
                <em>Anunciar <ArrowRight size={14} /></em>
              </Link>
            </div>

            <aside className="city-sell-side" id="servicos">
              <p className="city-side-label">Espaços comerciais</p>

              {commercialPharmacy ? (
                <div className="city-sponsor-card">
                  <span><Pill size={13} /> Farmácia em destaque</span>
                  <strong>{commercialPharmacy.name}</strong>
                  <small>{commercialPharmacy.address}</small>
                  <Link href={commercialPharmacy.mapUrl} target={commercialPharmacy.mapUrl.startsWith("http") ? "_blank" : undefined} rel={commercialPharmacy.mapUrl.startsWith("http") ? "noreferrer" : undefined}>Ver localização</Link>
                </div>
              ) : (
                <Link href="/anuncie" className="city-sponsor-card empty">
                  <span><Pill size={13} /> Farmácia</span>
                  <strong>Espaço para farmácia</strong>
                  <small>Sua farmácia em destaque nesta página.</small>
                </Link>
              )}

              {commercialOptical ? (
                <div className="city-sponsor-card">
                  <span><Glasses size={13} /> Ótica em destaque</span>
                  <strong>{commercialOptical.name}</strong>
                  <small>{commercialOptical.address}</small>
                  <Link href={commercialOptical.mapUrl} target="_blank" rel="noreferrer">Ver localização</Link>
                </div>
              ) : featuredClinic ? (
                <div className="city-sponsor-card">
                  <span><Building2 size={13} /> Clínica em destaque</span>
                  <strong>{featuredClinic.name}</strong>
                  <small>{featuredClinic.services.slice(0, 2).join(" · ")}</small>
                  <Link href={`/buscar?cidade=${cityQuery}&tipo=empresas`}>Ver detalhes</Link>
                </div>
              ) : (
                <Link href="/anuncie" className="city-sponsor-card empty">
                  <span><Building2 size={13} /> Clínica</span>
                  <strong>Espaço para clínica</strong>
                  <small>Destaque sua clínica na cidade.</small>
                </Link>
              )}

              <Link href="/anuncie" className="city-sponsor-anuncie">
                <Megaphone size={18} />
                <strong>Quer aparecer aqui?</strong>
                <small>Espaço para destaques, banners e conteúdo patrocinado.</small>
                <em>Falar com o comercial <ArrowRight size={13} /></em>
              </Link>
            </aside>
          </div>

          {localArticles[0] ? (
            <section className="city-content-direct" id="materias">
              <div>
                <p className="eyebrow">Informação</p>
                <h2>Conteúdo de saúde</h2>
                <p>Orientações e notícias para quem vive em {city.name}.</p>
              </div>
              <article>
                <span>{localArticles[0].category}</span>
                <strong>{localArticles[0].title}</strong>
                <p>{localArticles[0].excerpt}</p>
                <Link href="/materias">Ver conteúdos <ArrowRight size={14} /></Link>
              </article>
            </section>
          ) : null}

          <nav className="city-more-links" aria-label="Outros conteúdos do Guia Saúde">
            <span>Também no Guia Saúde</span>
            <Link href="/podcast">Podcast</Link>
            <Link href="/revista">Revista</Link>
            <Link href="/inclusao">Cadastre-se no Guia</Link>
          </nav>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
