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

  useEffect(() => {
    // Detectar se é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const generateParticles = () => {
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
    };

    generateParticles();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-mystic-gold"
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
};