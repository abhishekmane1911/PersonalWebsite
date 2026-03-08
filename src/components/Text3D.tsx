import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';

interface Text3DProps {
    children: ReactNode;
}

const Text3D = ({ children }: Text3DProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 400, damping: 25, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 400, damping: 25, mass: 0.1 });

    const rotateX = useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [25, -25]);
    const rotateY = useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-25, 25]);

    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        x.set(w / 2);
        y.set(h / 2);

        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        const handleResize = () => {
            x.set(window.innerWidth / 2);
            y.set(window.innerHeight / 2);
        };

        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [x, y]);

    return (
        <div
            ref={ref}
            className="w-full py-16 flex items-center justify-center [perspective:2000px]"
        >
            <motion.h1
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className="text-5xl md:text-7xl font-heading font-bold text-white [transform-style:preserve-3d] will-change-transform"
            >
                {children}
            </motion.h1>
        </div>
    );
};

export default Text3D;
