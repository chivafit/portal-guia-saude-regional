// Ao mudar a estratégia de cache, troque a versão: caches antigos são apagados na ativação.
const CACHE_NAME = "guia-saude-v2";
const APP_SHELL = ["/", "/manifest.webmanifest", "/favicon.svg", "/app-icon-192.png", "/app-icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

function store(request, response) {
  if (response.ok) {
    const copy = response.clone();
    void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Páginas: rede primeiro, cache só sem internet.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => store(request, response))
      .catch(async () => (await caches.match(request)) || (await caches.match("/"))));
    return;
  }

  // Arquivos do build têm hash no nome e nunca mudam: cache primeiro.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => store(request, response))));
    return;
  }

  // Demais arquivos (fotos, ícones, dados) podem ser trocados mantendo o nome:
  // responde com o cache na hora e atualiza em segundo plano.
  if (["style", "script", "image", "font"].includes(request.destination) || url.pathname.startsWith("/app-data/")) {
    event.respondWith(caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => store(request, response));
      if (cached) {
        event.waitUntil(network.catch(() => undefined));
        return cached;
      }
      return network;
    }));
  }
});
