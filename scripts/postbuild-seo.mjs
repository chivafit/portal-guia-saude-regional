import { readFile, writeFile } from "node:fs/promises";

const path = new URL("../out/404.html", import.meta.url);
const html = await readFile(path, "utf8");
const updated = html.replace(
  '<meta name="robots" content="noindex"/>',
  '<meta name="robots" content="noindex, nofollow"/>',
);

if (updated === html) throw new Error("A diretiva robots da página 404 não foi encontrada.");
await writeFile(path, updated);
