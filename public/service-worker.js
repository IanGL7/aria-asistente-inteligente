/* eslint-disable no-restricted-globals */

const CACHE_NAME = "aria-pwa-v1";
const OFFLINE_URL = "/offline";

const URLS_TO_CACHE = [
  "/",
  "/offline",
  "/login",
  "/home",
  "/favicon.ico",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/img/og-aria.png",
];

// Instalar: precache de las rutas básicas
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

// Activar: limpiar cachés viejas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

// Estrategia: network-first con fallback a caché / offline
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Sólo GET; no tocamos POST/PUT/etc.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // No cacheamos llamadas a API
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Guardamos en caché una copia de lo que sí respondió
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, copy).catch(() => {});
        });
        return response;
      })
      .catch(async () => {
        // Si no hay red: buscamos en caché
        const cached = await caches.match(request);
        if (cached) return cached;

        // Si es navegación (página) y no tenemos caché, mostramos /offline
        if (request.mode === "navigate") {
          const offlinePage = await caches.match(OFFLINE_URL);
          if (offlinePage) return offlinePage;
        }

        // Último recurso: nada
        return new Response("Sin conexión y sin caché disponible.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      }),
  );
});
