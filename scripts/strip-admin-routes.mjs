// Remove do site publicado e do pacote dos aplicativos as rotas administrativas
// (ex.: /atualizar-fotos pede um token de escrita do GitHub). Roda no fim do
// build:pages, depois do export. Para usar a rota, rode `npm run dev` localmente.
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const adminRoutes = ["atualizar-fotos"];
const out = new URL("../out/", import.meta.url);

for (const route of adminRoutes) {
  const dir = new URL(`${route}/`, out);
  if (existsSync(dir)) {
    await rm(dir, { recursive: true, force: true });
    console.log(`→ Rota administrativa removida do build: /${route}/`);
  }
}
