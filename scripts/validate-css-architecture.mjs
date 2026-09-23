import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, "app");
const layout = fs.readFileSync(path.join(appDir, "layout.tsx"), "utf8");
const imports = [...layout.matchAll(/import\s+["']\.\/(.+?\.css)["'];/g)].map((match) => match[1]);
const failures = [];
const expected = ["globals.css", "portal-canonical.css"];

if (JSON.stringify(imports) !== JSON.stringify(expected)) {
  failures.push(`O layout deve carregar somente ${expected.join(" e ")}; encontrados: ${imports.join(", ")}.`);
}

for (const file of expected) {
  if (!fs.existsSync(path.join(appDir, file))) failures.push(`CSS canônico ausente: ${file}.`);
}

const legacyFiles = fs.readdirSync(appDir).filter((file) =>
  file.endsWith(".css") && (
    file.startsWith("health-os-") ||
    file === "native-app.css" ||
    file === "desktop-routes.css" ||
    file === "desktop-app-reference.css" ||
    file === "reference-2026.css"
  )
);
if (legacyFiles.length) failures.push(`Camadas CSS legadas ainda presentes: ${legacyFiles.join(", ")}.`);

const canonicalPath = path.join(appDir, "portal-canonical.css");
if (fs.existsSync(canonicalPath)) {
  const css = fs.readFileSync(canonicalPath, "utf8");
  const textual = [...css.matchAll(/content\s*:\s*["']([^"']+)["']/gi)]
    .map((match) => match[1].trim())
    .filter((value) => /[A-Za-zÀ-ÿ]{3}/.test(value));
  if (textual.length) failures.push(`A interface contém texto gerado por CSS: ${textual.join(", ")}.`);
  for (const selector of [".gsd-home", ".gsm-home", ".native-search-screen", ".profile-page-clean", ".organization-page", ".content-native-page", ".hos-podcast-page"]) {
    if (!css.includes(selector)) failures.push(`Família canônica ausente: ${selector}.`);
  }
}

console.log("CSS architecture validation");
console.log(JSON.stringify({ globalCssImports: imports.length, canonicalBundle: imports.at(-1), legacyFiles: legacyFiles.length, failures: failures.length }, null, 2));
if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Arquitetura CSS validada: uma fundação global e um bundle visual canônico, sem camadas legadas.");
