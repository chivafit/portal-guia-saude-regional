import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const appDir=path.join(root,"app");
const layoutPath=path.join(appDir,"layout.tsx");
const layout=fs.readFileSync(layoutPath,"utf8");
const imports=[...layout.matchAll(/import\s+["']\.\/(.+?\.css)["'];/g)].map(m=>m[1]);
const failures=[];

if(!imports.length) failures.push("Nenhum CSS global encontrado em app/layout.tsx.");
for(const obsolete of ["health-os-reference-pages-final.css","health-os-nav-reference-final.css"]){
  if(imports.includes(obsolete)) failures.push(`Camada obsoleta voltou ao runtime: ${obsolete}`);
}
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
  const forbidden=["hos-podcast","native-magazine","content-native","native-search","native-specialty","health-os-dock","hos-navbar","organization-"];
  const unscopedCompat=compat.replaceAll(/\.native-featured-screen \.native-search[\w-]+/g, "");
  for(const selector of forbidden){if(unscopedCompat.includes(selector)) failures.push(`health-os-legacy-compat.css nao pode possuir a familia ${selector}.`)}
}

const familyOwners={
  "navbar":"health-os-navbar.css",
  "podcast":"health-os-podcast-canonical.css",
  "conteudos":"health-os-content-hub-final.css",
  "leitor de conteudo":"health-os-content-reader-canonical.css",
  "canvas":"health-os-continuous-canvas.css"
};
for(const [family,owner] of Object.entries(familyOwners)){
  if(!imports.includes(owner)) failures.push(`Owner canonico ausente para ${family}: ${owner}`);
}

console.log("CSS architecture validation");
console.log(JSON.stringify({globalCssImports:imports.length,lastLayer:imports.at(-1),legacyCompatibility:imports.includes("health-os-legacy-compat.css"),failures:failures.length},null,2));
if(failures.length){for(const failure of failures) console.error(`- ${failure}`);process.exit(1)}
console.log("Arquitetura CSS validada: sem UI textual via CSS, sem camadas reference obsoletas e com ownership canonico protegido.");
