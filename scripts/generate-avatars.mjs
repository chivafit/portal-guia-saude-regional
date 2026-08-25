// Gera avatares ilustrados (SVG vetorial) para perfis demonstrativos do Guia Saúde.
// Paleta do portal: azul-petróleo, terracota, sage, creme. Retratos genéricos,
// variados por tom de pele, cabelo, traje e acessório — nenhum representa pessoa real.
//   node scripts/generate-avatars.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "avatars");
mkdirSync(outDir, { recursive: true });

const backgrounds = ["#e7eef2", "#eef1e6", "#f3ece6", "#e6edf0", "#eaf0ee", "#f1ebe4"];
const skins = ["#f2d3bd", "#e8be9e", "#d7a074", "#b97f52", "#8d5a34", "#6b4326"];
const hairs = ["#2b2b2f", "#4a3627", "#6d5642", "#8a8f96", "#1f1f22", "#5b3a29"];
const coats = ["#f7f9fa", "#183b56", "#e17840", "#7593a7", "#f7f9fa", "#2f6b5e"];

// Estilos de cabelo/cabeça (função recebe cor). cx=200, topo da cabeça ~ y=108.
const hairstyles = [
  // curto arredondado
  (c) => `<path d="M132 150c0-44 30-70 68-70s68 26 68 70c-10-28-30-40-68-40s-58 12-68 40z" fill="${c}"/>`,
  // médio com laterais
  (c) => `<path d="M128 168c-4-56 28-92 72-92s76 36 72 92c-8-16-14-40-14-58 0 0-22 20-58 20s-58-20-58-20c0 18-6 42-14 58z" fill="${c}"/>`,
  // coque / preso
  (c) => `<circle cx="200" cy="70" r="20" fill="${c}"/><path d="M134 150c0-44 30-68 66-68s66 24 66 68c-12-30-32-42-66-42s-54 12-66 42z" fill="${c}"/>`,
  // cabelo comprido nos ombros
  (c) => `<path d="M126 250c-8-70-2-120 6-142 12-32 40-44 62-44s50 12 62 44c8 22 14 72 6 142-16-10-22-64-24-96-6 20-24 34-44 34s-38-14-44-34c-2 32-8 86-24 96z" fill="${c}"/>`,
  // careca / raspado (só sombra de barba leve, sem massa de cabelo)
  (c) => `<path d="M140 138c8-34 32-52 60-52s52 18 60 52c-14-18-34-26-60-26s-46 8-60 26z" fill="${c}" opacity=".35"/>`,
  // touca cirúrgica / lenço
  (c) => `<path d="M128 150c0-48 32-78 72-78s72 30 72 78c0-6-144-6-144 0z" fill="${c}"/><path d="M128 150c0-6 144-6 144 0" stroke="rgba(255,255,255,.25)" stroke-width="4" fill="none"/>`,
];

function svg({ bg, skin, hair, coat, style, glasses }) {
  const light = coat === "#f7f9fa";
  const coatLine = light ? "#dbe3e8" : "rgba(255,255,255,.22)";
  return `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="400" fill="${bg}"/>
<circle cx="200" cy="190" r="150" fill="rgba(255,255,255,.45)"/>
<path d="M96 400c0-62 46-104 104-104s104 42 104 104z" fill="${coat}"/>
<path d="M170 300c0 24 60 24 60 0v-26h-60z" fill="${skin}"/>
<path d="M200 400v-96" stroke="${coatLine}" stroke-width="6"/>
<path d="M172 300c-18 8-30 26-34 52M228 300c18 8 30 26 34 52" stroke="${coatLine}" stroke-width="5" fill="none"/>
<ellipse cx="200" cy="196" rx="66" ry="74" fill="${skin}"/>
<ellipse cx="150" cy="200" rx="10" ry="12" fill="${skin}"/>
<ellipse cx="250" cy="200" rx="10" ry="12" fill="${skin}"/>
${hairstyles[style](hair)}
<circle cx="177" cy="192" r="6" fill="#2c2c30"/>
<circle cx="223" cy="192" r="6" fill="#2c2c30"/>
<path d="M188 218c8 8 16 8 24 0" stroke="#b56a4a" stroke-width="5" stroke-linecap="round" fill="none"/>
<path d="M196 200c-4 8-4 12 4 14" stroke="rgba(0,0,0,.12)" stroke-width="4" stroke-linecap="round" fill="none"/>
${glasses ? `<g stroke="#2f4658" stroke-width="5" fill="none"><rect x="158" y="182" width="34" height="26" rx="10"/><rect x="208" y="182" width="34" height="26" rx="10"/><path d="M192 192h16"/></g>` : ""}
</svg>`;
}

// Combinações curadas para boa diversidade (16 avatares).
const combos = [
  { s: 0, sk: 0, h: 0, c: 0, g: false }, { s: 1, sk: 2, h: 1, c: 1, g: true },
  { s: 2, sk: 1, h: 0, c: 4, g: false }, { s: 3, sk: 3, h: 5, c: 2, g: false },
  { s: 1, sk: 4, h: 4, c: 3, g: true }, { s: 4, sk: 5, h: 4, c: 0, g: false },
  { s: 5, sk: 2, h: 0, c: 5, g: false }, { s: 2, sk: 0, h: 2, c: 1, g: true },
  { s: 3, sk: 1, h: 3, c: 4, g: false }, { s: 0, sk: 3, h: 1, c: 3, g: true },
  { s: 1, sk: 5, h: 0, c: 4, g: false }, { s: 4, sk: 2, h: 4, c: 2, g: false },
  { s: 5, sk: 4, h: 5, c: 1, g: true }, { s: 2, sk: 3, h: 1, c: 0, g: false },
  { s: 3, sk: 0, h: 2, c: 5, g: false }, { s: 0, sk: 4, h: 4, c: 3, g: true },
];

combos.forEach((combo, i) => {
  const markup = svg({
    bg: backgrounds[i % backgrounds.length],
    skin: skins[combo.sk],
    hair: hairs[combo.h],
    coat: coats[combo.c],
    style: combo.s,
    glasses: combo.g,
  });
  const name = `av-${String(i + 1).padStart(2, "0")}.svg`;
  writeFileSync(join(outDir, name), markup);
});

console.log(`Gerados ${combos.length} avatares em public/avatars/`);
