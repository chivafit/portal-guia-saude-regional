import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { professionals } from "@/lib/data";
import { publishedProfessionals } from "@/lib/public-directory";
import { isPodcastProfessional } from "@/lib/podcast-guests";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Profissionais em destaque",
  "Conheça os profissionais em destaque do Guia Saúde em Piumhi.",
  "/profissionais-destaque",
);

function registrationLabel(registration: string) {
  const cleaned = registration
    .replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente de confirmação|a confirmar)[^·]*/gi, "")
    .trim();
  return /\d/.test(cleaned) ? cleaned : "";
}

export default async function FeaturedProfessionalsPage() {
  const source = await publishedProfessionals(professionals);
  const featuredProfessionals = source
    .filter((item) => item.city === "Piumhi" && isPodcastProfessional(item.slug))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="directory-hero directory-hero-refined featured-directory-hero">
          <div className="shell">
            <p className="eyebrow">Guia Saúde · Piumhi</p>
            <h1>Profissionais em destaque</h1>
            <p>Conheça todos os profissionais em destaque do Guia Saúde.</p>
          </div>
        </section>

        <section className="shell content-section featured-directory-section">
          <div className="city-block-head featured-directory-head">
            <p className="eyebrow">Profissional Destaque</p>
            <h2>{featuredProfessionals.length} profissionais em destaque</h2>
            <span className="city-featured-criterion">Profissionais selecionados para destaque editorial no Guia Saúde.</span>
          </div>

          <div className="featured-directory-grid">
            {featuredProfessionals.map((item) => {
              const registration = registrationLabel(item.registration);
              return (
                <Link key={item.slug} href={`/profissionais/${item.slug}`} className="featured-directory-card">
                  <span
                    className={`featured-directory-avatar${item.imageUrl ? " has-photo" : ""}`}
                    style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}
                    aria-hidden="true"
                  >
                    {!item.imageUrl
                      ? item.name
                          .split(" ")
                          .filter((word) => !/^dr\.?|^dra\.?$/i.test(word))
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")
                      : null}
                  </span>
                  <span className="featured-directory-info">
                    <span className="city-featured-tag">★ Profissional Destaque</span>
                    <strong>{item.name}</strong>
                    <small>{item.specialty}</small>
                    <span className="featured-directory-meta">{item.organization}</span>
                    {registration ? <span className="featured-directory-registration">{registration}</span> : null}
                  </span>
                  <em>Ver perfil <ArrowRight size={13} /></em>
                </Link>
              );
            })}
          </div>

          <Link className="city-list-all" href="/buscar?cidade=piumhi&tipo=professionals">
            Ver todos os profissionais <ArrowRight size={14} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
