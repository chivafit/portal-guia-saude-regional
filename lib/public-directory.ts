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

function professionalDirectory(source: Professional[] = professionals) {
  const enriched = source
    .map(applyProfessionalOverride)
    .map(applyMedicalSequenceOverride)
    .map(applyNonMedicalSequenceOverride)
    .map((professional) => ({
      ...professional,
      imageUrl: resolveProfessionalImage(professional.slug, podcastImageForProfessional(professional.slug) ?? professional.imageUrl),
    }));

  const additions = source === professionals
    ? [...piumhiProfessionalAdditions, ...piumhiMedicalSequenceAdditions, ...piumhiOtorrinoAdditions, ...piumhiNonMedicalSequenceAdditions, ...podcastProfessionalAdditions]
        .map((professional) => ({
          ...professional,
          imageUrl: resolveProfessionalImage(professional.slug, podcastImageForProfessional(professional.slug) ?? professional.imageUrl),
        }))
    : [];

  const combined = source === professionals ? [...enriched, ...additions] : enriched;
  return Array.from(new Map(combined.map((item) => [item.slug, item])).values());
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
  return registration
    .replace(/\s*·\s*[^·]*(a validar|aguardando validação|pendente de confirmação|a confirmar)[^·]*/gi, "")
    .trim();
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

export function publicProfessional(item: Professional): Professional {
  const { sourceUrls, lastVerifiedAt, updatedAt, claimed, ...visible } = item;
  const summary = /(a validar|aguardando validação|pendente|em revisão|a confirmar|sujeit[oa]s?\s+à\s+confirmação|levantamento editorial|contato em validação|especialidade pendente|endereço a confirmar)/i.test(item.summary)
    ? ""
    : item.summary;

  return {
    ...visible,
    registration: publicRegistration(item.registration),
    organization: publicOrganization(item.organization),
    phone: publicPhone(item.phone),
    whatsapp: publicWhatsapp(item.whatsapp),
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
