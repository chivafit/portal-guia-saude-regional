import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, ClipboardCheck, MapPin, Phone, Play, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { organizations, professionals } from "@/lib/data";
import { findPublishedProfessional, publicProfessionals } from "@/lib/public-directory";
import { podcastForProfessional } from "@/lib/podcasts";
import { pageMetadata } from "@/lib/seo";
import { ProfileShareButton } from "@/components/ProfileShareButton";

function presentationProfession(name: string, profession: string) {
  if (/^Dra\.?\s/i.test(name) && profession === "Médico") return "Médica";
  if (/^Dr\.?\s/i.test(name)) return profession;
  return ({ "Médico": "Medicina", "Psicólogo": "Psicologia", "Fonoaudiólogo": "Fonoaudiologia", "Enfermeiro": "Enfermagem", "Educador físico": "Educação Física" } as Record<string, string>)[profession] ?? profession;
}
function completeRegistration(value: string) {
  const clean = value.replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente|a confirmar)[^·]*/gi, "").trim();
  return /\d/.test(clean) ? clean : "";
}
function usableService(value: string, specialty: string) {
  return !/^(consulta|acompanhamento|atendimento|cuidado|saúde|consulta clínica)$/i.test(value.trim()) && value.toLocaleLowerCase("pt-BR") !== specialty.toLocaleLowerCase("pt-BR");
}

const maisSaudeLocation = {
  name: "Clínica Mais Saúde GMS",
  address: "Rua Padre Abel, 191 e 194, Centro",
  phone: "5537999358585",
};
function hasConfirmedMaisSaudeLocation(organization: string) {
  return /^Clínica Mais Saúde GMS\s+—\s+Rua Padre Abel, 191(?: e |\/)194, Centro$/i.test(organization.trim());
}

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
  const publicRegistration = completeRegistration(item.registration);
  const publicSummary = /(a validar|aguardando validação|pendente|em revisão|a confirmar)/i.test(item.summary) ? "" : item.summary;

  const nameSkip = new Set(["da", "de", "do", "dos", "das", "e"]);
  const initials = item.name
    .replace(/^(dr|dra|sr|sra)\.?\s+/i, "")
    .split(/\s+/)
    .filter((part) => part && !nameSkip.has(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const usesMaisSaudeLocation = hasConfirmedMaisSaudeLocation(item.organization);
  const locationOrganization = organizations.find((organization) => item.organization.toLocaleLowerCase("pt-BR").includes(organization.name.toLocaleLowerCase("pt-BR")) && organization.city === item.city);
  const locationName = usesMaisSaudeLocation ? maisSaudeLocation.name : locationOrganization?.name ?? item.organization;
  const locationAddress = usesMaisSaudeLocation ? maisSaudeLocation.address : locationOrganization?.address && !/endere[cç]o\s+(aguardando validação|a validar|a confirmar)/i.test(locationOrganization.address) ? locationOrganization.address : "";
  const locationPhone = usesMaisSaudeLocation ? maisSaudeLocation.phone : locationOrganization?.phone?.replace(/\D/g, "") ?? "";
  const hasDirectContact = !usesMaisSaudeLocation && Boolean(contactHref);
  const locationHref = locationPhone.length >= 10 ? `tel:+${locationPhone}` : "";
  const mapHref = locationOrganization?.mapUrl || (locationAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${locationName}, ${locationAddress}, ${item.city}, MG`)}` : "");
  const visibleServices = item.services.filter((service) => usableService(service, item.specialty));
  const canonicalUrl = `https://guiasaude.app.br/profissionais/${item.slug}/`;

  return (
    <>
      <SiteHeader />
      <main className="profile-page-clean">
        <section className="shell profile-clean-wrap">
          <Breadcrumbs items={[
            { label: "Início", href: "/" },
            { label: item.city, href: "/" },
            { label: "Profissionais", href: `/buscar?cidade=${encodeURIComponent(item.city.toLowerCase())}&tipo=professionals` },
            { label: item.name },
          ]} />
          <Link href={`/buscar?cidade=${encodeURIComponent(item.city)}`} className="profile-clean-back">
            <ArrowLeft size={14} /> Voltar para busca
          </Link>

          <article className="profile-clean-card">
            <div
              className={`profile-clean-photo${item.imageUrl ? "" : " profile-clean-initials"}`}
              aria-hidden="true"
              style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : undefined}
            >
              {item.imageUrl ? null : <span>{initials}</span>}
            </div>

            <div className="profile-clean-main">
              <div className="profile-clean-title">
                <p>{presentationProfession(item.name, item.profession)}</p>
                <h1>{item.name}</h1>
              </div>

              {publicSummary ? <p className="profile-clean-summary">{publicSummary}</p> : null}

              <div className="profile-clean-tags">
                <span><Stethoscope size={14} /> {item.specialty}</span>
                <span><MapPin size={14} /> {item.city}</span>
                {publicRegistration ? <span><ClipboardCheck size={14} /> {publicRegistration}</span> : null}
              </div>
            </div>

            {hasDirectContact || locationHref ? <aside className="profile-clean-contact">
              <small>{hasDirectContact ? "Contato do profissional" : "Contato do local"}</small>
              {hasDirectContact ? <a className="profile-direct-contact" href={contactHref} target={contactHref.startsWith("http") ? "_blank" : undefined} rel={contactHref.startsWith("http") ? "noreferrer" : undefined}>{contactHref.startsWith("http") ? "WhatsApp do profissional" : "Ligar para o profissional"}</a> : null}
              {locationHref ? <a className="profile-direct-contact" href={locationHref} aria-label={`Ligar para ${locationName}`}>Ligar para {locationName}</a> : null}
              <ProfileShareButton name={item.name} url={canonicalUrl} />
            </aside> : null}
            {!hasDirectContact && !locationHref ? <aside className="profile-clean-contact"><ProfileShareButton name={item.name} url={canonicalUrl} /></aside> : null}
          </article>

          <section className="profile-clean-details">
            {visibleServices.length ? <article>
              <h2>Especialidades e áreas de atuação</h2>
              <div className="profile-clean-services">
                {visibleServices.map((service) => <span key={service}>{service}</span>)}
              </div>
            </article> : null}

            {locationName ? <article>
              <h2>Local de atendimento</h2>
              <div className="profile-clean-location">
                <Building2 size={20} />
                <div>
                  <strong>{locationName}</strong>
                  {locationAddress ? <span>{locationAddress}</span> : null}
                  <span>{item.city}, Minas Gerais</span>
                  {mapHref ? <a href={mapHref} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${locationName} no mapa`}>Ver localização</a> : null}
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

          <p className="profile-clean-source">Informações reunidas a partir de fontes públicas e canais profissionais. <Link href="/sobre#como-verificamos">Como verificamos as informações</Link></p>

          <section className="profile-clean-update" aria-label="Atualização do perfil">
            <div>
              <h2>Atualize este perfil</h2>
              <p>É este profissional ou representa o perfil? Solicite a atualização de contatos, fotografia, áreas de atuação e locais de atendimento.</p>
            </div>
            <div>
              <Link href={`/inclusao?tipo=professional&perfil=${encodeURIComponent(item.slug)}&acao=atualizacao`}>Atualizar este perfil</Link>
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
