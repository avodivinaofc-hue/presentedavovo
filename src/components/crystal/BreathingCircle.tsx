import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathingCircleProps {
    onComplete?: () => void;
    cycles?: number;
}

export const BreathingCircle = ({ onComplete, cycles = 2 }: BreathingCircleProps) => {
    const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
    const [currentCycle, setCurrentCycle] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const triggerHaptic = useCallback((pattern: 'light' | 'medium' | 'strong') => {
        if ('vibrate' in navigator) {
            const patterns = {
                light: [50],
                medium: [100],
                strong: [200]
            };
            navigator.vibrate(patterns[pattern]);
        }
    }, []);

    const startBreathing = () => {
        setIsActive(true);
        setCurrentCycle(0);
        setPhase('inhale');
    };

    useEffect(() => {
        if (!isActive) return;

        const timings = {
            inhale: 4000,
            hold: 2000,
            exhale: 4000
        };

        let timeout: NodeJS.Timeout;

        if (phase === 'inhale') {
            triggerHaptic('light');
            timeout = setTimeout(() => setPhase('hold'), timings.inhale);
        } else if (phase === 'hold') {
            timeout = setTimeout(() => setPhase('exhale'), timings.hold);
        } else if (phase === 'exhale') {
            triggerHaptic('medium');
            timeout = setTimeout(() => {
                const nextCycle = currentCycle + 1;
                if (nextCycle >= cycles) {
                    setIsActive(false);
                    setPhase('idle');
                    triggerHaptic('strong');
                    onComplete?.();
                } else {
                    setCurrentCycle(nextCycle);
                    setPhase('inhale');
                }
            }, timings.exhale);
        }

        return () => clearTimeout(timeout);
    }, [phase, isActive, currentCycle, cycles, onComplete, triggerHaptic]);

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return 'Inspire...';
            case 'hold': return 'Segure...';
            case 'exhale': return 'Expire...';
            default: return 'Prepare-se para a calma';
        }
    };

    const circleVariants = {
        idle: { scale: 1, opacity: 0.6 },
        inhale: {
            scale: 1.4,
            opacity: 1,
            transition: { duration: 4, ease: 'easeInOut' }
        },
        hold: {
            scale: 1.4,
            opacity: 1,
            transition: { duration: 0.2 }
        },
        exhale: {
            scale: 1,
            opacity: 0.6,
            transition: { duration: 4, ease: 'easeInOut' }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
            <motion.div
                className="relative flex items-center justify-center"
                initial="idle"
                animate={phase}
                variants={circleVariants}
            >
                {/* Outer glow ring */}
                <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] opacity-20 blur-xl" />

                {/* Main circle */}
                <div className="crystal-breathing-circle flex items-center justify-center">
                    {/* Inner glow */}
                    <div className="w-16 h-16 rounded-full bg-gradient-radial from-[#A78BFA]/40 to-transparent" />
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-[#E0D8F0] font-light tracking-wide"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                    {getInstruction()}
                </motion.p>
            </AnimatePresence>

            {!isActive && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={startBreathing}
                    className="crystal-btn mt-4"
                >
                    Iniciar Respiração
                </motion.button>
            )}

            {isActive && (
                <p className="text-sm text-[#A78BFA]/70">
                    Ciclo {currentCycle + 1} de {cycles}
                </p>
            )}
        </div>
    );
};

export default BreathingCircle;
