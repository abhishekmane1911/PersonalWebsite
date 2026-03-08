import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
    title: string;
    subtitle: string;
    icon?: ReactNode;
}

const SectionHeading = ({ title, subtitle, icon }: SectionHeadingProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 md:mb-20"
        >
            {icon && (
                <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass mb-4 text-violet-400 text-xl"
                >
                    {icon}
                </motion.span>
            )}
            <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4">
                {title}
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
                {subtitle}
            </p>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-violet-500 to-cyan-400 mx-auto mt-6 rounded-full"
            />
        </motion.div>
    );
};

export default SectionHeading;
