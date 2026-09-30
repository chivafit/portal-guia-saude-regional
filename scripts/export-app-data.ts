// Publica /app-data/profiles.json: dados atuais dos perfis que o app consulta
// para mostrar contatos, fotos e textos sem precisar de nova versão na loja.
import { mkdir, writeFile } from "node:fs/promises";
import { publicProfessionals } from "../lib/public-directory";
import { buildProfileView, type ProfileView } from "../lib/profile-view";

const profiles: Record<string, ProfileView> = {};
for (const item of publicProfessionals) profiles[item.slug] = buildProfileView(item);

const outDir = new URL("../out/app-data/", import.meta.url);
await mkdir(outDir, { recursive: true });
const payload = JSON.stringify({ generatedAt: new Date().toISOString(), profiles });
await writeFile(new URL("profiles.json", outDir), payload);
console.log(`→ app-data/profiles.json: ${Object.keys(profiles).length} perfis, ${(payload.length / 1024).toFixed(0)} KB`);
