import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // Detectar se é mobile
      const checkMobile = () => {
        try {
          setIsMobile(window.innerWidth < 768);
        } catch (error) {
          console.warn('Error checking mobile:', error);
          setIsMobile(false);
        }
      };

      checkMobile();
      
      // Adicionar listener de resize com tratamento de erro
      const handleResize = () => {
        try {
          checkMobile();
        } catch (error) {
          console.warn('Error handling resize:', error);
        }
      };

      window.addEventListener('resize', handleResize);

      const generateParticles = () => {
        try {
          const newParticles: Particle[] = [];
          // Reduzir partículas em mobile para melhor performance
          const particleCount = isMobile ? 8 : 20;
          
          for (let i = 0; i < particleCount; i++) {
            newParticles.push({
              id: i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 3 + 1, // Partículas menores em mobile
              opacity: Math.random() * 0.4 + 0.1, // Menos opacas em mobile
              duration: Math.random() * 8 + 4 // Animação mais rápida em mobile
            });
          }
          setParticles(newParticles);
        } catch (error) {
          console.error('Error generating particles:', error);
          setHasError(true);
        }
      };

      generateParticles();

      return () => {
        try {
          window.removeEventListener('resize', handleResize);
        } catch (error) {
          console.warn('Error removing resize listener:', error);
        }
      };
    } catch (error) {
      console.error('Error in FloatingParticles useEffect:', error);
      setHasError(true);
    }
  }, [isMobile]);

  // Se houver erro, não renderizar nada
  if (hasError) {
    return null;
  }

  // Se não há partículas, não renderizar
  if (particles.length === 0) {
    return null;
  }

  try {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-yellow-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error rendering FloatingParticles:', error);
    return null;
  }
};