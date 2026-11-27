// Imagem do profissional: a foto real quando existe; sem foto, as iniciais do nome
// num fundo com a cor da área de atuação (gerado como SVG, sem arquivo extra).
import photoOverrides from "./data/professional-photo-overrides.json";

const PLACEHOLDER = "/placeholders/professional-photo.svg";
/** Marca as imagens geradas aqui, para reconhecê-las e gerar de novo quando o nome mudar. */
const GENERATED_MARK = "guia-saude-iniciais";

type Palette = { background: string; text: string };

// Uma cor por grande área, para a lista ficar legível e organizada.
const palettes: { match: RegExp; palette: Palette }[] = [
  { match: /^m[eé]dic/i, palette: { background: "#DBEAFE", text: "#1D4ED8" } },
  { match: /^dentist|odont/i, palette: { background: "#DFEBF8", text: "#1F5A96" } },
  { match: /psic/i, palette: { background: "#ECE4F6", text: "#5E3B8C" } },
  { match: /fisio|terapeuta ocup|educador f/i, palette: { background: "#FBEBDD", text: "#A1561C" } },
  { match: /nutri/i, palette: { background: "#E8F3D9", text: "#4D7A1E" } },
];
const neutralPalette: Palette = { background: "#E3EEF0", text: "#355C66" };

const connectors = new Set(["de", "da", "das", "do", "dos", "e"]);

/** "Dra. Maria da Silva Costa" → "MC" */
export function initialsFor(name: string) {
  const words = name
    .replace(/^(dr|dra|sr|sra)\.?\s+/i, "")
    .split(/\s+/)
    .filter((word) => word && !connectors.has(word.toLocaleLowerCase("pt-BR")));
  if (!words.length) return "GS";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toLocaleUpperCase("pt-BR");
}

/** Cores da área de atuação (fundo claro e texto), usadas nas iniciais. */
export function paletteFor(profession = ""): Palette {
  return palettes.find((item) => item.match.test(profession))?.palette ?? neutralPalette;
}

export function initialsAvatar(name: string, profession = ""): string {
  const { background, text } = paletteFor(profession);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" data-kind="${GENERATED_MARK}"><rect width="160" height="160" fill="${background}"/><text x="80" y="80" dy="0.35em" text-anchor="middle" font-family="Inter Tight, Inter, Helvetica, Arial, sans-serif" font-size="60" font-weight="700" letter-spacing="-1" fill="${text}">${initialsFor(name)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Imagens que não são foto: iniciais geradas, avatares ilustrados antigos e o placeholder. */
export function isGeneratedImage(imageUrl?: string) {
  return !imageUrl
    || imageUrl === PLACEHOLDER
    || imageUrl.includes("/avatars/")
    || imageUrl.includes("/placeholders/")
    || imageUrl.includes(GENERATED_MARK);
}

/** Foto real do profissional ou, sem foto, as iniciais com a cor da área. */
export function resolveProfessionalImage(slug: string, imageUrl: string | undefined, person: { name: string; profession: string }): string {
  const updatedPhoto = photoOverrides[slug as keyof typeof photoOverrides];
  if (updatedPhoto) return updatedPhoto;
  if (!isGeneratedImage(imageUrl)) return imageUrl as string;
  return initialsAvatar(person.name, person.profession);
}
