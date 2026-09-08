/**
 * Endereços históricos preservados na exportação estática.
 * GitHub Pages não permite regras HTTP 301 por rota; estas páginas emitem
 * substituição imediata no navegador, canonical para o destino e noindex.
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
