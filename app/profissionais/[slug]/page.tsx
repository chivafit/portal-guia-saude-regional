import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Building2, ClipboardCheck, MapPin, Play, ShieldCheck, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { professionals } from "@/lib/data";
import { findPublishedProfessional } from "@/lib/public-directory";
import { podcastForProfessional } from "@/lib/podcasts";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return professionals.filter((professional) => professional.city === "Piumhi").map((professional) => ({ slug: professional.slug }));
}

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
  const podcastEpisode = podcastForProfessional(item.slug, item.name);
  const whatsappDigits = (item.whatsapp ?? "").replace(/\D/g, "");
  const phoneDigits = (item.phone ?? "").replace(/\D/g, "");
  const contactHref = whatsappDigits.length >= 10
    ? `https://wa.me/${whatsappDigits.startsWith("55") ? whatsappDigits : `55${whatsappDigits}`}`
    : phoneDigits.length >= 10 ? `tel:+55${phoneDigits}` : "";

  const nameSkip = new Set(["da", "de", "do", "dos", "das", "e"]);
  const initials = item.name
    .replace(/^(dr|dra|sr|sra)\.?\s+/i, "")
    .split(/\s+/)
    .filter((part) => part && !nameSkip.has(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <SiteHeader />
      <main className="profile-page-clean">
        <section className="shell profile-clean-wrap">
          <Breadcrumbs items={[
            { label: "Início", href: "/" },
            { label: item.city, href: `/cidades/${item.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` },
            { label: "Profissionais", href: `/buscar?cidade=${encodeURIComponent(item.city)}&tipo=profissionais` },
            { label: item.name },
          ]} />
          <Link href={`/buscar?cidade=${encodeURIComponent(item.city)}`} className="profile-clean-back">
            <ArrowLeft size={14} /> Voltar para busca
          </Link>

          <article className="profile-clean-card">
            <div className="profile-clean-photo profile-clean-initials" aria-hidden="true">
              <span>{initials}</span>
            </div>

            <div className="profile-clean-main">
              <div className="profile-clean-title">
                <p>{item.profession}</p>
                <h1>{item.name}</h1>
                <span className={item.verified ? "status-pill verified" : "status-pill pending"}>
                  {item.verified ? <BadgeCheck size={14} /> : <ShieldCheck size={14} />}
                  {item.verified ? "Perfil verificado" : "Cadastro em revisão"}
                </span>
                <div className="profile-clean-verification">
                  {item.verified ? <BadgeCheck size={15} /> : <ShieldCheck size={15} />}
                  <span>
                    {item.verified ? "Informações verificadas pela equipe" : "Informações em revisão pela equipe"}
                    {item.source ? <> · fonte: <a href={item.source} target="_blank" rel="noreferrer">{new URL(item.source).hostname.replace(/^www\./, "")}</a></> : null}
                  </span>
                </div>
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
              {contactHref ? <a className="profile-direct-contact" href={contactHref} target={contactHref.startsWith("http") ? "_blank" : undefined} rel={contactHref.startsWith("http") ? "noreferrer" : undefined}>{contactHref.startsWith("http") ? "Falar pelo WhatsApp" : "Ligar para o consultório"}</a> : <span className="contact-pending">Contato em validação</span>}
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

            {podcastEpisode ? (
              <article className="profile-podcast">
                <div className="profile-podcast-icon"><Play size={20} fill="currentColor" /></div>
                <div>
                  <span>Participação no Conexão Saúde</span>
                  <h2>{podcastEpisode.topic}</h2>
                  <p>{podcastEpisode.guest} · {podcastEpisode.role}</p>
                </div>
                <a href={podcastEpisode.episodeUrl || "/podcast"} target={podcastEpisode.episodeUrl ? "_blank" : undefined} rel={podcastEpisode.episodeUrl ? "noreferrer" : undefined}>
                  Assistir ao podcast
                </a>
              </article>
            ) : null}
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
