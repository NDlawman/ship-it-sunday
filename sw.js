/* Ship It Sunday — service worker. Cache-first for the app shell so it
   opens instantly and works offline (videos still need the internet). */
const CACHE = "sis-v5";
const SHELL = [
  ".",
  "index.html",
  "css/styles.css?v=5",
  "js/data.js?v=5",
  "js/app.js?v=5",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // let YouTube thumbnails hit the network
  e.respondWith(
    caches.match(e.request, { ignoreSearch: false }).then(hit =>
      hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match("index.html"))
    )
  );
});
