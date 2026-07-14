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
  assert.match(html, /Encontre saúde/);
  assert.match(html, /Portal por cidade/);
  assert.match(html, /Conexão Saúde/);
  assert.match(html, /PUBLICIDADE/);
});

test("renders search, profile, companies and admin routes", async () => {
  const routes = [
    ["/buscar?cidade=Piumhi", /Guia de especialistas/],
    ["/profissionais/perfil-demonstrativo-cardiologia-piumhi", /sem agendamento online/],
    ["/empresas", /Empresas e serviços/],
    ["/admin", /Conteúdo, diretório, revista, podcast e mídia/],
    ["/anuncie", /Mídia regional integrada/],
    ["/materias", /Informação para cuidar melhor/],
    ["/podcast", /Conversas que informam e aproximam/],
    ["/revista", /Histórias que circulam/],
    ["/cidades/piumhi", /Profissionais, clínicas, serviços/],
    ["/sobre", /Sobre o Guia Saúde/],
    ["/inclusao", /Solicitar inclusão/],
  ];
  for (const [path, expected] of routes) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected);
  }
});
