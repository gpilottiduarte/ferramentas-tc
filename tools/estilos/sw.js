// Service Worker for Guia de Estilos Segura®
// Version 1.0.0

const CACHE_NAME = 'guia-estilos-v1';
const STATIC_CACHE_NAME = 'guia-estilos-static-v1';
const DYNAMIC_CACHE_NAME = 'guia-estilos-dynamic-v1';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/guia-estilos.md',
  '/README.html',
  '/offline.html'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),
      // Cache external resources
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching external resources');
        return cache.addAll(EXTERNAL_RESOURCES);
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      // Force activation
      return self.skipWaiting();
    }).catch(error => {
      console.error('Service Worker: Installation failed', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName.startsWith('guia-estilos-')) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      // Take control of all pages
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      // Return cached version if available
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', request.url);
        return cachedResponse;
      }
      
      // Try to fetch from network
      return fetch(request).then(response => {
        // Don't cache if response is not ok
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the response for future use
        caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          console.log('Service Worker: Caching new resource:', request.url);
          cache.put(request, responseToCache);
        });
        
        return response;
      }).catch(error => {
        console.log('Service Worker: Network failed, trying fallback:', error);
        
        // Serve offline page for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
        
        // For other resources, just fail
        throw error;
      });
    })
  );
});

// Message event - handle cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service Worker: Skipping waiting...');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Service Worker: Clearing cache...');
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('guia-estilos-')) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Cache cleared');
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Handle cache storage quota
self.addEventListener('quotaexceeded', (event) => {
  console.warn('Service Worker: Storage quota exceeded');
  // Clean up old cache entries
  caches.open(DYNAMIC_CACHE_NAME).then(cache => {
    cache.keys().then(keys => {
      // Delete oldest 10 entries
      keys.slice(0, 10).forEach(key => {
        cache.delete(key);
      });
    });
  });
});

// Background sync for offline actions (if needed)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    // Handle any background sync logic here
  }
});