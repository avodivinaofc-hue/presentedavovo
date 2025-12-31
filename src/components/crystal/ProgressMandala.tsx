import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ProgressMandalaProps {
    completedChapters: number[];
    totalChapters: number;
}

export const ProgressMandala = ({ completedChapters, totalChapters }: ProgressMandalaProps) => {
    const petals = useMemo(() => {
        const petalPaths: string[] = [];
        const centerX = 100;
        const centerY = 100;
        const innerRadius = 25;
        const outerRadius = 80;

        for (let i = 0; i < totalChapters; i++) {
            const angle = (i * 360 / totalChapters) - 90;
            const nextAngle = ((i + 1) * 360 / totalChapters) - 90;

            const rad1 = (angle * Math.PI) / 180;
            const rad2 = (nextAngle * Math.PI) / 180;

            const x1Inner = centerX + innerRadius * Math.cos(rad1);
            const y1Inner = centerY + innerRadius * Math.sin(rad1);
            const x1Outer = centerX + outerRadius * Math.cos(rad1);
            const y1Outer = centerY + outerRadius * Math.sin(rad1);
            const x2Inner = centerX + innerRadius * Math.cos(rad2);
            const y2Inner = centerY + innerRadius * Math.sin(rad2);
            const x2Outer = centerX + outerRadius * Math.cos(rad2);
            const y2Outer = centerY + outerRadius * Math.sin(rad2);

            // Create petal path with curved edges
            const midAngle = (angle + nextAngle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const controlRadius = outerRadius + 15;
            const controlX = centerX + controlRadius * Math.cos(midRad);
            const controlY = centerY + controlRadius * Math.sin(midRad);

            const path = `
        M ${x1Inner} ${y1Inner}
        L ${x1Outer} ${y1Outer}
        Q ${controlX} ${controlY} ${x2Outer} ${y2Outer}
        L ${x2Inner} ${y2Inner}
        Z
      `;
            petalPaths.push(path);
        }

        return petalPaths;
    }, [totalChapters]);

    const completionPercentage = Math.round((completedChapters.length / totalChapters) * 100);

    return (
        <div className="flex flex-col items-center gap-6">
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="drop-shadow-lg"
            >
                <defs>
                    <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="50%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#FDF4FF" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Center circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="rgba(167, 139, 250, 0.2)"
                    stroke="rgba(167, 139, 250, 0.5)"
                    strokeWidth="1"
                />

                {/* Petals */}
                {petals.map((path, index) => {
                    const isCompleted = completedChapters.includes(index);
                    return (
                        <motion.path
                            key={index}
                            d={path}
                            className={`crystal-mandala-petal ${isCompleted ? 'completed' : ''}`}
                            initial={false}
                            animate={{
                                fill: isCompleted ? 'url(#crystal-gradient)' : 'rgba(167, 139, 250, 0.1)',
                                stroke: isCompleted ? 'rgba(253, 244, 255, 0.5)' : 'rgba(167, 139, 250, 0.3)',
                            }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            filter={isCompleted ? 'url(#glow)' : undefined}
                        />
                    );
                })}

                {/* Center dot */}
                <circle
                    cx="100"
                    cy="100"
                    r="8"
                    fill="url(#crystal-gradient)"
                    filter="url(#glow)"
                />
            </svg>

            <div className="text-center">
                <p className="text-3xl font-light text-[#A78BFA]" style={{ fontFamily: "'Marcellus', serif" }}>
                    {completionPercentage}%
                </p>
                <p className="text-sm text-[#E0D8F0]/60 mt-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    {completedChapters.length} de {totalChapters} fragmentos iluminados
                </p>
            </div>
        </div>
    );
};

export default ProgressMandala;
