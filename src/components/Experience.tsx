import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';

const experiences = [
    {
        title: 'Full-Stack Developer',
        company: 'Freelance & Personal Projects',
        period: '2022 — Present',
        location: 'India',
        description: 'Designed and shipped 28+ production projects end-to-end — architecture, backend, frontend, deployment. Clients and personal projects spanning social platforms, DeFi, healthcare, and AI tools.',
        tech: ['React', 'TypeScript', 'Python', 'Firebase', 'Vercel'],
        highlights: ['28+ Projects Shipped', 'Full-Stack Ownership', 'Production Deployments'],
        color: '#E8C547',
    },
    {
        title: 'Web Development Lead',
        company: 'CSESA — IIT Indore Student Association',
        period: '2024 — 2025',
        location: 'Indore, India',
        description: 'Led a team of 5 engineers to build and ship the official CS student association platform in 3 months — zero scope creep, zero deadline slips. Stack ownership, code review, and stakeholder coordination.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        highlights: ['Team of 5', 'Shipped in 3 Months', 'Stakeholder Management'],
        color: '#60A5FA',
    },
    {
        title: 'AI / ML Developer',
        company: 'Research & Innovation Projects',
        period: '2024 — Present',
        location: 'India',
        description: 'Building AI-native applications — a multi-agent courtroom simulation, NLP pipelines, and computer vision tooling. Working at the intersection of LLMs, agentic frameworks, and real-world problem domains.',
        tech: ['Python', 'LangChain', 'OpenCV', 'NLP', 'LLMs'],
        highlights: ['AI Courtroom System', 'NLP Pipelines', 'Computer Vision'],
        color: '#A78BFA',
    },
];

/* ── Vertical timeline with scroll-driven line ── */
const TimelineLine = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 80%', 'end 30%'],
    });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'var(--color-border)' }}>
            <motion.div
                className="absolute top-0 left-0 right-0 origin-top"
                style={{
                    scaleY,
                    background: 'linear-gradient(to bottom, var(--color-accent), transparent)',
                    height: '100%',
                }}
            />
        </div>
    );
};

/* ── Single experience entry ── */
const ExperienceEntry = ({
    exp,
    index,
    isActive,
    onClick,
}: {
    exp: typeof experiences[0];
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => (
    <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative pl-10 pb-12 cursor-pointer group"
        onClick={onClick}
    >
        {/* Timeline node */}
        <div
            className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-[5px] transition-all duration-300"
            style={{
                background: isActive ? exp.color : '#2A2A2A',
                boxShadow: isActive ? `0 0 12px ${exp.color}60` : 'none',
                border: `2px solid ${isActive ? exp.color : '#3A3A3A'}`,
            }}
        />

        {/* Horizontal connector */}
        <div
            className="absolute left-2.5 top-[9px] h-px w-6 transition-all duration-300"
            style={{ background: isActive ? exp.color : 'var(--color-border)' }}
        />

        {/* Card */}
        <div
            className="rounded-2xl p-6 md:p-8 transition-all duration-400"
            style={{
                background: isActive ? `${exp.color}08` : 'var(--color-surface)',
                border: `1px solid ${isActive ? exp.color + '30' : 'rgba(255,255,255,0.05)'}`,
            }}
        >
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded"
                            style={{
                                color: 'var(--color-text-2)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            {exp.period}
                        </span>
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded"
                            style={{
                                color: 'var(--color-text-2)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            {exp.location}
                        </span>
                    </div>
                    <h3
                        className="font-display font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-200"
                        style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}
                    >
                        {exp.title}
                    </h3>
                    <p className="font-mono text-sm" style={{ color: exp.color }}>
                        {exp.company}
                    </p>
                </div>

                {/* Toggle indicator */}
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm transition-all duration-300 shrink-0"
                    style={{
                        border: `1px solid ${isActive ? exp.color + '40' : 'var(--color-border)'}`,
                        color: isActive ? exp.color : 'var(--color-text-2)',
                        background: isActive ? `${exp.color}10` : 'transparent',
                    }}
                >
                    {isActive ? '−' : '+'}
                </div>
            </div>

            {/* Expandable description */}
            <motion.div
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
            >
                <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-2)' }}>
                    {exp.description}
                </p>
            </motion.div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
                {exp.highlights.map((h) => (
                    <span
                        key={h}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-lg"
                        style={{
                            color: exp.color,
                            background: `${exp.color}10`,
                            border: `1px solid ${exp.color}25`,
                        }}
                    >
                        {h}
                    </span>
                ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                    <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded"
                        style={{
                            color: 'var(--color-text-2)',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

/* ── Experience Section ── */
const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timelineRef = useRef<HTMLDivElement>(null);

    return (
        <section id="experience" className="section-padding relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <SectionHeading
                    index="04"
                    title="Experience"
                    subtitle="Where I've built and what I've shipped"
                />

                {/* Timeline container */}
                <div ref={timelineRef} className="relative">
                    <TimelineLine containerRef={timelineRef} />

                    {experiences.map((exp, i) => (
                        <ExperienceEntry
                            key={i}
                            exp={exp}
                            index={i}
                            isActive={activeIndex === i}
                            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
