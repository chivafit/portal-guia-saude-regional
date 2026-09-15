/** Curadoria explícita e independente dos Profissionais em Destaque. */
export const featuredProfessionalSlugs = new Set<string>([
  "gabriela-araujo-fisioterapia-pelvica-piumhi",
  "patricia-terra-odontologia-piumhi",
  "dra-simone-mota-bonisson-endocrinologia-piumhi",
  "rodrigo-soares-costa-radiologia-piumhi",
  "livia-pereira-implantodontia-piumhi",
  "dra-mirian-sansoni-oftalmologia-piumhi",
  "daniela-melo-farmacia-piumhi",
  "dr-marcio-alves-da-cruz-junior-neurologia-piumhi",
  "dr-sergio-paulo-mota-soares-oftalmologia-piumhi",
  "dra-larissa-vaz-ginecologia-piumhi",
  "cintia-bonisson-psicanalise-piumhi",
  "dra-gabriela-goncalves-de-oliveira-dermatologia-piumhi",
  "ivana-mara-de-oliveira-rezende-fisioterapia-piumhi",
  "nayara-garcia-pediatria-pneumologia-infantil-piumhi",
  "daisy-cristina-de-faria-nutricao-piumhi",
  "reinaldo-lopes-soares-ortodontia-piumhi",
  "victor-lopes-soares-ortodontia-piumhi",
  "karla-soares-lopes-teixeira-ortodontia-piumhi",
  "dr-diego-mota-fernandes-ortopedia-piumhi",
  "dr-paulo-henrique-faria-silva-oftalmologia-piumhi",
  "jaine-reis-psicologia-piumhi",
]);

export function isFeaturedProfessional(slug: string): boolean {
  return featuredProfessionalSlugs.has(slug);
}
