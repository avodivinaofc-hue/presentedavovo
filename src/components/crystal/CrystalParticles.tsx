import { useMemo } from 'react';

interface CrystalParticlesProps {
    count?: number;
}

export const CrystalParticles = ({ count = 30 }: CrystalParticlesProps) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 8,
            duration: Math.random() * 4 + 6,
            opacity: Math.random() * 0.4 + 0.2,
        }));
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="crystal-particle"
                    style={{
                        left: particle.left,
                        top: particle.top,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default CrystalParticles;
