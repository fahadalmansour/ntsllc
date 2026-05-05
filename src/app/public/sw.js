// Neo Technology Service Worker - Performance Optimized
// Advanced PWA features with offline capabilities and performance enhancements

const CACHE_NAME = 'neo-technology-v2.0.0';
const RUNTIME_CACHE = 'neo-runtime-v2.0.0';
const IMAGE_CACHE = 'neo-images-v2.0.0';
const API_CACHE = 'neo-api-v2.0.0';

// Cache size limits
const CACHE_LIMITS = {
  [RUNTIME_CACHE]: 100,
  [IMAGE_CACHE]: 50,
  [API_CACHE]: 30
};

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/styles/globals.css',
  '/styles/critical.css',
  '/favicon.ico',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap'
];

// Network-first strategies for these patterns
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\.json$/,
  /\/auth\//
];

// Cache-first strategies for these patterns  
const CACHE_FIRST_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:woff|woff2|ttf|eot)$/,
  /\.(?:css|js)$/
];

// Install event - precache resources with performance optimization
self.addEventListener('install', (event) => {
  console.log('🚀 NeoTech Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Precache critical resources
      caches.open(CACHE_NAME).then((cache) => {
        console.log('📦 Precaching critical resources');
        return cache.addAll(PRECACHE_URLS);
      }),
      // Initialize other caches
      caches.open(RUNTIME_CACHE),
      caches.open(IMAGE_CACHE),
      caches.open(API_CACHE)
    ]).then(() => {
      console.log('✅ Service Worker installed successfully');
      self.skipWaiting(); // Force activation
    }).catch((error) => {
      console.error('❌ Service Worker installation failed:', error);
    })
  );
});

// Activate event - clean up old caches with improved performance
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        const validCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, API_CACHE];
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!validCaches.includes(cacheName)) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker activated');
    })
  );
});

// Enhanced fetch event with intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Apply different strategies based on request type
  if (isNetworkFirst(url)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (isCacheFirst(url)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isAPIRequest(url)) {
    event.respondWith(apiCacheStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network-first strategy for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
      await manageCacheSize(RUNTIME_CACHE);
    }
    return networkResponse;
  } catch (error) {
    console.log('📡 Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline - Network Error', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cacheName = isImageRequest(request) ? IMAGE_CACHE : RUNTIME_CACHE;
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      await manageCacheSize(cacheName);
    }
    return networkResponse;
  } catch (error) {
    console.error('🔥 Cache-first strategy failed:', error);
    throw error;
  }
}

// API-specific caching strategy with TTL
async function apiCacheStrategy(request) {
  const cacheKey = `${request.url}-${Date.now()}`;
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE);
      const responseWithTTL = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cached-at': Date.now().toString(),
          'sw-ttl': '300000' // 5 minutes TTL
        }
      });
      cache.put(request, responseWithTTL.clone());
      await manageCacheSize(API_CACHE);
      return networkResponse;
    }
    return networkResponse;
  } catch (error) {
    // Check cache for valid response
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      const cachedAt = cachedResponse.headers.get('sw-cached-at');
      const ttl = cachedResponse.headers.get('sw-ttl');
      
      if (cachedAt && ttl) {
        const age = Date.now() - parseInt(cachedAt);
        if (age < parseInt(ttl)) {
          console.log('📊 Serving fresh cached API response');
          return cachedResponse;
        }
      }
    }
    throw error;
  }
}

// Stale-while-revalidate strategy for balanced performance
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
      await manageCacheSize(RUNTIME_CACHE);
    }
    return networkResponse;
  }).catch(() => null);

  // Return cached response immediately if available
  if (cachedResponse) {
    // Background update
    fetchPromise.catch(() => {}); // Ignore errors in background update
    return cachedResponse;
  }

  // Wait for network if no cache
  return fetchPromise || new Response('Offline', { status: 503 });
}

// Helper functions for request classification
function isNetworkFirst(url) {
  return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname));
}

function isCacheFirst(url) {
  return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname));
}

function isAPIRequest(request) {
  return request.url.includes('/api/') || request.url.includes('.json');
}

