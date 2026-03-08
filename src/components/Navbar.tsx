import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map(link => link.href.substring(1));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div
                    className={`pointer-events-auto transition-all duration-700 ease-out rounded-2xl ${isScrolled
                        ? 'liquid-glass shadow-2xl shadow-black/30'
                        : 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]'
                        }`}
                    style={{
                        borderRadius: '18px',
                    }}
                >
                    <div className="flex items-center gap-1 px-2 py-1.5">
                        {/* Logo */}
                        {/* <motion.a
                            href="#home"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                            className="relative group px-4 py-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="font-heading text-xl font-bold gradient-text">
                                AM
                            </span>
                        </motion.a> */}

                        {/* Divider */}
                        {/* <div className="hidden md:block w-px h-6 bg-white/10 mx-1" /> */}

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    className="relative px-3.5 py-2 text-[13px] font-medium rounded-xl transition-colors duration-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {activeSection === link.href.substring(1) && (
                                        <motion.span
                                            layoutId="activeNav"
                                            className="absolute inset-0 rounded-xl"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.15))',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                boxShadow: '0 0 20px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span
                                        className={`relative z-10 transition-colors duration-200 ${activeSection === link.href.substring(1)
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-gray-200'
                                            }`}
                                    >
                                        {link.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Divider */}
                        {/* <div className="hidden md:block w-px h-6 bg-white/10 mx-1" /> */}

                        {/* CTA Button */}
                        {/* <motion.a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                            className="hidden md:flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-xl transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Let's Talk
                        </motion.a> */}

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2 ml-2"
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-20 left-4 right-4 z-40 liquid-glass rounded-2xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === link.href.substring(1)
                                        ? 'text-white bg-white/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            {/* <motion.a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-2 px-4 py-3 text-center text-sm font-semibold text-white rounded-xl"
                                style={{
                                    background: 'linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4)',
                                }}
                            >
                                Let's Talk
                            </motion.a> */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
