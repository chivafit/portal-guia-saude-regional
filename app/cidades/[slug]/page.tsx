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
import { categoryOptionsFor } from "@/lib/service-taxonomy";
import { isPodcastProfessional } from "@/lib/podcast-guests";

export function generateStaticParams() {
  return Object.keys(cityDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = cityDetails[slug];
  if (!city) return pageMetadata("Cidade não encontrada", "Página de cidade não encontrada no Guia Saúde.", `/cidades/${slug}`);
  const metadata = pageMetadata(`Saúde em ${city.name}`, `${city.intro} Encontre profissionais, empresas, matérias, podcast e revista em ${city.name}.`, slug === "piumhi" ? "/" : `/cidades/${slug}`);
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
  const localSpecialties = Array.from(new Set(localProfessionals.filter((item) => item.profession === "Médico" || item.profession === "Dentista").map((item) => item.specialty).filter(Boolean))).sort((a, b) => a.localeCompare(b, "pt-BR"));
  const cityQuery = encodeURIComponent(city.name.toLowerCase());
  const prioritySpecialties = ["Cardiologia", "Clínica Médica", "Dermatologia", "Endocrinologia", "Ginecologia e Obstetrícia", "Neurologia", "Oftalmologia", "Ortopedia e Traumatologia", "Otorrinolaringologia", "Pediatria", "Psiquiatria", "Urologia"];
  const discoverySpecialties = prioritySpecialties.filter((specialty) => localSpecialties.includes(specialty)).slice(0, 12);
  const compactSpecialties = discoverySpecialties.length >= 8 ? discoverySpecialties : localSpecialties.slice(0, 12);
  const registrationLabel = (registration: string) => registration.replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente de confirmação|a confirmar)[^·]*/gi, "").trim();
  const confirmedRegistrationLabel = (registration: string) => /\d/.test(registrationLabel(registration)) ? registrationLabel(registration) : "";

  // Os seis destaques da home são participantes do podcast, preservando a ordem editorial do diretório.
  const featuredProfessionals = localProfessionals.filter((item) => isPodcastProfessional(item.slug)).slice(0, 6);
  const featuredPharmacy = localOrganizations.find((item) => /farm[áa]cia|drogaria/i.test(item.category));
  const featuredClinic = localOrganizations.find((item) => /cl[íi]nica|laborat[óo]rio|diagn[óo]stico|est[ée]tica/i.test(item.category) && !/b[áa]sica|p[úu]blica|gest[ãa]o|secretaria/i.test(`${item.category} ${item.name}`) && item.slug !== featuredPharmacy?.slug);
  const featuredOptical = localOrganizations.find((item) => item.categoryKey === "oticas");
  const commercialPharmacy = featuredPharmacy ? { name: featuredPharmacy.name, address: featuredPharmacy.address, mapUrl: `/empresas/${featuredPharmacy.slug}` } : null;
  const commercialOptical = featuredOptical ? { name: featuredOptical.name, address: featuredOptical.address, mapUrl: `/empresas/${featuredOptical.slug}` } : null;
  const serviceCategories = categoryOptionsFor(localOrganizations);
  const quickSearches = [
    { label: "Médicos", href: `/buscar?cidade=${cityQuery}&profissao=M%C3%A9dico&tipo=professionals` },
    { label: "Dentistas", href: `/buscar?cidade=${cityQuery}&profissao=Dentista&tipo=professionals` },
    { label: "Psicólogos", href: `/buscar?cidade=${cityQuery}&profissao=Psic%C3%B3logo&tipo=professionals` },
    { label: "Cardiologistas", href: `/buscar?cidade=${cityQuery}&especialidade=Cardiologia&tipo=professionals` },
    { label: "Fisioterapeutas", href: `/buscar?cidade=${cityQuery}&profissao=Fisioterapeuta&tipo=professionals` },
    { label: "Clínicas", href: `/buscar?cidade=${cityQuery}&categoria=clinicas&tipo=services` },
    { label: "Hospitais e diagnóstico", href: `/buscar?cidade=${cityQuery}&categoria=hospitais&tipo=services` },
  ];

  return (
    <>
      {rootLanding ? <div className="home-commercial-topline"><div className="shell">É profissional ou empresa de saúde? <span>Apareça para quem procura atendimento na região.</span><Link href="/anuncie">Conheça as soluções <ArrowRight size={14} /></Link></div></div> : null}
      <SiteHeader showTopline={!rootLanding} advertiseLabel={rootLanding ? "Anuncie no Guia" : "Anuncie"} />
      <main className={rootLanding ? "root-guide-home" : undefined}>
        {rootLanding ? <section className="root-guide-hero"><div className="shell root-guide-hero-inner"><p className="eyebrow">Guia Saúde · Portal Regional</p><h1>Encontre profissionais de saúde perto de você</h1><p>Pesquise por nome, profissão, especialidade, clínica ou serviço e encontre informações de saúde na sua região.</p><RootGuideSearch professions={professions} categories={serviceCategories} /><div className="root-guide-quick-searches"><span>Buscas rápidas:</span>{quickSearches.map((search) => <Link key={search.label} href={search.href}>{search.label}</Link>)}</div><p className="root-guide-trust">Informações, endereço e formas de contato reunidos para facilitar sua busca.</p></div></section> : <section className="city-human-hero city-piumhi-banner"><div className="shell city-human-hero-grid"><div className="city-landing-copy"><p className="eyebrow">Piumhi, Minas Gerais</p><h1>Encontre saúde e cuidado perto de você</h1><p>Profissionais, clínicas, serviços e conteúdos de saúde reunidos em um só lugar.</p><form className="city-search-panel city-search-panel-hero" action="/buscar"><input type="hidden" name="cidade" value={city.name} /><label><span><Search size={16} /> Profissional, especialidade ou serviço</span><input name="q" placeholder="Profissional, especialidade ou serviço" /></label><button type="submit">Buscar <ArrowRight size={16}/></button></form></div></div></section>}
        {rootLanding && compactSpecialties.length ? <RootSpecialties specialties={compactSpecialties} city={city.name} /> : null}
        {rootLanding ? <section className="root-pathways" aria-labelledby="root-pathways-title"><div className="shell"><div className="root-pathways-head"><h2 id="root-pathways-title">Saúde perto de você, informação para cuidar melhor.</h2><p>O Guia Saúde conecta você a profissionais, serviços e conteúdos da sua região.</p></div><div className="root-pathways-grid"><article className="root-pathway root-pathway-guide"><div><span className="root-pathway-label">Guia regional</span><h3>Encontre profissionais e serviços de saúde</h3><p>Conheça médicos, dentistas, psicólogos, nutricionistas, clínicas, laboratórios e outros serviços disponíveis em sua cidade.</p><small>Profissionais <b>•</b> Clínicas <b>•</b> Exames <b>•</b> Serviços</small><Link href={`/buscar?cidade=${cityQuery}`}>Explorar o Guia <ArrowRight size={15} /></Link></div><span className="root-pathway-art" aria-hidden="true" /></article><article className="root-pathway root-pathway-content"><div><span className="root-pathway-label">Conteúdos Guia Saúde</span><h3>Informação que ajuda você a se cuidar</h3><p>Acompanhe reportagens, entrevistas, revista, podcast e orientações produzidas pelo Guia Saúde com profissionais da região.</p><small>Revista <b>•</b> Podcast <b>•</b> Entrevistas <b>•</b> Notícias</small><Link href="/materias">Ver conteúdos <ArrowRight size={15} /></Link></div><span className="root-pathway-art" aria-hidden="true" /></article></div></div></section> : null}
        {!rootLanding ? <section className="shell city-discovery" aria-label="Atalhos para atendimento"><div className="city-discovery-head"><div><p className="eyebrow">Atendimento em Piumhi</p><h2>Escolha o tipo de profissional</h2><p>Selecione uma categoria para encontrar atendimento em Piumhi.</p></div><Link href={`/buscar?cidade=${cityQuery}&tipo=professionals`}>Ver todos os profissionais <ArrowRight size={14} /></Link></div><nav className="city-category-row" aria-label="Categorias profissionais">{professions.map((profession) => <Link key={profession} href={`/buscar?cidade=${cityQuery}&profissao=${encodeURIComponent(profession)}&tipo=professionals`}><ProfessionIcon profession={profession} size={19} /><span>{({ "Médico": "Médicos", "Dentista": "Dentistas", "Psicólogo": "Psicólogos", "Fisioterapeuta": "Fisioterapeutas", "Nutricionista": "Nutricionistas", "Fonoaudiólogo": "Fonoaudiólogos", "Enfermeiro": "Enfermeiros", "Farmacêutico": "Farmacêuticos", "Educador físico": "Educadores físicos" } as Record<string, string>)[profession] ?? profession}</span></Link>)}</nav>{!rootLanding && compactSpecialties.length ? <div className="city-specialties"><div className="city-specialties-heading"><h3>Especialidades médicas mais buscadas</h3><Link className="city-specialties-all" href={`/buscar?cidade=${cityQuery}&tipo=professionals`}>Ver todas as especialidades <ArrowRight size={13}/></Link></div>{compactSpecialties.map((specialty) => <Link key={specialty} href={`/buscar?cidade=${cityQuery}&especialidade=${encodeURIComponent(specialty)}&tipo=professionals`}>{specialty}</Link>)}</div> : null}</section> : null}
        {!rootLanding ? <section className="city-care-intro" aria-labelledby="city-care-title"><div className="shell"><div className="city-care-intro-head"><p className="eyebrow">Como o Guia Saúde ajuda</p><h2 id="city-care-title">Seu guia de saúde em Piumhi</h2><p>Descubra profissionais, serviços e informações úteis para cuidar da sua saúde na cidade.</p></div><div className="city-care-benefits">{[{ title: "Encontre o profissional certo", text: "Pesquise por profissão, especialidade ou serviço.", artwork: "first" }, { title: "Conheça antes de escolher", text: "Consulte especialidade, local de atendimento e informações profissionais.", artwork: "second" }, { title: "Acesse as informações de atendimento", text: "Encontre endereço, contato e outras informações disponíveis.", artwork: "third" }].map((benefit) => <article className="city-care-benefit" key={benefit.title}><span className={`city-care-art city-care-art-${benefit.artwork}`} aria-hidden="true" /><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div></div></section> : null}
        <section className="shell content-section city-portal-section"><div className="city-pro-directory" id="profissionais"><div className="city-pro-main"><div className="city-block-head"><p className="eyebrow">Profissionais em destaque</p><h2>Profissionais em destaque</h2><span className="city-featured-criterion">Conheça profissionais que participaram do podcast Guia Saúde</span></div>{featuredProfessionals.length ? <div className="city-featured-grid">{featuredProfessionals.map((item) => <Link key={item.slug} href={`/profissionais/${item.slug}`} className="city-featured-card"><span className="city-featured-badge">★ Profissional Destaque</span><span className="city-featured-avatar" style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}>{!item.imageUrl ? item.name.split(" ").slice(0, 2).map((part) => part[0]).join("") : null}</span><span className="city-featured-copy"><strong>{item.name}</strong><span>{item.specialty || item.profession}</span>{confirmedRegistrationLabel(item.registration) ? <small>{confirmedRegistrationLabel(item.registration)}</small> : null}</span><ArrowUpRight size={17} /></Link>)}</div> : <p>Nenhum profissional em destaque disponível no momento.</p>}<Link className="city-directory-link" href={`/buscar?cidade=${cityQuery}&tipo=professionals`}>Ver todos os profissionais <ArrowRight size={14}/></Link></div></div></section>
        <section className="shell content-section"><div className="city-commercial-grid">{featuredClinic ? <article><Building2 size={22}/><h3>{featuredClinic.name}</h3><p>{featuredClinic.address}</p><Link href={`/empresas/${featuredClinic.slug}`}>Ver detalhes <ArrowRight size={14}/></Link></article> : null}{commercialPharmacy ? <article><Pill size={22}/><h3>{commercialPharmacy.name}</h3><p>{commercialPharmacy.address}</p><Link href={commercialPharmacy.mapUrl}>Ver detalhes <ArrowRight size={14}/></Link></article> : null}{commercialOptical ? <article><Glasses size={22}/><h3>{commercialOptical.name}</h3><p>{commercialOptical.address}</p><Link href={commercialOptical.mapUrl}>Ver detalhes <ArrowRight size={14}/></Link></article> : null}</div></section>
        <section className="shell content-section"><div className="city-content-grid">{editorialArticle ? <article><BookOpen size={22}/><h2>{editorialArticle.title}</h2><p>{editorialArticle.excerpt}</p><Link href={`/materias/${editorialArticle.slug}`}>Ler matéria <ArrowRight size={14}/></Link></article> : null}{latestEpisode ? <article><Podcast size={22}/><h2>{latestEpisode.title}</h2><p>{latestEpisode.summary}</p><Link href="/podcast">Ouvir podcast <ArrowRight size={14}/></Link></article> : null}{readableEdition ? <article><Megaphone size={22}/><h2>Revista Guia Saúde</h2><p>Conteúdo regional para cuidar melhor da saúde.</p><Link href="/revista">Ver revista <ArrowRight size={14}/></Link></article> : null}</div></section>
      </main><SiteFooter />
    </>
  );
}
