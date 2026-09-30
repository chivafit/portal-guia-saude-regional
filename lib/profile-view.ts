// Dados já prontos para exibir um perfil profissional.
// Usado pela página estática e pelo arquivo /app-data/profiles.json, que o app
// consulta para mostrar contatos e textos atualizados sem nova versão na loja.
import type { Professional } from "./data";
import { organizationForProfessional } from "./public-directory";
import { podcastForProfessional } from "./podcasts";

export type ProfileLocationView = {
  name: string;
  address: string;
  phone: string;
  phoneLabel: string;
  whatsappHref: string;
  mapHref: string;
  organizationSlug?: string;
};

export type ProfileView = {
  slug: string;
  name: string;
  profession: string;
  professionLabel: string;
  specialty: string;
  city: string;
  organization: string;
  imageUrl?: string;
  hasRealPhoto: boolean;
  initials: string;
  verified: boolean;
  registration: string;
  summary: string;
  services: string[];
  education: string;
  audience: string[];
  insuranceInfo: string;
  locations: ProfileLocationView[];
  primaryPhone: string;
  primaryPhoneLabel: string;
  primaryWhats: string;
  primaryMapHref: string;
  podcast?: { topic: string; guest: string; role: string; episodeUrl?: string };
  confirmedAt?: string;
  canonicalUrl: string;
};

const pending = /(a validar|aguardando validação|pendente|em revisão|a confirmar)/i;

function presentationProfession(name: string, profession: string) {
  if (/^Dra\.?\s/i.test(name) && profession === "Médico") return "Médica";
  if (/^Dr\.?\s/i.test(name)) return profession;
  return ({ "Médico": "Medicina", "Psicólogo": "Psicologia", "Fonoaudiólogo": "Fonoaudiologia", "Enfermeiro": "Enfermagem", "Educador físico": "Educação Física" } as Record<string, string>)[profession] ?? profession;
}

function completeRegistration(value: string) {
  const clean = value.replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente|a confirmar)[^·]*/gi, "").trim();
  return /\d/.test(clean) ? clean : "";
}

/** Telefone em E.164 sem o "+": acrescenta 55 a números nacionais com DDD. */
export function e164(digits: string) {
  const d = digits.replace(/\D/g, "").replace(/^0+/, "");
  return d.length === 10 || d.length === 11 ? `55${d}` : d;
}

export function whatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length < 10 ? "" : `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}`;
}

function usableService(value: string, specialty: string) {
  return !/^(consulta|acompanhamento|atendimento|cuidado|saúde|consulta clínica)$/i.test(value.trim()) && value.toLocaleLowerCase("pt-BR") !== specialty.toLocaleLowerCase("pt-BR");
}

function mapHref(name: string, address: string, city: string, mapUrl?: string) {
  return mapUrl || (address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}, ${city}, MG`)}` : "");
}

export function buildProfileView(item: Professional): ProfileView {
  const nameSkip = new Set(["da", "de", "do", "dos", "das", "e"]);
  const initials = item.name.replace(/^(dr|dra|sr|sra)\.?\s+/i, "").split(/\s+/).filter((part) => part && !nameSkip.has(part.toLowerCase())).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const locationOrganization = organizationForProfessional(item);
  const locationName = locationOrganization?.name ?? item.organization;
  const locationAddress = locationOrganization?.address && !/endere[cç]o\s+(aguardando validação|a validar|a confirmar)/i.test(locationOrganization.address) ? locationOrganization.address : "";
  const locationPhone = locationOrganization?.phone?.replace(/\D/g, "") ?? "";
  const rawLocations = item.locations?.length ? item.locations : locationName ? [{ name: locationName, address: locationAddress, phone: locationPhone, mapUrl: locationOrganization?.mapUrl }] : [];
  const locations: ProfileLocationView[] = rawLocations.map((location) => {
    const digits = (location.phone ?? "").replace(/\D/g, "");
    const linked = organizationForProfessional({ city: item.city, organization: location.name });
    return {
      name: location.name,
      address: location.address ?? "",
      phone: digits.length >= 10 ? e164(digits) : "",
      phoneLabel: location.phone ?? "",
      whatsappHref: "whatsapp" in location && location.whatsapp ? whatsappHref(location.whatsapp) : "",
      mapHref: mapHref(location.name, location.address ?? "", item.city, location.mapUrl),
      organizationSlug: linked?.slug,
    };
  });
  const primary = locations[0];
  const primaryPhone = primary?.phone || (locationPhone ? e164(locationPhone) : "");
  const episode = podcastForProfessional(item.slug, item.name);
  const imageUrl = item.imageUrl;
  return {
    slug: item.slug,
    name: item.name,
    profession: item.profession,
    professionLabel: presentationProfession(item.name, item.profession),
    specialty: item.specialty,
    city: item.city,
    organization: item.organization,
    imageUrl,
    hasRealPhoto: !!imageUrl && !imageUrl.includes("/avatars/") && !imageUrl.includes("/placeholders/"),
    initials,
    verified: item.verified,
    registration: completeRegistration(item.registration),
    summary: pending.test(item.summary) ? "" : item.summary,
    services: item.services.filter((service) => usableService(service, item.specialty)),
    education: item.education ?? "",
    audience: item.audience?.filter(Boolean) ?? [],
    insuranceInfo: item.insuranceInfo ?? "",
    locations,
    primaryPhone,
    primaryPhoneLabel: primary?.phoneLabel || locationOrganization?.phone || "Ligar",
    primaryWhats: primary?.whatsappHref ?? "",
    primaryMapHref: primary?.mapHref ?? "",
    podcast: episode ? { topic: episode.topic, guest: episode.guest, role: episode.role, episodeUrl: episode.episodeUrl || undefined } : undefined,
    confirmedAt: item.confirmedAt,
    canonicalUrl: `https://guiasaude.app.br/profissionais/${item.slug}/`,
  };
}
