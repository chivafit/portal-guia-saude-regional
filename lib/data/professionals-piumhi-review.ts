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
    slug: "maria-carolina-tome-moura-terapia-ocupacional-piumhi",
    name: "Maria Carolina Tomé Moura",
    profession: "Terapeuta Ocupacional",
    specialty: "Terapia Ocupacional",
    city: "Piumhi",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373",
    registration: "CREFITO 25560-TO",
    verified: false,
    summary: "",
    phone: "Contato a validar",
    whatsapp: "#",
    services: ["Terapia ocupacional", "Reabilitação"],
    source: "https://www.doctoralia.com.br/maria-carolina-tome-moura/terapeuta-ocupacional/piumhi",
    sourceUrls: ["https://www.doctoralia.com.br/maria-carolina-tome-moura/terapeuta-ocupacional/piumhi"],
    lastVerifiedAt: "2026-09-01",
    publicationStatus: "draft",
    verificationStatus: "needs-review",
    commercialStatus: "organic",
  },
];
