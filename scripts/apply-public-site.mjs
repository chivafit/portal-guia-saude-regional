// Publica as páginas de divulgação (site-publico/) no deploy web da Vercel:
// - /aplicativo/: apresentação do app para download;
// - /anuncie/: página para profissionais e clínicas anunciarem.
// O início do site é o próprio portal. Os builds dos aplicativos (Capacitor, CI do
// Android) não definem VERCEL e ficam sem essas páginas.
import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const force = process.env.APPLY_PUBLIC_SITE === "1";
if (process.env.VERCEL !== "1" && !force) {
  console.log("→ Site público: ignorado (não é deploy da Vercel).");
  process.exit(0);
}

const root = new URL("..", import.meta.url).pathname;
const src = join(root, "site-publico");
const out = join(root, "out");
if (!existsSync(join(out, "index.html"))) throw new Error("out/index.html não existe — rode o build antes.");

// Remove os payloads RSC da rota substituída: sem eles, links internos do portal
// para "/anuncie/" fazem navegação completa e abrem a página nova.
async function dropRsc(dir) {
  for (const f of await readdir(dir)) {
    if (f === "index.txt" || (f.startsWith("__next.") && f.endsWith(".txt"))) await rm(join(dir, f));
  }
}

await mkdir(join(out, "aplicativo"), { recursive: true });
await cp(join(src, "aplicativo", "index.html"), join(out, "aplicativo", "index.html"));
await mkdir(join(out, "anuncie"), { recursive: true });
await cp(join(src, "anuncie", "index.html"), join(out, "anuncie", "index.html"));
await dropRsc(join(out, "anuncie"));
await cp(join(src, "assets"), join(out, "site", "assets"), { recursive: true });
console.log("→ Site público aplicado: /aplicativo/, /anuncie/ e /site/assets/.");
