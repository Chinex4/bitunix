self.addEventListener('install', (e) => {
	console.log('[ServiceWorker] Install');
	e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(self.clients.claim());
});
