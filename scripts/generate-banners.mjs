// Gera a arte dos banners comerciais do Guia Saúde (mockups de venda).
// Cada banner é um criativo pronto para apresentar ao anunciante: cena de saúde
// ilustrada, headline, espaço da marca e CTA. Paleta do portal.
//   node scripts/generate-banners.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "ads");
mkdirSync(outDir, { recursive: true });

const FOREST = "#17384e";
const FOREST2 = "#0f2a3d";
const TERRA = "#e17840";
const TERRA2 = "#c85f2c";

// Motivo de saúde: pulso + selo com cruz. x,y = canto superior esquerdo da área.
function healthMotif(cx, cy, scale = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})" fill="none">
    <circle cx="0" cy="0" r="96" fill="${TERRA}" opacity=".16"/>
    <circle cx="0" cy="0" r="66" fill="#ffffff" opacity=".08"/>
    <path d="M-120 6 h44 l14 -34 l22 68 l16 -42 h48" stroke="#ffffff" stroke-opacity=".85" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(0 0)">
      <rect x="-26" y="-26" width="52" height="52" rx="16" fill="${TERRA}"/>
      <path d="M0 -14 v28 M-14 0 h28" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    </g>
  </g>`;
}

function pulseLine(width, y) {
  return `<path d="M40 ${y} H${width * 0.32} l24 -46 l30 96 l24 -60 l18 34 H${width - 40}" stroke="#ffffff" stroke-opacity=".10" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
}

// Banner retrato/quadrado 900x620.
function card({ eyebrow, title, subtitle, cta = "Anuncie aqui", footnote }) {
  const W = 900, H = 620;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${FOREST}"/><stop offset="1" stop-color="${FOREST2}"/></linearGradient>
  <linearGradient id="cta" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${TERRA}"/><stop offset="1" stop-color="${TERRA2}"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" rx="28" fill="url(#bg)"/>
${pulseLine(W, 150)}
${healthMotif(700, 250, 1.15)}
<circle cx="120" cy="560" r="130" fill="${TERRA}" opacity=".08"/>
<text x="60" y="96" fill="${TERRA}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="5">${eyebrow}</text>
<text x="58" y="230" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="400">${title}</text>
<text x="60" y="300" fill="#d7e5ec" font-family="Inter, Arial, sans-serif" font-size="27" font-weight="500">${subtitle}</text>
<rect x="60" y="470" width="288" height="66" rx="33" fill="url(#cta)"/>
<text x="204" y="512" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" text-anchor="middle" letter-spacing="1">${cta}</text>
<text x="60" y="588" fill="#8fa6b3" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="600" letter-spacing="1">${footnote}</text>
<text x="${W - 60}" y="588" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="800" text-anchor="end" letter-spacing="2">GUIA SAÚDE</text>
</svg>`;
}

// Banner topo (leaderboard) 1200x420.
function leaderboard({ eyebrow, title, subtitle, cta = "Anuncie aqui", footnote }) {
  const W = 1200, H = 420;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${FOREST}"/><stop offset="1" stop-color="${FOREST2}"/></linearGradient>
  <linearGradient id="cta" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${TERRA}"/><stop offset="1" stop-color="${TERRA2}"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" rx="24" fill="url(#bg)"/>
${pulseLine(W, 120)}
${healthMotif(1000, 210, 1.05)}
<text x="64" y="96" fill="${TERRA}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="5">${eyebrow}</text>
<text x="62" y="210" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="400">${title}</text>
<text x="64" y="262" fill="#d7e5ec" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="500">${subtitle}</text>
<rect x="64" y="312" width="270" height="60" rx="30" fill="url(#cta)"/>
<text x="199" y="350" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="800" text-anchor="middle" letter-spacing="1">${cta}</text>
<text x="${W - 64}" y="352" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="800" text-anchor="end" letter-spacing="2">GUIA SAÚDE · ${footnote}</text>
</svg>`;
}

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- Formatos comerciais ----
const formats = {
  "banner-topo": leaderboard({
    eyebrow: "PUBLICIDADE REGIONAL",
    title: "Sua marca na abertura",
    subtitle: "Espaço premium visto por toda a região de saúde",
    footnote: "BANNER TOPO · 1200×420",
  }),
  "banner-cidade": card({
    eyebrow: "PRESENÇA POR CIDADE",
    title: "Anuncie na sua cidade",
    subtitle: "O público local encontra sua marca primeiro",
    footnote: "FORMATO CIDADE · 900×620",
  }),
  "perfil-destaque": card({
    eyebrow: "PERFIL EM DESTAQUE",
    title: "Apareça em primeiro",
    subtitle: "Card premium na busca de profissionais e empresas",
    cta: "Destacar perfil",
    footnote: "DESTAQUE · 900×620",
  }),
  "materia-patrocinada": card({
    eyebrow: "CONTEÚDO DE MARCA",
    title: "Autoridade e alcance",
    subtitle: "Matéria identificada com revisão editorial",
    cta: "Publicar matéria",
    footnote: "PUBLIEDITORIAL · 900×620",
  }),
  "podcast-apoiado": card({
    eyebrow: "PODCAST APOIADO",
    title: "Conexão Saúde",
    subtitle: "Cota de apoio, chamada e distribuição integrada",
    cta: "Apoiar episódio",
    footnote: "PODCAST · 900×620",
  }),
  "revista-digital": card({
    eyebrow: "REVISTA + PORTAL",
    title: "Impresso e digital",
    subtitle: "Presença combinada na edição física e no portal",
    cta: "Reservar espaço",
    footnote: "REVISTA · 900×620",
  }),
};

for (const [name, svg] of Object.entries(formats)) {
  writeFileSync(join(outDir, `${name}.svg`), svg);
}

// ---- Banners por cidade ----
const cities = [
  { slug: "piumhi", name: "Piumhi", highlight: "Cidade-polo da região de saúde" },
  { slug: "capitolio", name: "Capitólio", highlight: "Público de turismo e temporada" },
  { slug: "pimenta", name: "Pimenta", highlight: "Entrada regional do Lago de Furnas" },
  { slug: "arcos", name: "Arcos", highlight: "Segundo maior mercado da carteira" },
  { slug: "formiga", name: "Formiga", highlight: "Sede da região de saúde" },
  { slug: "campo-belo", name: "Campo Belo", highlight: "Maior mercado da carteira" },
  { slug: "bambui", name: "Bambuí", highlight: "Cidade média com fluxo regional" },
  { slug: "sao-roque-de-minas", name: "São Roque de Minas", highlight: "Porta da Serra da Canastra" },
];

for (const city of cities) {
  const svg = card({
    eyebrow: `ANUNCIE EM ${esc(city.name).toUpperCase()}`,
    title: esc(city.name),
    subtitle: esc(city.highlight),
    cta: "Anuncie aqui",
    footnote: "FORMATO CIDADE · 900×620",
  });
  writeFileSync(join(outDir, `cidade-${city.slug}.svg`), svg);
}

console.log(`Gerados ${Object.keys(formats).length} formatos + ${cities.length} banners de cidade em public/ads/`);
