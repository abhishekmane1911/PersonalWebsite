import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import HeroScene from './HeroScene';
import MagneticButton from './MagneticButton';

const roles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'AI Enthusiast',
    'DSA Enthusiast',
    'Problem Solver',
];

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const role = roles[currentRole];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < role.length) {
                    setDisplayText(role.substring(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.substring(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRole]);

    const nameLetters = 'Abhishek Mane'.split('');

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Gradient Orbs Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-glow-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-magenta-500/10 rounded-full blur-[150px] animate-glow-pulse" style={{ animationDelay: '3s' }} />
            </div>

            {/* 3D Scene */}
            <HeroScene />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    {/* <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 font-mono">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Available for opportunities
                    </span> */}
                </motion.div>

                {/* Name */}
                <motion.h1
                    className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <span className="text-white text-shadow-glow">Hi, I'm </span>
                    <span className="block mt-2">
                        {nameLetters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.6 + i * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="inline-block italic text-gray-200 text-shadow-glow"
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </span>
                </motion.h1>

                {/* Typewriter Role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8"
                >
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
                        I'm a{' '}
                        <span className="font-mono text-cyan-400 font-medium">
                            {displayText}
                            <span className="animate-pulse text-violet-400">|</span>
                        </span>
                    </p>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Crafting exceptional digital experiences through code and design.
                    Passionate about building innovative solutions that merge creativity with technology.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <MagneticButton
                        as="a"
                        href="#projects"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-all duration-300"
                    >
                        View My Work
                    </MagneticButton>
                    <MagneticButton
                        as="a"
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                    >
                        Get In Touch
                    </MagneticButton>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex items-center justify-center gap-4"
                >
                    {[
                        { icon: <FiGithub />, href: 'https://github.com/abhishekmane1911', label: 'GitHub' },
                        { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/abhishekmane19/', label: 'LinkedIn' },
                    ].map((social) => (
                        <MagneticButton
                            key={social.label}
                            as="a"
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg glass text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                            strength={0.5}
                        >
                            <span className="text-xl">{social.icon}</span>
                        </MagneticButton>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2 text-gray-500"
                >
                    <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
                    <FiArrowDown className="text-sm" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
