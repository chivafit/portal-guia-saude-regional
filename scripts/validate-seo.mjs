import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const origin = "https://guiasaude.app.br";
const out = resolve("out");
const sitemap = await readFile(resolve(out, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const issues = [];

function pageFile(url) {
  const path = new URL(url).pathname;
  return resolve(out, path === "/" ? "index.html" : `${path.slice(1)}index.html`);
}

for (const url of urls) {
  const file = pageFile(url);
  if (!existsSync(file)) {
    issues.push(`${url}: arquivo estático ausente`);
    continue;
  }
  const html = await readFile(file, "utf8");
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]);
  const robots = [...html.matchAll(/<meta name="robots" content="([^"]+)"/g)].map((match) => match[1]);
  if (canonicals.length !== 1 || canonicals[0] !== url) issues.push(`${url}: canonical inválido`);
  if (robots.length !== 1 || robots[0] !== "index, follow") issues.push(`${url}: robots inválido`);
  if (!/<title>[^<]+<\/title>/.test(html)) issues.push(`${url}: título ausente`);
}

const search = await readFile(resolve(out, "buscar/index.html"), "utf8");
if (!search.includes('name="robots" content="noindex, follow"')) issues.push("/buscar/: deveria usar noindex, follow");

const city = await readFile(resolve(out, "cidades/piumhi/index.html"), "utf8");
if (!city.includes(`rel="canonical" href="${origin}/"`) || !city.includes('name="robots" content="noindex, follow"')) issues.push("/cidades/piumhi/: canonical/noindex inválido");

const notFound = await readFile(resolve(out, "404.html"), "utf8");
if (!notFound.includes('name="robots" content="noindex, nofollow"')) issues.push("/404.html: robots inválido");

if (urls.some((url) => !url.startsWith(`${origin}/`) || !url.endsWith("/"))) issues.push("Sitemap contém URL sem barra final ou fora do domínio canônico");
if (urls.some((url) => url.includes("/buscar/") || url.includes("/cidades/piumhi/"))) issues.push("Sitemap contém rota não indexável");
if (/<lastmod>/.test(sitemap)) issues.push("Sitemap usa lastmod sem uma fonte editorial confiável");

if (issues.length) {
  console.error(`Validação SEO falhou (${issues.length}):\n${issues.join("\n")}`);
  process.exit(1);
}

console.log(`SEO validado: ${urls.length} URLs canônicas e indexáveis.`);
