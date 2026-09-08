import { organizations, professionals, type Organization, type Professional } from "./data";
import { piumhiProfessionalAdditions } from "./data/professional-additions";
import { piumhiMedicalSequenceAdditions } from "./data/medical-sequence-additions";
import { piumhiOtorrinoAdditions } from "./data/medical-expansion-otorrino";
import { piumhiNonMedicalSequenceAdditions } from "./data/nonmedical-sequence-additions";
import { podcastProfessionalAdditions } from "./data/podcast-professional-additions";
import { applyProfessionalOverride } from "./data/professional-overrides";
import { applyMedicalSequenceOverride } from "./data/medical-sequence-overrides";
import { applyNonMedicalSequenceOverride } from "./data/nonmedical-sequence-overrides";
import { podcastImageForProfessional } from "./podcast-guests";
import { resolveProfessionalImage } from "./avatars";

function normalizedProfessionalIdentity(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function professionalIdentity(item: Pick<Professional, "name" | "profession" | "city">) {
  return [item.name, item.profession, item.city]
    .map(normalizedProfessionalIdentity)
    .join("|");
}

function enrichProfessional(professional: Professional) {
  // A ordem é intencional: as correções editoriais específicas são a última
  // palavra sobre registros que também aparecem nas revisões sequenciais.
  const corrected = applyProfessionalOverride(applyMedicalSequenceOverride(applyNonMedicalSequenceOverride(professional)));
  return {
    ...corrected,
    imageUrl: resolveProfessionalImage(corrected.slug, podcastImageForProfessional(corrected.slug) ?? corrected.imageUrl),
  };
}

function professionalDirectory(source: Professional[] = professionals) {
  const enriched = source.map(enrichProfessional);

  const additions = source === professionals
    ? [...piumhiProfessionalAdditions, ...piumhiMedicalSequenceAdditions, ...piumhiOtorrinoAdditions, ...piumhiNonMedicalSequenceAdditions, ...podcastProfessionalAdditions]
        // As adições também passam pelos overrides no fim da composição. Isso impede
        // que uma versão editorial antiga substitua uma correção mais recente.
    : [];

  const combined = source === professionals ? [...enriched, ...additions] : enriched;

  // A base histórica e as listas editoriais podem se referir ao mesmo profissional
  // com slugs diferentes. A lista editorial vem por último para preservar a versão
  // mais completa e impedir que uma pessoa apareça duas vezes no resultado.
  return Array.from(new Map(combined.map((item) => [professionalIdentity(item), item])).values())
    .map(enrichProfessional);
}

export async function publishedProfessionals(fallback?: Professional[]) {
  return professionalDirectory(fallback).filter(isPublicProfessional).map(publicProfessional);
}

export function isPublicProfessional(item: Professional) {
  return item.city === "Piumhi"
    && item.publicationStatus === "published"
    && Boolean(item.name && item.profession && item.specialty);
}

function publicRegistration(registration: string) {
  const clean = registration
    .replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente de confirmação|a confirmar)[^·]*/gi, "")
    .trim();
  // Siglas isoladas (por exemplo, "CRM-MG") não são registro profissional
  // confirmado e não podem aparecer como se fossem um número de conselho.
  return /\d/.test(clean) ? clean : "";
}

function publicOrganization(organization: string) {
  return organization
    .replace(/\s*(?:—|-)?\s*endere[cç]o\s+(a validar|aguardando validação|a confirmar)/gi, "")
    .trim();
}

function publicPhone(phone: string) {
  return /(contato\s+(a validar|será validado|em validação)|aguardando validação|pendente|a confirmar)/i.test(phone)
    ? ""
    : phone;
}

function publicWhatsapp(whatsapp: string) {
  return !whatsapp || whatsapp === "#" || /(a validar|aguardando validação|pendente|a confirmar)/i.test(whatsapp)
    ? ""
    : whatsapp;
}

function normalizedOrganizationValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Relaciona somente quando o nome do estabelecimento (ou um alias editorial)
 * aparece no local informado pelo profissional. Endereço compartilhado nunca
 * é usado como atalho: Praça Guia Lopes, 53, por exemplo, abriga entidades
 * distintas.
 */
