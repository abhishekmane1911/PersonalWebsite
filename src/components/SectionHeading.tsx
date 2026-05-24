import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
    /** e.g. "01", "02" */
    index?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    /** Optional: extra class for the wrapper */
    className?: string;
}

/**
 * Editorial section heading — Syne display, left-aligned, numbered.
 * No icon chip, no gradient animation, no rainbow underline.
 * Each section can still override with its own heading if needed.
 */
const SectionHeading = ({
    index,
    title,
    subtitle,
    align = 'left',
    className = '',
}: SectionHeadingProps) => {
    const isCenter = align === 'center';

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-16 md:mb-20 ${isCenter ? 'text-center' : ''} ${className}`}
        >
            {/* Section number tag */}
            {index && (
                <div
                    className={`font-mono text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
                    style={{ color: 'var(--color-accent)' }}
                >
                    <span>{index}</span>
                    <span
                        className="inline-block h-px flex-1 max-w-[48px]"
                        style={{ background: 'var(--color-accent)', opacity: 0.5 }}
                    />
                </div>
            )}

            {/* Title */}
            <h2
                className="font-display font-bold text-white"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em' }}
            >
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className="mt-4 max-w-lg font-sans leading-relaxed"
                    style={{
                        color: 'var(--color-text-2)',
                        fontSize: '1rem',
                        marginLeft: isCenter ? 'auto' : undefined,
                        marginRight: isCenter ? 'auto' : undefined,
                    }}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeading;
