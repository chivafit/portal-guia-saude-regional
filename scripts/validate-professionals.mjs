import fs from "node:fs";

const dataPath = new URL("../lib/data.ts", import.meta.url);
const source = fs.readFileSync(dataPath, "utf8");

const blocks = [...source.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?\n\s*\},/g)];
const slugs = blocks.map((match) => match[1]);
const duplicateSlugs = [...new Set(slugs.filter((slug, index) => slugs.indexOf(slug) !== index))];

const exportedSection = source.slice(source.indexOf("export const professionals"));
const reviewMarkers = [...exportedSection.matchAll(/(a validar|aguardando validação|pendente de confirmação|a confirmar)/gi)];
const demoMarkers = [...exportedSection.matchAll(/perfil demonstrativo|fictíci[oa]/gi)];

const report = {
  recordsDetected: slugs.length,
  duplicateSlugs,
  reviewMarkersInExportLogic: reviewMarkers.length,
  demoMarkersInExportLogic: demoMarkers.length,
};

console.log("Professional directory validation");
console.log(JSON.stringify(report, null, 2));

if (duplicateSlugs.length) {
  console.error(`Duplicate professional slugs: ${duplicateSlugs.join(", ")}`);
  process.exitCode = 1;
}

if (demoMarkers.length) {
  console.error("Demonstrative/fictitious markers detected after the professionals export declaration.");
  process.exitCode = 1;
}
