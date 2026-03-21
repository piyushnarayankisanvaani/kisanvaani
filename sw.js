const CACHE_NAME = 'kisanvaani-v2.0';
const STATIC_FILES = [
  '/',
  '/index.html',
  '/register.html',
  '/login.html',
  '/farmer-dashboard.html',
  '/buyer-dashboard.html',
  '/sell-crop.html',
  '/listing-success.html',
  '/marketplace.html',
  '/crop-detail.html',
  '/my-listings.html',
  '/mandi-prices.html',
  '/facilities.html',
  '/weather.html',
  '/profile.html',
  '/how-it-works.html',
  '/css/style.css',
  '/js/app.js',
  '/js/data.js',
  '/js/weather.js',
  '/js/mandi.js',
  '/js/voice.js',
  '/manifest.json'
];

// INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.allSettled(
          STATIC_FILES.map(url =>
            cache.add(url).catch(err =>
              console.warn('Cache miss:', url, err)
            )
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// FETCH — cache first, network fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) {
    // For external APIs: network only
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          // Serve from cache, update in background
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, response));
              }
            })
            .catch(() => {});
          return cached;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) return response;
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone));
            return response;
          })
          .catch(() => {
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// PUSH NOTIFICATIONS
self.addEventListener('push', event => {
  const data = event.data?.json() || {
    title: 'KisanVaani',
    body: 'కొత్త నోటిఫికేషన్ వచ్చింది',
    url: '/'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      vibrate: [200, 100, 200, 100, 200],
      tag: 'kisanvaani-notification',
      data: { url: data.url || '/' },
      actions: [
        {action: 'open', title: 'తెరవండి'},
        {action: 'close', title: 'మూసివేయండి'}
      ]
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'close') return;
  event.waitUntil(
    clients.matchAll({type:'window'})
      .then(windowClients => {
        const url = event.notification.data.url;
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
