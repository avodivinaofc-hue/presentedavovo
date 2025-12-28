import { motion } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";

export const MysticalBook3D = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Debounce para reduzir re-renders
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * -20;
        setMousePosition({ x, y });
      }, 16); // ~60fps
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto py-8 perspective-1000">
      {/* Mystical particles background - REDUZIDO para performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full will-change-transform"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 400,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing aura - OTIMIZADO */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-40 will-change-transform"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* 3D Book Container - OTIMIZADO */}
      <motion.div
        className="relative z-10 will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`,
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Book shadow - SIMPLIFICADO */}
        <div className="absolute inset-0 bg-primary/15 blur-2xl rounded-lg transform translate-y-8 -z-10" />

        {/* Main book image with 3D effect */}
        <div className="relative group">
          {/* Magical glow border - OTIMIZADO */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-lg opacity-60 blur-lg will-change-transform"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Book image */}
          <div className="relative bg-mystic-dark p-2 rounded-lg overflow-hidden">
            <img
              src="/lovable-uploads/oraculo-interior-cover.png"
              alt="Oráculo Interior"
              className="w-full h-auto rounded-lg shadow-2xl transition-all duration-300 hover:brightness-110"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(50px)",
              }}
              loading="lazy"
            />

            {/* Sparkle overlay - OTIMIZADO */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent will-change-transform"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating mystical symbols - REDUZIDO */}
          <motion.div
            className="absolute -top-4 -right-4 text-3xl will-change-transform"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 text-2xl will-change-transform"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🔮
          </motion.div>
        </div>
      </motion.div>

      {/* Energy waves - OTIMIZADO */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20 will-change-transform"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
  );
});
