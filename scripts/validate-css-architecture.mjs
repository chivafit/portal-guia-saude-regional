import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const appDir=path.join(root,"app");
const layoutPath=path.join(appDir,"layout.tsx");
const layout=fs.readFileSync(layoutPath,"utf8");
const imports=[...layout.matchAll(/import\s+["']\.\/(.+?\.css)["'];/g)].map(m=>m[1]);
const failures=[];
const stripComments=(value)=>value.replace(/\/\*[\s\S]*?\*\//g,"");
const selectorPrelude=(css)=>[...css.matchAll(/([^{}]+)\{/g)].map(m=>m[1]).join("\n");

if(!imports.length) failures.push("Nenhum CSS global encontrado em app/layout.tsx.");
for(const obsolete of ["health-os-reference-pages-final.css","health-os-nav-reference-final.css"]){
  if(imports.includes(obsolete)) failures.push(`Camada obsoleta voltou ao runtime: ${obsolete}`);
}
if(imports.at(-1)!=="health-os-continuous-canvas.css") failures.push("health-os-continuous-canvas.css deve ser a ultima camada CSS global e permanecer visual-only.");

/* Generated interface copy is forbidden in Health OS/native styling layers. */
for(const file of imports.filter(file=>file.startsWith("health-os-"))){
  const full=path.join(appDir,file);
  if(!fs.existsSync(full)){failures.push(`Import CSS inexistente: ${file}`);continue}
  const css=stripComments(fs.readFileSync(full,"utf8"));
  const textual=[...css.matchAll(/content\s*:\s*["']([^"']+)["']/gi)].map(m=>m[1].trim()).filter(Boolean);
  for(const text of textual){
    if(/[A-Za-zÀ-ÿ]{3}/.test(text)) failures.push(`${file}: UI textual gerada por CSS (content: "${text}"). Use JSX/HTML.`);
  }
}

const compatPath=path.join(appDir,"health-os-legacy-compat.css");
if(fs.existsSync(compatPath)){
  const compat=stripComments(fs.readFileSync(compatPath,"utf8"));
  const selectors=selectorPrelude(compat);
  const forbidden=["hos-podcast","native-magazine","content-native","native-search-screen","native-search-shell","native-search-tabs","native-search-results","native-specialty","health-os-dock","hos-navbar","organization-"];
  for(const selector of forbidden){if(selectors.includes(selector)) failures.push(`health-os-legacy-compat.css nao pode possuir a familia ${selector}.`)}
}

const familyOwners={
  "navbar":"health-os-navbar.css",
  "back navigation":"health-os-back-navigation-fix.css",
  "profile controls":"health-os-profile-controls-final.css",
  "podcast":"health-os-podcast-canonical.css",
  "conteudos":"health-os-content-hub-final.css",
  "leitor de conteudo":"health-os-content-reader-canonical.css",
  "canvas":"health-os-continuous-canvas.css"
};
for(const [family,owner] of Object.entries(familyOwners)){
  if(!imports.includes(owner)) failures.push(`Owner canonico ausente para ${family}: ${owner}`);
}

/* The final canvas may not take ownership back from canonical interactive components. */
const canvasPath=path.join(appDir,"health-os-continuous-canvas.css");
if(fs.existsSync(canvasPath)){
  const canvas=stripComments(fs.readFileSync(canvasPath,"utf8"));
  const canvasSelectors=selectorPrelude(canvas);
  const forbiddenCanvasSelectors=["profile-clean-back","favorite-control","profile-share","hos-navbar","health-os-dock","hos-nav-item","hos-nav-orb","organization-back","native-search-back"];
  for(const selector of forbiddenCanvasSelectors){
    if(canvasSelectors.includes(selector)) failures.push(`health-os-continuous-canvas.css e visual-only e nao pode possuir ${selector}.`);
  }

  /* Native Home regression guard: decorative aura DIVs stay outside normal flow. */
  const auraRule=/\.health-os-home\s*>\s*\.health-os-aura\s*\{([^}]*)\}/m.exec(canvas)?.[1]??"";
  if(!/position\s*:\s*absolute\s*!important\s*;/i.test(auraRule)) failures.push("As auras decorativas da Home devem permanecer position:absolute!important para nao empurrar o shell no iOS WebKit.");
  if(!/pointer-events\s*:\s*none\s*!important\s*;/i.test(auraRule)) failures.push("As auras decorativas da Home devem permanecer sem interacao (pointer-events:none!important).");
}

/* Canonical owner sanity checks. */
const ownerChecks={
  "health-os-navbar.css":["hos-navbar","hos-nav-item","hos-nav-orb"],
  "health-os-back-navigation-fix.css":["profile-clean-back","organization-back","native-search-back"],
  "health-os-profile-controls-final.css":["favorite-control","profile-share"]
};
for(const [file,required] of Object.entries(ownerChecks)){
  const full=path.join(appDir,file);
  if(!fs.existsSync(full)) continue;
  const selectors=selectorPrelude(stripComments(fs.readFileSync(full,"utf8")));
  for(const selector of required){if(!selectors.includes(selector)) failures.push(`${file}: owner canonico perdeu ${selector}.`)}
}

console.log("CSS architecture validation");
console.log(JSON.stringify({globalCssImports:imports.length,lastLayer:imports.at(-1),legacyCompatibility:imports.includes("health-os-legacy-compat.css"),canonicalOwners:familyOwners,failures:failures.length},null,2));
if(failures.length){for(const failure of failures) console.error(`- ${failure}`);process.exit(1)}
console.log("Arquitetura CSS validada: canvas visual-only, owners canonicos protegidos e sem UI textual gerada por CSS.");
