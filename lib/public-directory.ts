import { organizations, professionals, type Organization, type Professional } from "./data";

/**
 * Fonte pública do diretório para a edição estática hospedada no GitHub Pages.
 * Para publicar ou atualizar um perfil, a equipe edita lib/data.ts e envia a
 * alteração ao GitHub. Não há banco de dados ou servidor envolvidos.
 */
export async function publishedProfessionals(fallback: Professional[] = professionals) {
  return fallback.filter(isPublicProfessional).map(publicProfessional);
}

/**
 * Critério de exposição pública do diretório profissional.
 * A publicação é uma decisão editorial independente da procedência registrada
 * para cada dado; informações internas nunca aparecem como selo no site.
 */
export function isPublicProfessional(item: Professional) {
  return item.city === "Piumhi"
    && item.publicationStatus === "published"
    && Boolean(item.name && item.profession && item.specialty)
    && hasPublicContactRoute(item);
}

function digits(value?: string) {
  return (value ?? "").replace(/\D/g, "");
}

function normalized(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function hasKnownMaisSaudeContact(organization: string) {
  return /^Clínica Mais Saúde GMS\s+—\s+Rua Padre Abel, 191(?: e |\/)194, Centro$/i.test(organization.trim());
}

/**
 * Um perfil só é exposto quando a pessoa consegue iniciar um contato real:
 * pelo canal informado pelo próprio perfil ou pelo telefone público do local
 * de atendimento identificado. Isso impede que páginas incompletas sejam
 * indexadas como se possuíssem um contato disponível.
 */
function hasPublicContactRoute(item: Professional) {
  if (digits(item.phone).length >= 10 || digits(item.whatsapp).length >= 10) return true;
  if (hasKnownMaisSaudeContact(item.organization)) return true;

  const profileOrganization = normalized(item.organization);
  return organizations.some((organization) => (
    organization.city === item.city
    && digits(organization.phone).length >= 10
    && profileOrganization.includes(normalized(organization.name))
  ));
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

/**
 * Separa o inventário editorial do objeto serializado nas páginas públicas.
 * Assim, observações administrativas legadas não são enviadas ao navegador.
 */
export function publicProfessional(item: Professional): Professional {
  const { sourceUrls, lastVerifiedAt, updatedAt, claimed, ...visible } = item;
  const summary = /(a validar|aguardando validação|pendente|em revisão|a confirmar|sujeit[oa]s?\s+à\s+confirmação|levantamento editorial|contato em validação|especialidade pendente|endereço a confirmar)/i.test(item.summary)
    ? ""
    : item.summary;

  return {
    ...visible,
    registration: publicRegistration(item.registration),
    organization: publicOrganization(item.organization),
    summary,
  };
}

/** Lista estática que pode ser usada em componentes client-side sem expor rascunhos. */
export const publicProfessionals: Professional[] = professionals
  .filter(isPublicProfessional)
  .map(publicProfessional);

export async function publishedOrganizations(fallback: Organization[] = organizations) {
  return fallback.filter((item) => item.city === "Piumhi"
    && item.publicationStatus === "published"
    && Boolean(item.phone)
    // Nunca publicamos um estabelecimento quando o endereço ainda é um texto
    // administrativo. Isso evita enviar informação assumidamente incompleta ao Google.
    && !/(endere[cç]o\s+(aguardando validação|a validar|a confirmar)|pendente|em revisão)/i.test(item.address));
}

export async function findPublishedOrganization(slug: string, fallback: Organization[] = organizations) {
  return (await publishedOrganizations(fallback)).find((item) => item.slug === slug) ?? null;
}

export async function findPublishedProfessional(slug: string, fallback: Professional[] = professionals) {
  const item = fallback.find((candidate) => candidate.slug === slug && isPublicProfessional(candidate));
  return item ? publicProfessional(item) : null;
}
