import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Mail } from 'lucide-react';
import Text3D from './Text3D';
import RollingText from './RollingText';
import { siteConfig, socialLinks, navItems } from '../config/site';

const Footer = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
        }
    }, [isInView, mainControls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
        },
    };

    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer ref={ref} className="bg-[#030014] text-white font-sans pt-12 sm:pt-20 overflow-hidden">
            <div
                className="relative max-w-7xl mx-auto rounded-t-3xl bg-indigo-600/90 p-6 sm:p-8 md:p-16
          before:absolute before:inset-0 before:content-[''] 
          before:bg-[url('/noise_texture_2.png')] before:opacity-65 before:z-0
          before:rounded-t-3xl"
            // style={{
            //     background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(37, 99, 235, 0.8), rgba(6, 182, 212, 0.75))',
            // }}
            >
                {/* Noise texture overlay */}
                {/* <div
                    className="absolute inset-0 z-0 opacity-30 rounded-t-3xl"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                /> */}

                <motion.div
                    className="relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={mainControls}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">

                        <motion.div className="space-y-4" variants={itemVariants}>
                            <h3 className="text-xl font-bold text-white/90">
                                Let's build something amazing together.
                            </h3>
                            <motion.a
                                href={siteConfig.email}
                                className="inline-flex items-center gap-2 text-white/70"
                                whileHover={{ color: '#FFFFFF', x: 5, transition: { duration: 0.2 } }}
                            >
                                <Mail size={18} />
                                <span>{siteConfig.emailDisplay}</span>
                            </motion.a>
                        </motion.div>

                        {/* Navigate */}
                        <motion.div className="md:mx-auto" variants={itemVariants}>
                            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider font-mono">
                                {'{ NAVIGATE }'}
                            </h4>
                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                            className="text-white/70 hover:text-white transition-colors cursor-pointer"
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
                            <h4 className="font-semibold text-white/60 mb-4 text-sm uppercase tracking-wider font-mono">
                                {'{ CONNECT }'}
                            </h4>
                            <ul className="space-y-3">
                                {socialLinks.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                                            onMouseEnter={() => setHoveredItem(social.name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            {social.icon}
                                            <RollingText text={`${social.name}.connect()`} isHovered={hoveredItem === social.name} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* 3D Name */}
                    <motion.div className="text-center my-6 sm:my-12 md:my-20" variants={itemVariants}>
                        <Text3D>
                            {siteConfig.name}
                        </Text3D>
                    </motion.div>

                    {/* Bottom */}
                    <motion.div className="text-center border-t border-white/15 pt-8" variants={itemVariants}>
                        <p className="text-sm text-white/40">
                            &copy; {new Date().getFullYear()} {siteConfig.name}. Crafted with passion & code.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
