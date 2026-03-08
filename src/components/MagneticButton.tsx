import { useRef, useState } from 'react';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    as?: 'button' | 'a';
    href?: string;
    target?: string;
    rel?: string;
    onClick?: (e: ReactMouseEvent) => void;
}

const MagneticButton = ({
    children,
    className = '',
    strength = 0.35,
    as = 'button',
    href,
    target,
    rel,
    onClick,
}: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) * strength;
        const y = (e.clientY - centerY) * strength;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Tag = as === 'a' ? 'a' : 'button';
    const linkProps = as === 'a' ? { href, target, rel } : {};

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', padding: '8px', margin: '-8px' }}
        >
            <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{
                    type: 'spring' as const,
                    stiffness: 200,
                    damping: 12,
                    mass: 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'inline-block' }}
            >
                <Tag
                    className={className}
                    onClick={onClick}
                    {...linkProps}
                >
                    {children}
                </Tag>
            </motion.div>
        </div>
    );
};

export default MagneticButton;
