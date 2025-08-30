import { useState, useEffect, useCallback, useMemo, useRef } from "react";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface UseOptimizedDataOptions<T> {
  key: string;
  fetcher: () => Promise<T>;
  ttl?: number; // Time to live em milissegundos
  dependencies?: any[];
  enableCache?: boolean;
}

const cache = new Map<string, CacheItem<any>>();

export const useOptimizedData = <T>({
  key,
  fetcher,
  ttl = 5 * 60 * 1000, // 5 minutos padrão
  dependencies = [],
  enableCache = true
}: UseOptimizedDataOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const isCacheValid = useCallback((item: CacheItem<T>) => {
    return Date.now() - item.timestamp < item.ttl;
  }, []);

  const getCachedData = useCallback((): T | null => {
    if (!enableCache) return null;
    
    const cached = cache.get(key);
    if (cached && isCacheValid(cached)) {
      return cached.data;
    }
    
    if (cached) {
      cache.delete(key); // Remove cache expirado
    }
    
    return null;
  }, [key, enableCache, isCacheValid]);

  const setCachedData = useCallback((newData: T) => {
    if (!enableCache) return;
    
    cache.set(key, {
      data: newData,
      timestamp: Date.now(),
      ttl
    });
  }, [key, ttl, enableCache]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cancela requisição anterior se existir
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      const result = await fetcher();
      
      if (!abortControllerRef.current.signal.aborted) {
        setData(result);
        setCachedData(result);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [fetcher, setCachedData]);

  const refresh = useCallback(() => {
    cache.delete(key); // Remove cache para forçar nova busca
    fetchData();
  }, [key, fetchData]);

  const clearCache = useCallback(() => {
    cache.delete(key);
  }, [key]);

  // Inicialização
  useEffect(() => {
    const cachedData = getCachedData();
    if (cachedData) {
      setData(cachedData);
    } else {
      fetchData();
    }
  }, [getCachedData, fetchData]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Memoização dos dados
  const memoizedData = useMemo(() => data, [data]);

  // Memoização das funções
  const memoizedRefresh = useCallback(refresh, [refresh]);
  const memoizedClearCache = useCallback(clearCache, [clearCache]);

  return {
    data: memoizedData,
    loading,
    error,
    refresh: memoizedRefresh,
    clearCache: memoizedClearCache,
    isCached: cache.has(key) && isCacheValid(cache.get(key)!)
  };
};

// Hook para limpar todo o cache
export const useClearAllCache = () => {
  return useCallback(() => {
    cache.clear();
  }, []);
};

// Hook para obter estatísticas do cache
export const useCacheStats = () => {
  const [stats, setStats] = useState({
    size: 0,
    keys: [] as string[]
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        size: cache.size,
        keys: Array.from(cache.keys())
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
