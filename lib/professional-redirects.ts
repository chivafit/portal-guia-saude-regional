/**
 * Endereços históricos de perfis.
 * No site (Vercel), cada entrada tem um redirecionamento 301 em vercel.json,
 * conferido por tests/redirects.test.mjs. As páginas estáticas geradas a partir
 * desta lista continuam existindo para o pacote dos aplicativos, que não passa
 * pela Vercel: elas fazem a substituição no navegador, com canonical e noindex.
 */
export const professionalRedirects: Record<string, string> = {
  "dr-wenner-terra-freitas-otorrino-piumhi": "/profissionais/dr-wenner-terra-freitas-otorrinolaringologia-piumhi/",
  "dra-wanessa-dornela-de-oliveira-otorrino-piumhi": "/profissionais/dra-wanessa-dornela-de-oliveira-otorrinolaringologia-piumhi/",
  // Perfil retirado por falta de confirmação atual de atendimento. O endereço
  // histórico continua com uma decisão editorial explícita, sem retornar 404.
  "dr-rui-manuel-dos-prazeres-xavier-ginecologia-piumhi": "/buscar/?cidade=Piumhi&tipo=professionals&especialidade=Ginecologia",
};

export function professionalRedirectTarget(slug: string) {
  return professionalRedirects[slug] ?? null;
}
