import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import HeroScene from './HeroScene';
import MagneticButton from './MagneticButton';
import backVideo from '../assets/back.mp4';


const roles = [
    'Full-Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'DSA Enthusiast',
    'Creative Coder',
];

const RolesMarquee = () => {

    const doubled = [...roles, ...roles];
    return (
        <div
            className="overflow-hidden"
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
        >
            <div
                className="flex gap-8 whitespace-nowrap"
                style={{
                    animation: 'marquee 22s linear infinite',
                    width: 'max-content',
                }}
            >
                {doubled.map((role, i) => (
                    <span
                        key={i}
                        className="font-mono text-sm uppercase tracking-[0.18em] flex items-center gap-8"
                        style={{ color: 'var(--color-text-2)' }}
                    >
                        {role}
                        <span style={{ color: 'var(--color-accent)', opacity: 0.6 }}>×</span>
                    </span>
                ))}
            </div>
        </div>
    );
};


const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
    const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const nameLetters = 'ABHISHEK'.split('');
    const nameLine2 = 'MANE'.split('');

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none "
                style={{ opacity: 0.09, zIndex: 0 }}
            >
                <source src={backVideo} type="video/mp4" />
            </video>

            <HeroScene />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-14 lg:px-24 pt-20 pb-16">
                <div className="max-w-[660px]">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2.5 mb-10"
                    >
                        {/* <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }}
                        /> */}
                        {/* <span
                            className="font-mono text-[11px] uppercase tracking-[0.25em]"
                            style={{ color: 'var(--color-text-2)' }}
                        >
                            Available for opportunities
                        </span> */}
                    </motion.div>

                    {/* ── Massive name display ── */}
                    <motion.div style={{ y: nameY, opacity: nameOpacity }}>

                        <div
                            className="font-display font-bold leading-none whitespace-nowrap"
                            style={{
                                fontSize: 'clamp(4.5rem, 13vw, 10.5rem)',
                                letterSpacing: '-0.04em',
                                color: '#FFFFFF',
                            }}
                        >
                            {nameLetters.map((letter, i) => (
                                <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
                                    <motion.span
                                        className="inline-block"
                                        initial={{ y: '110%' }}
                                        animate={{ y: '0%' }}
                                        transition={{
                                            duration: 0.75,
                                            delay: 0.1 + i * 0.045,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                </span>
                            ))}
                        </div>


                        <div
                            className="font-display font-bold leading-none whitespace-nowrap"
                            style={{
                                fontSize: 'clamp(4.5rem, 13vw, 10.5rem)',
                                letterSpacing: '-0.04em',
                                marginTop: '-0.05em',
                            }}
                        >
                            {nameLine2.map((letter, i) => (
                                <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
                                    <motion.span
                                        className="inline-block"
                                        style={{
                                            color: i === nameLine2.length - 1 ? 'var(--color-accent)' : '#FFFFFF',
                                            fontStyle: 'italic',
                                        }}
                                        initial={{ y: '110%' }}
                                        animate={{ y: '0%' }}
                                        transition={{
                                            duration: 0.75,
                                            delay: 0.45 + i * 0.05,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.p
                        className="font-sans mt-8 mb-10 leading-relaxed max-w-[480px]"
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--color-text-2)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Building full stack products that feel fast, look sharp, and solve real problems
                        from production web apps to AI powered systems.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 mb-12"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.05 }}
                    >
                        <MagneticButton
                            as="a"
                            href="#projects"
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-medium text-sm text-gray-900 transition-all duration-300"
                            style={{ background: 'var(--color-accent)' }}
                        >
                            View My Work
                            <FiArrowUpRight className="text-base" />
                        </MagneticButton>

                        <MagneticButton
                            as="a"
                            href="#contact"
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border font-sans font-medium text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                            style={{ borderColor: 'var(--color-border-hover)' }}
                        >
                            Get In Touch
                        </MagneticButton>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: 'var(--color-text-3)' }}
                        >
                            Find me on
                        </span>
                        {[
                            { icon: <FiGithub />, href: 'https://github.com/abhishekmane1911', label: 'GitHub' },
                            { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/abhishekmane19/', label: 'LinkedIn' },
                        ].map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="text-lg transition-colors duration-200"
                                style={{ color: 'var(--color-text-2)' }}
                                whileHover={{ color: '#FFFFFF', y: -2 }}
                            >
                                {s.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="absolute bottom-8 left-0 right-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <RolesMarquee />
            </motion.div>

            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent, var(--color-bg))`,
                }}
            />
        </section>
    );
};

export default Hero;
