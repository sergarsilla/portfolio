// Self-destructing service worker.
// A previous version cached index.html with a cache-first strategy and no
// update path, so after each deploy returning visitors got stale HTML that
// referenced purged hashed assets (blank page). This version wipes every
// cache, unregisters itself and reloads open clients.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
