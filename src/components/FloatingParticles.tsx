import { useEffect, useState, useCallback, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Memoizar a detecção de mobile para evitar recálculos
  const checkMobile = useCallback(() => {
    try {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    } catch (error) {
      console.warn('Error checking mobile:', error);
      return false;
    }
  }, []);

  // Memoizar a geração de partículas para evitar recriação desnecessária
  const generateParticles = useCallback((mobile: boolean) => {
    try {
      const newParticles: Particle[] = [];
      const particleCount = mobile ? 6 : 15; // Reduzido ainda mais para performance
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5, // Partículas ainda menores
          opacity: Math.random() * 0.3 + 0.05, // Menos opacas
          duration: Math.random() * 6 + 3, // Animação mais rápida
          delay: Math.random() * 3 // Delay variado para distribuir carga
        });
      }
      return newParticles;
    } catch (error) {
      console.error('Error generating particles:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    try {
      const mobile = checkMobile();
      const initialParticles = generateParticles(mobile);
      setParticles(initialParticles);
      
      // Throttled resize handler para melhor performance
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const newMobile = checkMobile();
          if (newMobile !== mobile) {
            const newParticles = generateParticles(newMobile);
            setParticles(newParticles);
          }
        }, 150); // Throttle de 150ms
      };

      window.addEventListener('resize', handleResize, { passive: true });

      return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error in FloatingParticles useEffect:', error);
      setHasError(true);
    }
  }, [checkMobile, generateParticles]);

  // Memoizar o render das partículas para evitar re-renders desnecessários
  const particleElements = useMemo(() => {
    if (hasError || particles.length === 0) return null;

    return particles.map((particle) => (
      <div
        key={particle.id}
        className="absolute rounded-full bg-yellow-400/60"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          animation: `float ${particle.duration}s ease-in-out infinite`,
          animationDelay: `${particle.delay}s`,
          willChange: 'transform, opacity', // Otimização de GPU
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      />
    ));
  }, [particles, hasError]);

  // Se houver erro ou não há partículas, não renderizar nada
  if (hasError || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particleElements}
    </div>
  );
};