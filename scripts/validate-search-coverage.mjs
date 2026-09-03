import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { matchesProfessionalSpecialty, matchesSearchTerms } from "../lib/search-match.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Somente fontes que realmente entram no diretório público. Arquivos de review,
// overrides e filas editoriais não são cadastros concorrentes e não devem gerar
// falso positivo de slug duplicado.
const runtimeSources = [
  { file: "lib/data.ts", tier: "legacy" },
  { file: "lib/data/professional-additions.ts", tier: "curated" },
  { file: "lib/data/medical-sequence-additions.ts", tier: "curated" },
  { file: "lib/data/medical-expansion-otorrino.ts", tier: "curated" },
  { file: "lib/data/nonmedical-sequence-additions.ts", tier: "curated" },
  { file: "lib/data/podcast-professional-additions.ts", tier: "curated" },
];

function parseStringArray(source) {
  return [...source.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function recordsFromSource({ file, tier }) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const records = [];
  const pattern = /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?specialty:\s*"([^"]+)"[\s\S]*?services:\s*\[([^\]]*)\]/g;
  for (const match of source.matchAll(pattern)) {
    records.push({
      source: file,
      tier,
      slug: match[1],
      name: match[2],
      specialty: match[3],
      services: parseStringArray(match[4]),
    });
  }
  return records;
}

function specialtyAnchors(specialty) {
  const anchors = specialty
    .split(/\s+(?:e|&)\s+|[,;/+|]/i)
    .map((value) => value.trim())
    .filter((value) => value.length >= 4);
  return [...new Set([specialty.trim(), ...anchors])];
}

const records = runtimeSources.flatMap(recordsFromSource);
const failures = [];
let coverageAssertions = 0;
let compositeSpecialties = 0;

for (const record of records) {
  const anchors = specialtyAnchors(record.specialty);
  if (anchors.length > 1) compositeSpecialties += 1;

  for (const requested of anchors) {
    coverageAssertions += 1;
    if (!matchesProfessionalSpecialty(record, requested)) {
      failures.push(`${record.slug}: filtro "${requested}" não recupera especialidade "${record.specialty}" (${record.source})`);
    }
  }

  const searchable = `${record.name} ${record.specialty} ${record.services.join(" ")}`;
  for (const requested of [record.name, record.specialty, ...record.services]) {
    if (!requested) continue;
    coverageAssertions += 1;
    if (!matchesSearchTerms(searchable, requested)) {
      failures.push(`${record.slug}: busca textual "${requested}" deixou de recuperar o cadastro (${record.source})`);
    }
  }
}

const syntheticChecks = [
  ["Pediatria inclui especialidade composta", { specialty: "Pediatria e Pneumologia Infantil", services: ["Puericultura"] }, "Pediatria", true],
  ["Pneumologia Infantil inclui especialidade composta", { specialty: "Pediatria e Pneumologia Infantil", services: ["Puericultura"] }, "Pneumologia Infantil", true],
  ["Ginecologia inclui Ginecologia e Obstetrícia", { specialty: "Ginecologia e Obstetrícia", services: [] }, "Ginecologia", true],
  ["Ortopedia inclui Ortopedia e Traumatologia", { specialty: "Ortopedia e Traumatologia", services: [] }, "Ortopedia", true],
  ["Endocrinologia inclui Endocrinologia e Metabologia", { specialty: "Endocrinologia e Metabologia", services: [] }, "Endocrinologia", true],
  ["Ortodontia inclui Ortodontia e Ortopedia Facial", { specialty: "Ortodontia e Ortopedia Facial", services: [] }, "Ortodontia", true],
  ["Dermatologia não inclui Cardiologia", { specialty: "Cardiologia", services: ["Hipertensão"] }, "Dermatologia", false],
  ["Acentos e caixa não impedem busca", { specialty: "Ginecologia e Obstetrícia", services: [] }, "obstetricia", true],
];

for (const [label, item, requested, expected] of syntheticChecks) {
  coverageAssertions += 1;
  if (matchesProfessionalSpecialty(item, requested) !== expected) failures.push(`Regra de busca: ${label}`);
}

const bySlug = new Map();
for (const record of records) {
  const group = bySlug.get(record.slug) ?? [];
  group.push(record);
  bySlug.set(record.slug, group);
}

const duplicateSlugs = [];
const controlledLegacyOverrides = [];
for (const [slug, group] of bySlug) {
  if (group.length < 2) continue;
  const curated = group.filter((record) => record.tier === "curated");
  const legacy = group.filter((record) => record.tier === "legacy");

  // Um cadastro legado + exatamente uma versão curada é uma migração controlada:
  // public-directory dá precedência determinística à versão curada pelo mesmo slug.
  if (curated.length === 1 && legacy.length === 1 && group.length === 2) {
    controlledLegacyOverrides.push(slug);
    continue;
  }

  duplicateSlugs.push(slug);
}

console.log("Professional search coverage validation");
console.log(JSON.stringify({
  runtimeDataFilesScanned: runtimeSources.length,
  recordsScanned: records.length,
  compositeSpecialties,
  coverageAssertions,
  controlledLegacyOverrides,
  duplicateSlugsAcrossRuntimeSources: duplicateSlugs,
  failures: failures.length,
}, null, 2));

if (duplicateSlugs.length) {
  for (const slug of duplicateSlugs) {
    const locations = bySlug.get(slug).map((record) => record.source).join(", ");
    console.error(`Slug duplicado sem precedência segura: ${slug} (${locations})`);
  }
  process.exitCode = 1;
}

if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
