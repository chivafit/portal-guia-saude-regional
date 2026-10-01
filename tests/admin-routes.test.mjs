import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

test("admin routes are stripped from the published build", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"));
  assert.match(pkg.scripts["build:pages"], /strip-admin-routes\.mjs && node scripts\/apply-public-site\.mjs/);
  if (existsSync("out/index.html")) assert.equal(existsSync("out/atualizar-fotos"), false);
});
