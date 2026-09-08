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
    sourceUrls: ["https://clinicasdocoracao.com.br/", "https://www.doctoralia.com.br/everton-arantes-melo/cardiologista/piumhi"],
    organization: "Hospital Dia PHD — Praça Guia Lopes, 278, Centro",
    locations: [{
      name: "Hospital Dia PHD",
      address: "Praça Guia Lopes, 278, Centro",
      phone: "(37) 3412-0075",
      sourceUrl: "https://clinicasdocoracao.com.br/",
    }, {
      name: "Hospital Nossa Senhora do Brasil",
      address: "Rua Dr. Mário Campos, 80, Centro, Bambuí/MG",
      sourceUrl: "https://www.doctoralia.com.br/everton-arantes-melo/cardiologista/piumhi",
    }],
    phone: "",
    whatsapp: "",
    services: ["Cardiologia", "Ecocardiografia", "Eletrocardiograma", "Teste ergométrico", "Holter 24h", "MAPA 24h"],
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
    organization: "Clínica Ophtalmocenter — Praça Tuiuti, 160, 2º andar, Centro",
    locations: [
      {
        name: "Clínica Ophtalmocenter",
        address: "Praça Tuiuti, 160, 2º andar, Centro",
        phone: "(37) 3371-2626",
        sourceUrl: "https://www.doctoralia.com.br/paulo-henrique-faria-silva/oftalmologista/piumhi",
      },
      {
        name: "PHD Piumhi Hospital Dia",
        address: "Praça Guia Lopes, 278, sala 103, Centro",
        phone: "(37) 3412-0075",
        sourceUrl: "https://phdhospitaldia.com.br/portfolio-items/oftalmologia/",
      },
    ],
    phone: "",
    whatsapp: "",
    services: ["Consulta oftalmológica", "Catarata", "Cirurgia refrativa a laser", "Glaucoma", "Ceratocone", "Cirurgia plástica das pálpebras"],
    audience: ["Adultos", "Crianças"],
    education: "Graduado em Medicina pela UFMG, com residência médica em Oftalmologia pelo HGIP/IPSEMG e fellowships em Glaucoma e Catarata pela Santa Casa de Belo Horizonte.",
    confirmedAt: "setembro de 2026",
    source: "https://phdhospitaldia.com.br/portfolio-items/oftalmologia/",
    sourceUrls: ["https://www.doctoralia.com.br/paulo-henrique-faria-silva/oftalmologista/piumhi", "https://phdhospitaldia.com.br/portfolio-items/oftalmologia/"],
    lastVerifiedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    verificationStatus: "official-source",
  },
  "dr-diego-mota-fernandes-ortopedia-piumhi": {
    registration: "CRM-MG 63397",
    organization: "Clínica Médica e Odontológica Dr. Diego Mota — Praça Guia Lopes, 248, Centro",
    locations: [
      {
        name: "Clínica Médica e Odontológica Dr. Diego Mota",
        address: "Praça Guia Lopes, 248, Centro",
        phone: "(37) 99195-6439",
        sourceUrl: "https://drdiegoortopedista.com/",
      },
      {
        name: "PHD Piumhi Hospital Dia",
        address: "Praça Guia Lopes, 278, Centro",
        phone: "(37) 3412-0075",
        sourceUrl: "https://phdhospitaldia.com.br/tag/dr-diego-mota-fernandes/",
      },
    ],
    phone: "",
    whatsapp: "",
    summary: "Médico ortopedista com atendimento em Piumhi e participação no Podcast Conexão Saúde.",
    confirmedAt: "setembro de 2026",
    source: "https://drdiegoortopedista.com/",
    sourceUrls: ["https://drdiegoortopedista.com/", "https://phdhospitaldia.com.br/tag/dr-diego-mota-fernandes/", "https://www.youtube.com/watch?v=noazEavj3vY"],
    lastVerifiedAt: "2026-09-08",
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
  "dr-gilson-oliveira-implantodontia-piumhi": {
    name: "Dr. Gilson A. Oliveira",
    registration: "CRO-MG 26536",
    organization: "Clínica odontológica Dr. Gilson A. Oliveira — Rua Benedito Valadares, 41, Centro",
    phone: "",
    whatsapp: "",
    locations: [{
      name: "Clínica odontológica Dr. Gilson A. Oliveira",
      address: "Rua Benedito Valadares, 41, Centro",
      whatsapp: "https://wa.me/5537999468680",
      sourceUrl: "https://sites.google.com/view/drgilsonoliveirapiumhi/",
    }],
    services: ["Implantodontia", "Ortodontia"],
    source: "https://sites.google.com/view/drgilsonoliveirapiumhi/",
    sourceUrls: ["https://sites.google.com/view/drgilsonoliveirapiumhi/", "https://www.cylex.com.br/ortodontista-3.html"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "public-source",
  },
  "giuliano-souza-fisioterapia-piumhi": {
    registration: "CREFITO-MG 91680",
    organization: "Consultório Dr. Giuliano Souza — Rua Getúlio Vargas, 400, Centro",
    source: "https://www.doctoralia.com.br/giuliano-carlos-de-souza/fisioterapeuta/passos",
    sourceUrls: ["https://www.doctoralia.com.br/giuliano-carlos-de-souza/fisioterapeuta/passos"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "public-source",
  },
  "giovanna-oliveira-beraldo-fisioterapia-piumhi": {
    registration: "CREFITO-4 271949-F",
    source: "https://www.doctoralia.com.br/giovanna-oliveira-beraldo/fisioterapeuta/piumhi",
    sourceUrls: ["https://www.doctoralia.com.br/giovanna-oliveira-beraldo/fisioterapeuta/piumhi"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "public-source",
  },
  "marisa-de-fatima-ferreira-fisioterapia-piumhi": {
    registration: "CREFITO-4 28260-F",
    organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373, Centro",
    summary: "Fisioterapeuta, diretora da APAE de Piumhi e fundadora da Borboletando Clínica Multidisciplinar de Reabilitação.",
    source: "https://www.piumhi.mg.leg.br/institucional/noticias/camara-municipal-de-piumhi-entrega-mocoes-de-congratulacoes-e-aplausos-na-40a-sessao-ordinaria",
    sourceUrls: ["https://www.piumhi.mg.leg.br/institucional/noticias/camara-municipal-de-piumhi-entrega-mocoes-de-congratulacoes-e-aplausos-na-40a-sessao-ordinaria", "https://www.doctoralia.com.br/fisioterapeuta/piumhi"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "official-source",
  },
  "ivana-mara-de-oliveira-rezende-fisioterapia-piumhi": {
    registration: "",
    organization: "Pulmocárdio e Centro de Fisioterapia Respiratória Itamar Soares dos Santos — Piumhi/MG",
    summary: "Fisioterapeuta cardiorrespiratória e de terapia intensiva; coordena a Pulmocárdio e o Centro de Fisioterapia Respiratória Itamar Soares dos Santos em Piumhi.",
    education: "Especialista em Fisioterapia Cardiorrespiratória e Terapia Intensiva e mestre em Ciências da Reabilitação pela UFMG.",
    source: "https://www.piumhi.mg.leg.br/institucional/noticias/camara-municipal-de-piumhi-entrega-mocoes-de-congratulacoes-e-aplausos-na-40a-sessao-ordinaria",
    sourceUrls: ["https://www.piumhi.mg.leg.br/institucional/noticias/camara-municipal-de-piumhi-entrega-mocoes-de-congratulacoes-e-aplausos-na-40a-sessao-ordinaria", "https://sapl.piumhi.mg.leg.br/media/sapl/public/materialegislativa/2022/4341/2022-05-27_pdl_002_trofeu_prof_dest_saude_2022.pdf"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "needs-review",
  },
  "joao-paulo-soares-psicologia-piumhi": {
    registration: "CRP-MG 04/27280",
    organization: "Consultório de Psicologia João Paulo Soares — Rua Padre Abel, 774, sala 01, Centro",
    phone: "",
    whatsapp: "",
    locations: [{
      name: "Consultório de Psicologia João Paulo Soares",
      address: "Rua Padre Abel, 774, sala 01, Centro",
      phone: "(37) 99944-3666",
      sourceUrl: "https://br.todosnegocios.com/pt/jo%C3%A3o-paulo-soares-psic%C3%B3logo_12-37-99944-3666",
    }],
    source: "https://br.todosnegocios.com/pt/jo%C3%A3o-paulo-soares-psic%C3%B3logo_12-37-99944-3666",
    sourceUrls: ["https://br.todosnegocios.com/pt/jo%C3%A3o-paulo-soares-psic%C3%B3logo_12-37-99944-3666", "https://www.doctoralia.com.br/psicologo/piumhi/piumhi2"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "public-source",
  },
  "jaine-reis-psicologia-piumhi": {
    registration: "CRP-MG 04/42401",
    organization: "Consultório Jaíne Reis — Rua Tereza Hostalácio, 47, Centro",
    phone: "",
    whatsapp: "",
    locations: [{
      name: "Consultório Jaíne Reis",
      address: "Rua Tereza Hostalácio, 47, Centro",
      whatsapp: "https://wa.me/5537998838771",
      sourceUrl: "https://www.emdr.org.br/certificados",
    }],
    audience: ["Adolescentes", "Adultos"],
    summary: "Psicóloga clínica e psicoterapeuta EMDR, com atendimento presencial e on-line em Piumhi.",
    source: "https://www.emdr.org.br/certificados",
    sourceUrls: ["https://www.emdr.org.br/certificados", "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=3151500455458"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "official-source",
  },
  "clarissa-freitas-psicologia-piumhi": {
    registration: "CRP-MG 04/26302",
    source: "https://www.doctoralia.com.br/psicologo/piumhi/piumhi2",
    sourceUrls: ["https://www.doctoralia.com.br/psicologo/piumhi/piumhi2"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "public-source",
  },
  "dra-simone-mota-bonisson-endocrinologia-piumhi": {
    organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro",
    locations: [{
      name: "PHD Piumhi Hospital Dia",
      address: "Praça Guia Lopes, 278, Centro",
      phone: "(37) 3412-0075",
      sourceUrl: "https://phdhospitaldia.com.br/",
    }],
    sourceUrls: ["https://www.doctoralia.com.br/simone-mota-bonisson/endocrinologista/juiz-de-fora", "https://phdhospitaldia.com.br/"],
    lastVerifiedAt: "2026-09-08",
    verificationStatus: "public-source",
  },
  // Conselho não confirmado: os perfis permanecem publicados por fonte de
  // identidade/atendimento, mas sem número e com revisão editorial pendente.
  "dr-nicollas-nunes-rabelo-neurologia-neurocirurgia-piumhi": { verificationStatus: "needs-review", registration: "" },
  "patricia-terra-odontologia-piumhi": { verificationStatus: "needs-review", registration: "" },
  "rodrigo-soares-costa-radiologia-piumhi": { verificationStatus: "needs-review", registration: "" },
  "livia-pereira-implantodontia-piumhi": { verificationStatus: "needs-review", registration: "" },
  "daniela-melo-farmacia-piumhi": { verificationStatus: "needs-review", registration: "" },
  "cintia-bonisson-psicanalise-piumhi": { verificationStatus: "needs-review", registration: "" },
  "dra-larissa-vaz-ginecologia-piumhi": { verificationStatus: "needs-review", registration: "" },
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
