// Publica em /app-data/ os dados que o app consulta online para mostrar
// informações atuais sem precisar de nova versão na loja:
// - profiles.json: contatos, fotos e textos dos perfis;
// - podcasts.json: lista de episódios (inclui os novos trazidos do YouTube).
import { mkdir, writeFile } from "node:fs/promises";
import { publicProfessionals } from "../lib/public-directory";
import { buildProfileView, type ProfileView } from "../lib/profile-view";
import { professionalRedirects } from "../lib/professional-redirects";
import { podcastCatalogEpisodes } from "../lib/public-podcasts";

const profiles: Record<string, ProfileView> = {};
for (const item of publicProfessionals) profiles[item.slug] = buildProfileView(item);

const outDir = new URL("../out/app-data/", import.meta.url);
await mkdir(outDir, { recursive: true });
// Perfis ausentes daqui são tratados pelo app como retirados; redirects indicam o novo endereço.
const payload = JSON.stringify({ generatedAt: new Date().toISOString(), profiles, redirects: professionalRedirects });
await writeFile(new URL("profiles.json", outDir), payload);
console.log(`→ app-data/profiles.json: ${Object.keys(profiles).length} perfis, ${(payload.length / 1024).toFixed(0)} KB`);

const episodes = podcastCatalogEpisodes();
await writeFile(new URL("podcasts.json", outDir), JSON.stringify({ generatedAt: new Date().toISOString(), episodes }));
console.log(`→ app-data/podcasts.json: ${episodes.length} episódios`);
