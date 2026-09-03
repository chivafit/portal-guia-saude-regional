import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataSource = fs.readFileSync(path.join(root, "lib/data.ts"), "utf8");
const guestSource = fs.readFileSync(path.join(root, "lib/podcast-guests.ts"), "utf8");
const reviewSource = fs.readFileSync(path.join(root, "lib/data/podcast-participant-review.ts"), "utf8");

const runtimeFiles = [
  "lib/data.ts",
  "lib/data/professional-additions.ts",
  "lib/data/podcast-professional-additions.ts",
  "lib/data/nonmedical-sequence-additions.ts",
  "lib/data/medical-sequence-additions.ts",
  "lib/data/medical-expansion-otorrino.ts",
];

const allRuntimeSlugs = new Set();
for (const relative of runtimeFiles) {
  const source = fs.readFileSync(path.join(root, relative), "utf8");
  for (const match of source.matchAll(/slug:\s*"([^"]+)"/g)) allRuntimeSlugs.add(match[1]);
}

const podcastsBlock = dataSource.match(/export const podcasts:\s*PodcastEpisode\[\]\s*=\s*\[([\s\S]*?)\n\];/);
if (!podcastsBlock) throw new Error("Não foi possível localizar a coleção podcasts em lib/data.ts");

const episodeSlugs = [...podcastsBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const mappedEpisodeSlugs = new Set([...guestSource.matchAll(/^\s*"([^"]+)":\s*\[/gm)].map((match) => match[1]));
const reviewEpisodeSlugs = new Set([...reviewSource.matchAll(/episodeSlug:\s*"([^"]+)"/g)].map((match) => match[1]));

const mappedProfessionalSlugs = [];
const mapBlock = guestSource.match(/export const podcastProfessionalMap:[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
if (!mapBlock) throw new Error("Não foi possível localizar podcastProfessionalMap");
for (const line of mapBlock[1].split("\n")) {
  const episode = line.match(/^\s*"([^"]+)":\s*\[(.*?)\],?\s*$/);
  if (!episode) continue;
  for (const professional of episode[2].matchAll(/"([^"]+)"/g)) {
    mappedProfessionalSlugs.push({ episode: episode[1], slug: professional[1] });
  }
}

const failures = [];
for (const episodeSlug of episodeSlugs) {
  if (!mappedEpisodeSlugs.has(episodeSlug) && !reviewEpisodeSlugs.has(episodeSlug)) {
    failures.push(`episódio sem vínculo nem revisão editorial: ${episodeSlug}`);
  }
}

for (const { episode, slug } of mappedProfessionalSlugs) {
  if (!episodeSlugs.includes(episode)) failures.push(`mapa aponta para episódio inexistente: ${episode}`);
  if (!allRuntimeSlugs.has(slug)) failures.push(`episódio ${episode} aponta para perfil inexistente: ${slug}`);
}

for (const reviewSlug of reviewEpisodeSlugs) {
  if (!episodeSlugs.includes(reviewSlug)) failures.push(`fila de revisão aponta para episódio inexistente: ${reviewSlug}`);
}

console.log("Podcast participant validation");
console.log(JSON.stringify({
  episodesScanned: episodeSlugs.length,
  mappedEpisodes: episodeSlugs.filter((slug) => mappedEpisodeSlugs.has(slug)).length,
  reviewEpisodes: episodeSlugs.filter((slug) => reviewEpisodeSlugs.has(slug)).length,
  mappedProfessionalLinks: mappedProfessionalSlugs.length,
  failures: failures.length,
}, null, 2));

if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
