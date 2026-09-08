import assert from "node:assert/strict";
import test from "node:test";
import { spawn } from "node:child_process";

const port = 4179;
const origin = `http://127.0.0.1:${port}`;
let server;

test.before(async () => {
  server = spawn("npm", ["run", "start", "--", "--host", "127.0.0.1", "--port", String(port)], { stdio: "ignore" });
  for (let attempt = 0; attempt < 60; attempt++) {
    try { const response = await fetch(origin); if (response.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("Portal did not start for route tests");
});

test.after(() => server?.kill());

test("renders the regional portal home", async () => {
  const html = await (await fetch(origin)).text();
  assert.match(html, /Portal Guia Saúde/);
  assert.match(html, /Encontre profissionais de saúde perto de você/);
  assert.match(html, /Saúde perto de você, informação para cuidar melhor/);
  assert.match(html, /Conexão Saúde/);
});

test("renders search, profile, companies and admin routes", async () => {
  const routes = [
    "/buscar?cidade=Piumhi",
    "/profissionais/dr-paulo-henrique-faria-silva-oftalmologia-piumhi",
    "/empresas", "/anuncie", "/materias", "/podcast", "/revista", "/cidades/piumhi", "/sobre", "/inclusao",
  ];
  for (const path of routes) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), /<title>[^<]+<\/title>/, path);
  }
});
