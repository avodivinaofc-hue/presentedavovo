import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TransitionParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface PageTransitionParticlesProps {
  isActive: boolean;
  direction: 'next' | 'prev';
}

export const PageTransitionParticles = ({ isActive, direction }: PageTransitionParticlesProps) => {
  const [particles, setParticles] = useState<TransitionParticle[]>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles: TransitionParticle[] = [];
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 0.3
        });
      }
      setParticles(newParticles);
    }
  }, [isActive]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'linear-gradient(135deg, hsl(var(--mystic-gold)), hsl(var(--primary)))',
            boxShadow: '0 0 10px hsl(var(--mystic-gold) / 0.8)',
          }}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: direction === 'next' ? -100 : 100
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: [0, 0, 0, direction === 'next' ? 100 : -100],
            y: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 100]
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
