// Configurações de performance para o projeto
export const performanceConfig = {
  // Configurações de lazy loading
  lazyLoading: {
    threshold: 0.1, // Threshold para Intersection Observer
    rootMargin: "50px", // Margem para carregar antes
  },

  // Configurações de debounce/throttle
  debounce: {
    resize: 150, // ms para resize
    scroll: 100, // ms para scroll
    input: 300, // ms para input
  },

  // Configurações de cache
  cache: {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    maxSize: 50, // Máximo de itens em cache
  },

  // Configurações de animações
  animations: {
    duration: {
      fast: 200, // ms
      normal: 400, // ms
      slow: 800, // ms
    },
    easing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    },
  },

  // Configurações de partículas
  particles: {
    mobile: {
      count: 6,
      size: { min: 0.5, max: 2.5 },
      opacity: { min: 0.05, max: 0.35 },
      duration: { min: 3, max: 9 },
    },
    desktop: {
      count: 15,
      size: { min: 1, max: 4 },
      opacity: { min: 0.1, max: 0.5 },
      duration: { min: 4, max: 12 },
    },
  },

  // Configurações de imagens
  images: {
    lazy: true,
    placeholder: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
    sizes: {
      thumbnail: "150px",
      small: "300px",
      medium: "600px",
      large: "1200px",
    },
  },

  // Configurações de API
  api: {
    timeout: 10000, // 10 segundos
    retries: 3,
    retryDelay: 1000, // 1 segundo
  },

  // Configurações de PWA
  pwa: {
    cacheName: "oraculo-divino-v1",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  },
};

// Hook para debounce
export const useDebounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Hook para throttle
export const useThrottle = (func: Function, delay: number) => {
  let lastCall = 0;
  
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(null, args);
    }
  };
};

// Função para lazy loading de imagens
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  }, performanceConfig.lazyLoading);

  observer.observe(img);
};

// Função para pré-carregar recursos críticos
export const preloadCriticalResources = () => {
  const criticalResources = [
    "/src/assets/mystical-hand-hero.jpg",
    "/src/assets/avo-divina-portrait.jpg",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Função para otimizar scroll
export const optimizeScroll = (element: HTMLElement) => {
  element.classList.add("smooth-scroll");
  
  // Usar passive listeners para melhor performance
  element.addEventListener("scroll", () => {}, { passive: true });
};

// Função para otimizar touch
export const optimizeTouch = (element: HTMLElement) => {
  element.classList.add("touch-optimized");
  
  // Prevenir zoom em double tap
  element.addEventListener("touchend", (e) => {
    e.preventDefault();
  }, { passive: false });
};

// Função para medir performance
export const measurePerformance = (name: string, fn: Function) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start}ms`);
  return result;
};

// Função para otimizar CSS
export const optimizeCSS = () => {
  // Adicionar classes de performance
  document.documentElement.classList.add("performance-optimized");
  
  // Otimizar font loading
  if ("fonts" in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add("fonts-loaded");
    });
  }
};

// Função para limpar cache
export const clearCache = () => {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
};
