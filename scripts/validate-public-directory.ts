import { publicProfessionals } from "../lib/public-directory";
import { existsSync, readFileSync } from "node:fs";

const forbiddenPublicText = /(contato\s+(a validar|será validado|em validação)|aguardando validação|pendente de confirmação|a confirmar)/i;
const whatsAppUrl = /^https:\/\/wa\.me\/55\d{10,11}$/;
const errors: string[] = [];

function normalized(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function unique(label: string, values: Array<[string, string]>) {
  const seen = new Map<string, string>();
  for (const [key, slug] of values) {
    if (!key) continue;
    const previous = seen.get(key);
    if (previous) errors.push(`${label} duplicado: ${previous} e ${slug}.`);
    else seen.set(key, slug);
  }
}

for (const item of publicProfessionals) {
  if (item.city !== "Piumhi") errors.push(`${item.slug}: cidade pública inválida (${item.city}).`);
  if (!item.name || !item.profession || !item.specialty || !item.city) errors.push(`${item.slug}: faltam campos públicos obrigatórios.`);
  const visible = [item.name, item.profession, item.specialty, item.city, item.organization, item.registration, item.phone, item.whatsapp, item.summary].join(" · ");
  if (forbiddenPublicText.test(visible)) errors.push(`${item.slug}: texto editorial pendente exposto publicamente.`);
  if (item.whatsapp && !whatsAppUrl.test(item.whatsapp)) errors.push(`${item.slug}: URL de WhatsApp inválida (${item.whatsapp}).`);
  if (item.locations?.some((location) => forbiddenPublicText.test([location.name, location.address, location.phone, location.whatsapp].filter(Boolean).join(" · ")))) {
    errors.push(`${item.slug}: local com dado pendente exposto publicamente.`);
  }
}

unique("slug", publicProfessionals.map((item) => [item.slug, item.slug]));
unique("nome + registro", publicProfessionals
  .filter((item) => /\d/.test(item.registration))
  .map((item) => [`${normalized(item.name)}|${normalized(item.registration)}`, item.slug]));

if (errors.length) {
  console.error("Falha na integridade do diretório público:\n- " + errors.join("\n- "));
  process.exit(1);
}

const totals = publicProfessionals.reduce<Record<string, number>>((acc, item) => {
  acc[item.profession] = (acc[item.profession] ?? 0) + 1;
  return acc;
}, {});
console.log(`Diretório público validado: ${publicProfessionals.length} profissionais de Piumhi.`);
console.log(Object.entries(totals).sort(([a], [b]) => a.localeCompare(b, "pt-BR")).map(([profession, total]) => `${profession}: ${total}`).join(" · "));

if (process.argv.includes("--check-sitemap")) {
  const sitemapPath = new URL("../out/sitemap.xml", import.meta.url);
  if (!existsSync(sitemapPath)) {
    console.error("Sitemap não encontrado após o build.");
    process.exit(1);
  }
  const sitemap = readFileSync(sitemapPath, "utf8");
  const missing = publicProfessionals.filter((item) => !sitemap.includes(`/profissionais/${item.slug}/`));
  if (missing.length) {
    console.error(`Sitemap sem ${missing.length} perfil(is) público(s): ${missing.map((item) => item.slug).join(", ")}`);
    process.exit(1);
  }
  console.log(`Sitemap validado: ${publicProfessionals.length} URLs de profissionais públicos.`);
}
