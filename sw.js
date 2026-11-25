// Service Worker for CE432P Hydraulic Engineering Portal
// Provides offline access to course materials, calculators, and session guides.

const CACHE_NAME = 'ce432p-hydraulics-v1';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sessions.json',
  './assets/app.js',
  './assets/style.css',
  './assets/fieldbook.css',
  './assets/v2.css',
  './assets/vendor/marked.min.js',
  './assets/vendor/katex/katex.min.js',
  './assets/vendor/katex/katex.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Stale-While-Revalidate strategy for all requests
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip YouTube iframes / cross-origin media
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      });
    })
  );
});
