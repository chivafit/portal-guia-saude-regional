import { publicProfessionals as directoryProfessionals } from "./public-directory";
import type { Professional } from "./data";

/**
 * Dados publicados para componentes executados no navegador. A seleção usa
 * somente o status editorial, preservando o inventário interno no mesmo local.
 */
export const publicProfessionals: Professional[] = directoryProfessionals;
