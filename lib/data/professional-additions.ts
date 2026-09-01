import type { Professional } from "../data";

/**
 * Profissionais novos com evidência pública atual suficiente para publicação.
 * A lista é mantida separada do inventário legado para facilitar auditoria e
 * futuras revisões de fonte, registro e local de atendimento.
 */
export const piumhiProfessionalAdditions: Professional[] = [
  {
    slug: "maria-carolina-tome-moura-terapia-ocupacional-piumhi",
    name: "Maria Carolina Tomé Moura",
    profession: "Terapeuta Ocupacional",
    specialty: "Terapia Ocupacional",
    city: "Piumhi",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373",
    registration: "CREFITO 25560-TO",
    verified: true,
    summary: "",
    phone: "Contato a validar",
    whatsapp: "#",
    services: ["Terapia ocupacional", "Reabilitação"],
    source: "https://www.doctoralia.com.br/maria-carolina-tome-moura/terapeuta-ocupacional/piumhi",
    sourceUrls: ["https://www.doctoralia.com.br/maria-carolina-tome-moura/terapeuta-ocupacional/piumhi"],
    lastVerifiedAt: "2026-09-01",
    publicationStatus: "published",
    verificationStatus: "public-source",
    commercialStatus: "organic",
  },
  {
    slug: "katia-aparecida-soares-enfermagem-piumhi",
    name: "Kátia Aparecida Soares",
    profession: "Enfermeiro",
    specialty: "Enfermagem",
    city: "Piumhi",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373",
    registration: "COREN 325106-ENF",
    verified: true,
    summary: "",
    phone: "Contato a validar",
    whatsapp: "#",
    services: ["Enfermagem", "Atenção em saúde"],
    source: "https://www.doctoralia.com.br/piumhi/centro110?page=3",
    sourceUrls: [
      "https://www.doctoralia.com.br/piumhi/centro110?page=3",
      "https://www.piumhi.mg.leg.br/institucional/noticias/2018brilhante-mulheres-20262019"
    ],
    lastVerifiedAt: "2026-09-01",
    publicationStatus: "published",
    verificationStatus: "public-source",
    commercialStatus: "organic",
  },
  {
    slug: "dr-christopher-goncalves-clinica-medica-piumhi",
    name: "Dr. Christopher Gonçalves",
    profession: "Médico",
    specialty: "Clínica Geral",
    city: "Piumhi",
    organization: "Atendimento em Piumhi — Rua Conselheiro Lafaiete",
    registration: "CRM-MG 89376",
    verified: true,
    summary: "",
    phone: "Contato a validar",
    whatsapp: "#",
    services: ["Consulta clínica", "Acompanhamento geral"],
    source: "https://www.doctoralia.com.br/doencas/hipotireoidismo/piumhi",
    sourceUrls: ["https://www.doctoralia.com.br/doencas/hipotireoidismo/piumhi"],
    lastVerifiedAt: "2026-09-01",
    publicationStatus: "published",
    verificationStatus: "public-source",
    commercialStatus: "organic",
  },
];
