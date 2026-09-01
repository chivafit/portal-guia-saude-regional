import type { Professional } from "../data";

/** Correções confirmadas durante a segunda sequência médica. */
const medicalSequenceOverrides: Record<string, Partial<Professional>> = {
  "dr-heraldo-francisco-costa-ginecologia-piumhi": {
    specialty: "Ginecologia e Diagnóstico por Imagem",
    registration: "CRM-MG 29065 · RQE 32753 · RQE 15642",
    organization: "Hospital Santa Casa de Piumhi — Praça Guia Lopes, 53 / Consultório — Praça Guia Lopes, 114, sala 101",
    source: "https://www.doctoralia.com.br/ginecologista/piumhi/centro110",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dr-jose-antonio-dias-dermatologia-piumhi": {
    specialty: "Dermatologia",
    registration: "CRM-MG 13709 · RQE 4898",
    organization: "Consultório particular — Praça Tuiuti, 114",
    source: "https://www.doctoralia.com.br/cirurgiao-geral/piumhi/piumhi2",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dr-saulo-rosa-ferreira-psiquiatria-piumhi": {
    registration: "CRM-MG 65312 · RQE 40931 · RQE 44169",
    organization: "Consultório particular — Praça Tuiuti, 114, sala 05, Centro",
    source: "https://www.doctoralia.com.br/saulo-rosa-ferreira/psiquiatra/bambui",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dr-hiago-antunis-silva-neurologia-piumhi": {
    registration: "CRM-MG 79845 · RQE 57649",
    organization: "GMS — Grupo Melhor Saúde — Rua Padre Abel, 191, Centro",
    source: "https://www.doctoralia.com.br/doencas/doencas-neuromusculares/piumhi",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
};

export function applyMedicalSequenceOverride(professional: Professional): Professional {
  const override = medicalSequenceOverrides[professional.slug];
  if (!override) return professional;
  const source = override.source ?? professional.source;
  return { ...professional, ...override, sourceUrls: source ? [source] : professional.sourceUrls };
}
