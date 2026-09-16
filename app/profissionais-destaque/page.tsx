import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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

  return <main className="native-featured-screen">
    <div className="native-search-aura" aria-hidden="true" />
    <section className="native-featured-shell">
      <HealthOSSectionHeader eyebrow="SELEÇÃO GUIA SAÚDE" title="Profissionais em destaque" description="Uma seleção editorial de profissionais do Guia Saúde em Piumhi." meta={`${featuredProfessionals.length} destaques`} />
      <section className="native-featured-list" aria-label="Profissionais em destaque">
        {featuredProfessionals.map((item, index) => {
          const registration = registrationLabel(item.registration);
          return <Link key={item.slug} href={`/profissionais/${item.slug}`} className="native-featured-card">
            <span className={`native-featured-avatar${item.imageUrl ? " has-photo" : ""}`} aria-hidden="true">
              {item.imageUrl ? <ProfessionalImage src={item.imageUrl} sizes="68px" eager={index < 3} /> : item.name.split(" ").filter((word) => !/^dr\.?|^dra\.?$/i.test(word)).slice(0, 2).map((word) => word[0]).join("")}
            </span>
            <span className="native-featured-info"><small><Sparkles size={11} /> PROFISSIONAL DESTAQUE</small><strong>{item.name}</strong><em>{item.specialty}</em>{item.organization ? <span>{item.organization}</span> : null}{registration ? <span>{registration}</span> : null}</span>
            <span className="native-featured-arrow"><ArrowRight size={17} /></span>
          </Link>;
        })}
      </section>
      <Link className="native-featured-all" href="/buscar?cidade=piumhi&tipo=professionals">Explorar todos os profissionais <ArrowRight size={15} /></Link>
    </section>
  </main>;
}
