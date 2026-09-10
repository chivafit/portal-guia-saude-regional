import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { publishedProfessionals, organizationForProfessional } from "../lib/public-directory";

const professionals = await publishedProfessionals();
const expected = new Map([
  ["dr-roberto-de-oliveira-santos-oftalmologia-piumhi", "clinica-olhos-roberto-santos-piumhi"],
  ["dr-alvaro-ribeiro-vaz-de-faria-oftalmologia-piumhi", "clinica-sao-judas-tadeu-piumhi"],
  ["dra-mirian-sansoni-oftalmologia-piumhi", "clinica-sao-judas-tadeu-piumhi"],
]);
for (const [slug, clinic] of expected) {
  const professional = professionals.find(item => item.slug === slug);
  assert.ok(professional, slug);
  assert.equal(organizationForProfessional(professional)?.slug, clinic);
  if (process.argv.includes("--check-html")) {
    assert.ok(readFileSync(`out/empresas/${clinic}/index.html`, "utf8").includes(`/profissionais/${slug}`));
    assert.ok(readFileSync(`out/profissionais/${slug}/index.html`, "utf8").includes(`/empresas/${clinic}`));
    assert.ok(readFileSync("out/sitemap.xml", "utf8").includes(`/profissionais/${slug}/`));
  }
}
for (const organization of ["Consultório — Rua Miguel Couto, 153", "Atendimento em Piumhi/MG"]) {
  assert.equal(organizationForProfessional({ city: "Piumhi", organization }), undefined);
}
assert.equal(organizationForProfessional({city: "Piumhi", organization: "UBS Tó"})?.slug, "ubs-joao-guilherme-to-rural-piumhi");
assert.equal(organizationForProfessional({city: "Piumhi", organization: "Clínica São Judas Tadeu — Rua Armando Viotti, 190"})?.slug, "clinica-sao-judas-tadeu-piumhi");
assert.equal(professionals.filter(item => item.specialty === "Oftalmologia").length, 7);
console.log("Oftalmologia validada: 7 profissionais, vínculos das clínicas e proteção contra coincidências parciais.");
