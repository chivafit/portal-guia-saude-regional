import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("every historical profile address has a 301 redirect on Vercel", async () => {
  const source = await readFile("lib/professional-redirects.ts", "utf8");
  const expected = Object.fromEntries([...source.matchAll(/"([a-z0-9-]+)":\s*"([^"]+)"/g)].map((match) => [match[1], match[2]]));
  const vercel = JSON.parse(await readFile("vercel.json", "utf8"));
  const redirects = new Map(vercel.redirects.map((rule) => [rule.source, rule]));
  for (const [slug, destination] of Object.entries(expected)) {
    const rule = redirects.get(`/profissionais/${slug}{/}?`);
    assert.ok(rule, `vercel.json sem redirecionamento para ${slug}`);
    assert.equal(rule.destination, destination);
    assert.equal(rule.permanent, true);
  }
});
