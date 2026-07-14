import Link from "next/link";
import { notFound } from "next/navigation";
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
    `${city.intro} Encontre profissionais, empresas, matérias e oportunidades comerciais em ${city.name}.`,
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
          <div className="shell city-portal-grid">
            <div>
              <p className="eyebrow">{city.region}</p>
              <h1>Saúde em {city.name}.</h1>
              <p>{city.intro}</p>
              <div className="city-hero-actions">
                <Link href={`/buscar?cidade=${cityQuery}`}>Buscar profissionais</Link>
                <Link href={`/empresas?cidade=${cityQuery}`}>Ver empresas</Link>
              </div>
            </div>
            <aside className="city-local-card">
              <span>Portal local</span>
              <strong>{city.name}</strong>
              <p>Profissionais, empresas, matérias e oportunidades comerciais em uma página da cidade.</p>
            </aside>
          </div>
        </section>

        <section className="shell content-section city-portal-section">
          <div className="city-summary city-portal-summary">
            <div><small>PROFISSIONAIS</small><strong>{localProfessionals.length || "Base"}</strong><span>{localProfessionals.length ? "perfis no guia" : "em formação"}</span></div>
            <div><small>EMPRESAS</small><strong>{localOrganizations.length || "Diretório"}</strong><span>{localOrganizations.length ? "cadastros no guia" : "em validação"}</span></div>
            <div><small>CONTEÚDO</small><strong>{localArticles.length}</strong><span>pautas disponíveis</span></div>
          </div>

          <AdSlot code={cityAdCode(city.name)} />

          <div className="content-title city-content-title">
            <div>
              <p className="eyebrow">Encontre cuidado</p>
              <h2>Áreas mais procuradas em {city.name}</h2>
            </div>
            <Link href={`/buscar?cidade=${cityQuery}`}>Ver guia completo →</Link>
          </div>
          <div className="city-professions city-profession-pills">
            {professions.map((item) => (
              <Link key={item} href={`/buscar?cidade=${cityQuery}&profissao=${encodeURIComponent(item)}`}>
                <strong>{item}</strong>
                <span>Ver na cidade →</span>
              </Link>
            ))}
          </div>

          <div className="city-local-grid">
            <section>
              <div className="city-block-head">
                <p className="eyebrow">Profissionais</p>
                <h2>Perfis locais</h2>
              </div>
              {localProfessionals.length ? (
                <div className="city-mini-list">
                  {localProfessionals.map((item) => (
                    <Link href={`/profissionais/${item.slug}`} key={item.slug}>
                      <span>{item.profession}</span>
                      <strong>{item.specialty}</strong>
                      <small>{item.registration}</small>
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
                  {localOrganizations.map((item) => (
                    <Link href={`/empresas?cidade=${cityQuery}`} key={item.slug}>
                      <span>{item.category}</span>
                      <strong>{item.name}</strong>
                      <small>{item.services.slice(0, 2).join(" · ")}</small>
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

          <div className="local-content city-editorial-panel">
            <div>
              <p className="eyebrow">Conteúdo local</p>
              <h2>Informação conectada à realidade de {city.name}.</h2>
              <p>Esta área reunirá notícias, campanhas, eventos, entrevistas e orientações relacionadas à saúde no município.</p>
              <div className="city-article-row">
                {localArticles.slice(0, 3).map((article) => (
                  <article key={article.slug}>
                    <span>{article.category}</span>
                    <strong>{article.title}</strong>
                    <p>{article.excerpt}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside>
              <small>QUER PARTICIPAR?</small>
              <strong>Profissionais e empresas de {city.name}</strong>
              <p>Solicite inclusão no guia, envie uma pauta ou consulte formatos de banner local.</p>
              <Link href="/inclusao">Falar com o Guia Saúde →</Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
