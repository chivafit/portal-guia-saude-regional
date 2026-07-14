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

export const podcasts = [
  { slug: "radiologia-odontologica", guest: "Rodrigo Soares Costa", role: "Tecnólogo em radiologia", topic: "Radiologia odontológica: como a tecnologia transforma os tratamentos", date: "14 de julho", duration: "Ao vivo às 19h", status: "Próximo episódio" },
  { slug: "implantodontia-reabilitacao", guest: "Lívia Pereira", role: "Dentista", topic: "Do cuidado à transformação: implantodontia, reabilitação oral e prevenção", date: "30 de junho", duration: "Episódio completo", status: "Disponível" },
  { slug: "blefaroplastia", guest: "Mírian L. Sansoni", role: "Oftalmologista", topic: "Blefaroplastia: saúde, estética e qualidade de vida", date: "9 de junho", duration: "Episódio completo", status: "Disponível" },
];

export const magazineEditions = [
  { number: "14ª", year: "2026", title: "Saúde, bem-estar e qualidade de vida", description: "A nova fase editorial da Guia Saúde: informação que conecta profissionais, marcas e a comunidade regional.", featured: true },
  { number: "13ª", year: "2025", title: "Cuidado que transforma", description: "Entrevistas, histórias e orientações para escolhas mais conscientes em saúde.", featured: false },
  { number: "12ª", year: "2025", title: "Conexões para viver melhor", description: "Uma edição dedicada aos especialistas e iniciativas que movimentam a região.", featured: false },
];

export const cityDetails: Record<string, { name: string; intro: string; region: string }> = {
  piumhi: { name: "Piumhi", intro: "Profissionais, clínicas, serviços e informação em saúde para quem vive em Piumhi e região.", region: "Centro-Oeste de Minas" },
  capitolio: { name: "Capitólio", intro: "Um guia local para encontrar cuidado e acompanhar os assuntos de saúde de Capitólio.", region: "Região da Serra da Canastra" },
  pimenta: { name: "Pimenta", intro: "Serviços, especialistas e conteúdo de saúde reunidos em uma página dedicada a Pimenta.", region: "Centro-Oeste de Minas" },
  arcos: { name: "Arcos", intro: "Encontre profissionais e empresas da saúde e acompanhe conteúdos relevantes para Arcos.", region: "Centro-Oeste de Minas" },
  "campo-belo": { name: "Campo Belo", intro: "O ecossistema de saúde de Campo Belo organizado para facilitar escolhas e conexões.", region: "Oeste de Minas" },
  bambui: { name: "Bambuí", intro: "Informação, prevenção e serviços de saúde próximos da comunidade de Bambuí.", region: "Região da Serra da Canastra" },
  "sao-roque-de-minas": { name: "São Roque de Minas", intro: "Um ponto de encontro para profissionais, serviços e informação em saúde na Serra da Canastra.", region: "Serra da Canastra" },
};
