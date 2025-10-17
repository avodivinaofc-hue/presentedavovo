import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MysticalBook3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * -20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto py-8 perspective-1000">
      {/* Mystical particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 400,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing aura */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* 3D Book Container */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg)`,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Book shadow */}
        <motion.div
          className="absolute inset-0 bg-primary/20 blur-2xl rounded-lg transform translate-y-8 -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main book image with 3D effect */}
        <div className="relative group">
          {/* Magical glow border */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-lg opacity-75 blur-lg"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Book image */}
          <div className="relative bg-mystic-dark p-2 rounded-lg overflow-hidden">
            <motion.img
              src="/lovable-uploads/oraculo-interior-cover.png"
              alt="Oráculo Interior"
              className="w-full h-auto rounded-lg shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(50px)",
              }}
              whileHover={{
                filter: "brightness(1.2)",
              }}
            />

            {/* Sparkle overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating mystical symbols */}
          <motion.div
            className="absolute -top-4 -right-4 text-4xl"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 text-3xl"
            animate={{
              y: [0, 10, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🔮
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-6 text-2xl"
            animate={{
              x: [0, 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⭐
          </motion.div>
        </div>
      </motion.div>

      {/* Energy waves */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-secondary/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};
