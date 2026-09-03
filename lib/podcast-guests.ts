import { podcasts, type PodcastEpisode } from "./data";

/**
 * Relação editorial entre episódios do Conexão Saúde e perfis do diretório.
 * Mantida separada da base histórica para permitir auditoria e evitar vínculos
 * por similaridade de nome quando há homônimos.
 */
export const podcastProfessionalMap: Record<string, string[]> = {
  "fisioterapia-pelvica-gabriela-araujo": ["gabriela-araujo-fisioterapia-pelvica-piumhi"],
  "estetica-regenerativa-patricia-terra": ["patricia-terra-odontologia-piumhi"],
  "endocrinologia-simone-mota-bonisson": ["dra-simone-mota-bonisson-endocrinologia-piumhi"],
  "radiologia-odontologica": ["rodrigo-soares-costa-radiologia-piumhi"],
  "implantodontia-livia-pereira": ["livia-pereira-implantodontia-piumhi"],
  "blefaroplastia-mirian-sansoni": ["dra-mirian-sansoni-oftalmologia-piumhi"],
  "medicalizacao-da-vida-daniela-melo": ["daniela-melo-farmacia-piumhi"],
  "neurologia-marcio-jr": ["dr-marcio-alves-da-cruz-junior-neurologia-piumhi"],
  "oftalmologia-sergio-paulo": ["dr-sergio-paulo-mota-soares-oftalmologia-piumhi"],
  "ginecologia-sem-tabu-larissa-vaz": ["dra-larissa-vaz-ginecologia-piumhi"],
  "vinculos-afetivos-cintia-bonisson": ["cintia-bonisson-psicanalise-piumhi"],
  "dermatologia-sem-filtro-gabriela-oliveira": ["dra-gabriela-goncalves-de-oliveira-dermatologia-piumhi"],
  "fisioterapia-respiratoria-ivana-rezende": ["ivana-mara-de-oliveira-rezende-fisioterapia-piumhi"],
  "respiracao-na-infancia-nayara-garcia": ["nayara-garcia-pediatria-pneumologia-infantil-piumhi"],
  "vida-saudavel-na-pratica-daisy-faria": ["daisy-cristina-de-faria-nutricao-piumhi"],
  "ortodontia-atraves-das-geracoes-lopes-soares": ["reinaldo-lopes-soares-ortodontia-piumhi", "victor-lopes-soares-ortodontia-piumhi"],
  "ortodontia-idade-certa-karla-soares": ["karla-soares-lopes-teixeira-ortodontia-piumhi"],
  "terapia-regenerativa-diego-mota-fernandes": ["dr-diego-mota-fernandes-ortopedia-piumhi"],
  "cirurgia-refrativa-paulo-henrique-faria": ["dr-paulo-henrique-faria-silva-oftalmologia-piumhi"],
};

/** Participações confirmadas cujo episódio ainda não está na coleção histórica. */
export const confirmedPodcastParticipantSlugs = new Set<string>([
  "jaine-reis-psicologia-piumhi",
]);

/**
 * Fonte única dos destaques: todos os perfis explicitamente vinculados aos
 * episódios cadastrados + participações confirmadas editorialmente. Quando um
 * novo episódio recebe professionalSlugs ou entra no mapa, o destaque passa a
 * reconhecê-lo automaticamente, sem manter uma segunda lista manual.
 */
export const podcastProfessionalSlugs = new Set<string>([
  ...podcasts.flatMap((episode) => professionalSlugsForEpisode(episode)),
  ...confirmedPodcastParticipantSlugs,
]);

export const podcastProfessionalImageMap: Record<string, string> = {
  "gabriela-araujo-fisioterapia-pelvica-piumhi": "/podcast/gabriela-araujo-fisioterapia-pelvica-horizontal.png",
  "patricia-terra-odontologia-piumhi": "/podcast/patricia-terra-estetica-regenerativa-horizontal.png",
  "dra-simone-mota-bonisson-endocrinologia-piumhi": "/podcast/simone-bonisson-endocrinologia-horizontal.png",
  "rodrigo-soares-costa-radiologia-piumhi": "/podcast/radiologia-odontologica.jpg",
  "livia-pereira-implantodontia-piumhi": "/podcast/implantodontia-livia-pereira.jpg",
  "dra-mirian-sansoni-oftalmologia-piumhi": "/podcast/blefaroplastia-mirian-sansoni.jpg",
  "daniela-melo-farmacia-piumhi": "/podcast/medicalizacao-da-vida-daniela-melo.jpg",
  "dr-marcio-alves-da-cruz-junior-neurologia-piumhi": "/podcast/marcio-jr-neurologia.jpg",
  "dr-sergio-paulo-mota-soares-oftalmologia-piumhi": "/podcast/sergio-paulo-oftalmologia.jpg",
  "dra-larissa-vaz-ginecologia-piumhi": "/podcast/larissa-vaz-ginecologia.jpg",
  "cintia-bonisson-psicanalise-piumhi": "/podcast/vinculos-afetivos-cintia-bonisson.jpg",
  "dra-gabriela-goncalves-de-oliveira-dermatologia-piumhi": "/podcast/dermatologia-sem-filtro-gabriela-oliveira.jpg",
  "ivana-mara-de-oliveira-rezende-fisioterapia-piumhi": "/podcast/fisioterapia-respiratoria-ivana-rezende.jpg",
  "nayara-garcia-pediatria-pneumologia-infantil-piumhi": "/podcast/respiracao-na-infancia-nayara-garcia.jpg",
  "daisy-cristina-de-faria-nutricao-piumhi": "/podcast/vida-saudavel-na-pratica-daisy-faria.jpg",
  "reinaldo-lopes-soares-ortodontia-piumhi": "/podcast/ortodontia-atraves-das-geracoes-lopes-soares.jpg",
  "victor-lopes-soares-ortodontia-piumhi": "/podcast/ortodontia-atraves-das-geracoes-lopes-soares.jpg",
  "karla-soares-lopes-teixeira-ortodontia-piumhi": "/podcast/karla-soares-ortodontia.jpg",
  "dr-diego-mota-fernandes-ortopedia-piumhi": "/podcast/diego-mota-fernandes-terapia-regenerativa.jpg",
  "dr-paulo-henrique-faria-silva-oftalmologia-piumhi": "/podcast/paulo-henrique-faria-cirurgia-refrativa.jpg",
};

export function professionalSlugsForEpisode(episode: Pick<PodcastEpisode, "slug" | "professionalSlugs">): string[] {
  return Array.from(new Set([...(episode.professionalSlugs ?? []), ...(podcastProfessionalMap[episode.slug] ?? [])]));
}

export function isPodcastProfessional(slug: string): boolean {
  return podcastProfessionalSlugs.has(slug);
}

export function podcastImageForProfessional(slug: string): string | undefined {
  return podcastProfessionalImageMap[slug];
}

export function podcastEpisodeSlugsForProfessional(slug: string): string[] {
  return podcasts
    .filter((episode) => professionalSlugsForEpisode(episode).includes(slug))
    .map((episode) => episode.slug);
}
