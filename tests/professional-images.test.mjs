import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("professional image manifest contains versioned AVIF and WebP variants", async () => {
  const manifest = JSON.parse(await readFile("lib/data/professional-image-manifest.json", "utf8"));
  assert.equal(Object.keys(manifest).length, 21);
  for (const entry of Object.values(manifest)) {
    assert.ok(entry.width > 0 && entry.height > 0);
    assert.ok(entry.avif.length > 0 && entry.webp.length > 0);
    for (const variant of [...entry.avif, ...entry.webp]) {
      assert.match(variant.src, /\.[a-f0-9]{12}\.\d+\.(?:avif|webp)$/);
      await access(`public${variant.src}`);
    }
  }
});

test("home and featured directory cap eager photos", async () => {
  const home = await readFile("components/FeaturedProfessionalsRotator.tsx", "utf8");
  const featured = await readFile("app/profissionais-destaque/page.tsx", "utf8");
  assert.match(home, /professionals\.slice\(0, 6\)/);
  assert.match(home, /eager=\{index < 3\}/);
  assert.match(featured, /eager=\{index < 2\}/);
});

test("individual profile prioritizes its single responsive photo", async () => {
  const profile = await readFile("app/profissionais/[slug]/page.tsx", "utf8");
  assert.match(profile, /calc\(100vw - 74px\), 116px/);
  assert.match(profile, /eager fetchPriority="high"/);
});
