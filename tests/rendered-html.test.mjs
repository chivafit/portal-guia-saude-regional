import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

async function rendered(path = "/") {
  const route = path.split("?")[0].replace(/^\/+|\/+$/g, "");
  return readFile(route ? `out/${route}/index.html` : "out/index.html", "utf8");
}

test("renders the Health OS home and navigation", async () => {
  const html = await rendered();
  assert.match(html, /Como podemos/);
  assert.match(html, /cuidar de você/);
  assert.match(html, /Saúde mais perto de você/);
  assert.match(html, /Navegação principal/);
});

test("exports the main app routes with titles", async () => {
  const routes = [
    "/buscar", "/buscar/especialidades", "/favoritos",
    "/profissionais/dr-paulo-henrique-faria-silva-oftalmologia-piumhi",
    "/empresas", "/anuncie", "/materias", "/podcast",
    "/revista", "/revista/13a-edicao", "/cidades/piumhi",
    "/sobre", "/inclusao", "/privacidade", "/termos",
  ];
  for (const route of routes) {
    const html = await rendered(route);
    assert.match(html, /<title>[^<]+<\/title>/, route);
    assert.match(html, /<main[\s>]/, route);
  }
});

test("all exported internal links resolve", async () => {
  const pages = (await readdir("out", { recursive: true })).filter((file) => file.endsWith("index.html"));
  const missing = new Set();
  for (const page of pages) {
    const html = await readFile(join("out", page), "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      const route = href.split(/[?#]/)[0];
      if (route === "/") continue;
      const file = join("out", route);
      const candidates = [file, join(file, "index.html"), `${file}.html`];
      const exists = await Promise.all(candidates.map(async (candidate) => access(candidate).then(() => true, () => false)));
      if (!exists.some(Boolean)) missing.add(route);
    }
  }
  assert.deepEqual([...missing], []);
});
