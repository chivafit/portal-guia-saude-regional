import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveProfessionalImage } from "@/lib/avatars";
import { professionals } from "@/lib/data";
import { publishedProfessionals } from "@/lib/public-directory";
import { isFeaturedProfessional } from "@/lib/featured-professionals";
import { pageMetadata } from "@/lib/seo";
import { ProfessionalImage } from "@/components/ProfessionalImage";
import { HealthOSSectionHeader } from "@/components/HealthOSSectionHeader";

export const metadata = pageMetadata("Profissionais em destaque", "Conheça os profissionais em destaque do Guia Saúde em Piumhi.", "/profissionais-destaque");

function registrationLabel(registration: string) {
  const cleaned = registration.replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente de confirmação|a confirmar)[^·]*/gi, "").trim();
  return /\d/.test(cleaned) ? cleaned : "";
}

export default async function FeaturedProfessionalsPage() {
  const source = await publishedProfessionals(professionals);
  const featuredProfessionals = source.filter((item) => item.city === "Piumhi" && isFeaturedProfessional(item.slug)).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  return <main className="native-featured-screen dz-page">
    <section className="native-featured-shell dz-shell">
      <HealthOSSectionHeader eyebrow="Seleção Guia Saúde" title="Profissionais em destaque" description="Uma seleção editorial de profissionais do Guia Saúde em Piumhi." meta={`${featuredProfessionals.length} destaques`} />
      <section className="dz-list" aria-label="Profissionais em destaque">
        {featuredProfessionals.map((item, index) => {
          const registration = registrationLabel(item.registration);
          return <Link key={item.slug} href={`/profissionais/${item.slug}`} className="dz-card">
            <span className="dz-photo" aria-hidden="true">
              <ProfessionalImage src={resolveProfessionalImage(item.slug, item.imageUrl, item)} sizes="76px" eager={index < 3} />
            </span>
            <span className="dz-info">
              <small>{item.specialty || item.profession}</small>
              <strong>{item.name}</strong>
              {registration ? <span>{registration}</span> : null}
              {item.organization ? <em>{item.organization}</em> : null}
            </span>
            <ArrowRight className="dz-arrow" size={18} aria-hidden="true" />
          </Link>;
        })}
      </section>
      <Link className="dz-all" href="/buscar?cidade=piumhi&tipo=professionals">Ver todos os profissionais <ArrowRight size={16} /></Link>
    </section>
  </main>;
}