function isImageRequest(request) {
  return /\.(?:png|jpg|jpeg|svg|gif|webp)$/i.test(new URL(request.url).pathname);
}

// Enhanced cache size management with LRU eviction
async function manageCacheSize(cacheName) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const limit = CACHE_LIMITS[cacheName] || 50;
  
  if (requests.length > limit) {
    const entriesToDelete = requests.length - limit;
    console.log(`🧹 Cache cleanup: removing ${entriesToDelete} entries from ${cacheName}`);
    
    // Delete oldest entries (LRU)
    for (let i = 0; i < entriesToDelete; i++) {
      await cache.delete(requests[i]);
    }
  }
}

// Background sync with enhanced error handling
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  switch (event.tag) {
    case 'background-sync':
      event.waitUntil(handleBackgroundSync());
      break;
    case 'analytics-sync':
      event.waitUntil(syncAnalyticsData());
      break;
    case 'cache-cleanup':
      event.waitUntil(performCacheCleanup());
      break;
  }
});

// Enhanced background sync handler
async function handleBackgroundSync() {
  try {
    console.log('📡 Processing background sync...');
    
    // Get pending requests from IndexedDB
    const pendingRequests = await getPendingRequests();
    
    for (const request of pendingRequests) {
      try {
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body
        });
        
        if (response.ok) {
          await removePendingRequest(request.id);
          console.log('✅ Synced request:', request.url);
        }
      } catch (error) {
        console.error('❌ Failed to sync request:', request.url, error);
      }
    }
  } catch (error) {
    console.error('🔥 Background sync failed:', error);
  }
}

// Enhanced analytics sync
async function syncAnalyticsData() {
  try {
    console.log('📊 Syncing analytics data...');
    
    const analyticsData = await getStoredAnalytics();
    if (analyticsData.length > 0) {
      const response = await fetch('/api/analytics/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsData)
      });
      
      if (response.ok) {
        await clearStoredAnalytics();
        console.log('✅ Analytics data synced');
      }
    }
  } catch (error) {
    console.error('❌ Analytics sync failed:', error);
  }
}

// Performance-aware cache cleanup
async function performCacheCleanup() {
  try {
    console.log('🧹 Performing cache cleanup...');
    
    const cacheNames = [RUNTIME_CACHE, IMAGE_CACHE, API_CACHE];
    await Promise.all(cacheNames.map(manageCacheSize));
    
    console.log('✅ Cache cleanup completed');
  } catch (error) {
    console.error('❌ Cache cleanup failed:', error);
  }
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('📨 Service Worker received message:', event.data);
  
  const { type, data } = event.data || {};
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
      
    case 'CACHE_URLS':
      event.waitUntil(cacheResources(data.urls));
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearSpecificCache(data.cacheName));
      break;
      
    case 'GET_CACHE_STATS':
      event.waitUntil(getCacheStats().then(stats => {
        event.ports[0].postMessage({ stats });
      }));
      break;
      
    case 'PRELOAD_ROUTES':
      event.waitUntil(preloadRoutes(data.routes));
      break;
  }
});

// Utility functions for enhanced functionality
async function cacheResources(urls) {
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.addAll(urls);
  await manageCacheSize(RUNTIME_CACHE);
}

async function clearSpecificCache(cacheName) {
  await caches.delete(cacheName);
  console.log(`🗑️ Cleared cache: ${cacheName}`);
}

async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    stats[name] = keys.length;
  }
  
  return stats;
}

async function preloadRoutes(routes) {
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.addAll(routes);
  console.log('🚀 Preloaded routes:', routes);
}

// IndexedDB helpers (simplified)
async function getPendingRequests() {
  // Implementation would connect to IndexedDB
  return [];
}

async function removePendingRequest(id) {
  // Implementation would remove from IndexedDB
  console.log('Removed pending request:', id);
}

async function getStoredAnalytics() {
  // Implementation would get analytics from IndexedDB
  return [];
}

async function clearStoredAnalytics() {
  // Implementation would clear analytics from IndexedDB
  console.log('Cleared stored analytics');
}

console.log('✅ Neo Technology Service Worker loaded successfully - Performance Optimized');