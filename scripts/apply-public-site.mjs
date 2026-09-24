// Publica o site de divulgação (site-publico/) no lugar do início e de /anuncie/
// somente no deploy web da Vercel. Os builds dos aplicativos (Capacitor, CI do
// Android, GitHub Pages) não definem VERCEL e ficam com a experiência completa.
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

// Remove os payloads RSC dessas rotas: sem eles, links internos do portal para
// "/" e "/anuncie/" fazem navegação completa e abrem as páginas novas.
async function dropRsc(dir) {
  for (const f of await readdir(dir)) {
    if (f === "index.txt" || (f.startsWith("__next.") && f.endsWith(".txt"))) await rm(join(dir, f));
  }
}

await cp(join(src, "index.html"), join(out, "index.html"));
await dropRsc(out);
await mkdir(join(out, "anuncie"), { recursive: true });
await cp(join(src, "anuncie", "index.html"), join(out, "anuncie", "index.html"));
await dropRsc(join(out, "anuncie"));
await cp(join(src, "assets"), join(out, "site", "assets"), { recursive: true });
console.log("→ Site público aplicado: /, /anuncie/ e /site/assets/.");
