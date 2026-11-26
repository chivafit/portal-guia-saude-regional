import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

test("magazine covers and flipbook pages exist as WebP", async () => {
  const data = await readFile("lib/data.ts", "utf8");
  const covers = [...data.matchAll(/coverUrl: "(\/revista\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(covers.length > 0);
  for (const cover of covers) {
    assert.match(cover, /\.webp$/);
    assert.ok(existsSync(`public${cover}`), `capa ausente: ${cover}`);
  }
  const flipbooks = [...data.matchAll(/flipbook: \{ dir: "([^"]+)", pages: (\d+) \}/g)];
  assert.ok(flipbooks.length > 0);
  for (const [, dir, pages] of flipbooks) {
    for (let page = 1; page <= Number(pages); page++) {
      const file = `public${dir}/page-${String(page).padStart(3, "0")}.webp`;
      assert.ok(existsSync(file), `página ausente: ${file}`);
    }
  }
});

test("app build strips magazine pages but the site build keeps them", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"));
  assert.match(pkg.scripts["build:app"], /strip-app-magazine\.mjs && npx cap sync/);
  assert.doesNotMatch(pkg.scripts["build:pages"], /strip-app-magazine/);
});
