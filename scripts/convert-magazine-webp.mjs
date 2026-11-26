// Converte as imagens da revista (public/revista/**) de JPG/PNG para WebP e apaga os originais.
// Use ao adicionar uma edição: gere as páginas (page-001.jpg, page-002.jpg...) na pasta
// da edição e rode `npm run revista:webp`. O leitor espera page-NNN.webp.
import { readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = new URL("../public/revista/", import.meta.url).pathname;
let before = 0;
let after = 0;
let count = 0;

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) {
      await walk(path);
      continue;
    }
    if (!/\.(jpe?g|png)$/i.test(name)) continue;
    const target = path.replace(/\.(jpe?g|png)$/i, ".webp");
    const info = await sharp(path).webp({ quality: 80, effort: 5 }).toFile(target);
    before += (await stat(path)).size;
    after += info.size;
    count += 1;
    await rm(path);
  }
}

await walk(root);
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(count ? `Revista: ${count} imagens convertidas, ${mb(before)} MB → ${mb(after)} MB.` : "Revista: nenhuma imagem JPG/PNG para converter.");
