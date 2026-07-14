import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, BookOpen, Building2, ListFilter, MapPin, Mic, Newspaper, Search, Stethoscope } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { articles, cityDetails, organizations, professions, professionals } from "@/lib/data";
import { publishedOrganizations, publishedProfessionals } from "@/lib/directory";
import { pageMetadata } from "@/lib/seo";
import { cityAdCode } from "@/lib/city-utils";

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
  const cityQuery = encodeURIComponent(city.name);
  return (
    <>
      <SiteHeader />
      <main>
        <section className="city-hero city-portal-hero">
          <div className="city-portal-hero-bg" aria-hidden="true" />
          <div className="city-portal-hero-shade" aria-hidden="true" />
          <div className="shell city-portal-grid city-portal-landing-grid">
            <div className="city-landing-copy">
              <p className="eyebrow">{city.region}</p>
              <h1>{city.name}</h1>
              <p>Guia local de saúde com matérias, profissionais, empresas, podcast, revista e serviços próximos.</p>
              <div className="city-hero-actions">
                <Link href="/"><MapPin size={16} /> Alterar cidade</Link>
                <Link href="#materias"><Newspaper size={16} /> Ver matérias</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="shell content-section city-portal-section">
          <form className="city-search-panel" action="/buscar">
            <input type="hidden" name="cidade" value={city.name} />
            <label>
              <span><ListFilter size={16} /> Selecione uma especialidade</span>
              <select name="profissao" defaultValue="">
                <option value="">Todas as áreas</option>
                {professions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span><Search size={16} /> Digite o que procura</span>
              <input name="q" placeholder="Ex.: cardiologia, clínica, farmácia..." />
            </label>
            <button type="submit">buscar</button>
          </form>

          <div className="city-head-banner">
            <AdSlot code={cityAdCode(city.name)} />
          </div>

          <div className="local-content city-editorial-panel city-editorial-panel-main" id="materias">
            <div>
              <p className="eyebrow">Matérias da cidade</p>
              <h2><Newspaper size={30} /> Saúde, prevenção e informação local.</h2>
              <p>Conteúdos úteis para quem vive em {city.name}: prevenção, entrevistas, campanhas públicas, pautas da revista e orientação para buscar atendimento.</p>
              <div className="city-article-row">
                {localArticles.slice(0, 2).map((article) => (
                  <article key={article.slug}>
                    <span>{article.category}</span>
                    <strong>{article.title}</strong>
                    <p>{article.excerpt}</p>
                    <Link href="/materias">Ler matéria <ArrowRight size={13} /></Link>
                  </article>
                ))}
              </div>
            </div>
            <aside>
              <small>GUIA DE {city.name.toUpperCase()}</small>
              <strong>Comece pelo que você precisa agora</strong>
              <p>Busque profissionais, encontre empresas de saúde ou acompanhe conteúdos locais do Guia Saúde.</p>
              <Link href={`/buscar?cidade=${cityQuery}`}>Buscar no guia <Search size={14} /></Link>
            </aside>
          </div>

          <div className="city-local-grid">
            <section>
              <div className="city-block-head">
                <p className="eyebrow">Profissionais</p>
                <h2>Perfis locais</h2>
              </div>
              {localProfessionals.length ? (
                <div className="city-mini-list">
                  {localProfessionals.slice(0, 4).map((item) => (
                    <Link href={`/profissionais/${item.slug}`} key={item.slug}>
                      <span><BadgeCheck size={13} /> {item.profession}</span>
                      <strong>{item.specialty}</strong>
                      <small>{item.registration}</small>
                      <em>Ver perfil</em>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="city-empty-card">
                  <strong>Base local em formação</strong>
                  <p>Esta cidade ainda não tem perfis demonstrativos suficientes. A coleta será priorizada na etapa de base regional.</p>
                  <Link href="/inclusao">Solicitar inclusão →</Link>
                </div>
              )}
            </section>

            <section>
              <div className="city-block-head">
                <p className="eyebrow">Empresas e serviços</p>
                <h2>Estruturas locais</h2>
              </div>
              {localOrganizations.length ? (
                <div className="city-mini-list">
                  {localOrganizations.slice(0, 4).map((item) => (
                    <Link href={`/empresas?cidade=${cityQuery}`} key={item.slug}>
                      <span><Building2 size={13} /> {item.category}</span>
                      <strong>{item.name}</strong>
                      <small>{item.services.slice(0, 2).join(" · ")}</small>
                      <em>Ver detalhes</em>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="city-empty-card">
                  <strong>Diretório comercial em validação</strong>
                  <p>Clínicas, laboratórios e empresas locais serão organizados por categoria, fonte e contato revisado.</p>
                  <Link href="/empresas">Ver empresas →</Link>
                </div>
              )}
            </section>
          </div>

          <div className="city-media-strip city-media-strip-compact">
            <article>
              <BookOpen size={22} />
              <span>Revista física</span>
              <strong>Presença impressa com extensão para {city.name}</strong>
              <p>Matérias, entrevistas e anúncios da revista podem ganhar continuação no portal da cidade.</p>
              <Link href="/revista">Ver revista <ArrowRight size={14} /></Link>
            </article>
            <article>
              <Mic size={22} />
              <span>Podcast</span>
              <strong>Conexão Saúde com pauta local</strong>
              <p>Episódios e cortes podem destacar especialistas, campanhas e temas relevantes para a população.</p>
              <Link href="/podcast">Ver podcast <ArrowRight size={14} /></Link>
            </article>
            <article>
              <Stethoscope size={22} />
              <span>Guia local</span>
              <strong>Profissionais e empresas em um só lugar</strong>
              <p>Acesso rápido à busca por especialidade, clínicas, farmácias, laboratórios e serviços da cidade.</p>
              <Link href={`/buscar?cidade=${cityQuery}`}>Abrir busca <ArrowRight size={14} /></Link>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