export function organizationForProfessional(item: Pick<Professional, "city" | "organization">, source: Organization[] = organizations) {
  const organizationName = normalizedOrganizationValue(item.organization);
  return source.find((organization) => organization.city === item.city
    && [organization.name, ...(organization.aliases ?? [])]
      .map(normalizedOrganizationValue)
      .some((alias) => Boolean(alias) && organizationName.includes(alias)));
}

function locationFromOrganization(item: Professional, phone: string, whatsapp: string) {
  const [name, ...addressParts] = item.organization.split(/\s+—\s+/);
  // Uma frase genérica de presença na cidade não é um estabelecimento e não
  // deve ganhar um botão de contato sem identificação de quem atende.
  if (!name || /^(atua[cç][aã]o|atendimento)\b/i.test(name)) return null;
  return {
    name: name.trim(),
    address: addressParts.join(" — ").trim() || undefined,
    phone,
    whatsapp,
    sourceUrl: item.source,
  };
}

export function publicProfessional(item: Professional): Professional {
  const visible = { ...item };
  delete visible.sourceUrls;
  delete visible.lastVerifiedAt;
  delete visible.updatedAt;
  delete visible.claimed;
  const summary = /(a validar|aguardando validação|pendente|em revisão|a confirmar|sujeit[oa]s?\s+à\s+confirmação|levantamento editorial|contato em validação|especialidade pendente|endereço a confirmar)/i.test(item.summary)
    ? ""
    : item.summary;

  const organization = organizationForProfessional(item);
  const locations = (item.locations ?? []).map((location) => ({
    ...location,
    phone: publicPhone(location.phone ?? ""),
    whatsapp: publicWhatsapp(location.whatsapp ?? ""),
  }));

  // Telefones de organizações conhecidas pertencem ao local. Estruturá-los aqui
  // evita que o mesmo número seja apresentado como contato pessoal do profissional.
  if (!locations.length && organization) {
    locations.push({
      name: organization.name,
      address: organization.address,
      phone: publicPhone(organization.phone),
      whatsapp: publicWhatsapp(organization.whatsapp ?? ""),
      mapUrl: organization.mapUrl,
      sourceUrl: organization.source,
    });
  }

  const phone = publicPhone(item.phone);
  const whatsapp = publicWhatsapp(item.whatsapp);
  // Um número sem indicação explícita de titularidade não é exposto como
  // pessoal. Quando há estabelecimento/consultório identificado, ele passa a
  // ser contato daquele local; sem local identificado, permanece oculto.
  if ((phone || whatsapp) && locations.length) {
    const [firstLocation, ...remainingLocations] = locations;
    locations.splice(0, locations.length, {
      ...firstLocation,
      phone: firstLocation.phone || phone,
      whatsapp: firstLocation.whatsapp || whatsapp,
    }, ...remainingLocations);
  } else if ((phone || whatsapp) && !locations.length) {
    const inferredLocation = locationFromOrganization(item, phone, whatsapp);
    if (inferredLocation) locations.push(inferredLocation);
  }

  return {
    ...visible,
    registration: publicRegistration(item.registration),
    organization: publicOrganization(item.organization),
    // A interface pública só expõe contatos com titularidade de local clara.
    // phone/whatsapp ficam vazios até haver confirmação de contato pessoal.
    phone: "",
    whatsapp: "",
    locations: locations.length ? locations : undefined,
    summary,
  };
}

export const publicProfessionals: Professional[] = professionalDirectory()
  .filter(isPublicProfessional)
  .map(publicProfessional);

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback.filter((item) => item.city === "Piumhi"
    && item.publicationStatus === "published"
    && Boolean(item.phone)
    && !/(endere[cç]o\s+(aguardando validação|a validar|a confirmar)|pendente|em revisão)/i.test(item.address));
}

export async function findPublishedOrganization(slug: string, fallback: Organization[] = organizations) {
  return (await publishedOrganizations(fallback)).find((item) => item.slug === slug) ?? null;
}

export async function findPublishedProfessional(slug: string, fallback?: Professional[]) {
  const item = professionalDirectory(fallback).find((candidate) => candidate.slug === slug && isPublicProfessional(candidate));
  return item ? publicProfessional(item) : null;
}
