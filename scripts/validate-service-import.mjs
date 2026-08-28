#!/usr/bin/env node
/**
 * Valida um lote JSON antes de ele ser copiado para a fonte editorial do
 * diretório. Não publica nem altera dados automaticamente.
 * Uso: node scripts/validate-service-import.mjs data/servicos-novos.json
 */
import fs from "node:fs";

const file = process.argv[2];
if (!file) throw new Error("Informe um arquivo JSON: node scripts/validate-service-import.mjs arquivo.json");
const records = JSON.parse(fs.readFileSync(file, "utf8"));
if (!Array.isArray(records)) throw new Error("O arquivo deve conter uma lista JSON de organizações.");

const required = ["name", "categoryKey", "city", "address", "phone", "services", "source"];
const allowedCategories = new Set(["clinicas", "odontologia", "hospitais", "academias", "pilates", "farmacias", "oticas", "laboratorios", "estetica"]);
const normalize = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const phoneDigits = (value) => String(value ?? "").replace(/\D/g, "");
const problems = [];
const seen = new Map();

for (const [index, record] of records.entries()) {
  const label = `Registro ${index + 1}`;
  for (const field of required) if (!record[field] || (Array.isArray(record[field]) && !record[field].length)) problems.push(`${label}: campo obrigatório ausente: ${field}`);
  if (record.city && normalize(record.city) !== "piumhi") problems.push(`${label}: nesta fase somente Piumhi pode ser publicado.`);
  if (record.categoryKey && !allowedCategories.has(record.categoryKey)) problems.push(`${label}: categoryKey inválida (${record.categoryKey}).`);
  if (record.phone && phoneDigits(record.phone).length < 10) problems.push(`${label}: telefone público inválido.`);
  if (record.source && !/^https:\/\//.test(record.source)) problems.push(`${label}: source deve usar URL HTTPS.`);
  const duplicateKey = `${normalize(record.name)}|${normalize(record.city)}|${normalize(record.address)}`;
  if (seen.has(duplicateKey)) problems.push(`${label}: possível duplicata de ${seen.get(duplicateKey)}.`);
  else seen.set(duplicateKey, label);
}

if (problems.length) {
  console.error("Importação bloqueada:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log(`Lote válido: ${records.length} organizações. Revise as fontes antes de adicionar à fonte pública.`);
