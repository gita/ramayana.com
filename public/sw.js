// Offline reading. Pages are network-first, so readers always get the latest text
// when online, and fall back to the copy saved on a previous visit.
const VERSION = "v1";
const PAGES = `pages-${VERSION}`, ASSETS = `assets-${VERSION}`;
const SHELL = ["/", "/sunderkand", "/hi/sunderkand", "/ramcharitmanas"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== PAGES && k !== ASSETS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  const { request } = e;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== location.origin) return;
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(request, copy)); }
          return res;
        })
        .catch(async () => (await caches.match(request)) ?? (await caches.match("/sunderkand")) ?? Response.error()),
    );
    return;
  }
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/_next/image") || url.pathname.startsWith("/images/")) {
    e.respondWith(
      caches.match(request).then((hit) => hit ?? fetch(request).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(ASSETS).then((c) => c.put(request, copy)); }
        return res;
      })),
    );
  }
});
