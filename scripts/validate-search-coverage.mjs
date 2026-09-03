import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { matchesProfessionalSpecialty, matchesSearchTerms } from "../lib/search-match.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function collectTypeScriptFiles(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...collectTypeScriptFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".ts")) result.push(absolute);
  }
  return result;
}

const sourceFiles = [
  path.join(root, "lib/data.ts"),
  ...collectTypeScriptFiles(path.join(root, "lib/data")),
];

function parseStringArray(source) {
  return [...source.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function recordsFromSource(absolutePath) {
  const source = fs.readFileSync(absolutePath, "utf8");
  const relativePath = path.relative(root, absolutePath);
  const records = [];
  const pattern = /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?specialty:\s*"([^"]+)"[\s\S]*?services:\s*\[([^\]]*)\]/g;
  for (const match of source.matchAll(pattern)) {
    records.push({
      source: relativePath,
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

const records = sourceFiles.flatMap(recordsFromSource);
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
  {
    label: "Pediatria inclui especialidade composta",
    result: matchesProfessionalSpecialty({ specialty: "Pediatria e Pneumologia Infantil", services: ["Puericultura"] }, "Pediatria"),
    expected: true,
  },
  {
    label: "Pneumologia Infantil inclui especialidade composta",
    result: matchesProfessionalSpecialty({ specialty: "Pediatria e Pneumologia Infantil", services: ["Puericultura"] }, "Pneumologia Infantil"),
    expected: true,
  },
  {
    label: "Ginecologia inclui Ginecologia e Obstetrícia",
    result: matchesProfessionalSpecialty({ specialty: "Ginecologia e Obstetrícia", services: [] }, "Ginecologia"),
    expected: true,
  },
  {
    label: "Ortopedia inclui Ortopedia e Traumatologia",
    result: matchesProfessionalSpecialty({ specialty: "Ortopedia e Traumatologia", services: [] }, "Ortopedia"),
    expected: true,
  },
  {
    label: "Endocrinologia inclui Endocrinologia e Metabologia",
    result: matchesProfessionalSpecialty({ specialty: "Endocrinologia e Metabologia", services: [] }, "Endocrinologia"),
    expected: true,
  },
  {
    label: "Ortodontia inclui Ortodontia e Ortopedia Facial",
    result: matchesProfessionalSpecialty({ specialty: "Ortodontia e Ortopedia Facial", services: [] }, "Ortodontia"),
    expected: true,
  },
  {
    label: "Dermatologia não inclui Cardiologia",
    result: matchesProfessionalSpecialty({ specialty: "Cardiologia", services: ["Hipertensão"] }, "Dermatologia"),
    expected: false,
  },
  {
    label: "Acentos e caixa não impedem busca",
    result: matchesProfessionalSpecialty({ specialty: "Ginecologia e Obstetrícia", services: [] }, "obstetricia"),
    expected: true,
  },
];

for (const check of syntheticChecks) {
  coverageAssertions += 1;
  if (check.result !== check.expected) failures.push(`Regra de busca: ${check.label}`);
}

const duplicateSlugs = [...new Set(records.map((record) => record.slug).filter((slug, index, all) => all.indexOf(slug) !== index))];

console.log("Professional search coverage validation");
console.log(JSON.stringify({
  dataFilesScanned: sourceFiles.length,
  recordsScanned: records.length,
  compositeSpecialties,
  coverageAssertions,
  duplicateSlugsAcrossSources: duplicateSlugs,
  failures: failures.length,
}, null, 2));

if (duplicateSlugs.length) {
  console.warn(`Aviso: slugs repetidos entre fontes: ${duplicateSlugs.join(", ")}`);
}

if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
