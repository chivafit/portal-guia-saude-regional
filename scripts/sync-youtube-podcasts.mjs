// Busca episódios novos do podcast Conexão Saúde no canal da Rede Megga no YouTube
// e grava em lib/data/podcast-youtube.json. Roda todo dia pelo workflow
// .github/workflows/sync-podcasts.yml; o commit no main faz a Vercel republicar o site,
// e o app lê a lista atualizada em /app-data/podcasts.json.
//
// O feed público do YouTube não exige chave e traz os 15 vídeos mais recentes.
// Episódios cadastrados à mão em lib/data.ts têm prioridade: um vídeo que já está lá
// nunca é duplicado, e a equipe pode completar tema, cargo e foto cadastrando o
// episódio em lib/data.ts com o mesmo link.
import { readFile, writeFile } from "node:fs/promises";

const CHANNEL_ID = "UCwKrCqAmBoT7RDIiIInLYTg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const DATA_FILE = new URL("../lib/data/podcast-youtube.json", import.meta.url);
const EDITORIAL_FILE = new URL("../lib/data.ts", import.meta.url);

// O título varia: "CONEXÃO SAÚDE", "CONEXÁO SAUDE", "CONEXÄO SAUDE", "CONEXAO SAUDE".
const PODCAST_MARKER = /CONEX\S{0,2}O\s+SA\S{0,2}DE/i;
const smallWords = new Set(["de", "da", "das", "do", "dos", "e"]);

export function normalize(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

/** "[ REDE MEGGGA] - CONEXÃO SAÚDE - DR ROBERTO SANTOS | 03.11.26" → "Dr. Roberto Santos" */
export function guestFromTitle(title) {
  const marker = title.match(PODCAST_MARKER);
  if (!marker) return null;
  // Depois do marcador vem o nome; partes separadas por "|" que são só data são ignoradas.
  const name = title.slice(marker.index + marker[0].length)
    .split("|")
    .map((part) => part.replace(/^[\s\-–—:]+|[\s\-–—:.]+$/g, "").replace(/\s+/g, " "))
    .find((part) => part && !/^\d{1,2}\.\d{1,2}\.\d{2,4}$/.test(part));
  if (!name) return null;
  return name
    .toLocaleLowerCase("pt-BR")
    .split(" ")
    .map((word, index) => {
      if (index > 0 && smallWords.has(word)) return word;
      if (word === "dr" || word === "dra") return `${word[0].toUpperCase()}${word.slice(1)}.`;
      return word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1);
    })
    .join(" ");
}

export function isPodcastTitle(title) {
  return PODCAST_MARKER.test(title);
}

/** Data no fuso de Brasília (AAAA-MM-DD). */
function brazilDate(iso) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date(iso));
}

function slugify(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function personKey(name) {
  return normalize(name).replace(/\b(DR|DRA)\b\.?/g, "").replace(/[^A-Z]+/g, " ").trim();
}

function daysBetween(a, b) {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86400000;
}

export function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => ({
    videoId: entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "",
    title: decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""),
    published: entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "",
  })).filter((entry) => entry.videoId && entry.title && entry.published);
}

/** Episódios já conhecidos: os do cadastro editorial e os já sincronizados. */
function editorialEpisodes(source) {
  return [...source.matchAll(/\{[^{}]*?episodeUrl: "[^"]*watch\?v=([A-Za-z0-9_-]+)"[^{}]*?\}/g)].map((match) => ({
    videoId: match[1],
    guest: match[0].match(/guest: "([^"]+)"/)?.[1] ?? "",
    publishedAt: match[0].match(/publishedAt: "([^"]+)"/)?.[1] ?? "",
  }));
}

export function mergeFeed(current, feedEntries, editorial) {
  const known = [...editorial, ...current];
  const added = [];
  for (const entry of feedEntries) {
    if (!isPodcastTitle(entry.title)) continue;
    if (known.some((item) => item.videoId === entry.videoId)) continue;
    const guest = guestFromTitle(entry.title);
    if (!guest) continue;
    const publishedAt = brazilDate(entry.published);
    // O canal às vezes publica o mesmo programa duas vezes: mesmo convidado em até 3 dias.
    if (known.some((item) => personKey(item.guest) === personKey(guest) && item.publishedAt && daysBetween(item.publishedAt, publishedAt) <= 3)) continue;
    const episode = {
      videoId: entry.videoId,
      slug: `conexao-saude-${slugify(guest)}-${publishedAt.slice(0, 7)}`,
      guest,
      publishedAt,
      title: entry.title.trim(),
    };
    added.push(episode);
    known.push(episode);
  }
  return { episodes: [...added, ...current].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), added };
}

async function main() {
  const response = await fetch(FEED_URL, { headers: { "User-Agent": "guia-saude-podcast-sync" } });
  if (!response.ok) throw new Error(`Feed do YouTube respondeu ${response.status}.`);
  const feed = parseFeed(await response.text());
  if (!feed.length) throw new Error("Feed do YouTube sem vídeos — formato inesperado.");
  const current = JSON.parse(await readFile(DATA_FILE, "utf8"));
  const editorial = editorialEpisodes(await readFile(EDITORIAL_FILE, "utf8"));
  const { episodes, added } = mergeFeed(current, feed, editorial);
  if (!added.length) {
    console.log("Podcast: nenhum episódio novo no YouTube.");
    return;
  }
  await writeFile(DATA_FILE, `${JSON.stringify(episodes, null, 2)}\n`);
  for (const episode of added) console.log(`+ ${episode.publishedAt} ${episode.guest} (${episode.videoId})`);
  console.log(`Podcast: ${added.length} episódio(s) novo(s).`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
