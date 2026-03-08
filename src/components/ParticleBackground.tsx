import { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.3 + 0.05,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        background: particle.id % 3 === 0
                            ? 'rgba(139, 92, 246, 0.6)'
                            : particle.id % 3 === 1
                                ? 'rgba(34, 211, 238, 0.6)'
                                : 'rgba(232, 121, 249, 0.6)',
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        opacity: [particle.opacity, particle.opacity * 2, particle.opacity, particle.opacity * 1.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
