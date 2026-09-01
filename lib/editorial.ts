import type { Professional } from "./data";

export type ProfessionalSourceType =
  | "official"
  | "cnes"
  | "professional-site"
  | "directory"
  | "maps";

export type ProfessionalDataQuality = {
  identity: boolean;
  registration: boolean;
  specialty: boolean;
  location: boolean;
  contact: boolean;
};

const REVIEW_TEXT = /(a validar|aguardando validação|pendente|em revisão|a confirmar|contato será validado|contato a validar)/i;

export function professionalDataQuality(item: Professional): ProfessionalDataQuality {
  return {
    identity: Boolean(item.name && item.profession && item.city),
    registration: Boolean(item.registration && !REVIEW_TEXT.test(item.registration)),
    specialty: Boolean(item.specialty && !REVIEW_TEXT.test(item.specialty)),
    location: Boolean(item.organization && !REVIEW_TEXT.test(item.organization)),
    contact: Boolean(item.phone && !REVIEW_TEXT.test(item.phone)),
  };
}

/**
 * Indica que o cadastro tem informação mínima para revisão editorial.
 * Esta função deliberadamente NÃO publica o perfil: publicationStatus continua
 * sendo uma decisão explícita da equipe.
 */
export function isReadyForEditorialReview(item: Professional) {
  const quality = professionalDataQuality(item);
  return item.city === "Piumhi"
    && quality.identity
    && quality.specialty
    && Boolean(item.sourceUrls?.length || item.source);
}

export function professionalEditorialIssues(item: Professional): string[] {
  const issues: string[] = [];
  const quality = professionalDataQuality(item);

  if (!quality.identity) issues.push("identidade incompleta");
  if (!quality.specialty) issues.push("especialidade incompleta");
  if (!quality.registration) issues.push("registro profissional pendente");
  if (!quality.location) issues.push("local de atendimento pendente");
  if (!quality.contact) issues.push("contato pendente");
  if (!(item.sourceUrls?.length || item.source)) issues.push("fonte ausente");

  return issues;
}
