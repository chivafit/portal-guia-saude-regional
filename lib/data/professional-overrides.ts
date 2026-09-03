import type { Professional } from "../data";

/**
 * Correções editoriais sobre registros legados de lib/data.ts.
 * Mantemos o inventário histórico intacto e aplicamos aqui somente dados
 * conferidos em fontes públicas atuais antes de montar o diretório público.
 */
export const professionalOverrides: Record<string, Partial<Professional>> = {
  "dr-rui-manuel-dos-prazeres-xavier-ginecologia-piumhi": {
    publicationStatus: "inactive",
    verificationStatus: "official-source",
    lastVerifiedAt: "2026-09-01",
  },
  "dr-elton-henrique-alves-cardiologia-piumhi": {
    registration: "CRM-MG 40735 · RQE 30651 · RQE 37610",
    source: "https://www.doctoralia.com.br/piumhi",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dr-everton-arantes-melo-cardiologia-piumhi": {
    registration: "CRM-MG 50784 · RQE 35385 · RQE 47096",
    source: "https://clinicasdocoracao.com.br/",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "official-source",
  },
  "dr-gabriel-wobeto-clinica-medica-piumhi": {
    specialty: "Medicina de Família e Comunidade",
    organization: "Consultório particular — Rua Armando Viotti, 190, 3º andar",
    registration: "CRM-MG 52960 · RQE 36474",
    source: "https://www.doctoralia.com.br/doencas/hipotireoidismo/piumhi",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dr-wagner-de-oliveira-dornela-pediatria-piumhi": {
    specialty: "Pediatria e Diagnóstico por Imagem",
    registration: "CRM-MG 50683 · RQE 27434 · RQE 39775",
    source: "https://www.doctoralia.com.br/piumhi/centro110?page=3",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dr-paulo-henrique-faria-silva-oftalmologia-piumhi": {
    registration: "CRM-MG 44048",
    organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro",
    phone: "(37) 3412-0075",
    whatsapp: "",
    services: ["Consulta oftalmológica", "Catarata", "Cirurgia refrativa a laser", "Glaucoma", "Ceratocone", "Cirurgia plástica das pálpebras"],
    audience: ["Adultos", "Crianças"],
    education: "Graduado em Medicina pela UFMG, com residência médica em Oftalmologia pelo HGIP/IPSEMG e fellowships em Glaucoma e Catarata pela Santa Casa de Belo Horizonte.",
    confirmedAt: "setembro de 2026",
    source: "https://phdhospitaldia.com.br/portfolio-items/oftalmologia/",
    sourceUrls: ["https://phdhospitaldia.com.br/portfolio-items/oftalmologia/"],
    lastVerifiedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    verificationStatus: "official-source",
  },
  "dr-diego-mota-fernandes-ortopedia-piumhi": {
    summary: "Médico ortopedista e participante do Podcast Conexão Saúde, com conteúdo publicado pelo Guia Saúde sobre terapia regenerativa no tratamento de lesões.",
    confirmedAt: "setembro de 2026",
    sourceUrls: ["https://www.youtube.com/watch?v=noazEavj3vY"],
    lastVerifiedAt: "2026-09-03",
    verificationStatus: "public-source",
  },
  "dra-mirian-sansoni-oftalmologia-piumhi": {
    registration: "CRM-MG 82449 · RQE 51983",
    organization: "Clínica São Judas Tadeu — Rua Armando Viotti, 190, sala 103, Centro",
    source: "https://www.doctoralia.com.br/mirian-sansoni/oftalmologista/piumhi",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "adenilson-leandro-ortodontia-piumhi": {
    specialty: "Ortodontia e Ortopedia Facial",
    registration: "CRO-MG 23264",
    source: "https://www.doctoralia.com.br/adenilson-leandro/dentista/piumhi",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dra-ludimila-souza-endocrinologia-piumhi": {
    name: "Dra. Ludimila Souza e Silva",
    registration: "CRM-MG 58614 · RQE 52648",
    source: "https://www.doctoralia.com.br/ludimila-souza-e-silva/endocrinologista/piumhi",
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "jaqueline-viana-modesto-psicologia-piumhi": {
    registration: "CRP-MG 14050",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "cristina-sansoni-psicologia-piumhi": {
    registration: "CRP-MG 04/33840",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "amanda-morais-psicologia-piumhi": {
    registration: "CRP-MG 04/33792",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "kelly-cristina-do-prado-psicologia-piumhi": {
    name: "Kelly C. do Prado",
    registration: "CRP-MG 39635",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "erika-costa-psicologia-piumhi": {
    registration: "CRP-MG 32685",
    source: "https://www.doctoralia.com.br/piumhi/centro110?page=2",
    lastVerifiedAt: "2026-09-01",
  },
  "sandra-siris-faria-psicologia-piumhi": {
    registration: "CRP-MG 4374",
    source: "https://www.doctoralia.com.br/servicos-de-tratamento/psicoterapia/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "debora-araujo-sulzbacher-psicologia-piumhi": {
    registration: "CRP-MG 04/45238",
    source: "https://www.doctoralia.com.br/servicos-de-tratamento/orientacao-profissional/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "maria-isabel-de-melo-psicologia-piumhi": {
    registration: "CRP-MG 04/3812",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "jaqueline-dias-silva-psicologia-piumhi": {
    registration: "CRP-MG 04/31895",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "elisangela-lima-psicologia-piumhi": {
    registration: "CRP-MG 04/31282",
    source: "https://www.doctoralia.com.br/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
  "clarissa-freitas-psicologia-piumhi": {
    registration: "CRP-MG 04/26302",
    source: "https://www.doctoralia.com.br/clarissa-freitas/psicologo/piumhi",
    lastVerifiedAt: "2026-09-01",
  },
};

export function applyProfessionalOverride(professional: Professional): Professional {
  const override = professionalOverrides[professional.slug];
  if (!override) return professional;

  const source = override.source ?? professional.source;
  return {
    ...professional,
    ...override,
    sourceUrls: override.sourceUrls ?? (source ? [source] : professional.sourceUrls),
  };
}
