// Satisfactory Tools personal — service worker "pasarela".
// No cachea nada: cada request va directo a la red, así la app instalada
// siempre carga la versión más reciente (requerido para ser instalable como PWA).
self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	event.respondWith(fetch(event.request));
});
