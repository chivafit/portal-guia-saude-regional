import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const appDir=path.join(root,"app");
const layoutPath=path.join(appDir,"layout.tsx");
const layout=fs.readFileSync(layoutPath,"utf8");
const imports=[...layout.matchAll(/import\s+["']\.\/(.+?\.css)["'];/g)].map(m=>m[1]);
const failures=[];

if(!imports.length) failures.push("Nenhum CSS global encontrado em app/layout.tsx.");
if(imports.includes("health-os-reference-pages-final.css")) failures.push("Camada obsoleta health-os-reference-pages-final.css voltou ao runtime.");
if(imports.at(-1)!=="health-os-continuous-canvas.css") failures.push("health-os-continuous-canvas.css deve ser a ultima camada CSS global.");

for(const file of imports){
  const full=path.join(appDir,file);
  if(!fs.existsSync(full)){failures.push(`Import CSS inexistente: ${file}`);continue}
  const css=fs.readFileSync(full,"utf8");
  const textual=[...css.matchAll(/content\s*:\s*["']([^"']+)["']/gi)].map(m=>m[1].trim()).filter(Boolean);
  for(const text of textual){
    if(/[A-Za-zÀ-ÿ]{3}/.test(text)) failures.push(`${file}: UI textual gerada por CSS (content: "${text}"). Use JSX/HTML.`);
  }
}

const compatPath=path.join(appDir,"health-os-legacy-compat.css");
if(fs.existsSync(compatPath)){
  const compat=fs.readFileSync(compatPath,"utf8");
  const forbidden=["hos-podcast","native-magazine","content-native","native-search-tabs","native-specialty-grid"];
  for(const selector of forbidden){if(compat.includes(selector)) failures.push(`health-os-legacy-compat.css nao pode possuir a familia ${selector}.`)}
}

const familyOwners={
  "hos-podcast":"health-os-podcast-canonical.css",
  "content-native":"health-os-content-hub-final.css",
  "content-reader":"health-os-content-reader-canonical.css"
};
for(const [family,owner] of Object.entries(familyOwners)){
  if(!imports.includes(owner)) failures.push(`Owner canonico ausente para ${family}: ${owner}`);
}

console.log("CSS architecture validation");
console.log(JSON.stringify({globalCssImports:imports.length,lastLayer:imports.at(-1),legacyCompatibility:imports.includes("health-os-legacy-compat.css"),failures:failures.length},null,2));
if(failures.length){for(const failure of failures) console.error(`- ${failure}`);process.exit(1)}
console.log("Arquitetura CSS validada: sem UI textual via CSS e sem ownership legado de Podcast/Revista/Conteudos/Buscar.");
