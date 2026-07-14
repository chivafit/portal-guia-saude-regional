import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Building2, ClipboardCheck, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { ContactReveal } from "@/components/ContactReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { professionals } from "@/lib/data";
import { findPublishedProfessional } from "@/lib/directory";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await findPublishedProfessional(slug, professionals);
  if (!item) return pageMetadata("Profissional não encontrado", "Perfil profissional não encontrado no Guia Saúde.", `/profissionais/${slug}`);
  return pageMetadata(
    `${item.name} — ${item.specialty}`,
    `${item.profession} em ${item.city}. Perfil informativo no Guia Saúde, sem agendamento online.`,
    `/profissionais/${slug}`,
  );
}

export default async function ProfessionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await findPublishedProfessional(slug, professionals);
  if (!item) notFound();

  const initials = item.name.split(" ").slice(0, 2).map((part) => part[0]).join("");

  return (
    <>
      <SiteHeader />
      <main className="profile-page-clean">
        <section className="shell profile-clean-wrap">
          <Link href={`/buscar?cidade=${encodeURIComponent(item.city)}`} className="profile-clean-back">
            <ArrowLeft size={14} /> Voltar para busca
          </Link>

          <article className="profile-clean-card">
            <div
              className="profile-clean-photo"
              style={{ backgroundImage: `url(${item.imageUrl || "/placeholders/professional-photo.svg"})` }}
              aria-label={`Foto de ${item.name}`}
            >
              <span>{initials}</span>
            </div>

            <div className="profile-clean-main">
              <div className="profile-clean-title">
                <p>{item.profession}</p>
                <h1>{item.name}</h1>
                <span className={item.verified ? "status-pill verified" : "status-pill pending"}>
                  {item.verified ? <BadgeCheck size={14} /> : <ShieldCheck size={14} />}
                  {item.verified ? "Perfil verificado" : "Em validação"}
                </span>
              </div>

              <p className="profile-clean-summary">{item.summary}</p>

              <div className="profile-clean-tags">
                <span><Stethoscope size={14} /> {item.specialty}</span>
                <span><MapPin size={14} /> {item.city}</span>
                <span><ClipboardCheck size={14} /> {item.registration}</span>
              </div>
            </div>

            <aside className="profile-clean-contact">
              <small>Contato</small>
              <strong>{item.organization}</strong>
              <ContactReveal
                entityType="professional"
                entitySlug={item.slug}
                entityName={item.name}
                category={item.specialty}
                cityName={item.city}
                phone={item.phone}
                whatsapp={item.whatsapp}
              />
            </aside>
          </article>

          <section className="profile-clean-details">
            <article>
              <h2>Áreas de atendimento</h2>
              <div className="profile-clean-services">
                {item.services.map((service) => <span key={service}>{service}</span>)}
              </div>
            </article>

            <article>
              <h2>Local de atendimento</h2>
              <div className="profile-clean-location">
                <Building2 size={20} />
                <div>
                  <strong>{item.organization}</strong>
                  <span>{item.city} · endereço profissional a confirmar</span>
                </div>
              </div>
            </article>

            <article className="profile-clean-note">
              <h2>Nota editorial</h2>
              <p>O Guia Saúde é um portal informativo. Não realiza diagnóstico, prescrição, triagem ou agendamento de consultas.</p>
            </article>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
