import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, ClipboardCheck, MapPin, Play, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { professionals } from "@/lib/data";
import { findPublishedProfessional, publicProfessionals } from "@/lib/public-directory";
import { podcastForProfessional } from "@/lib/podcasts";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  // A exportação estática exige ao menos um parâmetro para a rota dinâmica.
  // O identificador abaixo renderiza notFound e não representa um perfil público.
  return publicProfessionals.length
    ? publicProfessionals.map((professional) => ({ slug: professional.slug }))
    : [{ slug: "perfil-indisponivel" }];
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
            { label: item.city, href: "/" },
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
              </div>

              {item.summary ? <p className="profile-clean-summary">{item.summary}</p> : null}

              <div className="profile-clean-tags">
                <span><Stethoscope size={14} /> {item.specialty}</span>
                <span><MapPin size={14} /> {item.city}</span>
                <span><ClipboardCheck size={14} /> {item.registration}</span>
              </div>
              <p className="profile-clean-source">Informações reunidas a partir de fontes públicas e canais profissionais. <Link href="/sobre#como-verificamos">Como verificamos as informações</Link></p>
            </div>

            {contactHref ? <aside className="profile-clean-contact">
              <small>Contato</small>
              {item.organization ? <strong>{item.organization}</strong> : null}
              <a className="profile-direct-contact" href={contactHref} target={contactHref.startsWith("http") ? "_blank" : undefined} rel={contactHref.startsWith("http") ? "noreferrer" : undefined}>{contactHref.startsWith("http") ? "Chamar no WhatsApp" : "Ligar"}</a>
            </aside> : null}
          </article>

          <section className="profile-clean-details">
            {item.services.length ? <article>
              <h2>Áreas de atendimento</h2>
              <div className="profile-clean-services">
                {item.services.map((service) => <span key={service}>{service}</span>)}
              </div>
            </article> : null}

            {item.organization ? <article>
              <h2>Local de atendimento</h2>
              <div className="profile-clean-location">
                <Building2 size={20} />
                <div>
                  <strong>{item.organization}</strong>
                  <span>{item.city}</span>
                </div>
              </div>
            </article> : null}

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

          <section className="profile-clean-update" aria-label="Atualização do perfil">
            <div>
              <h2>Este perfil é seu?</h2>
              <p>Confirme seus dados para atualizar informações profissionais, contatos, foto e locais de atendimento.</p>
            </div>
            <div>
              <a href="mailto:rmproguia@gmail.com?subject=Atualizar%20meus%20dados%20no%20Guia%20Sa%C3%BAde">Atualizar meus dados</a>
              <a href="mailto:rmproguia@gmail.com?subject=Solicitar%20corre%C3%A7%C3%A3o%20de%20perfil">Solicitar correção</a>
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
