import { resolveProfessionalImage } from "./avatars";

export type Professional = {
  slug: string;
  name: string;
  profession: string;
  specialty: string;
  city: string;
  organization: string;
  registration: string;
  verified: boolean;
  summary: string;
  /** Conteúdo informado pelo profissional; exibido apenas quando confirmado editorialmente. */
  audience?: string[];
  education?: string;
  insuranceInfo?: string;
  website?: string;
  instagram?: string;
  confirmedAt?: string;
  phone: string;
  whatsapp: string;
  services: string[];
  imageUrl?: string;
  coverImageUrl?: string;
  logoUrl?: string;
  source?: string;
  /** Dados editoriais internos. Nunca devem aparecer como selos técnicos na página pública. */
  sourceUrls?: string[];
  lastVerifiedAt?: string;
  updatedAt?: string;
  publicationStatus?: "draft" | "published" | "inactive" | "removed";
  verificationStatus?: "public-source" | "official-source" | "direct-confirmation" | "needs-review";
  commercialStatus?: "organic" | "partner" | "sponsored";
  /** Destaque comercial/editorial exibido com identificação clara no diretório. */
  featured?: boolean;
  claimed?: boolean;
};

export type Organization = {
  slug: string;
  name: string;
  category: string;
  /** Chave estável usada por filtros e URLs. Nunca exibir diretamente. */
  categoryKey?: string;
  subcategories?: string[];
  keywords?: string[];
  city: string;
  address: string;
  phone: string;
  whatsapp?: string;
  summary: string;
  services: string[];
  logoUrl?: string;
  coverImageUrl?: string;
  source?: string;
  sourceUrls?: string[];
  lastVerifiedAt?: string;
  updatedAt?: string;
  neighborhood?: string;
  state?: string;
  postalCode?: string;
  website?: string;
  instagram?: string;
  mapUrl?: string;
  publicationStatus?: "draft" | "published" | "inactive";
  /** Classificação editorial interna; nunca é exibida como selo público. */
  verificationStatus?: "public-source" | "official-source" | "direct-confirmation";
  relationship?: "organic" | "partner" | "sponsored";
  featured?: boolean;
  sponsored?: boolean;
  displayOrder?: number;
};

// Dados exclusivamente demonstrativos. Não representam pessoas reais.
const baseProfessionals: Professional[] = [
  {
    slug: "dra-helena-martins-cardiologia-piumhi",
    name: "Dra. Helena Martins",
    profession: "Médico",
    specialty: "Cardiologia",
    city: "Piumhi",
    organization: "Clínica Coração da Serra",
    registration: "CRM-MG 000000 · RQE 00000",
    verified: true,
    summary: "Cardiologista fictícia cadastrada para demonstração do portal. Perfil completo com apresentação profissional, áreas de atuação, local de atendimento, contato e imagens substituíveis.",
    phone: "(37) 99999-0000",
    whatsapp: "https://wa.me/5537999990000",
    services: ["Consulta cardiológica", "Check-up preventivo", "Hipertensão", "Risco cardiovascular", "Acompanhamento clínico"],
    imageUrl: "/generated/dra-helena-martins.png",
    coverImageUrl: "/generated/health-portal-hero-clinic.png",
    logoUrl: "/placeholders/company-logo.svg",
  },
  {
    slug: "perfil-demonstrativo-cardiologia-piumhi",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Cardiologia",
    city: "Piumhi",
    organization: "Clínica demonstrativa regional",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Exemplo de como serão apresentadas formação, atuação profissional, fontes e locais de atendimento.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Consulta cardiológica", "Avaliação preventiva", "Acompanhamento clínico"],
  },
  {
    slug: "perfil-demonstrativo-odontologia-capitolio",
    name: "Perfil demonstrativo",
    profession: "Dentista",
    specialty: "Odontologia geral",
    city: "Capitólio",
    organization: "Consultório demonstrativo",
    registration: "CRO-MG · aguardando validação",
    verified: false,
    summary: "Modelo de perfil para profissionais da odontologia e suas áreas declaradas de atendimento.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação odontológica", "Prevenção", "Saúde bucal"],
  },
  {
    slug: "perfil-demonstrativo-psicologia-arcos",
    name: "Perfil demonstrativo",
    profession: "Psicólogo",
    specialty: "Psicologia clínica",
    city: "Arcos",
    organization: "Espaço demonstrativo de saúde",
    registration: "CRP-MG · aguardando validação",
    verified: false,
    summary: "Modelo de apresentação de atendimento presencial ou online, abordagem e público atendido.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Atendimento individual", "Atendimento online", "Orientação psicológica"],
  },
  {
    slug: "perfil-demonstrativo-fisioterapia-campo-belo",
    name: "Perfil demonstrativo",
    profession: "Fisioterapeuta",
    specialty: "Fisioterapia",
    city: "Campo Belo",
    organization: "Centro demonstrativo de reabilitação",
    registration: "CREFITO · aguardando validação",
    verified: false,
    summary: "Exemplo para serviços de reabilitação, prevenção e acompanhamento fisioterapêutico.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação funcional", "Reabilitação", "Prevenção de lesões"],
  },
  {
    slug: "perfil-demonstrativo-nutricao-bambui",
    name: "Perfil demonstrativo",
    profession: "Nutricionista",
    specialty: "Nutrição clínica",
    city: "Bambuí",
    organization: "Clínica demonstrativa",
    registration: "CRN · aguardando validação",
    verified: false,
    summary: "Modelo para descrever áreas de atuação, público atendido e modalidades de consulta.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação nutricional", "Acompanhamento", "Educação alimentar"],
  },
  {
    slug: "perfil-demonstrativo-pediatria-pimenta",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Pediatria",
    city: "Pimenta",
    organization: "Consultório demonstrativo infantil",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Modelo para apresentar atendimento infantil, prevenção, acompanhamento de crescimento e orientação familiar.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Consulta pediátrica", "Puericultura", "Orientação preventiva"],
  },
  {
    slug: "perfil-demonstrativo-dermatologia-arcos",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Dermatologia",
    city: "Arcos",
    organization: "Clínica demonstrativa de pele",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Exemplo de perfil para áreas clínicas, procedimentos e acompanhamento dermatológico.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação dermatológica", "Prevenção", "Acompanhamento clínico"],
  },
  {
    slug: "perfil-demonstrativo-ortopedia-campo-belo",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Ortopedia",
    city: "Campo Belo",
    organization: "Centro demonstrativo de especialidades",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Modelo para apresentar avaliação de dores, lesões, acompanhamento e encaminhamentos.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação ortopédica", "Lesões esportivas", "Dor crônica"],
  },
  {
    slug: "perfil-demonstrativo-ginecologia-piumhi",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Ginecologia",
    city: "Piumhi",
    organization: "Espaço demonstrativo de saúde da mulher",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Exemplo de perfil para saúde da mulher, prevenção, acompanhamento e orientação clínica.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Consulta ginecológica", "Prevenção", "Saúde da mulher"],
  },
  {
    slug: "perfil-demonstrativo-endocrinologia-bambui",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Endocrinologia",
    city: "Bambuí",
    organization: "Clínica demonstrativa metabólica",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Modelo de perfil para cuidados metabólicos, diabetes, tireoide e acompanhamento longitudinal.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Diabetes", "Tireoide", "Acompanhamento metabólico"],
  },
  {
    slug: "perfil-demonstrativo-odontopediatria-pimenta",
    name: "Perfil demonstrativo",
    profession: "Dentista",
    specialty: "Odontopediatria",
    city: "Pimenta",
    organization: "Consultório demonstrativo odontológico",
    registration: "CRO-MG · aguardando validação",
    verified: false,
    summary: "Modelo para apresentar atendimento odontológico infantil e orientação preventiva para famílias.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Saúde bucal infantil", "Prevenção", "Acompanhamento"],
  },
  {
    slug: "perfil-demonstrativo-implantodontia-capitolio",
    name: "Perfil demonstrativo",
    profession: "Dentista",
    specialty: "Implantodontia",
    city: "Capitólio",
    organization: "Consultório demonstrativo de reabilitação oral",
    registration: "CRO-MG · aguardando validação",
    verified: false,
    summary: "Exemplo para perfis de reabilitação oral, implantes e planejamento odontológico.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Implantes", "Reabilitação oral", "Planejamento"],
  },
  {
    slug: "perfil-demonstrativo-fonoaudiologia-sao-roque",
    name: "Perfil demonstrativo",
    profession: "Fonoaudiólogo",
    specialty: "Fonoaudiologia",
    city: "São Roque de Minas",
    organization: "Espaço demonstrativo de terapias",
    registration: "CRFa · aguardando validação",
    verified: false,
    summary: "Modelo para apresentar avaliação, comunicação, voz, linguagem e acompanhamento terapêutico.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação fonoaudiológica", "Linguagem", "Voz"],
  },
  {
    slug: "perfil-demonstrativo-enfermagem-piumhi",
    name: "Perfil demonstrativo",
    profession: "Enfermeiro",
    specialty: "Enfermagem",
    city: "Piumhi",
    organization: "Serviço demonstrativo de cuidado",
    registration: "COREN-MG · aguardando validação",
    verified: false,
    summary: "Modelo para profissionais de enfermagem, orientação, prevenção e cuidados domiciliares quando aplicável.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Orientação em saúde", "Prevenção", "Cuidados domiciliares"],
  },
  {
    slug: "perfil-demonstrativo-odontologia-piumhi",
    name: "Perfil demonstrativo",
    profession: "Dentista",
    specialty: "Odontologia geral",
    city: "Piumhi",
    organization: "Consultório odontológico demonstrativo",
    registration: "CRO-MG · aguardando validação",
    verified: false,
    summary: "Modelo visual para futuros dentistas de Piumhi, com foto, serviços, registro e contato substituíveis após validação.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação odontológica", "Prevenção", "Saúde bucal"],
    imageUrl: "/placeholders/professional-photo.svg",
    coverImageUrl: "/placeholders/clinic-cover.svg",
  },
  {
    slug: "perfil-demonstrativo-psicologia-piumhi",
    name: "Perfil demonstrativo",
    profession: "Psicólogo",
    specialty: "Psicologia clínica",
    city: "Piumhi",
    organization: "Espaço terapêutico demonstrativo",
    registration: "CRP-MG · aguardando validação",
    verified: false,
    summary: "Modelo visual para psicólogos de Piumhi, mantendo dados sensíveis e identidade profissional pendentes de confirmação.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Atendimento individual", "Saúde mental", "Orientação psicológica"],
    imageUrl: "/placeholders/professional-photo.svg",
    coverImageUrl: "/placeholders/clinic-cover.svg",
  },
  {
    slug: "perfil-demonstrativo-fisioterapia-piumhi",
    name: "Perfil demonstrativo",
    profession: "Fisioterapeuta",
    specialty: "Fisioterapia",
    city: "Piumhi",
    organization: "Centro de reabilitação demonstrativo",
    registration: "CREFITO · aguardando validação",
    verified: false,
    summary: "Modelo visual para profissionais de fisioterapia, reabilitação, pilates e prevenção de lesões em Piumhi.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Reabilitação", "Pilates", "Avaliação funcional"],
    imageUrl: "/placeholders/professional-photo.svg",
    coverImageUrl: "/placeholders/clinic-cover.svg",
  },
  {
    slug: "perfil-demonstrativo-nutricao-piumhi",
    name: "Perfil demonstrativo",
    profession: "Nutricionista",
    specialty: "Nutrição clínica",
    city: "Piumhi",
    organization: "Consultório nutricional demonstrativo",
    registration: "CRN · aguardando validação",
    verified: false,
    summary: "Modelo visual para nutricionistas de Piumhi, com áreas, serviços e canais de contato prontos para substituição.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Avaliação nutricional", "Educação alimentar", "Acompanhamento"],
    imageUrl: "/placeholders/professional-photo.svg",
    coverImageUrl: "/placeholders/clinic-cover.svg",
  },
  {
    slug: "perfil-demonstrativo-pediatria-piumhi",
    name: "Perfil demonstrativo",
    profession: "Médico",
    specialty: "Pediatria",
    city: "Piumhi",
    organization: "Consultório infantil demonstrativo",
    registration: "CRM-MG · aguardando validação",
    verified: false,
    summary: "Modelo visual para pediatras de Piumhi, preparado para exibir formação, registro, local e contato após revisão.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Consulta pediátrica", "Puericultura", "Orientação preventiva"],
    imageUrl: "/placeholders/professional-photo.svg",
    coverImageUrl: "/placeholders/clinic-cover.svg",
  },
  {
    slug: "perfil-demonstrativo-educacao-fisica-arcos",
    name: "Perfil demonstrativo",
    profession: "Educador físico",
    specialty: "Atividade física e saúde",
    city: "Arcos",
    organization: "Studio demonstrativo de saúde",
    registration: "CREF · aguardando validação",
    verified: false,
    summary: "Exemplo para profissionais de atividade física, prevenção, condicionamento e qualidade de vida.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Treinamento personalizado", "Condicionamento", "Prevenção"],
  },
  {
    slug: "perfil-demonstrativo-farmacia-clinica-campo-belo",
    name: "Perfil demonstrativo",
    profession: "Farmacêutico",
    specialty: "Farmácia clínica",
    city: "Campo Belo",
    organization: "Serviço demonstrativo farmacêutico",
    registration: "CRF-MG · aguardando validação",
    verified: false,
    summary: "Modelo para orientação farmacêutica, acompanhamento e educação em saúde.",
    phone: "Contato será validado",
    whatsapp: "#",
    services: ["Orientação farmacêutica", "Educação em saúde", "Acompanhamento"],
  },
];

const supplementalProfessionals: Professional[] = [
  ...["Capitólio", "Pimenta", "Arcos", "Formiga", "Campo Belo", "Bambuí", "São Roque de Minas"].flatMap((city) => {
    const slugCity = city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    return [
      ["Médico", "Clínica médica", "CRM-MG", "Consulta clínica", "Prevenção", "Acompanhamento"],
      ["Dentista", "Odontologia geral", "CRO-MG", "Avaliação odontológica", "Prevenção", "Saúde bucal"],
      ["Psicólogo", "Psicologia clínica", "CRP-MG", "Atendimento individual", "Saúde mental", "Orientação"],
      ["Fisioterapeuta", "Fisioterapia", "CREFITO", "Reabilitação", "Pilates", "Avaliação funcional"],
      ["Nutricionista", "Nutrição clínica", "CRN", "Avaliação nutricional", "Educação alimentar", "Acompanhamento"],
      ["Médico", "Pediatria", "CRM-MG", "Consulta pediátrica", "Puericultura", "Orientação preventiva"],
    ].map(([profession, specialty, council, ...services]) => ({
      slug: `perfil-demonstrativo-${specialty.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}-${slugCity}`,
      name: "Perfil demonstrativo",
      profession,
      specialty,
      city,
      organization: `Serviço demonstrativo de ${city}`,
      registration: `${council} · aguardando validação`,
      verified: false,
      summary: `Modelo visual para futuros cadastros de ${specialty.toLowerCase()} em ${city}, com foto, registro, serviços e contato substituíveis após validação.`,
      phone: "Contato será validado",
      whatsapp: "#",
      services,
      imageUrl: "/placeholders/professional-photo.svg",
      coverImageUrl: "/placeholders/clinic-cover.svg",
    }));
  }),
];

