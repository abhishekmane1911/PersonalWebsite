import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiZap, FiArrowRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const experiences = [
    {
        title: 'Full-Stack Developer',
        company: 'Freelance & Personal Projects',
        period: '2022 — Present',
        location: 'India',
        description: 'Building complete web applications from concept to deployment. Developed Linkup (social platform), CSESA Website, and multiple full-stack projects using React, TypeScript, Python, and cloud services.',
        tech: ['React', 'TypeScript', 'Python', 'Firebase', 'Vercel'],
        highlights: ['10+ Projects Delivered', 'Full-Stack Expertise', 'Production Deployments'],
        gradient: 'from-violet-500 via-purple-500 to-indigo-500',
        color: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.15)',
    },
    {
        title: 'AI/ML Developer',
        company: 'Research & Innovation Projects',
        period: '2024 — Present',
        location: 'India',
        description: 'Developing AI-powered applications including courtroom simulation systems and intelligent automation tools. Working with NLP, computer vision, and agentic AI frameworks.',
        tech: ['Python', 'LangChain', 'AI/ML', 'NLP', 'OpenCV'],
        highlights: ['AI Courtroom System', 'NLP Applications', 'Computer Vision'],
        gradient: 'from-cyan-500 via-blue-500 to-teal-500',
        color: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.15)',
    },
    {
        title: 'Web Development Lead',
        company: 'CSESA — Student Association',
        period: '2024 — 2025',
        location: 'India',
        description: 'Led the development of the official student association website. Managed the tech stack, coordinated with team members, and ensured timely delivery of a feature-rich platform.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Team Lead'],
        highlights: ['Team Leadership', 'End-to-End Delivery', 'Stakeholder Management'],
        gradient: 'from-emerald-500 via-green-500 to-teal-500',
        color: '#10b981',
        glow: 'rgba(16, 185, 129, 0.15)',
    },
];

const ExperienceCard = ({ exp, index, isActive, onClick }: {
    exp: typeof experiences[0];
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            className={`cursor-pointer group ${index === 0 ? 'md:col-span-2' : ''}`}
        >
            <motion.div
                className="relative h-full rounded-2xl overflow-hidden border transition-all duration-500"
                style={{
                    borderColor: isActive ? `${exp.color}44` : 'rgba(255,255,255,0.06)',
                    background: isActive
                        ? `linear-gradient(135deg, ${exp.glow}, rgba(255,255,255,0.02))`
                        : 'rgba(255, 255, 255, 0.02)',
                }}
                whileHover={{
                    borderColor: `${exp.color}66`,
                    boxShadow: `0 20px 40px ${exp.glow}`,
                }}
                layout
            >
                {/* Top accent bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${exp.gradient}`} />

                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center gap-1.5">
                                    <FiCalendar className="text-[10px]" />
                                    {exp.period}
                                </span>
                                <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center gap-1.5">
                                    <FiMapPin className="text-[10px]" />
                                    {exp.location}
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:gradient-text transition-all">
                                {exp.title}
                            </h3>
                            <p className="text-sm font-medium" style={{ color: exp.color }}>
                                {exp.company}
                            </p>
                        </div>
                        <motion.div
                            className="p-2 rounded-xl bg-white/5 border border-white/10"
                            whileHover={{ rotate: 90 }}
                            style={{ color: exp.color }}
                        >
                            <FiArrowRight className="text-lg" />
                        </motion.div>
                    </div>

                    {/* Description */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                    {exp.description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {exp.highlights.map((h, hi) => (
                            <motion.span
                                key={h}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + hi * 0.05 }}
                                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border"
                                style={{
                                    color: exp.color,
                                    backgroundColor: `${exp.color}10`,
                                    borderColor: `${exp.color}25`,
                                }}
                            >
                                <FiZap className="text-[9px]" />
                                {h}
                            </motion.span>
                        ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map((t) => (
                            <span
                                key={t}
                                className="px-2 py-0.5 text-[10px] font-mono text-gray-500 bg-white/[0.03] rounded border border-white/5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="experience" className="section-padding relative overflow-hidden">
            <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[120px]" />
            <div className="absolute top-1/4 right-0 w-60 h-60 bg-cyan-500/5 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <SectionHeading
                    title="Experience"
                    subtitle="My professional journey and key milestones"
                    icon={<FiBriefcase />}
                />

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12"
                >
                    {[
                        { label: 'Years Active', value: '4+', color: '#8b5cf6' },
                        { label: 'Projects Built', value: '28+', color: '#06b6d4' },
                        { label: 'Technologies', value: '16+', color: '#10b981' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                            whileHover={{ y: -4 }}
                        >
                            <motion.div
                                className="text-3xl font-heading font-bold mb-1"
                                style={{ color: stat.color }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 200, delay: i * 0.1 + 0.2 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {experiences.map((exp, i) => (
                        <ExperienceCard
                            key={i}
                            exp={exp}
                            index={i}
                            isActive={activeIndex === i}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
