// Service worker: permite abrir los mapas sin señal cuando están publicados con https.
// Páginas: primero la red (para recibir actualizaciones) y, si no hay conexión, la copia guardada.
// Librerías y mosaicos del mapa: se guardan la primera vez que se ven y después se usan desde el dispositivo.
const VERSION = 'pan-v1';
const PAGINAS = `${VERSION}-paginas`, LIBS = `${VERSION}-libs`, MOSAICOS = `${VERSION}-mosaicos`;
const MAX_MOSAICOS = 3000;

const BASE = ['./', 'index.html', 'mapa_completo.html', 'inicio.html', 'icono.svg', 'manifest.webmanifest'];
const CDN = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
  'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const p = await caches.open(PAGINAS), l = await caches.open(LIBS);
    await Promise.all([...BASE.map(u => p.add(u).catch(() => {})), ...CDN.map(u => l.add(u).catch(() => {}))]);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (!k.startsWith(VERSION)) await caches.delete(k);
    self.clients.claim();
  })());
});

const esMosaico = url => /arcgisonline\.com\/ArcGIS\/rest\/services\/.+\/MapServer\/tile\//.test(url) || /tile\.openstreetmap\.org\//.test(url);

async function recortar(cache) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MAX_MOSAICOS; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;

  if (esMosaico(url)) {
    e.respondWith((async () => {
      const cache = await caches.open(MOSAICOS);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') { cache.put(req, res.clone()); if (Math.random() < .05) recortar(cache); }
        return res;
      } catch { return new Response('', { status: 504 }); }
    })());
    return;
  }

  if (url.startsWith('https://unpkg.com/')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copia = res.clone(); caches.open(LIBS).then(c => c.put(req, copia)); return res;
    })));
    return;
  }

  if (new URL(url).origin === self.location.origin) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) { const copia = res.clone(); caches.open(PAGINAS).then(c => c.put(req, copia)); }
        return res;
      } catch {
        return (await caches.match(req, { ignoreSearch: true })) || (await caches.match('mapa_completo.html')) || Response.error();
      }
    })());
  }
});
