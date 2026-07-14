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
  imageUrl?: string;
  coverImageUrl?: string;
  logoUrl?: string;
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
  logoUrl?: string;
  coverImageUrl?: string;
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
];

export const cities = ["Piumhi", "Capitólio", "Pimenta", "Arcos", "Campo Belo", "Bambuí", "São Roque de Minas"];
export const professions = ["Médico", "Dentista", "Psicólogo", "Fisioterapeuta", "Nutricionista", "Fonoaudiólogo", "Enfermeiro", "Farmacêutico", "Educador físico"];

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
