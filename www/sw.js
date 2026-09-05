// Satisfactory Tools personal — service worker "pasarela".
// Versión: 2 (2026-09-05) — bump para forzar actualización en PWAs instaladas.
// No cachea nada: cada request va directo a la red y además se ignora el
// caché HTTP del navegador (cache: 'no-store'), así la app instalada siempre
// carga la versión más reciente (requerido para ser instalable como PWA).
const SW_VERSION = 2;

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		// Por si alguna versión antigua del SW llegó a crear cachés, las borramos.
		caches.keys().then((keys) => {
			return Promise.all(keys.map((key) => caches.delete(key)));
		}).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') {
		return;
	}
	event.respondWith(
		fetch(event.request, {cache: 'no-store'}).catch(() => {
			return fetch(event.request);
		})
	);
});
