import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BookOpen, Building2, Glasses, MapPin, Megaphone, Pill, Podcast, Search } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articleImage, articles, cityDetails, magazineEditions, organizations, podcasts, professions, professionals } from "@/lib/data";
import { ProfessionIcon } from "@/components/ProfessionIcon";
import { RootGuideSearch } from "@/components/RootGuideSearch";
import { RootSpecialties } from "@/components/RootSpecialties";
import { publishedOrganizations, publishedProfessionals } from "@/lib/public-directory";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(cityDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = cityDetails[slug];
  if (!city) return pageMetadata("Cidade não encontrada", "Página de cidade não encontrada no Guia Saúde.", `/cidades/${slug}`);
  const metadata = pageMetadata(
    `Saúde em ${city.name}`,
    `${city.intro} Encontre profissionais, empresas, matérias, podcast e revista em ${city.name}.`,
    slug === "piumhi" ? "/" : `/cidades/${slug}`,
  );
  // Enquanto Piumhi é a única cidade ativa, a raiz é sua URL editorial oficial.
  // GitHub Pages não oferece redirecionamento HTTP 301/308 por rota estática.
  return slug === "piumhi" ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function CityPage({ params, rootLanding = false }: { params: Promise<{ slug: string }>; rootLanding?: boolean }) {
  const { slug } = await params;
  const city = cityDetails[slug];
  if (!city) notFound();

  const professionalSource = await publishedProfessionals(professionals);
  const organizationSource = await publishedOrganizations(organizations);
  const localProfessionals = professionalSource.filter((item) => item.city === city.name);
  const localOrganizations = organizationSource.filter((item) => item.city === city.name);
  const localArticles = articles.filter((item) => item.city === city.name || item.city === "Regional");
  const editorialArticle = localArticles.find((item) => item.slug === "radiologia-odontologica-diagnostico") ?? localArticles[0];
  const latestEpisode = podcasts[0];
  const readableEdition = magazineEditions.find((edition) => edition.coverUrl) ?? magazineEditions[0];
  const localSpecialties = Array.from(
    new Set(
      localProfessionals
        .filter((item) => item.profession === "Médico" || item.profession === "Dentista")
        .map((item) => item.specialty)
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const cityQuery = encodeURIComponent(city.name);
  // A página da cidade deve orientar a busca, não virar uma nuvem interminável de filtros.
  const prioritySpecialties = ["Cardiologia", "Clínica Médica", "Dermatologia", "Endocrinologia", "Ginecologia e Obstetrícia", "Neurologia", "Oftalmologia", "Ortopedia e Traumatologia", "Otorrinolaringologia", "Pediatria", "Psiquiatria", "Urologia"];
  const discoverySpecialties = prioritySpecialties.filter((specialty) => localSpecialties.includes(specialty)).slice(0, 12);
  const compactSpecialties = discoverySpecialties.length >= 8 ? discoverySpecialties : localSpecialties.slice(0, 12);
  const registrationLabel = (registration: string, verified: boolean) => verified ? registration : registration.replace(/\s*·\s*aguardando validação/gi, "") + " · verificação pendente";

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
  const serviceCategories = Array.from(new Set(localOrganizations.map((item) => item.category).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const quickSearches = [
    { label: "Médicos", href: `/buscar?cidade=${cityQuery}&profissao=M%C3%A9dico&tipo=profissionais` },
    { label: "Dentistas", href: `/buscar?cidade=${cityQuery}&profissao=Dentista&tipo=profissionais` },
    { label: "Psicólogos", href: `/buscar?cidade=${cityQuery}&profissao=Psic%C3%B3logo&tipo=profissionais` },
    { label: "Cardiologistas", href: `/buscar?cidade=${cityQuery}&especialidade=Cardiologia&tipo=profissionais` },
    { label: "Fisioterapeutas", href: `/buscar?cidade=${cityQuery}&profissao=Fisioterapeuta&tipo=profissionais` },
    { label: "Clínicas", href: `/buscar?cidade=${cityQuery}&categoria=Cl%C3%ADnica&tipo=empresas` },
    { label: "Laboratórios", href: `/buscar?cidade=${cityQuery}&categoria=Laborat%C3%B3rio&tipo=empresas` },
  ];

  return (
    <>
      {rootLanding ? <div className="home-commercial-topline"><div className="shell">É profissional ou empresa de saúde? <span>Apareça para quem procura atendimento na região.</span><Link href="/anuncie">Conheça as soluções <ArrowRight size={14} /></Link></div></div> : null}
      <SiteHeader showTopline={!rootLanding} advertiseLabel={rootLanding ? "Anuncie no Guia" : "Anuncie"} />
      <main className={rootLanding ? "root-guide-home" : undefined}>
        {rootLanding ? (
          <section className="root-guide-hero">
            <div className="shell root-guide-hero-inner">
              <p className="eyebrow">Guia Saúde · Portal Regional</p>
              <h1>Encontre profissionais de saúde perto de você</h1>
              <p>Pesquise por nome, profissão, especialidade, clínica ou serviço e encontre informações de saúde na sua região.</p>
              <RootGuideSearch professions={professions} categories={serviceCategories} />
              <div className="root-guide-quick-searches"><span>Buscas mais procuradas:</span>{quickSearches.map((search) => <Link key={search.label} href={search.href}>{search.label}</Link>)}</div>
              <p className="root-guide-trust">Informações, endereço e formas de contato reunidos para facilitar sua busca.</p>
            </div>
          </section>
        ) : <section className="city-human-hero city-piumhi-banner">
          <div className="shell city-human-hero-grid">
            <div className="city-landing-copy">
              <p className="eyebrow">Piumhi, Minas Gerais</p>
              <h1>Encontre saúde e cuidado perto de você</h1>
              <p>Profissionais, clínicas, serviços e conteúdos de saúde reunidos em um só lugar.</p>
              <form className="city-search-panel city-search-panel-hero" action="/buscar">
                <input type="hidden" name="cidade" value={city.name} />
                <label><span><Search size={16} /> Profissional, especialidade ou serviço</span><input name="q" placeholder="Profissional, especialidade ou serviço" /></label>
                <button type="submit">Buscar <ArrowRight size={16}/></button>
              </form>
            </div>
          </div>
        </section>}

        {rootLanding && compactSpecialties.length ? <RootSpecialties specialties={compactSpecialties} city={city.name} /> : null}

        {rootLanding ? <section className="root-pathways" aria-labelledby="root-pathways-title">
          <div className="shell">
            <div className="root-pathways-head">
              <h2 id="root-pathways-title">Saúde perto de você, informação para cuidar melhor.</h2>
              <p>O Guia Saúde conecta você a profissionais, serviços e conteúdos da sua região.</p>
            </div>
            <div className="root-pathways-grid">
              <article className="root-pathway root-pathway-guide">
                <div>
                  <span className="root-pathway-label">Guia regional</span>
                  <h3>Encontre profissionais e serviços de saúde</h3>
                  <p>Conheça médicos, dentistas, psicólogos, nutricionistas, clínicas, laboratórios e outros serviços disponíveis em sua cidade.</p>
                  <small>Profissionais <b>•</b> Clínicas <b>•</b> Exames <b>•</b> Serviços</small>
                  <Link href={`/buscar?cidade=${cityQuery}`}>Explorar o Guia <ArrowRight size={15} /></Link>
                </div>
                <span className="root-pathway-art" aria-hidden="true" />
              </article>
              <article className="root-pathway root-pathway-content">
                <div>
                  <span className="root-pathway-label">Conteúdos Guia Saúde</span>
                  <h3>Informação que ajuda você a se cuidar</h3>
                  <p>Acompanhe reportagens, entrevistas, revista, podcast e orientações produzidas pelo Guia Saúde com profissionais da região.</p>
                  <small>Revista <b>•</b> Podcast <b>•</b> Entrevistas <b>•</b> Notícias</small>
                  <Link href="/materias">Ver conteúdos <ArrowRight size={15} /></Link>
                </div>
                <span className="root-pathway-art" aria-hidden="true" />
              </article>
            </div>
          </div>
        </section> : null}

        {!rootLanding ? <section className="shell city-discovery" aria-label="Atalhos para atendimento">
          <div className="city-discovery-head">
            <div><p className="eyebrow">Atendimento em Piumhi</p><h2>Escolha o tipo de profissional</h2><p>Selecione uma categoria para encontrar atendimento em Piumhi.</p></div>
            <Link href={`/buscar?cidade=${cityQuery}&tipo=profissionais`}>Ver todos os profissionais <ArrowRight size={14} /></Link>
          </div>
          <nav className="city-category-row" aria-label="Categorias profissionais">
            {professions.map((profession) => (
              <Link key={profession} href={`/buscar?cidade=${cityQuery}&profissao=${encodeURIComponent(profession)}&tipo=profissionais`}>
                <ProfessionIcon profession={profession} size={19} /><span>{({ "Médico": "Médicos", "Dentista": "Dentistas", "Psicólogo": "Psicólogos", "Fisioterapeuta": "Fisioterapeutas", "Nutricionista": "Nutricionistas", "Fonoaudiólogo": "Fonoaudiólogos", "Enfermeiro": "Enfermeiros", "Farmacêutico": "Farmacêuticos", "Educador físico": "Educadores físicos" } as Record<string, string>)[profession] ?? profession}</span>
              </Link>
            ))}
          </nav>
          {!rootLanding && compactSpecialties.length ? (
            <div className="city-specialties">
              <div className="city-specialties-heading"><h3>Especialidades médicas mais buscadas</h3><Link className="city-specialties-all" href={`/buscar?cidade=${cityQuery}&tipo=profissionais`}>Ver todas as especialidades <ArrowRight size={13}/></Link></div>
              {compactSpecialties.map((specialty) => (
                <Link key={specialty} href={`/buscar?cidade=${cityQuery}&especialidade=${encodeURIComponent(specialty)}&tipo=profissionais`}>{specialty}</Link>
              ))}
            </div>
          ) : null}
        </section> : null}

        {!rootLanding ? <section className="city-care-intro" aria-labelledby="city-care-title">
          <div className="shell">
            <div className="city-care-intro-head">
              <p className="eyebrow">Como o Guia Saúde ajuda</p>
              <h2 id="city-care-title">Seu guia de saúde em Piumhi</h2>
              <p>Descubra profissionais, serviços e informações úteis para cuidar da sua saúde na cidade.</p>
            </div>
            <div className="city-care-benefits">
              {[
                { title: "Encontre o profissional certo", text: "Pesquise por profissão, especialidade ou serviço.", artwork: "first" },
                { title: "Conheça antes de escolher", text: "Consulte especialidade, local de atendimento e informações profissionais.", artwork: "second" },
                { title: "Acesse as informações de atendimento", text: "Encontre endereço, contato e outras informações disponíveis.", artwork: "third" },
              ].map((benefit) => (
                <article className="city-care-benefit" key={benefit.title}>
                  <span className={`city-care-art city-care-art-${benefit.artwork}`} aria-hidden="true" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section> : null}

        <section className="shell content-section city-portal-section">
          <div className="city-pro-directory" id="profissionais">
            <div className="city-pro-main">
              <div className="city-block-head">
                <p className="eyebrow">Profissionais em destaque</p>
                <h2>Profissionais em destaque</h2>
                <span className="city-featured-criterion">Conheça alguns profissionais que atendem em {city.name}</span>
              </div>

              {featuredProfessionals.length ? (
                <div className="city-featured-grid">
                  {featuredProfessionals.map((item) => (
                    <Link key={item.slug} href={`/profissionais/${item.slug}`} className="city-featured-card">
                      <span
                        className={`city-featured-avatar${item.imageUrl ? " has-photo" : ""}`}
                        style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}
                        aria-hidden="true"
                      >
                        {!item.imageUrl ? item.name.split(" ").filter((word) => !/^dr\.?|^dra\.?$/i.test(word)).slice(0, 2).map((word) => word[0]).join("") : null}
                      </span>
                      <span className="city-featured-tag">{item.profession}</span>
                      <strong>{item.name}</strong>
                      <small>{item.specialty}</small>
                      <span className="city-featured-org">{item.organization}</span>
                      <span className="city-featured-org city-featured-registration">{registrationLabel(item.registration, item.verified)}</span>
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

          <section className="city-local-partners" aria-labelledby="city-partners-title">
            <div><p className="eyebrow">Parceiros e serviços locais</p><h2 id="city-partners-title">Serviços que também fazem parte da cidade</h2></div>
            <div className="city-partner-grid">
              {commercialPharmacy ? <article><span>Patrocinado</span><Pill size={19}/><strong>{commercialPharmacy.name}</strong><p>{commercialPharmacy.address}</p><Link href={commercialPharmacy.mapUrl} target={commercialPharmacy.mapUrl.startsWith("http") ? "_blank" : undefined}>Ver localização <ArrowRight size={13}/></Link></article> : null}
              {commercialOptical ? <article><span>Patrocinado</span><Glasses size={19}/><strong>{commercialOptical.name}</strong><p>{commercialOptical.address}</p><Link href={commercialOptical.mapUrl} target="_blank">Ver localização <ArrowRight size={13}/></Link></article> : null}
              <Link href="/anuncie" className="city-partner-cta"><Megaphone size={19}/><strong>Quer aparecer no Guia Saúde?</strong><p>Mostre sua marca para quem procura atendimento em {city.name}.</p><em>Conhecer opções <ArrowRight size={13}/></em></Link>
            </div>
          </section>

          {editorialArticle ? (
            <section className="city-content-direct" id="materias">
              <div>
                <p className="eyebrow">Informação</p>
                <h2>Conteúdo para cuidar melhor de você</h2>
                <p>Orientações e notícias para quem vive em {city.name}.</p>
              </div>
              <div className="city-editorial-mosaic">
                <article className="city-content-editorial-card city-editorial-article" style={{ backgroundImage: `linear-gradient(90deg,rgba(9,43,40,.86),rgba(9,43,40,.22)),url(${articleImage(editorialArticle) ?? "/materias/radiologia-odontologica-diagnostico.jpg"})` }}><span>{editorialArticle.category}</span><strong>{editorialArticle.title}</strong><p>{editorialArticle.excerpt}</p><Link href={`/materias/${editorialArticle.slug}`}>Ler matéria <ArrowRight size={14} /></Link></article>
                <Link href="/podcast" className="city-editorial-podcast" style={{ backgroundImage: `linear-gradient(0deg,rgba(11,61,57,.78),rgba(11,61,57,.08)),url(${latestEpisode.imageUrl})` }}><span><Podcast size={13}/> Podcast</span><strong>Conexão Saúde</strong><p>{latestEpisode.topic}</p><em>Ouvir episódio <ArrowRight size={13}/></em></Link>
                <Link href={`/revista/${readableEdition.slug}`} className="city-editorial-magazine"><span><BookOpen size={13}/> Revista</span>{readableEdition.coverUrl ? <img src={readableEdition.coverUrl} alt={`Capa da ${readableEdition.number} edição da Guia Saúde`} /> : null}<div><strong>{readableEdition.number} edição</strong><p>{readableEdition.title}</p><em>Folhear revista <ArrowRight size={13}/></em></div></Link>
              </div>
            </section>
          ) : null}

          {localOrganizations.length ? (
            <section className="city-services-section" id="empresas">
              <div className="city-discovery-head city-services-head"><div><p className="eyebrow">Serviços locais</p><h2>Clínicas e serviços de saúde em {city.name}</h2><p>Encontre também hospitais, laboratórios, farmácias e outros serviços de cuidado.</p></div><Link href={`/buscar?cidade=${cityQuery}&tipo=empresas`}>Ver todos <ArrowRight size={14} /></Link></div>
              <div className="city-services-list">
                {localOrganizations.slice(0, 3).map((item) => <Link key={item.slug} href={`/buscar?cidade=${cityQuery}&q=${encodeURIComponent(item.name)}&tipo=empresas`}><span><Building2 size={18} /></span><div><strong>{item.name}</strong><small>{item.category} · {item.address}</small></div><ArrowUpRight size={15} /></Link>)}
              </div>
            </section>
          ) : null}

          <section className="city-final-cta">
            <div><p className="eyebrow">Para profissionais e marcas</p><h2>Faça parte do Guia Saúde</h2><p>Apresente seu trabalho para quem procura atendimento em {city.name} e na região.</p></div>
            <div><Link href="/inclusao">Cadastrar meu perfil <ArrowRight size={14}/></Link><Link href="/anuncie">Anunciar no Guia <ArrowRight size={14}/></Link></div>
          </section>

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
