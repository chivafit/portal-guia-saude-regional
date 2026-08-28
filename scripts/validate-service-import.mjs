#!/usr/bin/env node
/** Pré-validação editorial; este script jamais altera a fonte pública. */
import fs from "node:fs";

const file = process.argv[2];
if (!file) throw new Error("Informe um arquivo JSON: npm run validate:service-import -- arquivo.json");
const records = JSON.parse(fs.readFileSync(file, "utf8"));
if (!Array.isArray(records)) throw new Error("O arquivo deve conter uma lista JSON de organizações.");

const allowedCategories = new Set(["clinicas", "odontologia", "hospitais", "academias", "pilates", "fisioterapia-reabilitacao", "farmacias", "oticas", "laboratorios", "estetica", "servicos-publicos"]);
const publicationStatuses = new Set(["draft", "published", "inactive"]);
const verificationStatuses = new Set(["public-source", "official-source", "direct-confirmation"]);
const relationships = new Set(["organic", "partner", "sponsored"]);
const normalize = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const phoneDigits = (value) => String(value ?? "").replace(/\D/g, "");
const validPhone = (value) => /^(?:55)?\d{10,11}$/.test(phoneDigits(value)) && !/^(\d)\1+$/.test(phoneDigits(value));
const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? "")) && !Number.isNaN(Date.parse(`${value}T12:00:00Z`));
const validUrl = (value) => { try { return new URL(value).protocol === "https:"; } catch { return false; } };
const tokenSet = (value) => new Set(normalize(value).split(" ").filter((token) => token.length > 2));
const similarity = (a, b) => { const left = tokenSet(a); const right = tokenSet(b); const common = [...left].filter((token) => right.has(token)).length; return common / Math.max(1, new Set([...left, ...right]).size); };
const problems = [];
const reviews = [];
const accepted = [];
const seen = { slug: new Map(), phone: new Map(), address: new Map(), identity: new Map() };

for (const [index, record] of records.entries()) {
  const label = `Registro ${index + 1}${record.name ? ` (${record.name})` : ""}`;
  const sourceUrls = record.sourceUrls ?? (record.source ? [record.source] : []);
  const required = ["name", "slug", "categoryKey", "city", "address", "phone", "services", "lastVerifiedAt", "publicationStatus", "verificationStatus", "relationship"];
  const recordProblems = [];
  for (const field of required) if (!record[field] || (Array.isArray(record[field]) && !record[field].length)) recordProblems.push(`campo obrigatório ausente: ${field}`);
  if (normalize(record.city) !== "piumhi") recordProblems.push("esta fase aceita somente estabelecimentos de Piumhi.");
  if (!allowedCategories.has(record.categoryKey)) recordProblems.push(`categoryKey inválida (${record.categoryKey}).`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug ?? "")) recordProblems.push("slug deve usar minúsculas, números e hífens.");
  if (!validPhone(record.phone)) recordProblems.push("telefone comercial público inválido.");
  if (record.whatsapp && !validPhone(record.whatsapp)) recordProblems.push("WhatsApp inválido.");
  if (!Array.isArray(record.services) || record.services.some((service) => typeof service !== "string" || !service.trim())) recordProblems.push("services deve ter ao menos um texto válido.");
  if (!sourceUrls.length || sourceUrls.some((url) => !validUrl(url))) recordProblems.push("sourceUrls precisa ter ao menos uma URL HTTPS válida.");
  if (!validDate(record.lastVerifiedAt)) recordProblems.push("lastVerifiedAt deve ser uma data ISO válida.");
  if (!publicationStatuses.has(record.publicationStatus)) recordProblems.push("publicationStatus inválido.");
  if (!verificationStatuses.has(record.verificationStatus)) recordProblems.push("verificationStatus inválido.");
  if (!relationships.has(record.relationship)) recordProblems.push("relationship inválido.");
  if (record.publicationStatus === "published" && (!validPhone(record.phone) || !sourceUrls.length)) recordProblems.push("publicação exige contato público e fonte rastreável.");
  if (recordProblems.length) { problems.push(`${label}: ${recordProblems.join(" ")}`); continue; }
  const keys = { slug: record.slug, phone: phoneDigits(record.phone), address: `${normalize(record.address)}|piumhi`, identity: `${normalize(record.name)}|piumhi|${normalize(record.address)}` };
  for (const [kind, key] of Object.entries(keys)) { const previous = seen[kind].get(key); if (previous) reviews.push(`${label}: possível duplicidade de ${kind} com ${previous}.`); else seen[kind].set(key, label); }
  for (const previous of records.slice(0, index)) if (previous?.name && similarity(record.name, previous.name) >= .8 && normalize(previous.city) === "piumhi") reviews.push(`${label}: nome semelhante a ${previous.name}; decidir inclusão ou atualização manualmente.`);
  accepted.push(`${label}: ${record.publicationStatus === "published" ? "inclusão/atualização após revisão" : "rascunho para revisão"} (${record.categoryKey})`);
}

console.log(`Prévia da importação: ${records.length} registro(s) lido(s).`);
console.log(`Prontos para revisão editorial: ${accepted.length}.`);
for (const item of accepted) console.log(`  • ${item}`);
if (reviews.length) console.warn(`\nRevisão manual necessária (${reviews.length}):\n- ${reviews.join("\n- ")}`);
if (problems.length) {
  console.error("\nImportação bloqueada:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("\nLote estruturalmente válido. Nenhum dado foi publicado ou sobrescrito por este comando.");
