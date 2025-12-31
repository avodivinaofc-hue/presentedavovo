import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface HoldToRevealProps {
    children: React.ReactNode;
    revealDuration?: number;
    onReveal?: () => void;
    instruction?: string;
}

export const HoldToReveal = ({
    children,
    revealDuration = 800,
    onReveal,
    instruction = "Segure para limpar o espelho e ver a verdade"
}: HoldToRevealProps) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const triggerHaptic = useCallback(() => {
        if ('vibrate' in navigator) {
            navigator.vibrate([30]);
        }
    }, []);

    const startHold = useCallback(() => {
        if (isRevealed) return;

        setIsHolding(true);
        triggerHaptic();

        const startTime = Date.now();

        progressIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / revealDuration) * 100, 100);
            setProgress(newProgress);
        }, 16);

        holdTimerRef.current = setTimeout(() => {
            setIsRevealed(true);
            setIsHolding(false);
            setProgress(100);
            triggerHaptic();
            onReveal?.();

            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        }, revealDuration);
    }, [isRevealed, revealDuration, onReveal, triggerHaptic]);

    const endHold = useCallback(() => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        if (!isRevealed) {
            setIsHolding(false);
            setProgress(0);
        }
    }, [isRevealed]);

    useEffect(() => {
        return () => {
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, []);

    return (
        <div className="relative">
            {!isRevealed && (
                <motion.div
                    initial={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer select-none"
                    onMouseDown={startHold}
                    onMouseUp={endHold}
                    onMouseLeave={endHold}
                    onTouchStart={startHold}
                    onTouchEnd={endHold}
                >
                    {/* Frosted overlay */}
                    <div className="absolute inset-0 bg-[#1E1B2E]/80 backdrop-blur-md rounded-xl" />

                    {/* Ripple effect on hold */}
                    {isHolding && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute w-20 h-20 rounded-full bg-[#A78BFA]/30"
                        />
                    )}

                    {/* Mirror icon */}
                    <div className="relative z-10 flex flex-col items-center gap-4 p-8">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-[#A78BFA]"
                        >
                            <ellipse cx="12" cy="12" rx="8" ry="10" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                            <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.3" />
                        </svg>

                        <p
                            className="text-center text-[#E0D8F0]/80 text-sm max-w-[200px]"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            {instruction}
                        </p>

                        {/* Progress ring */}
                        <svg width="60" height="60" viewBox="0 0 60 60" className="absolute -bottom-2">
                            <circle
                                cx="30"
                                cy="30"
                                r="25"
                                fill="none"
                                stroke="rgba(167, 139, 250, 0.2)"
                                strokeWidth="3"
                            />
                            <circle
                                cx="30"
                                cy="30"
                                r="25"
                                fill="none"
                                stroke="url(#progress-gradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${progress * 1.57} 157`}
                                transform="rotate(-90 30 30)"
                                className="transition-all duration-75"
                            />
                            <defs>
                                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#60A5FA" />
                                    <stop offset="100%" stopColor="#A78BFA" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                className={`transition-all duration-500 ${!isRevealed ? 'blur-lg' : ''}`}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default HoldToReveal;
