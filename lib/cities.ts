// Banco de dados das cidades atendidas pelo Guia Saúde.
// Fonte única de verdade: páginas, busca, filtros e seed do D1 leem daqui.
//
// Números de população: estimativa IBGE (Censo 2022, arredondada). Marcados como
// referência comercial — validar no fechamento de cada praça antes de publicar
// em material de venda com valor absoluto.

export type City = {
  slug: string;
  name: string;
  ibgeCode: string;
  state: "MG";
  gentilic: string;
  microregion: string;
  healthRegion: string;
  region: string;
  population: number;
  active: boolean;
  intro: string;
  seoDescription: string;
  // Argumentos de venda local usados na página da cidade e no mídia kit.
  highlights: string[];
};

export const cityDatabase: City[] = [
  {
    slug: "piumhi",
    name: "Piumhi",
    ibgeCode: "3151206",
    state: "MG",
    gentilic: "piumhiense",
    microregion: "Microrregião de Piumhi",
    healthRegion: "Região de Saúde de Piumhi",
    region: "Minas Gerais",
    population: 35000,
    active: true,
    intro:
      "Profissionais, clínicas, serviços e informação em saúde para quem vive em Piumhi e região.",
    seoDescription:
      "Guia de saúde de Piumhi (MG): encontre médicos, dentistas, clínicas, laboratórios e farmácias, com conteúdo, podcast e revista regional.",
    highlights: [
      "Cidade-polo da região de saúde",
      "Hospital de referência (Santa Casa)",
      "Base de profissionais em formação prioritária",
    ],
  },
  {
    slug: "capitolio",
    name: "Capitólio",
    ibgeCode: "3112505",
    state: "MG",
    gentilic: "capitolino",
    microregion: "Microrregião de Piumhi",
    healthRegion: "Região de Saúde de Piumhi",
    region: "Serra da Canastra · Lago de Furnas",
    population: 9100,
    active: false,
    intro:
      "Um guia local para encontrar cuidado e acompanhar os assuntos de saúde de Capitólio.",
    seoDescription:
      "Guia de saúde de Capitólio (MG): profissionais, clínicas e serviços de saúde na região do Lago de Furnas e da Serra da Canastra.",
    highlights: [
      "Alta sazonalidade turística (Furnas)",
      "Demanda por saúde e estética de temporada",
      "Praça de valor para marcas de bem-estar",
    ],
  },
  {
    slug: "pimenta",
    name: "Pimenta",
    ibgeCode: "3150539",
    state: "MG",
    gentilic: "pimentense",
    microregion: "Microrregião de Piumhi",
    healthRegion: "Região de Saúde de Piumhi",
    region: "Lago de Furnas · Minas Gerais",
    population: 8900,
    active: false,
    intro:
      "Serviços, especialistas e conteúdo de saúde reunidos em uma página dedicada a Pimenta.",
    seoDescription:
      "Guia de saúde de Pimenta (MG): médicos, fisioterapeutas, farmácias e serviços de saúde da cidade e do entorno do Lago de Furnas.",
    highlights: [
      "Vizinha direta de Piumhi e Capitólio",
      "Rede de atenção básica ativa",
      "Boa entrada para pacotes regionais",
    ],
  },
  {
    slug: "arcos",
    name: "Arcos",
    ibgeCode: "3104502",
    state: "MG",
    gentilic: "arcoense",
    microregion: "Microrregião de Formiga",
    healthRegion: "Região de Saúde de Formiga",
    region: "Minas Gerais",
    population: 40000,
    active: false,
    intro:
      "Encontre profissionais e empresas da saúde e acompanhe conteúdos relevantes para Arcos.",
    seoDescription:
      "Guia de saúde de Arcos (MG): hospitais, clínicas, laboratórios, farmácias e especialistas com conteúdo e presença regional.",
    highlights: [
      "Segundo maior mercado da carteira",
      "Parque hospitalar e laboratorial relevante",
      "Economia industrial com público consumidor",
    ],
  },
  {
    slug: "formiga",
    name: "Formiga",
    ibgeCode: "3126109",
    state: "MG",
    gentilic: "formiguense",
    microregion: "Microrregião de Formiga",
    healthRegion: "Região de Saúde de Formiga",
    region: "Minas Gerais",
    population: 35000,
    active: false,
    intro:
      "Profissionais, clínicas e serviços de saúde reunidos para quem vive em Formiga e no entorno.",
    seoDescription:
      "Guia de saúde de Formiga (MG): médicos, clínicas, especialidades, laboratórios e farmácias, com conteúdo e presença regional.",
    highlights: [
      "Sede da região de saúde (referência de Arcos e entorno)",
      "Polo universitário e industrial",
      "Mercado forte para especialidades e clínicas",
    ],
  },
  {
    slug: "campo-belo",
    name: "Campo Belo",
    ibgeCode: "3111309",
    state: "MG",
    gentilic: "campo-belense",
    microregion: "Microrregião de Campo Belo",
    healthRegion: "Região de Saúde de Campo Belo",
    region: "Oeste de Minas",
    population: 54000,
    active: false,
    intro:
      "O ecossistema de saúde de Campo Belo organizado para facilitar escolhas e conexões.",
    seoDescription:
      "Guia de saúde de Campo Belo (MG): médicos, clínicas, especialidades, laboratórios e serviços de saúde com conteúdo regional.",
    highlights: [
      "Maior mercado da carteira",
      "Cidade-polo de saúde do Oeste mineiro",
      "Densidade de especialidades e clínicas",
    ],
  },
  {
    slug: "bambui",
    name: "Bambuí",
    ibgeCode: "3105002",
    state: "MG",
    gentilic: "bambuiense",
    microregion: "Microrregião de Piumhi",
    healthRegion: "Região de Saúde de Piumhi",
    region: "Serra da Canastra · Minas Gerais",
    population: 23000,
    active: false,
    intro:
      "Informação, prevenção e serviços de saúde próximos da comunidade de Bambuí.",
    seoDescription:
      "Guia de saúde de Bambuí (MG): profissionais, farmácias, hospitais e clínicas da cidade, com conteúdo e serviços de saúde.",
    highlights: [
      "Presença de instituto federal (público jovem)",
      "Rede de farmácias e hospitais mapeada",
      "Cidade média com fluxo regional",
    ],
  },
  {
    slug: "sao-roque-de-minas",
    name: "São Roque de Minas",
    ibgeCode: "3161908",
    state: "MG",
    gentilic: "são-roquense",
    microregion: "Microrregião de Piumhi",
    healthRegion: "Região de Saúde de Piumhi",
    region: "Serra da Canastra",
    population: 7200,
    active: false,
    intro:
      "Um ponto de encontro para profissionais, serviços e informação em saúde na Serra da Canastra.",
    seoDescription:
      "Guia de saúde de São Roque de Minas (MG): serviços, profissionais e informação de saúde na porta da Serra da Canastra.",
    highlights: [
      "Porta de entrada da Serra da Canastra",
      "Forte apelo de turismo e natureza",
      "Praça premium para marcas regionais",
    ],
  },
];

export const activeCities = cityDatabase.filter((city) => city.active);

const bySlug = new Map(activeCities.map((city) => [city.slug, city]));
const byName = new Map(activeCities.map((city) => [city.name, city]));

export function getCityBySlug(slug: string): City | undefined {
  return bySlug.get(slug);
}

export function getCityByName(name: string): City | undefined {
  return byName.get(name);
}

// Enquanto o portal é lançado por etapas, somente Piumhi possui navegação pública.
export function isCityAvailable(city: string | City): boolean {
  return typeof city === "string" ? city === "Piumhi" : city.slug === "piumhi";
}

// Nomes das cidades ativas, na ordem da carteira. Usado em selects e filtros.
export const cityNames = activeCities.map((city) => city.name);

// Compatibilidade com o formato antigo (cityDetails) consumido pelas páginas.
export const cityDetails: Record<string, { name: string; intro: string; region: string }> =
  Object.fromEntries(
    activeCities.map((city) => [city.slug, { name: city.name, intro: city.intro, region: city.region }]),
  );
