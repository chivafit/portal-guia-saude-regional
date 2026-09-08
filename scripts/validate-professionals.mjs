import fs from "node:fs";

const dataPath = new URL("../lib/data.ts", import.meta.url);
const source = fs.readFileSync(dataPath, "utf8");

const blocks = [...source.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?\n\s*\},/g)];
const slugs = blocks.map((match) => match[1]);
const duplicateSlugs = [...new Set(slugs.filter((slug, index) => slugs.indexOf(slug) !== index))];

const report = {
  recordsDetected: slugs.length,
  duplicateSlugs,
  publicIntegrityValidation: "npm run validate:directory",
};

console.log("Professional directory validation");
console.log(JSON.stringify(report, null, 2));

if (duplicateSlugs.length) {
  console.error(`Duplicate professional slugs: ${duplicateSlugs.join(", ")}`);
  process.exitCode = 1;
}
