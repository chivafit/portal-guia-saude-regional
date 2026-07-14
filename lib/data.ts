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
  phone: string;
  whatsapp: string;
  services: string[];
};

export type Organization = {
  slug: string;
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  summary: string;
  services: string[];
};

// Dados exclusivamente demonstrativos. Não representam pessoas reais.
export const professionals: Professional[] = [
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
];

export const organizations: Organization[] = [
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
];

export const cities = ["Piumhi", "Capitólio", "Pimenta", "Arcos", "Campo Belo", "Bambuí", "São Roque de Minas"];
export const professions = ["Médico", "Dentista", "Psicólogo", "Fisioterapeuta", "Nutricionista"];

export const articles = [
  { slug: "prevencao-na-rotina", category: "Prevenção", title: "Como transformar prevenção em parte da rotina", excerpt: "Informação regional, fontes claras e orientação para buscar atendimento profissional.", city: "Regional" },
  { slug: "saude-e-longevidade", category: "Longevidade", title: "Saúde e longevidade: cuidados em cada fase", excerpt: "Uma pauta editorial conectada a especialistas e serviços da região.", city: "Regional" },
  { slug: "conexao-saude", category: "Podcast", title: "Conexão Saúde: conhecimento que aproxima", excerpt: "Episódios, convidados, transcrições e conteúdos complementares.", city: "Regional" },
];
