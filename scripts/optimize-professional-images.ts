import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { publicProfessionals } from "../lib/public-professionals";

type Variant = { width: number; src: string };
type ManifestEntry = {
  width: number;
  height: number;
  avif: Variant[];
  webp: Variant[];
};

const widths = [96, 160, 240, 320, 480];
const publicDir = path.resolve("public");
const outputDir = path.join(publicDir, "professionals", "optimized");
const manifestPath = path.resolve("lib/data/professional-image-manifest.json");
const localRaster = /\.(?:jpe?g|png)$/i;

const sources = Array.from(
  new Set(
    publicProfessionals
      .map((professional) => professional.imageUrl)
      .filter((src): src is string => Boolean(src && src.startsWith("/") && localRaster.test(src))),
  ),
).sort();

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const manifest: Record<string, ManifestEntry> = {};

for (const src of sources) {
  const sourcePath = path.join(publicDir, src.replace(/^\//, ""));
  const buffer = await readFile(sourcePath);
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) continue;

  const hash = createHash("sha256").update(buffer).digest("hex").slice(0, 12);
  const stem = src
    .replace(/^\//, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const targetWidths = widths.filter((width) => width <= metadata.width!);
  if (!targetWidths.length) targetWidths.push(metadata.width);

  const avif: Variant[] = [];
  const webp: Variant[] = [];
  for (const width of targetWidths) {
    const avifName = `${stem}.${hash}.${width}.avif`;
    const webpName = `${stem}.${hash}.${width}.webp`;
    const pipeline = sharp(buffer).rotate().resize({ width, withoutEnlargement: true });

    await Promise.all([
      pipeline.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(outputDir, avifName)),
      pipeline.clone().webp({ quality: 80, effort: 4, smartSubsample: true }).toFile(path.join(outputDir, webpName)),
    ]);

    avif.push({ width, src: `/professionals/optimized/${avifName}` });
    webp.push({ width, src: `/professionals/optimized/${webpName}` });
  }

  manifest[src] = { width: metadata.width, height: metadata.height, avif, webp };
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const generated = await readdir(outputDir);
console.log(`Professional images: ${sources.length} sources, ${generated.length} responsive assets.`);
