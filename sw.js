// GymLog service worker: app offline + caché de la base de ejercicios e imágenes
const SHELL_CACHE = 'gymlog-shell-v1';
const DATA_CACHE = 'gymlog-data';
const SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== SHELL_CACHE && k !== DATA_CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Ejercicios e imágenes (GitHub raw): imágenes cache-first, JSON stale-while-revalidate
  if (url.hostname === 'raw.githubusercontent.com') {
    const isJson = url.pathname.endsWith('.json');
    e.respondWith(caches.open(DATA_CACHE).then(async cache => {
      const hit = await cache.match(e.request);
      if (hit && !isJson) return hit;
      const net = fetch(e.request).then(r => {
        if (r.ok || r.type === 'opaque') cache.put(e.request, r.clone());
        return r;
      }).catch(() => hit || Response.error());
      if (hit) { e.waitUntil(net); return hit; }
      return net;
    }));
    return;
  }

  // App: network-first para recibir actualizaciones, caché si no hay conexión
  if (url.origin === location.origin) {
    e.respondWith(fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(SHELL_CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('./index.html'))));
  }
});
