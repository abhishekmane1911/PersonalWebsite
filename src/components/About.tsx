import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import SectionHeading from './SectionHeading';
import profilePic from '../assets/pic.jpg';

const stats = [
    { value: '28+', label: 'Projects Delivered' },
    { value: '4+', label: 'Years Writing Code' },
    { value: '16+', label: 'Technologies Mastered' },
    { value: '100%', label: 'Dedication to Craft' },
];

const About = () => {
    return (
        <section id="about" className="section-padding relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    index="01"
                    title="About Me"
                    subtitle="The person behind the code"
                />

                <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-start">

                    {/* ── Left: Photo ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Photo with diagonal clip */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 100% 88%, 90% 100%, 0 100%)',
                                borderRadius: '4px',
                            }}
                        >
                            <img
                                src={profilePic}
                                alt="Abhishek Mane"
                                className="w-full object-cover"
                                style={{ aspectRatio: '4/5', objectPosition: 'top' }}
                            />
                            {/* Subtle amber overlay on hover */}
                            <div
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{
                                    background: 'linear-gradient(to bottom, transparent 60%, rgba(232,197,71,0.08) 100%)',
                                }}
                            />
                        </div>

                        {/* Floating accent number */}
                        <div
                            className="absolute -right-4 -bottom-4 font-display font-bold select-none pointer-events-none"
                            style={{
                                fontSize: '8rem',
                                lineHeight: 1,
                                color: 'var(--color-accent)',
                                opacity: 0.06,
                                letterSpacing: '-0.05em',
                            }}
                        >
                            AM
                        </div>
                    </motion.div>

                    {/* ── Right: Bio + Stats ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Pull quote */}
                        <p
                            className="font-display font-bold mb-8 leading-tight"
                            style={{
                                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                                letterSpacing: '-0.03em',
                                color: '#FFFFFF',
                            }}
                        >
                            "I build things that{' '}
                            <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>
                                work beautifully.
                            </span>"
                        </p>

                        {/* Bio */}
                        <div
                            className="font-sans space-y-4 mb-10"
                            style={{ color: 'var(--color-text-2)', lineHeight: 1.75 }}
                        >
                            <p>
                                I'm a <strong className="text-white font-medium">Full-Stack Developer</strong> and{' '}
                                <strong className="text-white font-medium">Designer</strong> — I write the backend,
                                design the interface, and ship the product. My work spans social platforms,
                                AI systems, DeFi apps, and healthcare tooling.
                            </p>
                            <p>
                                From leading the <span className="text-white">CSESA platform</span> at IIT Indore
                                to building multi-agent AI courtroom simulations, I care about code that's
                                clean, performant, and intentional.
                            </p>
                            <p>
                                My stack:{' '}
                                <span className="text-white">
                                    React, TypeScript, Python, Django, Node.js, Three.js, LangChain
                                </span>
                                {' '}— and whatever the project actually needs.
                            </p>
                        </div>

                        {/* ── Stats — editorial ruled list ── */}
                        <div className="space-y-0">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                                    className="flex items-center justify-between py-4 group"
                                    style={{ borderBottom: '1px solid var(--color-border)' }}
                                >
                                    <span
                                        className="font-display font-bold text-white transition-colors duration-200 group-hover:text-amber-400"
                                        style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="font-mono text-[11px] uppercase tracking-[0.18em]"
                                        style={{ color: 'var(--color-text-2)' }}
                                    >
                                        {stat.label}
                                    </span>
                                    {/* Expanding rule on hover */}
                                    <div
                                        className="h-px transition-all duration-500 mx-4 flex-1"
                                        style={{
                                            background: 'var(--color-border)',
                                            maxWidth: '80px',
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── GitHub Calendar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.3em]"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            GitHub Activity
                        </span>
                        <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
                    </div>
                    <div className="flex justify-start overflow-x-auto py-2">
                        <a
                            href="https://github.com/abhishekmane1911"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubCalendar
                                username="abhishekmane1911"
                                theme={{
                                    light: ['#161616', '#2A1F00', '#5C4500', '#A07800', '#E8C547'],
                                    dark: ['#161616', '#2A1F00', '#5C4500', '#A07800', '#E8C547'],
                                }}
                                blockSize={11}
                                blockMargin={4}
                                fontSize={11}
                            />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