// Profissionais REAIS de Piumhi importados de diretórios públicos (25/07/2026).
// Status "Em validação" (verified:false): nome e área vêm da fonte; registro no
// conselho (CRM/CRO) e contato NÃO foram confirmados — ficam "aguardando validação".
// Não publicar como definitivo sem validar contato/registro e consentimento.
const piumhiImportedProfessionals: Professional[] = [
  { slug: "dr-wallace-costa-mota-clinica-medica-piumhi", name: "Dr. Wallace Costa Mota", profession: "Médico", specialty: "Clínica Médica", city: "Piumhi", organization: "Consultório Dr. Wallace Costa Mota — Rua Armando Viotti, 7, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Clínica médica", "Cirurgia geral"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-gabriel-wobeto-clinica-medica-piumhi", name: "Dr. Gabriel Wobeto", profession: "Médico", specialty: "Clínica Médica", city: "Piumhi", organization: "Clínica São Rafael (Unimed) — Praça Guia Lopes, 248, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Clínica médica", "Medicina de família e comunidade"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-paulo-henrique-faria-silva-oftalmologia-piumhi", name: "Dr. Paulo Henrique Faria Silva", profession: "Médico", specialty: "Oftalmologia", city: "Piumhi", organization: "Clínica Ophtalmocenter — Praça Tuiuti, 160, 2º andar, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Consulta oftalmológica", "Saúde ocular"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-diego-mota-fernandes-ortopedia-piumhi", name: "Dr. Diego Mota Fernandes", profession: "Médico", specialty: "Ortopedia e Traumatologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Ortopedia", "Traumatologia", "Cirurgia do ombro"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-wenner-terra-freitas-otorrino-piumhi", name: "Dr. Wenner Terra Freitas", profession: "Médico", specialty: "Otorrinolaringologia", city: "Piumhi", organization: "Vitalcentro Especialidades Médicas — Praça Tuiuti, 160, 2º andar, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Otorrinolaringologia", "Ouvido, nariz e garganta"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-elton-henrique-alves-cardiologia-piumhi", name: "Dr. Elton Henrique Alves", profession: "Médico", specialty: "Cardiologia", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 114, sala 102, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Cardiologia", "Medicina intensiva"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-everton-arantes-melo-cardiologia-piumhi", name: "Dr. Éverton Arantes Melo", profession: "Médico", specialty: "Cardiologia", city: "Piumhi", organization: "Clínica do Coração — Rua Armando Viotti, 190, salas 103 e 104, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Cardiologia", "Cirurgia cardiovascular"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dra-wanessa-dornela-de-oliveira-otorrino-piumhi", name: "Dra. Wanessa Dornela de Oliveira", profession: "Médico", specialty: "Otorrinolaringologia", city: "Piumhi", organization: "Clínica Salutare — Rua Padre Abel, 126, 2º andar, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Otorrinolaringologia"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-wagner-de-oliveira-dornela-pediatria-piumhi", name: "Dr. Wagner de Oliveira Dornela", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "Consultório Dr. Wagner Dornela — Rua Vigário José Florêncio, 98, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria", "Ultrassonografia geral"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dr-jose-antonio-dias-dermatologia-piumhi", name: "Dr. José Antônio Dias", profession: "Médico", specialty: "Dermatologia", city: "Piumhi", organization: "Núcleo Dermatológico Cirúrgico — Praça Tuiuti, 114, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (CatalogoMed), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Dermatologia", "Cirurgia geral"], source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "dra-gabriela-rezende-odontologia-piumhi", name: "Dra. Gabriela Rezende", profession: "Dentista", specialty: "Odontologia", city: "Piumhi", organization: "Consultório — Rua Nossa Senhora do Livramento, 161, Centro", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (site profissional), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Odontologia geral", "Saúde bucal"], source: "https://dragabrielarezende.codental.site/" },
  { slug: "dr-gilson-oliveira-implantodontia-piumhi", name: "Dr. Gilson Oliveira", profession: "Dentista", specialty: "Implantodontia", city: "Piumhi", organization: "Consultório de odontologia — Piumhi/MG", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (site profissional), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Implante dentário", "Ortodontia"], source: "https://sites.google.com/view/drgilsonoliveirapiumhi/" },
  // Dentistas (Doctoralia)
  { slug: "dr-goncalo-da-rocha-rolla-odontologia-piumhi", name: "Dr. Gonçalo da Rocha Rolla", profession: "Dentista", specialty: "Odontologia geral", city: "Piumhi", organization: "Consultório particular — Piumhi/MG", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato, endereço e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Odontologia geral", "Saúde bucal"], source: "https://www.doctoralia.com.br/dentista/piumhi" },
  { slug: "adenilson-leandro-ortodontia-piumhi", name: "Adenilson Leandro", profession: "Dentista", specialty: "Ortodontia", city: "Piumhi", organization: "Consultório — Rua Padre Abel, 173, sala 102, Centro", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Ortodontia", "Ortopedia facial"], source: "https://www.doctoralia.com.br/dentista/piumhi" },
  { slug: "dra-franceliz-moleta-odontologia-piumhi", name: "Dra. Franceliz Moleta", profession: "Dentista", specialty: "Odontologia geral", city: "Piumhi", organization: "Consultório — Av. 7 de Setembro, 152, Centro", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Odontologia geral", "Prevenção"], source: "https://www.doctoralia.com.br/dentista/piumhi" },
  // Fisioterapeutas (Doctoralia)
  { slug: "giuliano-souza-fisioterapia-piumhi", name: "Giuliano Carlos de Souza", profession: "Fisioterapeuta", specialty: "Fisioterapia", city: "Piumhi", organization: "Consultório Dr. Giuliano Souza — Praça Guia Lopes, 8, Centro", registration: "CREFITO MG-91680 · a validar", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia). Registro informado na fonte, pendente de confirmação no conselho e validação de contato.", phone: "Contato a validar", whatsapp: "#", services: ["Fisioterapia", "Reabilitação"], source: "https://www.doctoralia.com.br/fisioterapeuta/piumhi" },
  { slug: "giovanna-oliveira-beraldo-fisioterapia-piumhi", name: "Giovanna Oliveira Beraldo", profession: "Fisioterapeuta", specialty: "Fisioterapia", city: "Piumhi", organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373", registration: "CREFITO-4 271949-F · a validar", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia). Registro informado na fonte, pendente de confirmação no conselho e validação de contato.", phone: "Contato a validar", whatsapp: "#", services: ["Fisioterapia", "Reabilitação"], source: "https://www.doctoralia.com.br/fisioterapeuta/piumhi" },
  { slug: "marisa-de-fatima-ferreira-fisioterapia-piumhi", name: "Marisa de Fátima Ferreira", profession: "Fisioterapeuta", specialty: "Fisioterapia", city: "Piumhi", organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373", registration: "CREFITO-4 28260-F · a validar", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia). Registro informado na fonte, pendente de confirmação no conselho e validação de contato.", phone: "Contato a validar", whatsapp: "#", services: ["Fisioterapia", "Reabilitação"], source: "https://www.doctoralia.com.br/fisioterapeuta/piumhi" },
  // Psicólogos (Doctoralia)
  { slug: "jaqueline-viana-modesto-psicologia-piumhi", name: "Jaqueline Viana Modesto", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Atendimento remoto — Piumhi/MG", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Terapia cognitivo-comportamental", "Orientação vocacional"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "cristina-sansoni-psicologia-piumhi", name: "Cristina Sansoni", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório de Psicologia — Rua Santo Antônio, 18, sala 05, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "amanda-morais-psicologia-piumhi", name: "Amanda Morais", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório — Rua Santo Antônio, 18, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "kelly-cristina-do-prado-psicologia-piumhi", name: "Kelly Cristina do Prado", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "erika-costa-psicologia-piumhi", name: "Erika Costa", profession: "Psicólogo", specialty: "Psicologia infantil", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psicologia infantil", "Psicopedagogia"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "sandra-siris-faria-psicologia-piumhi", name: "Sandra Siris de O. Faria", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "joao-paulo-soares-psicologia-piumhi", name: "João Paulo Soares", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório — Rua Padre Abel, 126, sala 4, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Terapia de casal", "Terapia familiar", "Terapia cognitivo-comportamental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "karina-honorio-psicologia-piumhi", name: "Karina Honório", profession: "Psicólogo", specialty: "Psicanálise", city: "Piumhi", organization: "Consultório particular / on-line — Piumhi/MG", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psicanálise", "Atendimento individual"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "debora-araujo-sulzbacher-psicologia-piumhi", name: "Débora Araújo Sulzbacher", profession: "Psicólogo", specialty: "Psicanálise", city: "Piumhi", organization: "Clínica de Psicologia Débora Sulzbacher — Rua Santo Antônio, 18, sala 04", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psicanálise", "Atendimento individual"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "maria-isabel-de-melo-psicologia-piumhi", name: "Maria Isabel de Melo", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório — Rua Santo Antônio, 18, sala 8, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "jaqueline-dias-silva-psicologia-piumhi", name: "Jaqueline Dias Silva", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório de Psicologia — Rua Santo Antônio, 18, sala 05, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "elisangela-lima-psicologia-piumhi", name: "Elisângela Lima", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Clinapsi Clínica de Psicologia — Rua Conselheiro Lafaiete, 237", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "clarissa-freitas-psicologia-piumhi", name: "Clarissa Freitas", profession: "Psicólogo", specialty: "Psicologia infantil", city: "Piumhi", organization: "Clarissa Freitas Psicóloga Infantil — Rua Vigário José Florêncio, 98", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psicoterapia infantil", "Psicologia da gestante", "Aconselhamento aos pais"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "aldo-jose-costa-psicologia-piumhi", name: "Aldo José Costa", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório de Psicologia Clínica e Psicanálise — Rua Santo Antônio, 747, sala 102", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psicologia clínica", "Psicologia junguiana", "Psicanálise"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "jose-ferreira-leite-psicologia-piumhi", name: "José Ferreira Leite", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório — Rua Armando Viotti, 232, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "sandra-cristina-goncalves-psicologia-piumhi", name: "Sandra Cristina Gonçalves", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório — Rua Conselheiro Lafaiete, 237, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "jaine-reis-psicologia-piumhi", name: "Jaíne Reis", profession: "Psicólogo", specialty: "Psicologia clínica", city: "Piumhi", organization: "Consultório — Rua Raul Soares, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Atendimento individual", "Saúde mental"], source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  // Nutrição / Fonoaudiologia (Doctoralia)
  { slug: "dra-wanessa-terra-nutricao-piumhi", name: "Dra. Wanessa Terra", profession: "Nutricionista", specialty: "Nutrição clínica", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194, Centro", registration: "CRN9 26985 · a validar", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia). Registro informado na fonte, pendente de confirmação no conselho e validação de contato.", phone: "Contato a validar", whatsapp: "#", services: ["Nutrição clínica", "Nutrição funcional", "Educação alimentar"], source: "https://www.doctoralia.com.br/nutricionista/piumhi" },
  { slug: "dra-graziele-paiz-clinica-medica-piumhi", name: "Dra. Graziele Paiz", profession: "Médico", specialty: "Clínica Médica", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191 e 194, Centro", registration: "CRM-MG 71531 · a validar", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia). Registro informado na fonte, pendente de confirmação no conselho e validação de contato e especialidade.", phone: "Contato a validar", whatsapp: "#", services: ["Consulta clínica", "Acompanhamento"], source: "https://www.doctoralia.com.br/nutricionista/piumhi" },
  { slug: "julia-augusta-oliveira-lopes-fonoaudiologia-piumhi", name: "Júlia Augusta de Oliveira Lopes", profession: "Fonoaudiólogo", specialty: "Fonoaudiologia", city: "Piumhi", organization: "Borboletando Clínica Multidisciplinar de Reabilitação — Rua Armando Viotti, 373", registration: "CRFa6 10713 · a validar", verified: false, summary: "Cadastro baseado em listagem pública (Doctoralia). Registro informado na fonte, pendente de confirmação no conselho e validação de contato.", phone: "Contato a validar", whatsapp: "#", services: ["Avaliação fonoaudiológica", "Linguagem", "Reabilitação"], source: "https://www.doctoralia.com.br/fonoaudiologo/piumhi" },
  // Reclassificados de "empresa" para profissional (eram consultórios de uma pessoa)
  { slug: "dr-gabriel-tavares-pediatria-piumhi", name: "Dr. Gabriel Tavares", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "Consultório Dr. Gabriel Tavares — Praça Tuiuti, 114, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro importado de fonte pública (OpenStreetMap), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Consulta pediátrica", "Puericultura"], source: "https://www.openstreetmap.org/" },
  { slug: "bruna-lopes-fisioterapia-piumhi", name: "Bruna Lopes", profession: "Fisioterapeuta", specialty: "Fisioterapia", city: "Piumhi", organization: "Bruna Lopes — Fisioterapia e Pilates — Rua Crispim Elias da Cunha, 102", registration: "CREFITO · aguardando validação", verified: false, summary: "Cadastro importado de fonte pública (OpenStreetMap), pendente de validação de contato e registro no conselho antes da confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Fisioterapia", "Pilates", "Reabilitação"], source: "https://www.openstreetmap.org/" },
  // Corpo clínico publicado pelo Piumhi Hospital Dia (consulta em 24/08/2026).
  { slug: "dr-andre-fares-dias-angiologia-piumhi", name: "Dr. André Fares Dias", profession: "Médico", specialty: "Angiologia e Cirurgia Vascular", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Angiologia", "Cirurgia vascular"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dra-ludimila-souza-endocrinologia-piumhi", name: "Dra. Ludimila Souza", profession: "Médico", specialty: "Endocrinologia e Metabologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listada no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Endocrinologia", "Metabologia", "Acompanhamento metabólico"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dr-jose-luiz-da-costa-neto-clinica-medica-piumhi", name: "Dr. José Luiz da Costa Neto", profession: "Médico", specialty: "Clínica Médica", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia, com atuação informada em saúde da família, urgência e atendimento ambulatorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Clínica médica", "Saúde da família", "Atendimento ambulatorial"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dr-bernardo-guimaraes-maia-anestesiologia-piumhi", name: "Dr. Bernardo Guimarães Maia", profession: "Médico", specialty: "Anestesiologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Anestesiologia", "Avaliação pré-anestésica"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dr-samuel-de-oliveira-falcucci-anestesiologia-piumhi", name: "Dr. Samuel de Oliveira Falcucci", profession: "Médico", specialty: "Anestesiologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Anestesiologia", "Avaliação pré-anestésica"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dr-silvio-cesar-mastologia-piumhi", name: "Dr. Silvio César", profession: "Médico", specialty: "Mastologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Mastologia", "Saúde da mama"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dra-gabriela-goncalves-de-oliveira-dermatologia-piumhi", name: "Dra. Gabriela Gonçalves de Oliveira", profession: "Médico", specialty: "Dermatologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Dermatologista apresentada no corpo clínico oficial do PHD e convidada do podcast Conexão Saúde. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Dermatologia clínica", "Saúde da pele"], source: "https://phdhospitaldia.com.br/portfolio-items/dermatologia/" },
  { slug: "dr-sergio-medeiros-urologia-piumhi", name: "Dr. Sérgio Medeiros", profession: "Médico", specialty: "Urologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Urologia", "Saúde urinária"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dr-rogerio-castro-reis-reumatologia-piumhi", name: "Dr. Rogério Castro Reis", profession: "Médico", specialty: "Reumatologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Reumatologia", "Doenças reumáticas"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "miriam-terra-garcia-lopes-psicologia-piumhi", name: "Miriam Terra Garcia Lopes", profession: "Psicólogo", specialty: "Psicologia clínica e Psicanálise", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRP-MG · aguardando validação", verified: false, summary: "Profissional listada no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Psicologia clínica", "Psicanálise"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dr-gabriel-gueba-ginecologia-piumhi", name: "Dr. Gabriel Guêba", profession: "Médico", specialty: "Ginecologia e Obstetrícia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Profissional listado no corpo clínico oficial do PHD Piumhi Hospital Dia. Registro e agenda permanecem pendentes de validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Ginecologia", "Obstetrícia", "Saúde da mulher"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  { slug: "dra-laura-gomes-machado-pneumologia-piumhi", name: "Dra. Laura Gomes Machado", profession: "Médico", specialty: "Pneumologia", city: "Piumhi", organization: "PHD Piumhi Hospital Dia — Praça Guia Lopes, 278, Centro", registration: "CRM-MG 69767 · RQE 60582 · a validar", verified: false, summary: "Pneumologista listada no corpo clínico oficial do PHD e em diretório profissional público. Dados permanecem sujeitos à validação editorial.", phone: "(37) 3412-0075", whatsapp: "#", services: ["Pneumologia", "Saúde respiratória"], source: "https://phdhospitaldia.com.br/quem-somos/" },
  // Outros resultados públicos relevantes encontrados na cidade.
  { slug: "dr-luis-gustavo-belizario-xavier-radiologia-piumhi", name: "Dr. Luis Gustavo Belizario Xavier", profession: "Médico", specialty: "Radiologia e Diagnóstico por Imagem", city: "Piumhi", organization: "Clínica WS — Praça Guia Lopes, 244, Piumhi", registration: "CRM-MG 46693 · RQE 35479 · a validar", verified: false, summary: "Cadastro baseado em diretório profissional público, pendente de validação editorial de agenda e contato.", phone: "Contato a validar", whatsapp: "#", services: ["Radiologia", "Diagnóstico por imagem", "Ultrassonografia"], source: "https://www.doctoralia.com.br/piumhi/piumhi2" },
  { slug: "dra-fernanda-piazza-endocrinologia-piumhi", name: "Dra. Fernanda Piazza", profession: "Médico", specialty: "Endocrinologia", city: "Piumhi", organization: "Atendimento Piumhi — Rua Padre Abel, 332", registration: "CRM-SP 253883 · RQE 146874 · a validar", verified: false, summary: "Cadastro baseado em diretório profissional público, pendente de validação editorial de agenda e contato em Piumhi.", phone: "Contato a validar", whatsapp: "#", services: ["Endocrinologia", "Diabetologia", "Obesidade", "Tireoide"], source: "https://www.doctoralia.com.br/piumhi/piumhi2" },
  { slug: "dra-lorrane-moura-generalista-piumhi", name: "Dra. Lorrane Moura", profession: "Médico", specialty: "Clínica Geral", city: "Piumhi", organization: "Consultório — Rua Doutor Manoel Hermeto Júnior, 922", registration: "CRM-MG 112868 · a validar", verified: false, summary: "Cadastro baseado em diretório profissional público, pendente de validação editorial de agenda e contato.", phone: "Contato a validar", whatsapp: "#", services: ["Consulta clínica", "Acompanhamento geral"], source: "https://www.doctoralia.com.br/piumhi/piumhi2" },
  { slug: "dra-melissa-lopes-batista-medicina-do-trabalho-piumhi", name: "Dra. Melissa Lopes Batista", profession: "Médico", specialty: "Medicina do Trabalho", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 196", registration: "CRM-MG 37987 · RQE 9582 · a validar", verified: false, summary: "Cadastro baseado em diretório profissional público, pendente de validação editorial de agenda e contato.", phone: "Contato a validar", whatsapp: "#", services: ["Medicina do trabalho", "Saúde ocupacional"], source: "https://www.doctoralia.com.br/piumhi/piumhi2" },
  { slug: "dr-ronaldo-saint-martin-ferreira-ortodontia-piumhi", name: "Dr. Ronaldo Saint Martin Ferreira", profession: "Dentista", specialty: "Ortodontia e Ortopedia Funcional dos Maxilares", city: "Piumhi", organization: "Consultório — Rua Bossuet Costa, 168, Centro", registration: "CRO-MG 19444 · a validar", verified: false, summary: "Cadastro baseado em perfil profissional público, pendente de validação editorial de agenda e contato.", phone: "Contato a validar", whatsapp: "#", services: ["Ortodontia", "Ortopedia funcional dos maxilares", "Oclusão e ATM"], source: "https://www.ident.com.br/dr.ronaldo" },
  { slug: "dr-humberto-leite-ginecologia-piumhi", name: "Dr. Humberto Leite", profession: "Médico", specialty: "Ginecologia e Obstetrícia", city: "Piumhi", organization: "Consultório — Rua João Pinheiro, 512, sala 05, Centro", registration: "CRM-MG 81682 · a validar", verified: false, summary: "Cadastro baseado em site profissional público, pendente de validação editorial de agenda e registro de especialidade.", phone: "Contato a validar", whatsapp: "#", services: ["Ginecologia", "Obstetrícia", "Endometriose", "Ultrassonografia"], source: "https://drhumbertoleite.com.br/" },
  // Participantes do podcast do próprio Guia Saúde ainda sem perfil no diretório.
  { slug: "ivana-mara-de-oliveira-rezende-fisioterapia-piumhi", name: "Ivana Mara de Oliveira Rezende", profession: "Fisioterapeuta", specialty: "Fisioterapia Respiratória", city: "Piumhi", organization: "Atuação profissional em Piumhi — endereço a validar", registration: "CREFITO-4 · aguardando validação", verified: false, summary: "Fisioterapeuta convidada do podcast Conexão Saúde e homenageada publicamente pelo CREFITO-4 MG. Contato e registro permanecem pendentes de validação editorial.", phone: "Contato a validar", whatsapp: "#", services: ["Fisioterapia respiratória", "Reabilitação respiratória"], source: "https://www.youtube.com/watch?v=ouNSkD6F_c8" },
  { slug: "nayara-garcia-pediatria-pneumologia-infantil-piumhi", name: "Dra. Nayara Garcia", profession: "Médico", specialty: "Pediatria e Pneumologia Infantil", city: "Piumhi", organization: "Atuação profissional em Piumhi — endereço a validar", registration: "CRM-MG · aguardando validação", verified: false, summary: "Médica convidada do podcast Conexão Saúde. Local de atendimento, contato e registros permanecem pendentes de validação editorial.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria", "Pneumologia infantil", "Saúde respiratória infantil"], source: "https://www.youtube.com/watch?v=yDN7ox1vVTU" },
  { slug: "daisy-cristina-de-faria-nutricao-piumhi", name: "Daisy Cristina de Faria", profession: "Nutricionista", specialty: "Nutrição", city: "Piumhi", organization: "Atuação profissional em Piumhi — endereço a validar", registration: "CRN-9 · aguardando validação", verified: false, summary: "Nutricionista convidada do podcast Conexão Saúde e listada em guia comercial local. Contato e registro permanecem pendentes de validação editorial.", phone: "(37) 3371-1088", whatsapp: "#", services: ["Nutrição clínica", "Educação alimentar", "Vida saudável"], source: "https://www.youtube.com/watch?v=xxV4UudRoAU" },
  { slug: "reinaldo-lopes-soares-ortodontia-piumhi", name: "Dr. Reinaldo Lopes Soares", profession: "Dentista", specialty: "Ortodontia", city: "Piumhi", organization: "Atuação profissional em Piumhi — endereço a validar", registration: "CRO-MG · aguardando validação", verified: false, summary: "Ortodontista convidado do podcast Conexão Saúde. Contato, endereço e registro permanecem pendentes de validação editorial.", phone: "Contato a validar", whatsapp: "#", services: ["Ortodontia", "Ortopedia facial"], source: "https://www.youtube.com/watch?v=ugzEwowoSwI" },
  { slug: "victor-lopes-soares-ortodontia-piumhi", name: "Dr. Víctor Lopes Soares", profession: "Dentista", specialty: "Ortodontia", city: "Piumhi", organization: "Atuação profissional em Piumhi — endereço a validar", registration: "CRO-MG · aguardando validação", verified: false, summary: "Ortodontista convidado do podcast Conexão Saúde. Contato, endereço e registro permanecem pendentes de validação editorial.", phone: "Contato a validar", whatsapp: "#", services: ["Ortodontia", "Ortopedia facial"], source: "https://www.youtube.com/watch?v=ugzEwowoSwI" },
  { slug: "karla-soares-lopes-teixeira-ortodontia-piumhi", name: "Dra. Karla Soares", profession: "Dentista", specialty: "Ortodontia", city: "Piumhi", organization: "Atuação profissional em Piumhi — endereço a validar", registration: "CRO-MG · aguardando validação", verified: false, summary: "Dentista convidada do podcast Conexão Saúde. Contato, endereço e registro permanecem pendentes de validação editorial.", phone: "Contato a validar", whatsapp: "#", services: ["Ortodontia", "Aparelhos ortodônticos"], source: "https://www.youtube.com/watch?v=yPiZVLHvJLA" },
  // Novos nomes recebidos na planilha editorial de profissionais de Piumhi.
  { slug: "dr-lucas-camargos-silva-felix-clinica-geral-piumhi", name: "Dr. Lucas Camargos Silva Felix", profession: "Médico", specialty: "Clínica Geral e Atenção Primária", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191/194, Centro", registration: "CRM-MG 107326 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Dados permanecem sujeitos à confirmação do profissional.", phone: "(37) 99935-8585", whatsapp: "#", services: ["Clínica geral", "Atenção primária"], source: "https://www.doctoralia.com.br/medico-clinico-geral/piumhi" },
  { slug: "dr-hildebrando-rosa-junior-endocrinologia-piumhi", name: "Dr. Hildebrando Rosa Junior", profession: "Médico", specialty: "Clínica Médica e Endocrinologia", city: "Piumhi", organization: "Consultório particular — Rua Ramiro J. Ferreira, 90", registration: "CRM-MG 34483 · RQE 12974/12975 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Clínica médica", "Endocrinologia"], source: "https://www.doctoralia.com.br/medico-clinico-geral/piumhi" },
  { slug: "dra-maria-alcantara-de-oliveira-cirurgia-geral-piumhi", name: "Dra. Maria Alcantara de Oliveira", profession: "Médico", specialty: "Clínica Médica e Cirurgia Geral", city: "Piumhi", organization: "Consultório particular — Praça Guia Lopes, 53", registration: "CRM-MG 21415 · RQE 35032 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Clínica médica", "Cirurgia geral"], source: "https://www.doctoralia.com.br/medico-clinico-geral/piumhi" },
  { slug: "dr-gil-cesar-paiva-otorrinolaringologia-piumhi", name: "Dr. Gil Cesar Paiva", profession: "Médico", specialty: "Otorrinolaringologia", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 248", registration: "CRM-MG 53146 · RQE 30886 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Otorrinolaringologia", "Clínica médica"], source: "https://www.doctoralia.com.br/medico-clinico-geral/piumhi" },
  { slug: "dr-jose-maria-veiga-azzi-radiologia-piumhi", name: "Dr. José Maria Veiga Azzi", profession: "Médico", specialty: "Radiologia e Clínica Médica", city: "Piumhi", organization: "Consultório particular — Praça Guia Lopes, 53 / Praça Guia Lopes, 87, sala 03", registration: "CRM-MG 4976 · RQE 2541/6459 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Radiologia", "Clínica médica", "Diagnóstico por imagem"], source: "https://www.doctoralia.com.br/jose-maria-veiga-azzi/medico-clinico-geral-radiologista/piumhi" },
  { slug: "dr-rui-manuel-dos-prazeres-xavier-ginecologia-piumhi", name: "Dr. Rui Manuel Dos Prazeres Xavier", profession: "Médico", specialty: "Medicina de Família e Ginecologia", city: "Piumhi", organization: "Consultório particular — Praça Tuiuti, 114, sala 8", registration: "CRM 14444 · RQE 399 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Medicina de família", "Ginecologia"], source: "https://www.doctoralia.com.br/medico-de-familia/piumhi/piumhi2" },
  { slug: "dr-renato-antonio-soares-lima-medicina-de-familia-piumhi", name: "Dr. Renato Antonio Soares Lima", profession: "Médico", specialty: "Medicina de Família e Comunidade", city: "Piumhi", organization: "Consultório particular — Rua D. Tereza Hostalácio, 43", registration: "CRM 19256 · RQE 13286 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Medicina de família", "Atenção primária"], source: "https://www.doctoralia.com.br/medico-de-familia/piumhi/piumhi2" },
  { slug: "dra-amanda-s-matos-generalista-piumhi", name: "Dra. Amanda S. Matos", profession: "Médico", specialty: "Clínica Geral e Medicina do Trabalho", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191/194, Centro", registration: "CRM-MG 112843 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Especialidades e agenda permanecem sujeitas à confirmação.", phone: "(37) 99935-8585", whatsapp: "#", services: ["Clínica geral", "Medicina do trabalho", "Saúde da mulher"], source: "https://www.doctoralia.com.br/generalista/pimenta" },
  { slug: "dr-arthur-santos-rezende-melo-generalista-piumhi", name: "Dr. Arthur Santos Rezende Melo", profession: "Médico", specialty: "Clínica Geral", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191/194, Centro", registration: "CRM-MG 92751 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem sujeitos à confirmação.", phone: "(37) 99935-8585", whatsapp: "#", services: ["Clínica geral", "Acompanhamento clínico"], source: "https://www.doctoralia.com.br/generalista/pimenta" },
  { slug: "dr-saulo-rosa-ferreira-psiquiatria-piumhi", name: "Dr. Saulo Rosa Ferreira", profession: "Médico", specialty: "Psiquiatria", city: "Piumhi", organization: "Consultório particular — Praça Tuiuti, 114, sala 05", registration: "CRM-MG 65312 · RQE 40931/44169 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psiquiatria", "Saúde mental"], source: "https://www.doctoralia.com.br/servicos-de-tratamento/psicoterapia/piumhi" },
  { slug: "dr-rodrigo-lana-martins-clinica-geral-piumhi", name: "Dr. Rodrigo Lana Martins", profession: "Médico", specialty: "Clínica Geral", city: "Piumhi", organization: "Consultório — Rua Armando Viotti, 190, sala 203, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 3371-6774", whatsapp: "#", services: ["Clínica geral"], source: "https://www.google.com/maps/search/?api=1&query=Dr.+Rodrigo+Lana+Martins+Piumhi" },
  { slug: "dra-renata-oliveira-prado-odontologia-piumhi", name: "Dra. Renata Oliveira Prado", profession: "Dentista", specialty: "Odontologia Geral", city: "Piumhi", organization: "Consultório Dra. Renata Oliveira — Rua Santo Antônio, 18, sala 5, Centro", registration: "CRO-MG 43619 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com perfil profissional público. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Odontologia geral", "Prevenção"], source: "https://www.ident.com.br/dra.renataprado" },
  { slug: "dra-ana-paula-soares-salviano-odontologia-piumhi", name: "Dra. Ana Paula Soares Salviano", profession: "Dentista", specialty: "Odontologia", city: "Piumhi", organization: "Salviano Odontologia / ORTHOclínicas — Rua Benedito Valadares, 92, Centro", registration: "CRO-MG 54872 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte institucional pública. Dados permanecem sujeitos à confirmação.", phone: "(37) 99856-3333", whatsapp: "#", services: ["Odontologia", "Responsabilidade técnica"], source: "https://orthoclinicas.com/unidades/" },
  { slug: "dra-luisa-polcaro-odontologia-piumhi", name: "Dra. Luisa Polcaro", profession: "Dentista", specialty: "Odontologia", city: "Piumhi", organization: "Consultório — Rua Armando Viotti, 190, sala 101, Centro", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 99908-5825", whatsapp: "#", services: ["Odontologia geral"], source: "https://www.google.com/maps/search/?api=1&query=Dra.+Luisa+Polcaro+Piumhi" },
  { slug: "roseli-soares-terra-odontologia-piumhi", name: "Roseli Soares Terra", profession: "Dentista", specialty: "Odontologia", city: "Piumhi", organization: "Consultório Odontológico — Rua Silviano Brandão, 129, Centro", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 99954-0280", whatsapp: "#", services: ["Odontologia geral"], source: "https://www.google.com/maps/search/?api=1&query=Roseli+Soares+Terra+Piumhi" },
  { slug: "dra-keila-faria-odontologia-piumhi", name: "Dra. Keila Faria", profession: "Dentista", specialty: "Odontologia Especializada", city: "Piumhi", organization: "Dra. Keila Faria — Rua Joaquim Beijo, 272", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro e especialidade permanecem pendentes de confirmação.", phone: "(37) 98418-7795", whatsapp: "#", services: ["Odontologia especializada"], source: "https://www.google.com/maps/search/?api=1&query=Dra.+Keila+Faria+Piumhi" },
  { slug: "philippe-andrade-nutricao-piumhi", name: "Philippe Andrade", profession: "Nutricionista", specialty: "Nutrição Clínica e Esportiva", city: "Piumhi", organization: "Consultório — Rua Djalma Dutra, 115, Centro", registration: "CRN-9 · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 99865-1402", whatsapp: "#", services: ["Nutrição clínica", "Nutrição esportiva"], source: "https://www.google.com/maps/search/?api=1&query=Philippe+Andrade+Nutricionista+Piumhi" },
  { slug: "luana-cassini-nutricao-piumhi", name: "Luana Cassini", profession: "Nutricionista", specialty: "Nutrição Integrativa", city: "Piumhi", organization: "Consultório — Rua Amazonas, 17, Centro", registration: "CRN-9 · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(35) 99895-2892", whatsapp: "#", services: ["Nutrição integrativa", "Educação alimentar"], source: "https://www.google.com/maps/search/?api=1&query=Luana+Cassini+Piumhi" },
  { slug: "dayse-mara-rodrigues-nutricao-piumhi", name: "Dayse Mara Rodrigues", profession: "Nutricionista", specialty: "Nutrição", city: "Piumhi", organization: "Consultório — Rua Santo Antônio, 18, sala 4", registration: "CRN-9 · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 99952-9004", whatsapp: "#", services: ["Nutrição", "Educação alimentar"], source: "https://www.google.com/maps/search/?api=1&query=Dayse+Mara+Rodrigues+Piumhi" },
  { slug: "deborah-faria-de-moura-psicologia-piumhi", name: "Déborah Faria de Moura", profession: "Psicólogo", specialty: "Psicologia", city: "Piumhi", organization: "Consultório — Rua Conselheiro Lafaiete, 237, Centro", registration: "CRP 04/47185 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com referência a cadastro público federal. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Psicologia", "Avaliação psicológica"], source: "https://www.gov.br/pf/pt-br/assuntos/armas/psicologos/psicologos-crediciados/minas-gerais" },
  { slug: "luana-pessoa-costa-psicologia-piumhi", name: "Luana Pessôa Costa", profession: "Psicólogo", specialty: "Psicologia", city: "Piumhi", organization: "Consultório — Rua Esmeralda Rocha Lopes, 82, Pérola Negra", registration: "CRP-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 98823-2726", whatsapp: "#", services: ["Psicologia", "Atendimento individual"], source: "https://www.google.com/maps/search/?api=1&query=Luana+Pessoa+Costa+Psicologa+Piumhi" },
  // Segunda rodada do levantamento editorial de profissionais de Piumhi.
  { slug: "dr-paulo-dos-reis-jardim-ortopedia-piumhi", name: "Dr. Paulo Dos Reis Jardim", profession: "Médico", specialty: "Ortopedia e Traumatologia", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191/194, Centro", registration: "CRM-MG 55550 · RQE 38905 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Dados permanecem sujeitos à confirmação do profissional.", phone: "(37) 99935-8585", whatsapp: "#", services: ["Ortopedia", "Traumatologia"], source: "https://www.doctoralia.com.br/piumhi/centro110?page=2" },
  { slug: "dr-messias-eustaquio-faria-alergologia-piumhi", name: "Dr. Messias Eustaquio Faria", profession: "Médico", specialty: "Alergologia", city: "Piumhi", organization: "Clínica Mais Saúde GMS — Rua Padre Abel, 191/194, Centro", registration: "CRM-MG 14393 · RQE 43403 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Dados permanecem sujeitos à confirmação do profissional.", phone: "(37) 99935-8585", whatsapp: "#", services: ["Alergologia", "Alergias"], source: "https://www.doctoralia.com.br/piumhi/centro110?page=2" },
  { slug: "dr-hiago-antunis-silva-neurologia-piumhi", name: "Dr. Hiago Antunis Silva", profession: "Médico", specialty: "Neurologia", city: "Piumhi", organization: "GMS — Grupo Melhor Saúde — Rua Padre Abel, 191, Centro", registration: "CRM-MG 79845 · RQE 57649 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Dados permanecem sujeitos à confirmação do profissional.", phone: "(37) 99935-8585", whatsapp: "#", services: ["Neurologia"], source: "https://www.doctoralia.com.br/piumhi/centro110?page=2" },
  { slug: "dr-matheus-fonseca-cirurgia-geral-piumhi", name: "Dr. Matheus Fonseca", profession: "Médico", specialty: "Cirurgia Geral", city: "Piumhi", organization: "Policlínica Santa Casa de Piumhi", registration: "CRM-MG 77268 · RQE 53844 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Cirurgia geral"], source: "https://www.doctoralia.com.br/piumhi/centro110?page=2" },
  { slug: "dr-gustavo-sansoni-soares-ortopedia-piumhi", name: "Dr. Gustavo Sansoni Soares", profession: "Médico", specialty: "Ortopedia e Traumatologia do Joelho", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 53", registration: "CRM-MG 38274 · RQE 9495/33725 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Ortopedia", "Traumatologia", "Joelho"], source: "https://www.doctoralia.com.br/piumhi/centro110?page=2" },
  { slug: "dr-marcelo-messias-lopes-pediatria-piumhi", name: "Dr. Marcelo Messias Lopes", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 114, 2º andar, sala 103", registration: "CRM-MG 38839 · RQE 31537 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria"], source: "https://www.doctoralia.com.br/pediatra/piumhi/piumhi2" },
  { slug: "dra-saygra-batista-sousa-pediatria-piumhi", name: "Dra. Saygra Batista Sousa", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "PHD Hospital Dia — Praça Guia Lopes, 278", registration: "CRM-MG 91482 · RQE 65780 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria"], source: "https://www.doctoralia.com.br/pediatra/piumhi/piumhi2" },
  { slug: "dr-cesar-francisco-batista-pediatria-piumhi", name: "Dr. Cesar Francisco Batista", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 196", registration: "CRM-MG 8564 · RQE 3467 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Dados permanecem sujeitos à confirmação do profissional.", phone: "(37) 3371-1007", whatsapp: "#", services: ["Pediatria"], source: "https://www.doctoralia.com.br/cesar-francisco-batista/pediatra/piumhi" },
  { slug: "dr-jose-vaz-lara-pediatria-piumhi", name: "Dr. José Vaz Lara", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "Consultório — Rua Tereza Hotalácio, 40", registration: "CRM-MG 14519 · RQE 16456 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria"], source: "https://www.doctoralia.com.br/pediatra/piumhi/piumhi2" },
  { slug: "dr-edson-antonio-julio-pediatria-piumhi", name: "Dr. Edson Antonio Julio", profession: "Médico", specialty: "Pediatria", city: "Piumhi", organization: "Consultório — Praça Tuiuti, 114, sala 8", registration: "CRM-MG 16456 · RQE 4976 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria"], source: "https://www.doctoralia.com.br/pediatra/piumhi/piumhi2" },
  { slug: "dr-eduardo-belizario-xavier-pediatria-piumhi", name: "Dr. Eduardo Belizario Xavier", profession: "Médico", specialty: "Pediatria e Clínica Geral", city: "Piumhi", organization: "Consultório — Praça Tuiuti, 114", registration: "CRM-MG 70297 · RQE 42587/42588 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Pediatria", "Clínica geral"], source: "https://www.doctoralia.com.br/pediatra/piumhi/piumhi2" },
  { slug: "dr-nelson-soares-de-melo-oftalmologia-piumhi", name: "Dr. Nelson Soares de Melo", profession: "Médico", specialty: "Oftalmologia", city: "Piumhi", organization: "Consultório — Rua Miguel Couto, 153", registration: "CRM-MG 10400 · RQE a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Especialidade, agenda e contato permanecem sujeitos à confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Oftalmologia", "Saúde ocular"], source: "https://www.doctoralia.com.br/piumhi?page=4" },
  { slug: "dr-luiz-felipe-bittencourt-eluf-medicina-do-trabalho-piumhi", name: "Dr. Luiz Felipe Bittencourt Eluf", profession: "Médico", specialty: "Medicina do Trabalho", city: "Piumhi", organization: "Consultório — Rua Armando Viotti, 125", registration: "CRM-MG 29996 · RQE 9627 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Medicina do trabalho", "Saúde ocupacional"], source: "https://www.doctoralia.com.br/piumhi/piumhi?page=4" },
  { slug: "dr-joao-batista-soares-clinica-geral-piumhi", name: "Dr. João Batista Soares", profession: "Médico", specialty: "Clínica Geral", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 53/87", registration: "CRM-MG 5874 · RQE 1294 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Clínica geral"], source: "https://www.doctoralia.com.br/piumhi/piumhi?page=4" },
  { slug: "dr-wesley-da-costa-mota-medicina-do-trabalho-piumhi", name: "Dr. Wesley Da Costa Mota", profession: "Médico", specialty: "Medicina do Trabalho", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 53", registration: "CRM-MG 18488 · RQE 8388/15906 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Medicina do trabalho", "Saúde ocupacional"], source: "https://www.doctoralia.com.br/piumhi/piumhi?page=4" },
  { slug: "dr-ivo-de-andrade-generalista-piumhi", name: "Dr. Ivo De Andrade", profession: "Médico", specialty: "Clínica Geral", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 53", registration: "CRM-MG 5448 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Especialidade, agenda e contato permanecem sujeitos à confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Clínica geral"], source: "https://www.doctoralia.com.br/piumhi/piumhi?page=4" },
  { slug: "dr-itamar-lopes-da-cunha-anestesiologia-piumhi", name: "Dr. Itamar Lopes Da Cunha", profession: "Médico", specialty: "Anestesiologia", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 87", registration: "CRM-MG 4751 · RQE 2540 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Agenda e contato permanecem pendentes de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Anestesiologia"], source: "https://www.doctoralia.com.br/piumhi/piumhi?page=4" },
  { slug: "dr-kenio-da-costa-lopes-medicina-de-familia-piumhi", name: "Dr. Kenio Da Costa Lopes", profession: "Médico", specialty: "Medicina de Família", city: "Piumhi", organization: "Consultório — Rua Getúlio Vargas, 347, ap. 202", registration: "CRM-MG 25187 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Especialidade, agenda e contato permanecem sujeitos à confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Medicina de família", "Atenção primária"], source: "https://www.doctoralia.com.br/piumhi/piumhi?page=4" },
  { slug: "dr-heraldo-francisco-costa-ginecologia-piumhi", name: "Dr. Heraldo Francisco Costa", profession: "Médico", specialty: "Ginecologia", city: "Piumhi", organization: "Consultório — Praça Guia Lopes, 114, sala 101, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 99876-4446", whatsapp: "#", services: ["Ginecologia", "Saúde da mulher"], source: "https://www.google.com/maps/search/?api=1&query=Heraldo+Francisco+Costa+Piumhi" },
  { slug: "dra-mirian-sansoni-oftalmologia-piumhi", name: "Dra. Mírian Sansoni", profession: "Médico", specialty: "Oftalmologia", city: "Piumhi", organization: "Clínica São Judas Tadeu — Rua Armando Viotti, 190, sala 103, Centro", registration: "CRM-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "(37) 99837-3840", whatsapp: "#", services: ["Oftalmologia", "Saúde ocular"], source: "https://www.google.com/maps/search/?api=1&query=Mirian+Sansoni+Oftalmologista+Piumhi" },
  { slug: "dr-rodrigo-terra-lasmar-ortopedia-piumhi", name: "Dr. Rodrigo Terra Lasmar", profession: "Médico", specialty: "Ortopedia e Traumatologia", city: "Piumhi", organization: "Santa Casa de Misericórdia de Piumhi — Praça Guia Lopes, 53", registration: "CRM-MG 57840 · a validar", verified: false, summary: "Cadastro recebido em levantamento editorial com fonte pública. Especialidade, agenda e contato permanecem sujeitos à confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Ortopedia", "Traumatologia"], source: "https://www.medicosbrasil.com/profissionais/ortopedista-traumatologista--piumhi-mg" },
  { slug: "cristiane-rezende-oliveira-endodontia-piumhi", name: "Cristiane Rezende Oliveira", profession: "Dentista", specialty: "Endodontia", city: "Piumhi", organization: "Consultório — Rua Getúlio Vargas, 113, Centro", registration: "CRO-MG · aguardando validação", verified: false, summary: "Cadastro baseado em presença comercial pública. Registro profissional permanece pendente de confirmação.", phone: "Contato a validar", whatsapp: "#", services: ["Endodontia", "Tratamento de canal"], source: "https://www.google.com/maps/search/?api=1&query=Cristiane+Rezende+Oliveira+Endodontia+Piumhi" },
  { slug: "cynthia-teixeira-de-oliveira-valerio-psicologia-piumhi", name: "Cynthia Teixeira de Oliveira Valério", profession: "Psicólogo", specialty: "Psicologia", city: "Piumhi", organization: "CRAS Antônio Sabino da Silva — Rua Padre Abel, 1361, Pindaíbas", registration: "CRP 04/23794 · a validar", verified: false, summary: "Cadastro recebido em fonte institucional pública. Vínculo, agenda e contato permanecem sujeitos à confirmação.", phone: "(37) 3371-9272", whatsapp: "#", services: ["Psicologia", "Atendimento psicossocial"], source: "https://sapl.piumhi.mg.leg.br/docadm/texto_integral/4466" },
];

// Perfis/empresas demonstrativos (fictícios) NÃO aparecem no site público nem na
// busca, em nenhuma cidade. Onde não há dado real, mostramos "anuncie aqui" —
// nunca um "Perfil demonstrativo", que polui a busca.
function isDemoRecord(record: { slug: string; name: string; summary: string }) {
  return /demonstrat|fict[íi]ci|demonstra[çc][ãa]o/i.test(`${record.slug} ${record.name} ${record.summary}`);
}
function notDemo(record: { slug: string; name: string; summary: string }) {
  return !isDemoRecord(record);
}

const professionalPublicationDefaults: Pick<Professional, "publicationStatus" | "verificationStatus" | "commercialStatus"> = {
  // A proprietária do Guia Saúde confirmou editorialmente os cadastros de
  // Piumhi. A procedência original continua registrada como fonte pública.
  publicationStatus: "published",
  verificationStatus: "public-source",
  commercialStatus: "organic",
};

export const professionals: Professional[] = [...baseProfessionals, ...supplementalProfessionals, ...piumhiImportedProfessionals]
  .filter(notDemo)
  .map((professional) => ({
    ...professional,
    ...professionalPublicationDefaults,
    sourceUrls: professional.source ? [professional.source] : [],
    imageUrl: resolveProfessionalImage(professional.slug, professional.imageUrl),
  }));

const baseOrganizations: Organization[] = [
  {
    slug: "clinica-demonstrativa-piumhi",
    name: "Clínica demonstrativa",
    category: "Clínica multiprofissional",
    city: "Piumhi",
    address: "Endereço profissional aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Perfil demonstrativo de empresa, criado para validar a experiência antes da importação do CNES.",
    services: ["Consultas", "Atendimento multiprofissional", "Prevenção"],
  },
  {
    slug: "laboratorio-demonstrativo-arcos",
    name: "Laboratório demonstrativo",
    category: "Laboratório",
    city: "Arcos",
    address: "Endereço profissional aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Modelo para estabelecimentos com unidades, horários, serviços e contatos comerciais.",
    services: ["Exames laboratoriais", "Coleta", "Atendimento regional"],
  },
  {
    slug: "farmacia-demonstrativa-capitolio",
    name: "Farmácia demonstrativa",
    category: "Farmácia",
    city: "Capitólio",
    address: "Endereço comercial aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Modelo para farmácias e serviços de orientação ao público, com dados comerciais revisados.",
    services: ["Medicamentos", "Atenção farmacêutica", "Produtos de saúde"],
  },
  {
    slug: "otica-demonstrativa-pimenta",
    name: "Ótica demonstrativa",
    category: "Ótica",
    city: "Pimenta",
    address: "Endereço comercial aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Exemplo de perfil para óticas, lentes, armações e serviços ligados à saúde visual.",
    services: ["Óculos", "Lentes", "Saúde visual"],
  },
  {
    slug: "clinica-estetica-demonstrativa-campo-belo",
    name: "Clínica estética demonstrativa",
    category: "Estética e bem-estar",
    city: "Campo Belo",
    address: "Endereço comercial aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Modelo para empresas de estética, autocuidado, bem-estar e procedimentos não invasivos.",
    services: ["Estética facial", "Bem-estar", "Autocuidado"],
  },
  {
    slug: "academia-demonstrativa-bambui",
    name: "Academia demonstrativa",
    category: "Academia e atividade física",
    city: "Bambuí",
    address: "Endereço comercial aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Perfil demonstrativo para espaços de atividade física, prevenção e qualidade de vida.",
    services: ["Musculação", "Aulas coletivas", "Condicionamento"],
  },
  {
    slug: "diagnostico-demonstrativo-piumhi",
    name: "Centro demonstrativo de diagnóstico",
    category: "Diagnóstico por imagem",
    city: "Piumhi",
    address: "Endereço comercial aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Modelo para serviços de imagem, exames e apoio diagnóstico com dados de atendimento revisados.",
    services: ["Imagem", "Exames", "Apoio diagnóstico"],
  },
  {
    slug: "home-care-demonstrativo-sao-roque",
    name: "Home care demonstrativo",
    category: "Home care",
    city: "São Roque de Minas",
    address: "Atendimento local aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Exemplo para empresas de cuidado domiciliar, acompanhamento e suporte familiar.",
    services: ["Cuidado domiciliar", "Acompanhamento", "Suporte familiar"],
  },
  {
    slug: "clinica-odontologica-demonstrativa-capitolio",
    name: "Clínica odontológica demonstrativa",
    category: "Clínica odontológica",
    city: "Capitólio",
    address: "Endereço profissional aguardando validação",
    phone: "Contato aguardando validação",
    summary: "Modelo para clínicas odontológicas com equipe, serviços, estrutura e contatos comerciais.",
    services: ["Odontologia", "Prevenção", "Reabilitação oral"],
  },
  // Base pública importada do OpenStreetMap para revisão editorial.
  {"slug": "hospital-santa-casa-pimenta", "name": "Hospital Santa Casa", "category": "Hospital", "city": "Pimenta", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "drogaria-nossa-senhora-do-carmo-arcos", "name": "Drogaria Nossa Senhora do Carmo", "category": "Farmácia", "city": "Arcos", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "hospital-municipal-arcos", "name": "Hospital Municipal", "category": "Hospital", "city": "Arcos", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "fundacao-municipal-de-saude-e-assistencia-de-arcos-fumusa-arcos", "name": "Fundação Municipal de Saúde e Assistência de Arcos - FUMUSA", "category": "Clínica", "city": "Arcos", "address": "Rua Vinte e Cinco de Dezembro 20'", "phone": "+55 37 3351 1875", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento clínico", "Saúde regional"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "hospital-municipal-sao-jose-de-arcos-arcos", "name": "Hospital Municipal Sao Jose de Arcos", "category": "Hospital", "city": "Arcos", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "santa-casa-de-arcos-arcos", "name": "Santa Casa de Arcos", "category": "Hospital", "city": "Arcos", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "unidade-basica-de-saude-zona-norte-arcos", "name": "Unidade Básica de Saúde Zona Norte", "category": "Clínica", "city": "Arcos", "address": "Rua João Jovino 335", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento clínico", "Saúde regional"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "policlinica-arcos", "name": "Policlínica", "category": "Hospital", "city": "Arcos", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "farmacia-brasil-sao-roque-de-minas", "name": "Farmácia Brasil", "category": "Farmácia", "city": "São Roque de Minas", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "policlinica-municipal-sao-roque-de-minas", "name": "Policlínica Municipal", "category": "Clínica", "city": "São Roque de Minas", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento clínico", "Saúde regional"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "policlinica-municipal-avelino-rodrigues-da-silva-sao-roque-de-minas", "name": "Policlínica Municipal Avelino Rodrigues da Silva", "category": "Clínica", "city": "São Roque de Minas", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento clínico", "Saúde regional"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "hospital-municipal-sao-roque-de-minas", "name": "Hospital Municipal", "category": "Hospital", "city": "São Roque de Minas", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "hospital-municiapl-sao-roque-de-minas", "name": "Hospital Municiapl", "category": "Hospital", "city": "São Roque de Minas", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "santa-casa-de-misericordia-de-piumhi", "name": "Santa Casa de Misericórdia de Piumhi", "category": "Hospital", "city": "Piumhi", "address": "Praça Guia Lopes / região da Santa Casa", "phone": "Contato aguardando validação", "summary": "Hospital geral filantrópico de referência regional. Cadastro baseado em fonte pública e pendente de validação editorial antes da publicação comercial.", "services": ["Atendimento hospitalar", "Pronto atendimento", "Referência regional"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "samu-piumhi", "name": "SAMU Piumhi", "category": "Urgência e emergência", "city": "Piumhi", "address": "Atendimento regional / endereço operacional aguardando validação", "phone": "192", "summary": "Serviço de Atendimento Móvel de Urgência citado em fonte pública como operação iniciada em Piumhi. Cadastro institucional pendente de revisão editorial.", "services": ["Urgência", "Atendimento pré-hospitalar", "Serviço público"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "secretaria-municipal-de-saude-piumhi", "name": "Secretaria Municipal de Saúde de Piumhi", "category": "Gestão pública de saúde", "city": "Piumhi", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro institucional criado para organizar serviços e informações públicas de saúde do município antes da validação completa.", "services": ["Saúde pública", "Atenção básica", "Informação ao cidadão"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "unidade-basica-de-saude-piumhi", "name": "Unidade Básica de Saúde — Piumhi", "category": "Clínica / atenção básica", "city": "Piumhi", "address": "Unidade e endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Registro provisório para organizar a rede de atenção básica da cidade. Necessita confirmação de nome oficial, endereço e telefone.", "services": ["Atenção básica", "Prevenção", "Saúde da família"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "farmacia-nossa-senhora-aparecida-bambui", "name": "Farmácia Nossa Senhora Aparecida", "category": "Farmácia", "city": "Bambuí", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "farmacia-brasil-bambui", "name": "Farmácia Brasil", "category": "Farmácia", "city": "Bambuí", "address": "Rua José Augusto Chaves 404", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "uai-farma-bambui", "name": "Uai Farma", "category": "Farmácia", "city": "Bambuí", "address": "Rua dos Expedicionários 66", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "drogaria-souza-bambui", "name": "Drogaria Souza", "category": "Farmácia", "city": "Bambuí", "address": "Rua Alzira Torres 501", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "lugy-cosmeticos-bambui", "name": "Lugy Cosméticos", "category": "Farmácia", "city": "Bambuí", "address": "Rua dos Expedicionários 114", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "unidade-basica-de-saude-da-familia-dr-jurandir-chaves-bambui", "name": "Unidade Básica de Saúde da Família Dr. Jurandir Chaves", "category": "Clínica", "city": "Bambuí", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento clínico", "Saúde regional"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "casa-de-saude-sao-francisco-de-assis-bambui", "name": "Casa de Saúde São Francisco de Assis", "category": "Hospital", "city": "Bambuí", "address": "Endereço aguardando validação", "phone": "+55 37 34316600", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "farmacia-lima-bambui", "name": "Farmácia Lima", "category": "Farmácia", "city": "Bambuí", "address": "Rua Antero Torres 264", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "naturalfarma-bambui", "name": "Naturalfarma", "category": "Farmácia", "city": "Bambuí", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Medicamentos", "Produtos de saúde"], "logoUrl": "/placeholders/pharmacy-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},
  {"slug": "hospital-nossa-senhora-do-brasil-bambui", "name": "Hospital Nossa Senhora do Brasil", "category": "Hospital", "city": "Bambuí", "address": "Endereço aguardando validação", "phone": "Contato aguardando validação", "summary": "Cadastro importado de fonte pública para validação editorial antes da publicação definitiva.", "services": ["Atendimento hospitalar", "Serviços de saúde"], "logoUrl": "/placeholders/company-logo.svg", "coverImageUrl": "/placeholders/clinic-cover.svg"},

];

const supplementalOrganizations: Organization[] = [
  ...[
    ["Capitólio", "capitolio"],
    ["Pimenta", "pimenta"],
    ["Arcos", "arcos"],
    ["Formiga", "formiga"],
    ["Campo Belo", "campo-belo"],
    ["São Roque de Minas", "sao-roque-de-minas"],
  ].flatMap(([city, slugCity]) => [
    {
      slug: `secretaria-municipal-de-saude-${slugCity}`,
      name: `Secretaria Municipal de Saúde de ${city}`,
      category: "Gestão pública de saúde",
      city,
      address: "Endereço aguardando validação",
      phone: "Contato aguardando validação",
      summary: "Cadastro institucional criado para organizar serviços e informações públicas de saúde do município antes da validação completa.",
      services: ["Saúde pública", "Atenção básica", "Informação ao cidadão"],
      logoUrl: "/placeholders/company-logo.svg",
      coverImageUrl: "/placeholders/clinic-cover.svg",
    },
    {
      slug: `unidade-basica-de-saude-${slugCity}`,
      name: `Unidade Básica de Saúde — ${city}`,
      category: "Clínica / atenção básica",
      city,
      address: "Unidade e endereço aguardando validação",
      phone: "Contato aguardando validação",
      summary: "Registro provisório para organizar a rede de atenção básica da cidade. Necessita confirmação de nome oficial, endereço e telefone.",
      services: ["Atenção básica", "Prevenção", "Saúde da família"],
      logoUrl: "/placeholders/company-logo.svg",
      coverImageUrl: "/placeholders/clinic-cover.svg",
    },
    {
      slug: `clinica-multiprofissional-demonstrativa-${slugCity}`,
      name: `Clínica multiprofissional demonstrativa — ${city}`,
      category: "Clínica multiprofissional",
      city,
      address: "Endereço profissional aguardando validação",
      phone: "Contato aguardando validação",
      summary: "Modelo comercial para clínicas, consultórios integrados e centros de especialidades da cidade.",
      services: ["Consultas", "Atendimento multiprofissional", "Prevenção"],
      logoUrl: "/placeholders/company-logo.svg",
      coverImageUrl: "/placeholders/clinic-cover.svg",
    },
    {
      slug: `laboratorio-demonstrativo-${slugCity}`,
      name: `Laboratório demonstrativo — ${city}`,
      category: "Laboratório",
      city,
      address: "Endereço comercial aguardando validação",
      phone: "Contato aguardando validação",
      summary: "Modelo comercial para laboratórios, coleta, exames e serviços de apoio diagnóstico.",
      services: ["Exames laboratoriais", "Coleta", "Apoio diagnóstico"],
      logoUrl: "/placeholders/company-logo.svg",
      coverImageUrl: "/placeholders/clinic-cover.svg",
    },
    {
      slug: `farmacia-demonstrativa-${slugCity}`,
      name: `Farmácia demonstrativa — ${city}`,
      category: "Farmácia",
      city,
      address: "Endereço comercial aguardando validação",
      phone: "Contato aguardando validação",
      summary: "Modelo comercial para farmácias, drogarias e serviços de orientação em saúde.",
      services: ["Medicamentos", "Produtos de saúde", "Atenção farmacêutica"],
      logoUrl: "/placeholders/pharmacy-logo.svg",
      coverImageUrl: "/placeholders/clinic-cover.svg",
    },
  ]),
];

// Estabelecimentos REAIS de Piumhi importados de fontes públicas (25/07/2026).
// Dado de empresa; contato só quando público. Pendente de validação editorial.
const piumhiImportedOrganizations: Organization[] = [
  { slug: "oraldents-piumhi", name: "OralDents Piumhi", category: "Clínica odontológica", city: "Piumhi", address: "Rua Armando Viotti, 404, Centro", phone: "(37) 3412-0480", summary: "Cadastro importado de fonte pública (site da clínica), pendente de validação editorial antes da publicação definitiva.", services: ["Odontologia geral", "Prevenção", "Saúde bucal"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.oraldentspiumhi.com.br/", website: "https://www.oraldentspiumhi.com.br/" },
  { slug: "odontologia-menezes-e-novaes-piumhi", name: "Odontologia Menezes e Novaes", category: "Clínica odontológica", city: "Piumhi", address: "Praça Guia Lopes, 324, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (Econodata, CNPJ 08.209.129/0001-16), pendente de validação editorial antes da publicação definitiva.", services: ["Odontologia especializada", "Prevenção"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.econodata.com.br/consulta-empresa/08209129000116-clinica-odontologica-menezes-e-novaes-ltda" },
  { slug: "centro-medico-odontologico-de-piumhi", name: "Centro Médico Odontológico de Piumhi", category: "Clínica odontológica", city: "Piumhi", address: "Endereço aguardando validação", phone: "(37) 3371-1089", summary: "Cadastro importado de fonte pública (ClickDisk), pendente de validação editorial antes da publicação definitiva.", services: ["Atendimento odontológico", "Atendimento médico"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.clickdisk.com.br/telefone/piumhi/centro-medico-odontologico-de-piumhi" },
  { slug: "clinica-sao-rafael-unimed-piumhi", name: "Clínica São Rafael (Unimed)", category: "Clínica multiprofissional", city: "Piumhi", address: "Praça Guia Lopes, 248, Centro", phone: "(37) 3371-1088", summary: "Contato público associado à unidade, confirmado em material institucional da Santa Casa de Misericórdia de Piumhi. Demais informações do cadastro permanecem em revisão editorial.", services: ["Consultas", "Atendimento multiprofissional", "Convênio Unimed"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.santacasapiumhi.com.br/_files/ugd/cf977d_cea3da1b207f412d961c37652d6d2854.pdf" },
  { slug: "phd-piumhi-hospital-dia", name: "PHD Piumhi Hospital Dia", category: "Hospital", city: "Piumhi", address: "Praça Guia Lopes, 278, Centro", phone: "(37) 3412-0075", summary: "Contato público confirmado no site oficial do PHD Piumhi Hospital Dia. Demais informações do cadastro permanecem em revisão editorial.", services: ["Centro cirúrgico", "Exames de imagem", "Especialidades"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://phdhospitaldia.com.br/acessos/", website: "https://phdhospitaldia.com.br/" },
  { slug: "vitalcentro-especialidades-medicas-piumhi", name: "Vitalcentro Especialidades Médicas", category: "Clínica multiprofissional", city: "Piumhi", address: "Praça Tuiuti, 160, 2º andar, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (CatalogoMed), pendente de validação editorial antes da publicação definitiva.", services: ["Especialidades médicas", "Consultas"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "clinica-ophtalmocenter-piumhi", name: "Clínica Ophtalmocenter", category: "Clínica multiprofissional", city: "Piumhi", address: "Praça Tuiuti, 160, 2º andar, Centro", phone: "(37) 3371-2626", summary: "Contato público listado para a unidade na Praça Tuiuti. Demais informações do cadastro permanecem em revisão editorial.", services: ["Oftalmologia", "Saúde ocular"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://ophtalmocenter.com.br/", website: "https://ophtalmocenter.com.br/" },
  { slug: "clinica-do-coracao-piumhi", name: "Clínica do Coração", category: "Clínica multiprofissional", city: "Piumhi", address: "Rua Armando Viotti, 190, salas 103 e 104, Centro", phone: "(37) 3371-1344", summary: "Contato público confirmado em base atualizada do Cadastro Nacional de Estabelecimentos de Saúde. Demais informações do cadastro permanecem em revisão editorial.", services: ["Cardiologia", "Cirurgia cardiovascular"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://cnes2.datasus.gov.br/" },
  { slug: "clinica-salutare-piumhi", name: "Clínica Salutare", category: "Clínica multiprofissional", city: "Piumhi", address: "Rua Padre Abel, 126, 2º andar, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (CatalogoMed), pendente de validação editorial antes da publicação definitiva.", services: ["Especialidades médicas", "Otorrinolaringologia"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.catalogo.med.br/medicos/em-piumhi-mg" },
  { slug: "nucleo-dermatologico-cirurgico-piumhi", name: "Núcleo Dermatológico Cirúrgico", category: "Clínica multiprofissional", city: "Piumhi", address: "Praça Tuiuti, 114, Centro", phone: "(37) 3371-1054", summary: "Contato público confirmado no Cadastro Nacional de Estabelecimentos de Saúde. Demais informações do cadastro permanecem em revisão editorial.", services: ["Dermatologia", "Pequenas cirurgias"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://cnes2.datasus.gov.br/Mod_Ambulatorial.asp?VCo_Unidade=3151503685160" },
  { slug: "borboletando-clinica-reabilitacao-piumhi", name: "Borboletando Clínica Multidisciplinar de Reabilitação", category: "Clínica multiprofissional", city: "Piumhi", address: "Rua Armando Viotti, 373, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (Doctoralia), pendente de validação editorial antes da publicação definitiva.", services: ["Fisioterapia", "Reabilitação", "Psicologia"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.doctoralia.com.br/fisioterapeuta/piumhi" },
  { slug: "recovery-fisioterapia-piumhi", name: "Recovery Fisioterapia Ortopédica e Esportiva", category: "Clínica multiprofissional", city: "Piumhi", address: "Rua Conselheiro Lafaiete, 569, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (Econodata, CNPJ 42.768.260/0001-51), pendente de validação editorial antes da publicação definitiva.", services: ["Fisioterapia ortopédica", "Fisioterapia esportiva"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.econodata.com.br/consulta-empresa/42768260000151-recovery-fisioterapia-ltda" },
  { slug: "recuperarte-fisioterapia-estetica-piumhi", name: "Recuperarte Fisioterapia e Estética", category: "Estética e bem-estar", city: "Piumhi", address: "Rua Dom Pedro II, 52, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública, pendente de validação editorial antes da publicação definitiva.", services: ["Fisioterapia", "Estética"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://painelwebservice.cfa.org.br/?c=pesquisa&a=show&id=935" },
  { slug: "fisiocenter-piumhi", name: "Fisiocenter — Fisioterapia e Quiropraxia", category: "Clínica multiprofissional", city: "Piumhi", address: "Endereço aguardando validação", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (Cliquei Achei), pendente de validação editorial antes da publicação definitiva.", services: ["Fisioterapia", "Quiropraxia"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.cliqueiachei.com.br/telefone/piumhi/mg/fisiocenter" },
  { slug: "clinica-moviment-piumhi", name: "Clínica Moviment (Pilates Studio)", category: "Academia e atividade física", city: "Piumhi", address: "Rua Luiz Ferreira Belo, 28, São Francisco", phone: "(37) 3412-1265", summary: "Cadastro importado de fonte pública, pendente de validação editorial antes da publicação definitiva.", services: ["Pilates", "Fisioterapia", "Condicionamento"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.facebook.com/clinicaamoviment/" },
  { slug: "sport-mais-academia-piumhi", name: "Sport Mais Academia", category: "Academia e atividade física", city: "Piumhi", address: "Rua Santo Antônio, 459, Centro", phone: "(37) 99967-4588", summary: "Academia com contato público listado em diretório comercial local. Informações complementares permanecem em revisão editorial.", services: ["Musculação", "Condicionamento físico"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.cylex.com.br/piumhi/academia.html" },
  { slug: "rfitness-piumhi", name: "RFitness Saúde & Bem-Estar", category: "Academia e atividade física", city: "Piumhi", address: "Rua Nossa Senhora do Livramento, 612, Centro", phone: "(37) 3371-2800", summary: "Academia com contato público listado em diretório comercial local. Informações complementares permanecem em revisão editorial.", services: ["Musculação", "Bem-estar", "Condicionamento físico"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.cylex.com.br/piumhi/academia.html" },
  { slug: "oficina-do-corpo-piumhi", name: "Oficina do Corpo", category: "Academia e atividade física", city: "Piumhi", address: "Rua Dom Pedro II, 476, Centro", phone: "(37) 99914-1357", summary: "Academia com contato público listado em diretório comercial local. Informações complementares permanecem em revisão editorial.", services: ["Musculação", "Condicionamento físico"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.cylex.com.br/piumhi/academia.html" },
  { slug: "mergulho-natacao-piumhi", name: "Mergulho Natação", category: "Academia e atividade física", city: "Piumhi", address: "Rua Nossa Senhora do Livramento, 611, Centro", phone: "(37) 3371-5382", summary: "Escola de natação com contato público listado em diretório comercial local. Informações complementares permanecem em revisão editorial.", services: ["Natação", "Hidroginástica", "Atividade física"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.cylex.com.br/piumhi/academia.html" },
  { slug: "piumhi-tenis-clube-academia", name: "Piumhi Tênis Clube — Academia", category: "Academia e atividade física", city: "Piumhi", address: "Avenida Francisco Machado, 900, Bairro Aeroporto", phone: "(37) 3371-3944", summary: "Academia do Piumhi Tênis Clube, com contato publicado no site oficial da instituição.", services: ["Academia", "Atividade física", "Clube esportivo"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://ptc.com.br/academia/", website: "https://ptc.com.br/academia/" },
  { slug: "academia-equilibrio-piumhi", name: "Academia Equilíbrio", category: "Academia e atividade física", city: "Piumhi", address: "Praça Dr. Avelino de Queiróz, 153, Centro", phone: "(37) 99912-7034", summary: "Academia com contato público e endereço apresentados em plataforma de benefícios corporativos.", services: ["Treino funcional", "Muay Thai", "Condicionamento físico"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://wellhub.com/pt-br/search/partners/academia-equilibrio-0db85900-66cd-4ba9-8f30-89fdadf4d5d9/" },
  { slug: "clinica-mais-saude-gms-piumhi", name: "Clínica Mais Saúde GMS", category: "Clínica multiprofissional", city: "Piumhi", address: "Rua Padre Abel, 191 e 194, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (Doctoralia), pendente de validação editorial antes da publicação definitiva.", services: ["Psicologia", "Nutrição", "Especialidades"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "clinapsi-clinica-de-psicologia-piumhi", name: "Clinapsi Clínica de Psicologia", category: "Clínica multiprofissional", city: "Piumhi", address: "Rua Conselheiro Lafaiete, 237, Centro", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (Doctoralia), pendente de validação editorial antes da publicação definitiva.", services: ["Psicologia", "Atendimento individual"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://www.doctoralia.com.br/psicologo/piumhi" },
  { slug: "clinica-psicologica-goncalves-piumhi", name: "Clínica Psicológica Gonçalves", category: "Clínica multiprofissional", city: "Piumhi", address: "Centro — endereço a validar", phone: "Contato a validar", summary: "Cadastro importado de fonte pública (CNES 4475100), pendente de validação editorial antes da publicação definitiva.", services: ["Psicologia", "Atenção básica"], logoUrl: "/placeholders/company-logo.svg", coverImageUrl: "/placeholders/clinic-cover.svg", source: "https://consultacnes.com/estabelecimento/4475100-clinica-psicologica-goncalves-ltda-piumhi-mg" },
];

/**
 * Fonte pública única de clínicas e serviços.
 *
 * A lista bruta acima é mantida apenas como histórico editorial. Somente os
 * registros abaixo, com fonte e telefone públicos conferidos, chegam ao site.
 * Itens em apuração continuam fora do diretório até a confirmação da equipe.
 */
const publishedOrganizationConfig: Record<string, Partial<Organization>> = {
  "oraldents-piumhi": { categoryKey: "odontologia", subcategories: ["Clínica odontológica"], keywords: ["dentista", "odontologia", "saúde bucal"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 10 },
  "centro-medico-odontologico-de-piumhi": { categoryKey: "odontologia", subcategories: ["Clínica odontológica"], keywords: ["dentista", "odontologia"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 20 },
  "clinica-sao-rafael-unimed-piumhi": { categoryKey: "clinicas", subcategories: ["Clínica multiprofissional"], keywords: ["clínica", "unimed", "especialidades"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 30 },
  "phd-piumhi-hospital-dia": { categoryKey: "hospitais", subcategories: ["Hospital", "Diagnóstico por imagem"], keywords: ["hospital", "exames", "imagem", "diagnóstico"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 40 },
  "clinica-ophtalmocenter-piumhi": { categoryKey: "clinicas", subcategories: ["Clínica multiprofissional"], keywords: ["clínica", "oftalmologia", "olhos"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 50 },
  "clinica-do-coracao-piumhi": { categoryKey: "clinicas", subcategories: ["Clínica multiprofissional"], keywords: ["clínica", "cardiologia", "coração"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 60 },
  "nucleo-dermatologico-cirurgico-piumhi": { categoryKey: "clinicas", subcategories: ["Clínica multiprofissional"], keywords: ["clínica", "dermatologia"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 70 },
  "clinica-moviment-piumhi": { categoryKey: "pilates", subcategories: ["Academia e atividade física"], keywords: ["pilates", "fisioterapia", "atividade física"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 80 },
  "sport-mais-academia-piumhi": { categoryKey: "academias", subcategories: ["Academia e atividade física"], keywords: ["academia", "musculação", "atividade física"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 90 },
  "rfitness-piumhi": { categoryKey: "academias", subcategories: ["Academia e atividade física"], keywords: ["academia", "musculação", "atividade física"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 100 },
  "oficina-do-corpo-piumhi": { categoryKey: "academias", subcategories: ["Academia e atividade física"], keywords: ["academia", "musculação", "atividade física"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 110 },
  "mergulho-natacao-piumhi": { categoryKey: "academias", subcategories: ["Academia e atividade física"], keywords: ["natação", "hidroginástica", "academia", "atividade física"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 120 },
  "piumhi-tenis-clube-academia": { categoryKey: "academias", subcategories: ["Academia e atividade física"], keywords: ["academia", "atividade física", "clube"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 130 },
  "academia-equilibrio-piumhi": { categoryKey: "academias", subcategories: ["Academia e atividade física"], keywords: ["academia", "treino funcional", "atividade física"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 140 },
  "drogaria-americana-piumhi": { categoryKey: "farmacias", subcategories: ["Farmácia"], keywords: ["farmácia", "drogaria", "medicamentos"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 150 },
  "central-otica-piumhi": { categoryKey: "oticas", subcategories: ["Ótica"], keywords: ["ótica", "óculos", "lentes", "visão"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 160 },
  "barufarma-piumhi": { categoryKey: "farmacias", subcategories: ["Farmácia de manipulação"], keywords: ["farmácia", "manipulação", "medicamentos"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 170 },
  "solucao-farma-piumhi": { categoryKey: "farmacias", subcategories: ["Farmácia"], keywords: ["farmácia", "drogaria", "medicamentos"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 180 },
  "certus-laboratorio-piumhi": { categoryKey: "laboratorios", subcategories: ["Análises clínicas"], keywords: ["laboratório", "exames", "análises clínicas", "coleta"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 190 },
  "primelab-piumhi": { categoryKey: "laboratorios", subcategories: ["Análises clínicas"], keywords: ["laboratório", "exames", "análises clínicas", "coleta"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 200 },
  "santa-casa-piumhi": { categoryKey: "hospitais", subcategories: ["Hospital filantrópico"], keywords: ["hospital", "santa casa", "atendimento hospitalar"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 210 },
  "centro-reabilitacao-hidroterapia-piumhi": { categoryKey: "fisioterapia-reabilitacao", subcategories: ["Reabilitação"], keywords: ["fisioterapia", "reabilitação", "hidroterapia"], verificationStatus: "public-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 220 },
  "secretaria-municipal-saude-piumhi": { categoryKey: "servicos-publicos", subcategories: ["Gestão pública de saúde"], keywords: ["saúde pública", "secretaria", "sus", "orientação"], verificationStatus: "official-source", publicationStatus: "published", lastVerifiedAt: "2026-08-28", displayOrder: 230 },
};

const vettedLocalOrganizations: Organization[] = [
  { slug: "drogaria-americana-piumhi", name: "Drogaria Americana", category: "Farmácia", city: "Piumhi", address: "Rua Padre Abel, 365, Centro", phone: "(37) 3371-1122", summary: "", services: ["Medicamentos", "Produtos de saúde"], source: "https://farmaciaqui.net/drogaria-americana-piumhi-mg-79529/amp" },
  { slug: "central-otica-piumhi", name: "Central Ótica", category: "Ótica", city: "Piumhi", address: "Rua Padre Abel, 358, Centro", phone: "(37) 3371-2608", summary: "", services: ["Óculos", "Lentes", "Saúde visual"], source: "https://br.todosnegocios.com/pt/central-%C3%B3tica_45-37-3371-2608" },
  { slug: "barufarma-piumhi", name: "Barufarma", category: "Farmácia de manipulação", city: "Piumhi", address: "Rua Santo Antônio, 62, Centro", phone: "(37) 98825-9083", whatsapp: "https://wa.me/5537988259083", summary: "", services: ["Manipulação", "Produtos farmacêuticos"], source: "https://manipulacaobarufarma.com.br/", website: "https://manipulacaobarufarma.com.br/" },
  { slug: "solucao-farma-piumhi", name: "Solução Farma", category: "Farmácia", city: "Piumhi", address: "Rua Armando Viotti, 135, Centro", phone: "(37) 3371-7888", whatsapp: "https://wa.me/553733717888", summary: "", services: ["Medicamentos", "Produtos farmacêuticos"], source: "https://solucaofarma.com.br/contato/", website: "https://solucaofarma.com.br/" },
  { slug: "certus-laboratorio-piumhi", name: "Certus Laboratório", category: "Laboratório", city: "Piumhi", address: "Praça Guia Lopes, 54, Centro — anexo à Santa Casa", phone: "(37) 3371-9511", whatsapp: "https://wa.me/5537999650200", summary: "", services: ["Análises clínicas", "Exames laboratoriais"], source: "https://www.certuslaboratorio.com.br/contato", website: "https://www.certuslaboratorio.com.br/" },
  { slug: "primelab-piumhi", name: "PrimeLab", category: "Laboratório", city: "Piumhi", address: "Rua Getúlio Vargas, 307, Centro", phone: "(37) 99967-0601", summary: "", services: ["Análises clínicas", "Exames laboratoriais"], source: "https://primelabpains.com.br/index", website: "https://primelabpains.com.br/" },
  { slug: "santa-casa-piumhi", name: "Santa Casa de Misericórdia de Piumhi", category: "Hospital", city: "Piumhi", address: "Praça Guia Lopes, 53, Centro", phone: "(37) 3371-9500", summary: "", services: ["Atendimento hospitalar", "Serviços de saúde"], source: "https://www.mg.gov.br/instituicao_unidade/santa-casa-de-misericordia-de-piumhi", website: "https://www.santacasapiumhi.com.br/" },
  { slug: "centro-reabilitacao-hidroterapia-piumhi", name: "Centro de Reabilitação e Hidroterapia José Rodrigues de Carvalho", category: "Fisioterapia e reabilitação", city: "Piumhi", address: "Rua São Vicente, 954, Vila Nova", phone: "(37) 3371-2738", summary: "", services: ["Reabilitação", "Hidroterapia", "Fisioterapia"], source: "https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=3151502147386" },
  { slug: "secretaria-municipal-saude-piumhi", name: "Secretaria Municipal de Saúde de Piumhi", category: "Serviço público de saúde", city: "Piumhi", address: "Praça Dr. Avelino de Queiroz, 75, Centro", phone: "(37) 3371-9250", summary: "", services: ["Orientações de saúde", "Gestão pública de saúde"], source: "https://prefeiturapiumhi.mg.gov.br/", website: "https://prefeiturapiumhi.mg.gov.br/" },
];

function mapSearchUrl(organization: Organization) {
  if (!organization.address || /(aguardando validação|a validar|a confirmar)/i.test(organization.address)) return undefined;
  const query = [organization.name, organization.address, organization.city, "MG"].join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const organizations: Organization[] = [...piumhiImportedOrganizations, ...vettedLocalOrganizations]
  .filter((org) => Boolean(publishedOrganizationConfig[org.slug]))
  .map((org) => ({
    ...org,
    ...publishedOrganizationConfig[org.slug],
    summary: `Informações públicas reunidas a partir da fonte indicada. Confirme detalhes diretamente com ${org.name}.`,
    sourceUrls: org.source ? [org.source] : [],
    updatedAt: org.lastVerifiedAt,
    relationship: "organic" as const,
    mapUrl: org.mapUrl ?? mapSearchUrl(org),
  }))
  .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));

export { cityNames as cities, cityDetails } from "./cities";
export const professions = ["Médico", "Dentista", "Psicólogo", "Fisioterapeuta", "Nutricionista", "Fonoaudiólogo", "Enfermeiro", "Farmacêutico", "Educador físico"];

// Logos das empresas apoiadoras exibidas nas páginas.
// EXEMPLOS (public/supporters/*.png, fundo transparente). Troque pelos PNGs
// reais das empresas — basta adicionar o arquivo e a entrada aqui.
// Sem apoiadores comerciais confirmados, a faixa permanece inativa na produção.
export const supporters: { name: string; logo: string }[] = [];

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  city: string;
  author?: string;
  authorRole?: string;
  date?: string;
  readingTime?: string;
  episodeSlug?: string;
  professionalSlug?: string;
  imageUrl?: string;
  body?: string[];
};

// Matérias editoriais do Guia Saúde. Boa parte nasce das conversas do podcast
// Conexão Saúde (Rede Megga / Revista Guia Saúde), com os mesmos especialistas
// da região — conteúdo informativo, sem substituir avaliação profissional.
export const articles: Article[] = [
  {
    slug: "radiologia-odontologica-diagnostico",
    category: "Saúde bucal",
    title: "Radiologia odontológica: como a imagem orienta o tratamento",
    excerpt: "Radiografias e tomografias ajudam o dentista a enxergar o que o olho não alcança — e a planejar com segurança.",
    city: "Regional",
    author: "Rodrigo Soares Costa",
    authorRole: "Tecnólogo em radiologia",
    date: "13 de julho de 2026",
    readingTime: "5 min de leitura",
    episodeSlug: "radiologia-odontologica",
    body: [
      "Boa parte das decisões em odontologia começa antes da primeira intervenção: na imagem. Radiografias panorâmicas, periapicais e tomografias mostram raízes, ossos, seios da face e estruturas que não aparecem no exame clínico, permitindo diagnósticos mais precisos e planejamentos mais seguros.",
      "A tecnologia digital tornou esses exames mais rápidos e com menor dose de radiação do que as versões analógicas. Ainda assim, o pedido deve ser individualizado: cada exame tem indicação específica, e repetir imagens sem necessidade não traz benefício. Cabe ao profissional definir o que realmente contribui para o caso.",
      "Do implante ao tratamento de canal, passando por ortodontia e cirurgias, a imagem funciona como um mapa. Entender esse papel ajuda o paciente a compreender por que o exame é solicitado e como ele encurta o caminho até o tratamento certo.",
    ],
  },
  {
    slug: "fisioterapia-respiratoria-quando-buscar",
    category: "Reabilitação",
    title: "Fisioterapia respiratória: para quem é e quando procurar",
    excerpt: "Da UTI ao acompanhamento em casa, ela ajuda a respirar melhor em diferentes fases da vida.",
    city: "Regional",
    author: "Ivana Oliveira Rezende",
    authorRole: "Fisioterapeuta",
    date: "7 de abril de 2026",
    readingTime: "5 min de leitura",
    episodeSlug: "fisioterapia-respiratoria-ivana-rezende",
    body: [
      "A fisioterapia respiratória vai muito além do ambiente hospitalar. Ela é indicada no pós-operatório, no acompanhamento de doenças crônicas como asma e DPOC, na recuperação de quadros respiratórios e também em bebês e idosos, cada um com técnicas e objetivos próprios.",
      "O trabalho combina exercícios de expansão pulmonar, higiene brônquica e reeducação da respiração. O objetivo é melhorar a oxigenação, reduzir secreções e devolver autonomia — sempre a partir de uma avaliação que considera o histórico e o momento da pessoa.",
      "Procurar avaliação faz sentido diante de falta de ar recorrente, recuperação de internações ou orientação médica após cirurgias. Quanto mais cedo o acompanhamento começa, mais confortável costuma ser a recuperação.",
    ],
  },
  {
    slug: "cuidados-com-a-pele-dermatologia",
    category: "Pele",
    title: "Cuidado com a pele sem filtro: o básico que faz diferença",
    excerpt: "Proteção solar, constância e avaliação profissional valem mais do que qualquer tendência.",
    city: "Regional",
    author: "Gabriela Oliveira",
    authorRole: "Dermatologista",
    date: "28 de abril de 2026",
    readingTime: "4 min de leitura",
    episodeSlug: "dermatologia-sem-filtro-gabriela-oliveira",
    body: [
      "A pele é o maior órgão do corpo e o primeiro a sinalizar mudanças na saúde. Uma rotina simples — limpeza adequada, hidratação e, principalmente, proteção solar diária — sustenta a maior parte dos bons resultados, independentemente da idade.",
      "Tendências de skincare mudam o tempo todo, mas nem todo produto serve para todo tipo de pele. O que funciona para uma pessoa pode irritar outra. Por isso a avaliação individual evita gastos desnecessários e reações indesejadas.",
      "Manchas que mudam de cor ou formato, feridas que não cicatrizam e pintas novas merecem atenção. A consulta dermatológica não é apenas estética: é também prevenção, inclusive do câncer de pele.",
    ],
  },
  {
    slug: "vida-saudavel-pequenas-mudancas",
    category: "Alimentação",
    title: "Vida saudável na prática: pequenas mudanças que se sustentam",
    excerpt: "Menos dietas radicais, mais hábitos possíveis de manter no dia a dia.",
    city: "Regional",
    author: "Daisy Faria",
    authorRole: "Nutricionista",
    date: "10 de março de 2026",
    readingTime: "4 min de leitura",
    episodeSlug: "vida-saudavel-na-pratica-daisy-faria",
    body: [
      "Mudar a alimentação raramente funciona quando começa por proibições. O que costuma durar são ajustes pequenos: mais comida de verdade, mais água, mais constância. Passos que cabem na rotina têm muito mais chance de virar hábito.",
      "Dietas muito restritivas prometem resultado rápido, mas costumam cobrar caro depois. A orientação individual leva em conta rotina, preferências, condições de saúde e objetivos — e é isso que torna a mudança sustentável.",
      "Sono, movimento e relação com a comida também fazem parte do cuidado. Saúde não é um cardápio perfeito, e sim um conjunto de escolhas viáveis repetidas ao longo do tempo.",
    ],
  },
  {
    slug: "respiracao-na-infancia-sinais",
    category: "Saúde infantil",
    title: "Respiração na infância: quando se preocupar",
    excerpt: "Roncos, boca aberta e sono agitado podem ser mais do que um resfriado passageiro.",
    city: "Regional",
    author: "Nayara Garcia",
    authorRole: "Pediatra e pneumologista infantil",
    date: "24 de março de 2026",
    readingTime: "5 min de leitura",
    episodeSlug: "respiracao-na-infancia-nayara-garcia",
    body: [
      "Respirar pela boca com frequência, roncar, dormir agitado e acordar cansado não são detalhes sem importância na infância. Esses sinais podem indicar obstruções ou alergias que interferem no sono, no crescimento e até no rendimento escolar.",
      "A chamada respiração bucal crônica pode afetar o desenvolvimento da face e da arcada dentária. Identificar a causa cedo — seja alergia, adenoide ou outro fator — amplia as opções de tratamento e evita complicações.",
      "Diante de sintomas persistentes, a avaliação pediátrica é o ponto de partida. A partir dela, o acompanhamento pode envolver diferentes especialidades, sempre com foco no bem-estar da criança.",
    ],
  },
  {
    slug: "implantodontia-reabilitacao-oral",
    category: "Saúde bucal",
    title: "Implantodontia e reabilitação oral: recuperar função e confiança",
    excerpt: "Repor dentes vai além da estética — envolve mastigação, fala e saúde bucal a longo prazo.",
    city: "Regional",
    author: "Lívia Pereira",
    authorRole: "Dentista e implantodontista",
    date: "29 de junho de 2026",
    readingTime: "4 min de leitura",
    episodeSlug: "implantodontia-livia-pereira",
    body: [
      "A perda de dentes afeta muito mais do que o sorriso: compromete a mastigação, a fala e, com o tempo, a estrutura óssea da região. A reabilitação oral busca devolver essas funções com planejamento individualizado.",
      "Os implantes são uma das soluções mais estáveis, mas dependem de avaliação da saúde bucal e óssea de cada pessoa. Nem todo caso é igual, e o plano de tratamento considera histórico, expectativas e condições clínicas.",
      "O cuidado não termina na colocação. Higiene adequada e acompanhamento periódico são o que garantem durabilidade e saúde ao longo dos anos.",
    ],
  },
  {
    slug: "uso-consciente-de-medicamentos",
    category: "Uso de medicamentos",
    title: "Quando o remédio vira solução para tudo",
    excerpt: "A automedicação parece prática, mas pode mascarar problemas e criar novos.",
    city: "Regional",
    author: "Daniela Melo",
    authorRole: "Farmacêutica",
    date: "26 de maio de 2026",
    readingTime: "5 min de leitura",
    episodeSlug: "medicalizacao-da-vida-daniela-melo",
    body: [
      "Ter um remédio para cada desconforto tornou-se quase automático. Mas usar medicamentos sem indicação pode aliviar o sintoma e esconder a causa — além de trazer riscos de interação, dependência e efeitos colaterais.",
      "O uso racional passa por entender que nem todo mal-estar precisa de comprimido, e que cada medicamento tem dose, tempo e finalidade. O farmacêutico é um apoio importante nessa orientação, junto do acompanhamento médico.",
      "Guardar bulas, respeitar prazos de validade e não compartilhar receitas são cuidados simples que fazem diferença. Informação responsável é o que separa o alívio seguro do risco desnecessário.",
    ],
  },
  {
    slug: "vinculos-afetivos-saude-mental",
    category: "Saúde mental",
    title: "Vínculos afetivos: por que eles cuidam da saúde",
    excerpt: "Em uma rotina cada vez mais acelerada, manter laços é também uma forma de prevenção.",
    city: "Regional",
    author: "Cintia Bonisson",
    authorRole: "Psicanalista",
    date: "12 de maio de 2026",
    readingTime: "5 min de leitura",
    episodeSlug: "vinculos-afetivos-cintia-bonisson",
    body: [
      "A vida contemporânea aproxima telas e afasta pessoas. A ausência de vínculos afetivos consistentes tem efeitos reais sobre o bem-estar, e aparece com frequência em quadros de ansiedade, solidão e sofrimento emocional.",
      "Relações de confiança funcionam como rede de apoio: ajudam a atravessar perdas, decisões e momentos difíceis. Cultivá-las exige presença e tempo, algo que a rotina costuma disputar.",
      "Reconhecer quando o sofrimento passa do limite do cotidiano e buscar apoio profissional é um gesto de cuidado, não de fraqueza. Saúde mental também se constrói nas conexões que sustentamos.",
    ],
  },
  {
    slug: "terapia-regenerativa-lesoes",
    category: "Ortopedia",
    title: "Terapia regenerativa no tratamento de lesões",
    excerpt: "Recursos que estimulam a recuperação dos tecidos ganham espaço na ortopedia.",
    city: "Piumhi",
    author: "Dr. Diego Mota Fernandes",
    authorRole: "Médico ortopedista",
    date: "20 de agosto de 2025",
    readingTime: "5 min de leitura",
    episodeSlug: "terapia-regenerativa-diego-mota-fernandes",
    professionalSlug: "dr-diego-mota-fernandes-ortopedia-piumhi",
    body: [
      "Lesões articulares e de tecidos moles são comuns e nem sempre respondem apenas ao repouso. A terapia regenerativa reúne abordagens que buscam estimular a recuperação natural dos tecidos, com foco em reduzir dor e melhorar a função.",
      "Essas técnicas fazem parte de um plano maior, que costuma incluir avaliação criteriosa, fisioterapia e mudanças de hábito. Não são soluções mágicas: a indicação depende do tipo de lesão, do estágio e das características de cada paciente.",
      "O acompanhamento ortopédico é o que define se e quando esses recursos fazem sentido. Entender as opções ajuda o paciente a participar das decisões sobre o próprio tratamento.",
    ],
  },
  {
    slug: "cirurgia-refrativa-enxergar-sem-oculos",
    category: "Oftalmologia",
    title: "Cirurgia refrativa: enxergar sem óculos, com critério",
    excerpt: "Corrigir grau é possível para muitos casos — mas depende de avaliação individual.",
    city: "Piumhi",
    author: "Dr. Paulo Henrique Faria",
    authorRole: "Oftalmologista",
    date: "5 de agosto de 2025",
    readingTime: "5 min de leitura",
    episodeSlug: "cirurgia-refrativa-paulo-henrique-faria",
    professionalSlug: "dr-paulo-henrique-faria-silva-oftalmologia-piumhi",
    body: [
      "A cirurgia refrativa corrige graus de miopia, hipermetropia e astigmatismo, e para muitas pessoas representa a possibilidade de reduzir ou dispensar os óculos. Mas não é indicada para todos, e a decisão começa por uma avaliação detalhada.",
      "Estabilidade do grau, saúde da córnea e histórico ocular entram na conta. Exames pré-operatórios definem se o procedimento é seguro e qual técnica é mais adequada para cada olho.",
      "Como todo procedimento, tem indicações, cuidados e limites. Conversar com o oftalmologista sobre expectativas e riscos é o que torna a escolha consciente.",
    ],
  },
  {
    slug: "prevencao-na-rotina",
    category: "Prevenção",
    title: "Como transformar prevenção em parte da rotina",
    excerpt: "Consultas em dia, exames de acompanhamento e atenção aos sinais do corpo evitam problemas maiores.",
    city: "Regional",
    author: "Redação Guia Saúde",
    date: "2026",
    readingTime: "3 min de leitura",
    body: [
      "Prevenção raramente é urgente — e talvez por isso seja tão adiada. Consultas de rotina, exames periódicos e vacinação em dia formam a base de um cuidado que evita que problemas simples se tornem graves.",
      "Cada fase da vida tem suas prioridades, da infância à terceira idade. Manter um profissional de referência ajuda a organizar esse acompanhamento de forma contínua, e não apenas quando algo dói.",
      "O Guia Saúde reúne profissionais e serviços da região para tornar esse primeiro passo mais fácil. Informação de qualidade é o começo de qualquer decisão de saúde.",
    ],
  },
];

// Episódios reais do podcast Conexão Saúde (Revista Guia Saúde / Rede Megga),
// coletados do Instagram @saudeguia (25/07/2026). Terças, 19h, ao vivo na Rede
// Megga (YouTube) com recortes em Spotify, TikTok, Facebook e Instagram.
export type PodcastEpisode = {
  slug: string;
  guest: string;
  role: string;
  topic: string;
  date: string;
  duration: string;
  status: string;
  episodeUrl?: string;
  imageUrl?: string;
  professionalSlugs?: string[];
};

export const podcasts: PodcastEpisode[] = [
  { slug: "fisioterapia-pelvica-gabriela-araujo", imageUrl: "/podcast/gabriela-araujo-fisioterapia-pelvica-horizontal.png", guest: "Gabriela Araújo", role: "Fisioterapeuta pélvica", topic: "Fisioterapia pélvica: cuidado, saúde e qualidade de vida", date: "25 de agosto de 2026", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=z-ZKXSwY3-A" },
  { slug: "estetica-regenerativa-patricia-terra", imageUrl: "/podcast/patricia-terra-estetica-regenerativa-horizontal.png", guest: "Patrícia Terra", role: "Especialista em Dentística e Harmonização Orofacial", topic: "Estética regenerativa: a nova era da harmonização facial e da estética do sorriso", date: "11 de agosto de 2026", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=uz1cICn0iks" },
  { slug: "endocrinologia-simone-mota-bonisson", imageUrl: "/podcast/simone-bonisson-endocrinologia-horizontal.png", guest: "Simone Mota Bonisson", role: "Endocrinologista", topic: "Endocrinologia em foco: hormônios, metabolismo e qualidade de vida", date: "28 de julho de 2026", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=-LaH9x_sgl8" },
  { slug: "radiologia-odontologica", imageUrl: "/podcast/radiologia-odontologica.jpg", guest: "Rodrigo Soares Costa", role: "Tecnólogo em radiologia", topic: "Radiologia odontológica: como a tecnologia transforma os tratamentos dentários", date: "13 de julho", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=w1tyFA2uzMA" },
  { slug: "implantodontia-livia-pereira", imageUrl: "/podcast/implantodontia-livia-pereira.jpg", guest: "Lívia Pereira", role: "Dentista e implantodontista", topic: "Implantodontia, reabilitação oral e saúde bucal", date: "29 de junho", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=VGX9Udr2xFE" },
  { slug: "blefaroplastia-mirian-sansoni", imageUrl: "/podcast/blefaroplastia-mirian-sansoni.jpg", guest: "Mírian L. Sansoni", role: "Oftalmologista", topic: "Blefaroplastia: saúde, estética e qualidade de vida", date: "9 de junho", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=CRBDdkVOm8k" },
  { slug: "medicalizacao-da-vida-daniela-melo", imageUrl: "/podcast/medicalizacao-da-vida-daniela-melo.jpg", guest: "Daniela Melo", role: "Farmacêutica", topic: "A medicalização da vida: quando o remédio vira solução para tudo", date: "26 de maio", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=zZxHOHky9us" },
  { slug: "vinculos-afetivos-cintia-bonisson", imageUrl: "/podcast/vinculos-afetivos-cintia-bonisson.jpg", guest: "Cintia Bonisson", role: "Psicanalista", topic: "Ausência de vínculos afetivos na sociedade atual", date: "12 de maio", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=ybViS7X_Okw" },
  { slug: "dermatologia-sem-filtro-gabriela-oliveira", imageUrl: "/podcast/dermatologia-sem-filtro-gabriela-oliveira.jpg", guest: "Gabriela Oliveira", role: "Dermatologista", topic: "Dermatologia sem filtro", date: "28 de abril", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=qvo-1igFbvI", professionalSlugs: ["dra-gabriela-goncalves-de-oliveira-dermatologia-piumhi"] },
  { slug: "fisioterapia-respiratoria-ivana-rezende", imageUrl: "/podcast/fisioterapia-respiratoria-ivana-rezende.jpg", guest: "Ivana Oliveira Rezende", role: "Fisioterapeuta", topic: "A importância da fisioterapia respiratória nos diferentes contextos de saúde", date: "7 de abril", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=ouNSkD6F_c8", professionalSlugs: ["ivana-mara-de-oliveira-rezende-fisioterapia-piumhi"] },
  { slug: "respiracao-na-infancia-nayara-garcia", imageUrl: "/podcast/respiracao-na-infancia-nayara-garcia.jpg", guest: "Nayara Garcia", role: "Pediatra e pneumologista infantil", topic: "Respiração na infância: quando se preocupar?", date: "24 de março", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=yDN7ox1vVTU", professionalSlugs: ["nayara-garcia-pediatria-pneumologia-infantil-piumhi"] },
  { slug: "vida-saudavel-na-pratica-daisy-faria", imageUrl: "/podcast/vida-saudavel-na-pratica-daisy-faria.jpg", guest: "Daisy Faria", role: "Nutricionista", topic: "Vida saudável na prática: pequenas mudanças que transformam sua saúde", date: "10 de março", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=xxV4UudRoAU", professionalSlugs: ["daisy-cristina-de-faria-nutricao-piumhi"] },
  { slug: "ortodontia-atraves-das-geracoes-lopes-soares", imageUrl: "/podcast/ortodontia-atraves-das-geracoes-lopes-soares.jpg", guest: "Reinaldo e Víctor Lopes Soares", role: "Ortodontistas", topic: "Ortodontia através das gerações: tradição, evolução e sorrisos que transformam", date: "24 de fevereiro", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=ugzEwowoSwI", professionalSlugs: ["reinaldo-lopes-soares-ortodontia-piumhi", "victor-lopes-soares-ortodontia-piumhi"] },
  { slug: "ortodontia-idade-certa-karla-soares", imageUrl: "/podcast/karla-soares-ortodontia.jpg", guest: "Karla Soares", role: "Dentista ortodontista", topic: "Ortodontia: aparelho na idade certa", date: "30 de setembro de 2025", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=yPiZVLHvJLA", professionalSlugs: ["karla-soares-lopes-teixeira-ortodontia-piumhi"] },
  { slug: "terapia-regenerativa-diego-mota-fernandes", imageUrl: "/podcast/diego-mota-fernandes-terapia-regenerativa.jpg", guest: "Dr. Diego Mota Fernandes", role: "Médico ortopedista", topic: "Terapia regenerativa no tratamento de lesões", date: "20 de agosto de 2025", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=noazEavj3vY", professionalSlugs: ["dr-diego-mota-fernandes-ortopedia-piumhi"] },
  { slug: "cirurgia-refrativa-paulo-henrique-faria", imageUrl: "/podcast/paulo-henrique-faria-cirurgia-refrativa.jpg", guest: "Dr. Paulo Henrique Faria", role: "Oftalmologista", topic: "Cirurgia refrativa: enxergar sem óculos", date: "5 de agosto de 2025", duration: "Episódio completo", status: "Disponível", episodeUrl: "https://www.youtube.com/watch?v=B7e35CaX-V0", professionalSlugs: ["dr-paulo-henrique-faria-silva-oftalmologia-piumhi"] },
];


export type MagazineEdition = {
  slug: string;
  number: string;
  year: string;
  title: string;
  description: string;
  editorial?: string;
  featured: boolean;
  articleSlugs?: string[];
  coverUrl?: string;
  pdfUrl?: string;
  flipbook?: { dir: string; pages: number };
};

// Matérias que compõem o sumário de uma edição (cruzamento revista → matérias).
export function editionArticles(edition: MagazineEdition): Article[] {
  return (edition.articleSlugs ?? [])
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is Article => Boolean(article));
}

// Foto da matéria: imagem de banco livre (CC0/domínio público), por tema,
// em public/materias/{slug}.jpg. Créditos em public/materias/_credits.json.
const ARTICLE_IMAGE_SLUGS = new Set<string>([
  "radiologia-odontologica-diagnostico",
  "fisioterapia-respiratoria-quando-buscar",
  "cuidados-com-a-pele-dermatologia",
  "vida-saudavel-pequenas-mudancas",
  "respiracao-na-infancia-sinais",
  "implantodontia-reabilitacao-oral",
  "uso-consciente-de-medicamentos",
  "vinculos-afetivos-saude-mental",
  "terapia-regenerativa-lesoes",
  "cirurgia-refrativa-enxergar-sem-oculos",
  "prevencao-na-rotina",
]);

export function articleImage(article: Article): string | undefined {
  if (article.imageUrl) return article.imageUrl;
  return ARTICLE_IMAGE_SLUGS.has(article.slug) ? `/materias/${article.slug}.jpg` : undefined;
}

export const magazineEditions: MagazineEdition[] = [
  {
    slug: "14a-edicao",
    number: "14ª",
    year: "2026",
    title: "A 14ª edição está chegando",
    description: "Uma nova edição da Guia Saúde está em produção. O lançamento será em 7 de novembro de 2026, na Festa dos Destaques Piumhienses.",
    editorial: "A 14ª edição da Guia Saúde está em produção e será apresentada ao público em 7 de novembro de 2026, durante a Festa dos Destaques Piumhienses. Em breve, a capa oficial e a edição digital estarão disponíveis no portal.",
    featured: true,
  },
  {
    slug: "13a-edicao",
    number: "13ª",
    year: "2025",
    title: "Um novo olhar para o cuidado com os olhos",
    description: "Dra. Fernanda Mota compartilha sua visão sobre saúde ocular e bem-estar na edição Piumhi, Ano 13.",
    editorial: "A edição de 2025 apresenta histórias e profissionais da saúde regional, com destaque para a Dra. Fernanda Mota e um novo olhar sobre o cuidado com os olhos.",
    featured: false,
    articleSlugs: [
      "terapia-regenerativa-lesoes",
      "cirurgia-refrativa-enxergar-sem-oculos",
      "uso-consciente-de-medicamentos",
    ],
    coverUrl: "/revista/capas/2025.jpg",
    pdfUrl: "/revista/guia-saude-piumhi-2025.pdf",
    flipbook: { dir: "/revista/flip-2025", pages: 74 },
  },
  {
    slug: "12a-edicao",
    number: "12ª",
    year: "2024",
    title: "20 anos de inovação no tratamento da ATM e saúde bucal",
    description: "Dra. Fernanda Oliveira é destaque da edição Piumhi, Ano 12, com conteúdos regionais sobre saúde, prevenção e qualidade de vida.",
    editorial: "A edição de 2024 reúne profissionais e temas de saúde da região, com destaque para a trajetória da Dra. Fernanda Oliveira e sua atuação no tratamento da ATM e na saúde bucal.",
    featured: false,
    articleSlugs: [
      "vinculos-afetivos-saude-mental",
      "respiracao-na-infancia-sinais",
      "implantodontia-reabilitacao-oral",
    ],
    coverUrl: "/revista/destaque-piumhi/page-001.jpg",
    pdfUrl: "/revista/destaque-piumhi-saude.pdf",
    flipbook: { dir: "/revista/destaque-piumhi", pages: 70 },
  },
  {
    slug: "11a-edicao",
    number: "11ª",
    year: "2023",
    title: "Clínica São Judas Tadeu",
    description: "Dra. Mírian Sansoni apresenta a Clínica São Judas Tadeu na edição Piumhi, Ano 11.",
    editorial: "A edição de 2023 destaca a atuação da Dra. Mírian Sansoni e apresenta profissionais, clínicas e serviços de saúde da região.",
    featured: false,
    coverUrl: "/revista/capas/2023.jpg",
    pdfUrl: "/revista/guia-saude-piumhi-2023.pdf",
    flipbook: { dir: "/revista/flip-2023", pages: 70 },
  },
  {
    slug: "10a-edicao",
    number: "10ª",
    year: "2022",
    title: "Edição especial: 10 anos de história",
    description: "Dr. Diego Mota aborda ortopedia e bloqueio da dor ortopédica na edição comemorativa de 10 anos.",
    editorial: "Uma edição especial que celebra 10 anos de história da Guia Saúde e reúne conteúdos sobre ortopedia, tratamentos e bem-estar regional.",
    featured: false,
    coverUrl: "/revista/capas/2022.jpg",
    pdfUrl: "/revista/guia-saude-piumhi-2022.pdf",
    flipbook: { dir: "/revista/flip-2022", pages: 70 },
  },
  {
    slug: "9a-edicao",
    number: "9ª",
    year: "2021",
    title: "PHD Hospital Dia",
    description: "A equipe e o complexo de saúde que colocaram Piumhi entre os destaques do estado de Minas Gerais.",
    editorial: "A edição de 2021 apresenta o PHD Hospital Dia e profissionais que contribuíram para ampliar o cuidado especializado em Piumhi e região.",
    featured: false,
    coverUrl: "/revista/capas/2021.jpg",
    pdfUrl: "/revista/guia-saude-piumhi-2021.pdf",
    flipbook: { dir: "/revista/flip-2021", pages: 70 },
  },
  {
    slug: "8a-edicao",
    number: "8ª",
    year: "2020",
    title: "Inovação e qualidade",
    description: "Os irmãos médicos Dr. Gessé e Dr. Gilson apresentam a Clínica de Diagnóstico O'Dant na edição Piumhi, Ano 8.",
    editorial: "A edição de 2020 destaca a Clínica de Diagnóstico O'Dant e reúne profissionais, serviços e conteúdos de saúde de Piumhi e região.",
    featured: false,
    coverUrl: "/revista/capas/2020.jpg",
    flipbook: { dir: "/revista/flip-2020", pages: 70 },
  },
  {
    slug: "6a-edicao",
    number: "6ª",
    year: "2018",
    title: "Um novo projeto para a saúde regional",
    description: "Dr. William e Dr. Paulo Henrique apresentam o projeto do primeiro Day Hospital de Piumhi e região.",
    editorial: "A edição de 2018 apresenta o projeto do primeiro Day Hospital de Piumhi e região e reúne profissionais e serviços de saúde locais.",
    featured: false,
    coverUrl: "/revista/capas/2018.jpg",
    flipbook: { dir: "/revista/flip-2018", pages: 66 },
  },
  {
    slug: "4a-edicao",
    number: "4ª",
    year: "2016",
    title: "Piumhi é a minha segunda casa",
    description: "Dr. Willian José da Costa Filho, cirurgião vascular, é o destaque da edição Piumhi, Ano 4.",
    editorial: "A edição de 2016 apresenta o cirurgião vascular Dr. Willian José da Costa Filho e reúne profissionais, serviços e conteúdos de saúde de Piumhi e região.",
    featured: false,
    coverUrl: "/revista/flip-2016/page-001.jpg",
    flipbook: { dir: "/revista/flip-2016", pages: 64 },
  },
  {
    slug: "2a-edicao",
    number: "2ª",
    year: "2014",
    title: "Para você viver melhor",
    description: "A 2ª edição da Guia Saúde reúne informações, dicas e profissionais de saúde de Piumhi e região.",
    editorial: "Publicada em outubro de 2014, a 2ª edição apresenta conteúdos sobre saúde, bem-estar e qualidade de vida, além de profissionais da região.",
    featured: false,
    coverUrl: "/revista/capas/2014.jpg",
    flipbook: { dir: "/revista/flip-2014", pages: 64 },
  },
  {
    slug: "1a-edicao",
    number: "1ª",
    year: "2013",
    title: "A primeira edição da Guia Saúde",
    description: "A edição inaugural da Guia Saúde marcou o início do projeto editorial de saúde e informação regional em Piumhi.",
    editorial: "Publicada em outubro de 2013, a primeira edição reuniu informações, serviços e profissionais de saúde para aproximar conteúdo e comunidade.",
    featured: false,
    coverUrl: "/revista/capas/2013.jpg",
    flipbook: { dir: "/revista/flip-2013", pages: 62 },
  },
];
