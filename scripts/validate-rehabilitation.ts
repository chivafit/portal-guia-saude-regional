import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { publishedOrganizations, publishedProfessionals } from "../lib/public-directory";
import { rehabilitationOrganizations } from "../lib/data/rehabilitation-organizations";
import { filterOrganizations } from "../lib/search";

const organizations = await publishedOrganizations();
assert.equal(organizations.length, 62);
assert.equal((await publishedProfessionals()).length, 137);
assert.equal(new Set(organizations.map(item => item.slug)).size, organizations.length);
const sitemap = readFileSync("out/sitemap.xml", "utf8");
for (const item of rehabilitationOrganizations) {
  const published = organizations.filter(entry => entry.slug === item.slug);
  assert.equal(published.length, 1, item.slug);
  assert.ok(published[0].sourceUrls!.length >= 2);
  assert.ok(filterOrganizations(organizations, { query: item.name, city: "Piumhi" }).some(entry => entry.slug === item.slug));
  assert.ok(filterOrganizations(organizations, { query: "fisioterapia" }).some(entry => entry.slug === item.slug));
  if (item.services.includes("Pilates")) assert.ok(filterOrganizations(organizations, { query: "pilates" }).some(entry => entry.slug === item.slug));
  const html = readFileSync(`out/empresas/${item.slug}/index.html`, "utf8");
  assert.ok(html.includes(item.name), item.slug);
  assert.ok(sitemap.includes(`/empresas/${item.slug}/`));
  assert.ok(!item.whatsapp && !item.hours);
  if (!item.phone) assert.ok(!html.includes('href="tel:'), item.slug);
  assert.ok(!/Contato a validar|pendente de validação/.test(html));
  assert.ok(published[0].mapUrl?.startsWith("https://www.google.com/maps/search/"));
}
assert.ok(filterOrganizations(organizations, { query: "Michele Freire" }).some(item => item.slug.startsWith("michelle-freire")));
assert.ok(!organizations.some(item => /recovery|borboletando|revivare/i.test(item.name)));
console.log("Expansão validada: 5 páginas, fontes, buscas, mapas, contatos omitidos, sitemap; 62 estabelecimentos e 137 profissionais.");
