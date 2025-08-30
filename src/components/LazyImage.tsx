import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM3NDE1MSIvPjwvc3ZnPg==",
  threshold = 0.1,
  rootMargin = "50px"
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    });
  }, []);

  const observerOptions = useMemo(() => ({
    threshold,
    rootMargin,
  }), [threshold, rootMargin]);

  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, observerOptions]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    console.error(`Erro ao carregar imagem: ${src}`);
    // Fallback para placeholder em caso de erro
    setIsLoaded(true);
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder}
      alt={alt}
      className={`transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
    />
  );
};
