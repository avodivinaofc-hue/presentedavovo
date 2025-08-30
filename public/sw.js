const CACHE_NAME = 'avo-divina-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Recursos para cache estático
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/favicon.ico',
  '/mystical-hand-hero.jpg',
  '/tarot-spread.jpg',
  '/lovable-uploads/1200434d-79ce-4aa5-b9b5-3ee4554a1684.png',
  '/placeholder.svg'
];

// Recursos para cache dinâmico
const DYNAMIC_ASSETS = [
  '/ebook',
  '/tripwire',
  '/espelho-da-alma'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Cache First para recursos estáticos
  CACHE_FIRST: 'cache-first',
  // Network First para recursos dinâmicos
  NETWORK_FIRST: 'network-first',
  // Stale While Revalidate para recursos que podem ser atualizados
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Cache estático aberto');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Recursos estáticos em cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Erro ao instalar cache estático:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker ativado');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignora requisições para APIs externas
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estratégia baseada no tipo de recurso
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (DYNAMIC_ASSETS.includes(url.pathname)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  }
});

// Estratégia Cache First
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Erro na estratégia cache-first:', error);
    return new Response('Erro de rede', { status: 503 });
  }
}

// Estratégia Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Rede falhou, tentando cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Conteúdo não disponível offline', { status: 503 });
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Retorna cache imediatamente se disponível
    if (cachedResponse) {
      // Atualiza cache em background
      fetch(request).then(async (networkResponse) => {
        if (networkResponse.ok) {
          const cache = await caches.open(cacheName);
          cache.put(request, networkResponse.clone());
        }
      }).catch(console.error);
      
      return cachedResponse;
    }
    
    // Se não há cache, busca da rede
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Erro na estratégia stale-while-revalidate:', error);
    return new Response('Erro de rede', { status: 503 });
  }
}

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('Sincronização em background:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Aqui você pode implementar sincronização de dados
    // Por exemplo, enviar formulários pendentes
    console.log('Sincronização em background executada');
  } catch (error) {
    console.error('Erro na sincronização em background:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification recebida:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nova mensagem da Avó Divina',
    icon: '/favicon.png',
    badge: '/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explorar',
        icon: '/favicon.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/favicon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Avó Divina', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  console.log('Notificação clicada:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  console.log('Mensagem recebida do cliente:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
