import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import Text3D from './Text3D';
import RollingText from './RollingText';
import { siteConfig, socialLinks, navItems } from '../config/site';

/* ── Inline SVG noise texture (no external asset dependency) ── */
const InlineNoise = () => (
    <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 0 }}
    >
        <filter id="footer-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#footer-noise)" />
    </svg>
);

const Footer = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) controls.start('visible');
    }, [isInView, controls]);

    const containerVariants = {
        hidden:  { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };
    const itemVariants = {
        hidden:  { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
    };

    const handleNavClick = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer ref={ref} style={{ background: 'var(--color-bg)' }} className="text-white overflow-hidden">
            {/* ── Divider line ── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-14 lg:px-24">
                <div className="h-px" style={{ background: 'var(--color-border)' }} />
            </div>

            {/* ── Main footer block ── */}
            <div className="relative max-w-7xl mx-auto rounded-t-3xl mt-0 overflow-hidden"
                style={{ background: '#0E0E0E' }}
            >
                <InlineNoise />

                {/* Amber top accent strip */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }}
                />

                <motion.div
                    className="relative z-10 p-8 md:p-14 lg:p-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {/* ── Top grid: tagline + nav + connect ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-14 md:mb-20">

                        {/* Tagline + email */}
                        <motion.div className="space-y-5" variants={itemVariants}>
                            <span
                                className="font-display font-bold block"
                                style={{ fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}
                            >
                                Let's build something great together.
                            </span>
                            <motion.a
                                href={siteConfig.email}
                                className="inline-flex items-center gap-2 font-sans text-sm group"
                                style={{ color: 'var(--color-text-2)' }}
                                whileHover={{ x: 4, color: '#FFFFFF' } as any}
                                transition={{ duration: 0.2 }}
                            >
                                <FiMail className="shrink-0" />
                                <span>{siteConfig.emailDisplay}</span>
                                <FiArrowUpRight
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ color: 'var(--color-accent)' }}
                                />
                            </motion.a>
                        </motion.div>

                        {/* Navigate */}
                        <motion.div className="md:mx-auto" variants={itemVariants}>
                            <h4
                                className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5"
                                style={{ color: 'var(--color-text-2)' }}
                            >
                                Navigate
                            </h4>
                            <ul className="space-y-2.5">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                            className="font-sans text-sm cursor-pointer transition-colors duration-200"
                                            style={{ color: 'var(--color-text-2)' }}
                                            onMouseEnter={() => setHoveredItem(item.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <RollingText text={item.name} isHovered={hoveredItem === item.name} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Connect */}
                        <motion.div className="md:mx-auto" variants={itemVariants}>
                            <h4
                                className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5"
                                style={{ color: 'var(--color-text-2)' }}
                            >
                                Connect
                            </h4>
                            <ul className="space-y-3">
                                {socialLinks.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 font-sans text-sm transition-colors duration-200"
                                            style={{ color: 'var(--color-text-2)' }}
                                            onMouseEnter={() => setHoveredItem(social.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            {social.icon}
                                            <RollingText text={social.name} isHovered={hoveredItem === social.name} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* ── 3D Name — hero moment ── */}
                    <motion.div className="my-6 md:my-12" variants={itemVariants}>
                        <Text3D>{siteConfig.name}</Text3D>
                    </motion.div>

                    {/* ── Bottom bar ── */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
                        style={{ borderTop: '1px solid var(--color-border)' }}
                        variants={itemVariants}
                    >
                        <p className="font-mono text-[11px]" style={{ color: 'var(--color-text-3)' }}>
                            © {new Date().getFullYear()} Abhishek Mane — Built with React & Framer Motion
                        </p>
                        <p className="font-mono text-[11px]" style={{ color: 'var(--color-text-3)' }}>
                            Designed & Developed with care
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
