import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

/* ── Animated hamburger — two lines morph to X ── */
const HamburgerIcon = ({ open }: { open: boolean }) => (
    <div className="w-5 h-4 relative flex flex-col justify-between">
        <motion.span
            className="block w-full h-px rounded-full"
            style={{ background: '#FFFFFF', transformOrigin: 'center' }}
            animate={open
                ? { rotate: 45, y: 7, scaleX: 1 }
                : { rotate: 0, y: 0, scaleX: 1 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
            className="block h-px rounded-full"
            style={{ background: '#FFFFFF', transformOrigin: 'center' }}
            animate={open
                ? { scaleX: 0, opacity: 0 }
                : { scaleX: 0.6, opacity: 1 }
            }
            transition={{ duration: 0.2 }}
        />
        <motion.span
            className="block w-full h-px rounded-full"
            style={{ background: '#FFFFFF', transformOrigin: 'center' }}
            animate={open
                ? { rotate: -45, y: -7, scaleX: 1 }
                : { rotate: 0, y: 0, scaleX: 1 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
    </div>
);

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map((l) => l.href.substring(1));
            for (const section of [...sections].reverse()) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div
                    className={`pointer-events-auto transition-all duration-500 rounded-2xl ${isScrolled ? 'liquid-glass shadow-2xl shadow-black/40' : 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]'
                        }`}
                >
                    <div className="flex items-center gap-1 px-2 py-1.5">

                        {/* ── AM Monogram ── */}
                        {/* <motion.a
                            href="#home"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                            className="px-3 py-2 mr-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span
                                className="font-display font-bold text-base"
                                style={{ letterSpacing: '-0.03em', color: 'var(--color-accent)' }}
                            >
                                AM
                            </span>
                        </motion.a> */}

                        {/* ── Divider ── */}
                        {/* <div className="hidden md:block w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} /> */}

                        {/* ── Desktop links ── */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className="relative px-3.5 py-2 text-[13px] font-medium rounded-xl transition-colors duration-200"
                                    style={{
                                        fontFamily: 'var(--font-sans)',
                                        color: activeSection === link.href.substring(1) ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {activeSection === link.href.substring(1) && (
                                        <motion.span
                                            layoutId="activeNav"
                                            className="absolute inset-0 rounded-xl"
                                            style={{
                                                background: 'rgba(232,197,71,0.1)',
                                                border: '1px solid rgba(232,197,71,0.15)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </motion.a>
                            ))}
                        </div>

                        {/* ── Divider ── */}
                        <div className="hidden md:block w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

                        {/* ── Hire Me CTA ── */}
                        <motion.a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300"
                            style={{
                                background: 'var(--color-accent)',
                                color: '#0A0A0A',
                                fontFamily: 'var(--font-sans)',
                            }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: '#0A0A0A', opacity: 0.5 }}
                            />
                            Hire Me
                        </motion.a>

                        {/* ── Mobile toggle ── */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2.5 ml-1 rounded-xl"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle menu"
                        >
                            <HamburgerIcon open={isMobileMenuOpen} />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-20 left-4 right-4 z-40 liquid-glass rounded-2xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-3 gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                                    style={{
                                        fontFamily: 'var(--font-sans)',
                                        color: activeSection === link.href.substring(1) ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                                        background: activeSection === link.href.substring(1) ? 'rgba(232,197,71,0.08)' : 'transparent',
                                    }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <div className="border-t mt-1 pt-1" style={{ borderColor: 'var(--color-border)' }}>
                                <motion.a
                                    href="#contact"
                                    onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.04 }}
                                    className="flex items-center justify-center gap-2 px-4 py-3 mt-1 rounded-xl text-sm font-medium"
                                    style={{
                                        background: 'var(--color-accent)',
                                        color: '#0A0A0A',
                                        fontFamily: 'var(--font-sans)',
                                    }}
                                >
                                    Hire Me
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
