import type { Professional } from "../data";

/** Novos profissionais não médicos com fonte pública atual suficiente para publicação. */
export const piumhiNonMedicalSequenceAdditions: Professional[] = [
  {
    slug: "talitha-cristina-da-silva-psicologia-piumhi",
    name: "Talitha Cristina da Silva",
    profession: "Psicólogo",
    specialty: "Psicologia",
    city: "Piumhi",
    organization: "Consultório — Rua Lavras, 292, sala 03, Lagoa de Trás",
    registration: "CRP-MG 04/30247",
    verified: true,
    summary: "",
    phone: "(37) 99841-9899",
    whatsapp: "",
    services: ["Psicologia", "Avaliação psicológica"],
    source: "https://www.gov.br/pf/pt-br/assuntos/armas/psicologos/psicologos-crediciados/minas-gerais",
    sourceUrls: ["https://www.gov.br/pf/pt-br/assuntos/armas/psicologos/psicologos-crediciados/minas-gerais"],
    lastVerifiedAt: "2026-09-01",
    publicationStatus: "published",
    verificationStatus: "official-source",
    commercialStatus: "organic",
  },
];
