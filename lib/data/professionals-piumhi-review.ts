import type { Professional } from "../data";

/**
 * Fila editorial de profissionais encontrados em novas rodadas de pesquisa.
 * Estes registros NÃO são importados pelo diretório público automaticamente.
 * Após conferência de identidade, conselho, especialidade e vínculo/local de
 * atendimento, o cadastro deve ser promovido para a base principal com
 * publicationStatus: "published".
 */
export const piumhiProfessionalsReviewQueue: Professional[] = [
  {
    slug: "dr-fagner-henrique-costa-urologia-piumhi",
    name: "Dr. Fagner Henrique Costa",
    profession: "Médico",
    specialty: "Urologia",
    city: "Piumhi",
    organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194",
    registration: "CRM-MG 101978",
    verified: false,
    summary: "",
    phone: "(37) 99935-8585",
    whatsapp: "#",
    services: ["Urologia"],
    source: "https://www.doctoralia.com.br/piumhi",
    sourceUrls: ["https://www.doctoralia.com.br/piumhi"],
    lastVerifiedAt: "2026-09-01",
    publicationStatus: "draft",
    verificationStatus: "needs-review",
    commercialStatus: "organic",
  },
];
