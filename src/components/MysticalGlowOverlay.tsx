import { motion } from "framer-motion";

interface MysticalGlowOverlayProps {
  isActive: boolean;
}

export const MysticalGlowOverlay = ({ isActive }: MysticalGlowOverlayProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0.5, 0.3, 0],
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
      style={{
        background: 'radial-gradient(circle at center, hsl(var(--mystic-gold) / 0.4), hsl(var(--primary) / 0.3), transparent)',
        mixBlendMode: 'screen'
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 0.8,
          repeat: 0,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.5), transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
    </motion.div>
  );
};
