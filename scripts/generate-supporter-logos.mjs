// Gera logos REDONDAS de exemplo para "apoiadores locais" do Guia Saúde.
// São placeholders neutros (marca abstrata em círculo) para trocar pelas logos
// reais dos apoiadores. Paleta do portal.
//   node scripts/generate-supporter-logos.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "supporters");
mkdirSync(outDir, { recursive: true });

// Marcas abstratas de saúde/bem-estar (nada que imite marca real).
const marks = {
  cross: `<path d="M60 42v36 M42 60h36" stroke="COLOR" stroke-width="11" stroke-linecap="round"/>`,
  heart: `<path d="M60 78c-16-11-24-20-24-30a13 13 0 0 1 24-7 13 13 0 0 1 24 7c0 10-8 19-24 30z" fill="COLOR"/>`,
  leaf: `<path d="M78 42c2 22-12 38-36 38 0-24 14-38 36-38z" fill="COLOR"/><path d="M50 74c8-12 16-20 24-26" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  drop: `<path d="M60 40c10 14 16 22 16 30a16 16 0 0 1-32 0c0-8 6-16 16-30z" fill="COLOR"/>`,
  pulse: `<path d="M38 60h12l6-14 8 28 6-14h12" stroke="COLOR" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  shield: `<path d="M60 40l18 7v14c0 12-8 19-18 23-10-4-18-11-18-23V47z" fill="COLOR"/><path d="M52 60l6 6 12-12" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};

const combos = [
  { bg: "#e7eef2", ring: "#17384e", mark: "pulse", color: "#17384e" },
  { bg: "#fbeee6", ring: "#e17840", mark: "cross", color: "#e17840" },
  { bg: "#e9f0ee", ring: "#2f6b5e", mark: "leaf", color: "#2f6b5e" },
  { bg: "#eaf0f4", ring: "#3a8dbd", mark: "drop", color: "#3a8dbd" },
  { bg: "#fbe9ea", ring: "#c9515a", mark: "heart", color: "#c9515a" },
  { bg: "#eef0f2", ring: "#5a6b76", mark: "shield", color: "#5a6b76" },
];

combos.forEach((c, i) => {
  const mark = marks[c.mark].replace(/COLOR/g, c.color);
  const svg = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="60" cy="60" r="58" fill="${c.bg}"/>
<circle cx="60" cy="60" r="58" fill="none" stroke="${c.ring}" stroke-opacity=".18" stroke-width="3"/>
${mark}
</svg>`;
  writeFileSync(join(outDir, `logo-${String(i + 1).padStart(2, "0")}.svg`), svg);
});

console.log(`Gerados ${combos.length} logos redondos de apoiador em public/supporters/`);
