// Tira as páginas da revista do pacote dos aplicativos: dentro do app o leitor as
// busca em www.guiasaude.app.br (components/MagazineFlip.tsx). As capas ficam no pacote
// para a lista de edições abrir sem internet. Roda só em build:app, nunca no deploy do site.
import { readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const revista = new URL("../out/revista/", import.meta.url).pathname;
if (!existsSync(revista)) throw new Error("out/revista não existe — rode o build antes.");

let removed = 0;
for (const entry of await readdir(revista, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "capas") continue;
  const dir = join(revista, entry.name);
  for (const file of await readdir(dir)) {
    if (/^page-\d+\.(webp|jpe?g|png)$/i.test(file)) {
      await rm(join(dir, file));
      removed += 1;
    }
  }
}
console.log(`→ Revista: ${removed} páginas removidas do pacote do app (lidas do site).`);
