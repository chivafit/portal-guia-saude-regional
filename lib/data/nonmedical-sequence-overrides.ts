import type { Professional } from "../data";

/**
 * Correções editoriais da rodada de profissionais não médicos.
 * Os registros abaixo já existiam no inventário legado e foram confrontados
 * com páginas profissionais públicas atuais antes da exposição no diretório.
 */
const nonMedicalSequenceOverrides: Record<string, Partial<Professional>> = {
  "giovanna-oliveira-beraldo-fisioterapia-piumhi": {
    registration: "CREFITO-4 271949-F",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373",
    source: "https://www.doctoralia.com.br/giovanna-oliveira-beraldo/fisioterapeuta/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "marisa-de-fatima-ferreira-fisioterapia-piumhi": {
    registration: "CREFITO-4 28260F",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373",
    source: "https://www.doctoralia.com.br/marisa-de-fatima-ferreira/fisioterapeuta/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "julia-augusta-oliveira-lopes-fonoaudiologia-piumhi": {
    registration: "CRFa-6 10713",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373",
    source: "https://www.doctoralia.com.br/julia-augusta-de-oliveira-lopes/fonoaudiologo/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dra-wanessa-terra-nutricao-piumhi": {
    registration: "CRN-9 26985",
    specialty: "Nutrição Clínica",
    organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194, Centro",
    source: "https://www.doctoralia.com.br/wanessa-terra/nutricionista/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "philippe-andrade-nutricao-piumhi": {
    registration: "CRN-9 7718",
    specialty: "Nutrição Clínica e Esportiva",
    organization: "Clínica Objetiva — Rua Clodoaldo da Costa Lima, 115",
    source: "https://www.doctoralia.com.br/philippe-andrade/nutricionista/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "joao-paulo-soares-psicologia-piumhi": {
    registration: "CRP-MG 04/27280",
    organization: "Consultório particular — Rua Padre Abel, 126, sala 4",
    source: "https://www.doctoralia.com.br/joao-paulo-soares/psicologo/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "karina-honorio-psicologia-piumhi": {
    registration: "CRP-MG 04/35017",
    specialty: "Psicologia e Psicanálise",
    organization: "Consultório particular ou on-line — Piumhi/MG",
    source: "https://www.doctoralia.com.br/psicologo/piumhi/centro110",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "sandra-cristina-goncalves-psicologia-piumhi": {
    registration: "CRP-MG 04/10928",
    organization: "Consultório particular — Rua Conselheiro Lafaiete, 237",
    source: "https://www.doctoralia.com.br/sandra-cristina-goncalves/psicologo/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "jaine-reis-psicologia-piumhi": {
    registration: "CRP-MG 04/42401",
    organization: "Consultório particular — Rua Raul Soares, Piumhi",
    source: "https://www.doctoralia.com.br/servicos-de-tratamento/primeira-consulta-psicologia-2/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dra-renata-oliveira-prado-odontologia-piumhi": {
    name: "Dra. Renata Prado",
    specialty: "Odontologia Geral",
    registration: "CRO-MG 43619",
    organization: "Consultório Dra. Renata Oliveira — Rua Santo Antônio, 18, sala 5, Centro",
    source: "https://www.ident.com.br/dra.renataprado",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dra-ana-paula-soares-salviano-odontologia-piumhi": {
    registration: "CRO-MG 54872",
    organization: "ORTHOclínicas Piumhi — Rua Benedito Valadares, 92, Centro",
    phone: "(37) 99856-3333",
    source: "https://orthoclinicas.com/unidades/",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "official-source",
  },
  "dr-goncalo-da-rocha-rolla-odontologia-piumhi": {
    registration: "CRO-RS 14428",
    organization: "Consultório particular — Av. Nonoai, 1745, sala 9",
    source: "https://www.doctoralia.com.br/goncalo-da-rocha-rolla/dentista/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
  "dra-franceliz-moleta-odontologia-piumhi": {
    registration: "CRO-PR 17317",
    organization: "Consultório particular — Av. 7 de Setembro, 152",
    source: "https://www.doctoralia.com.br/franceliz-moleta/dentista/piumhi",
    verified: true,
    lastVerifiedAt: "2026-09-01",
    verificationStatus: "public-source",
  },
};

export function applyNonMedicalSequenceOverride(professional: Professional): Professional {
  const override = nonMedicalSequenceOverrides[professional.slug];
  if (!override) return professional;
  const source = override.source ?? professional.source;
  return { ...professional, ...override, sourceUrls: source ? [source] : professional.sourceUrls };
}
