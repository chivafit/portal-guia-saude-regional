import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { publicProfessionals, publishedOrganizations, organizationsForProfessional, organizationForProfessional } from "../lib/public-directory";
import { filterProfessionals, filterOrganizations } from "../lib/search";
import { professions } from "../lib/data";
import { directoryAuditAdditions } from "../lib/data/directory-audit-additions";
import { normalizeSearchValue } from "../lib/search-match.js";

const organizations = await publishedOrganizations();
const profiles = publicProfessionals;
const checkHtml = process.argv.includes("--check-html");
const sitemap = checkHtml ? readFileSync("out/sitemap.xml", "utf8") : "";
assert.equal(new Set(profiles.map(p => p.slug)).size, profiles.length);
assert.equal(new Set(organizations.map(p => p.slug)).size, organizations.length);
for (const p of profiles) {
  assert.ok(professions.includes(p.profession), `Profissão fora do filtro: ${p.profession}`);
  assert.ok(filterProfessionals(profiles, { query: p.name }).some(x => x.slug === p.slug), p.name);
  assert.ok(filterProfessionals(profiles, { specialty: p.specialty, profession: p.profession }).some(x => x.slug === p.slug), p.slug);
  for (const alias of p.aliases ?? []) assert.ok(filterProfessionals(profiles, { query: alias }).some(x => x.slug === p.slug), alias);
  for (const o of organizationsForProfessional(p)) {
    assert.ok(filterProfessionals(profiles, { query: o.name }).some(x => x.slug === p.slug), `${p.name}: busca pela clínica ${o.name}`);
    if (checkHtml) assert.ok(readFileSync(`out/profissionais/${p.slug}/index.html`, "utf8").includes(`/empresas/${o.slug}`), `${p.slug}: link de clínica`);
  }
  if (checkHtml) assert.ok(sitemap.includes(`/profissionais/${p.slug}/`));
}
for (const o of organizations) {
  assert.ok(filterOrganizations(organizations, { query: o.name }).some(x => x.slug === o.slug));
  if (checkHtml) {
    const html = readFileSync(`out/empresas/${o.slug}/index.html`, "utf8");
    const team = profiles.filter(p => organizationsForProfessional(p).some(x => x.slug === o.slug));
    for (const p of team.slice(0, 6)) assert.ok(html.includes(`/profissionais/${p.slug}`), `${o.slug}: equipe ${p.slug}`);
    assert.ok(sitemap.includes(`/empresas/${o.slug}/`));
  }
}
const queries = [
  ["neurologistas", "Neurologia"], ["dermatologistas", "Dermatologia"],
  ["endocrinologista", "Endocrinologia"], ["urologistas", "Urologia"],
  ["reumatologista", "Reumatologia"], ["pneumologistas", "Pneumologia"],
  ["otorrino", "Otorrinolaringologia"], ["psiquiatras", "Psiquiatria"],
  ["radiologistas", "Radiologia"], ["dentistas", "Odontologia"],
  ["psicólogas", "Psicologia"], ["fonoaudiólogas", "Fonoaudiologia"],
  ["terapeutas ocupacionais", "Terapia Ocupacional"], ["enfermeiras", "Enfermagem"],
];
for (const [query, area] of queries) {
  const expected = profiles.filter(p => normalizeSearchValue(p.specialty).includes(normalizeSearchValue(area)));
  assert.ok(expected.length, area);
  const results = filterProfessionals(profiles, { query });
  for (const p of expected) assert.ok(results.some(x => x.slug === p.slug), `${query}: ${p.name}`);
}
const paulo = profiles.find(p => p.slug === "dr-paulo-henrique-faria-silva-oftalmologia-piumhi")!;
assert.equal(organizationsForProfessional(paulo).length, 2, "Segundo local do oftalmologista perdido");
for (const organization of ["Consultório — Praça Guia Lopes, 248", "Consultório — Rua Conselheiro Lafaiete, 237", "Consultório — Rua Miguel Couto, 153"]) {
  assert.equal(organizationForProfessional({city: "Piumhi", organization}), undefined, "Endereço não comprova vínculo");
}
assert.equal(organizationsForProfessional({...paulo, city: "Passos"}).length, 0);
assert.equal(organizationsForProfessional({...paulo, locations: [...paulo.locations!, ...paulo.locations!]}).length, 2);
assert.ok(!profiles.some(p => p.slug.includes("rui-manuel-dos-prazeres")));
assert.ok(!organizations.some(o => /recovery/i.test(o.name)));
for (const addition of directoryAuditAdditions) {
  assert.ok(profiles.some(p => p.slug === addition.slug));
  assert.ok(addition.sourceUrls?.length);
  assert.equal(addition.verified, false, "Fonte pública não verifica conselho profissional");
}
if (process.argv.includes("--write-inventory")) {
  mkdirSync("docs/auditoria-2026-09-10", { recursive: true });
  writeFileSync("docs/auditoria-2026-09-10/inventario.json", JSON.stringify({
    date: "2026-09-10", counts: { professionals: profiles.length, organizations: organizations.length },
    professionals: profiles.map(p => ({slug:p.slug,name:p.name,profession:p.profession,specialty:p.specialty,source:p.source,organizations:organizationsForProfessional(p).map(o=>o.slug),searchByName:true})),
    organizations: organizations.map(o=>({slug:o.slug,name:o.name,source:o.source,professionals:profiles.filter(p=>organizationsForProfessional(p).some(x=>x.slug===o.slug)).map(p=>p.slug)})),
  }, null, 2)+"\n");
}
console.log(`Auditoria validada: ${profiles.length} profissionais, ${organizations.length} estabelecimentos, nomes, áreas, clínicas, múltiplos locais e exclusões${checkHtml ? ", HTML e sitemap" : ""}.`);
