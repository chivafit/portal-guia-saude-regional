// Remove do pacote dos aplicativos as rotas administrativas que não devem ir
// para as lojas (ex.: /atualizar-fotos pede um token de escrita do GitHub).
// Roda só em build:app, depois do export e antes do `cap sync`.
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const adminRoutes = ["atualizar-fotos"];
const out = new URL("../out/", import.meta.url);

for (const route of adminRoutes) {
  const dir = new URL(`${route}/`, out);
  if (existsSync(dir)) {
    await rm(dir, { recursive: true, force: true });
    console.log(`→ Rota administrativa removida do app: /${route}/`);
  }
}
