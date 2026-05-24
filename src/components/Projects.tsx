import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

const projects = [
    {
        id: 0,
        title: 'CSESA Website',
        description: 'Official platform for the Computer Science & Engineering Student Association at IIT Indore. Full club management — events, team profiles, contributions, and a CMS-driven content layer.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
        github: 'https://github.com/CSESA-IITI/CSESA-Website',
        live: 'https://csesa-website-pi.vercel.app',
        featured: true,
        accent: '#E8C547',
        preview: ['Events Management', 'Contribution Tracking', 'Team Profiles', 'Responsive', 'CMS', 'Animations'],
    },
    {
        id: 1,
        title: 'Linkup',
        description: 'A real-time social media platform — posts, messaging, feeds, notifications, and profile management. Built with Django WebSockets and a clean React frontend.',
        tags: ['Python', 'Django', 'WebSockets', 'PostgreSQL'],
        github: 'https://github.com/abhishekmane1911/Linkup',
        live: undefined,
        featured: true,
        accent: '#60A5FA',
        preview: ['Real-time Chat', 'Feed', 'Notifications', 'Profiles', 'Social Graph'],
    },
    {
        id: 2,
        title: 'CredixSolana',
        description: 'Decentralized lending and borrowing on Solana — peer-to-peer with smart contracts, fast transactions, and a minimal Web3 interface.',
        tags: ['Solana', 'Rust', 'Web3', 'DeFi'],
        github: 'https://github.com/ninad00/CredixSolana',
        live: 'https://ninad00.github.io/CredixSolana/',
        featured: true,
        accent: '#A78BFA',
        preview: ['Smart Contracts', 'P2P Lending', 'Liquidity', 'DeFi'],
    },
    {
        id: 3,
        title: 'Secure Medical File Management',
        description: 'HIPAA-compliant medical record system with end-to-end encryption and granular access controls.',
        tags: ['Python', 'Security', 'Encryption', 'Django'],
        github: 'https://github.com/abhishekmane1911/Secure-Medical-File-Management-Project',
        featured: false,
        accent: '#34D399',
        preview: ['Encryption', 'HIPAA', 'Access Control'],
    },
    {
        id: 4,
        title: 'Ride Sharing Website',
        description: 'Connects travellers going the same way. Route optimization, ride matching, and a clean coordination interface.',
        tags: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/DaemonLab/Ride-Sharing-Website',
        featured: false,
        accent: '#FB923C',
        preview: ['Ride Matching', 'Route Optimization', 'Maps'],
    },
    {
        id: 5,
        title: 'AI CourtRoom Simulation',
        description: 'Multi-agent AI simulation of legal proceedings — judge, prosecutor, and defense agents powered by NLP and LLMs.',
        tags: ['Python', 'LangChain', 'NLP', 'AI Agents'],
        github: 'https://github.com/abhishekmane1911/AI_CourtRoom_Simulation',
        featured: false,
        accent: '#F472B6',
        preview: ['Multi-Agent', 'NLP', 'LLM', 'Legal Simulation'],
    },
];

/* ── 3D Tilt Card wrapper ── */
const TiltCard = ({
    children,
    className = '',
    style = {},
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
        const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        setTilt({ x, y });
    };

    return (
        <div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
            className={`${className} cursor-pointer`}
            style={{
                ...style,
                transform: hovered
                    ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)`
                    : 'perspective(800px) rotateX(0) rotateY(0) translateY(0)',
                transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
};

/* ── Featured (full-width) project card ── */
const FeaturedCard = ({
    project,
    number,
    onSelect,
}: {
    project: typeof projects[0];
    number: string;
    onSelect: () => void;
}) => {
    return (
        <TiltCard
            onClick={onSelect}
            className="relative rounded-2xl overflow-hidden group"
            style={{
                background: 'var(--color-surface)',
                border: `1px solid rgba(255,255,255,0.06)`,
            }}
        >
            {/* Left accent border */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                style={{ background: project.accent }}
            />

            <div className="p-8 md:p-10 pl-10 md:pl-12">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        {/* Watermark number */}
                        <div
                            className="font-display font-bold select-none absolute right-8 top-6 opacity-[0.04]"
                            style={{ fontSize: '7rem', color: project.accent, lineHeight: 1 }}
                        >
                            {number}
                        </div>

                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.25em] mb-3 block"
                            style={{ color: project.accent }}
                        >
                            Featured Project
                        </span>

                        <h3
                            className="font-display font-bold text-white mb-3"
                            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.03em' }}
                        >
                            {project.title}
                        </h3>

                        <p className="font-sans text-sm leading-relaxed max-w-xl" style={{ color: 'var(--color-text-2)' }}>
                            {project.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2 ml-6 shrink-0">
                        <MagneticButton
                            as="a"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg transition-all duration-200"
                            style={{ color: 'var(--color-text-2)', border: '1px solid var(--color-border)' }}
                            strength={0.4}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <FiGithub className="text-lg" />
                        </MagneticButton>
                        {project.live && (
                            <MagneticButton
                                as="a"
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg transition-all duration-200"
                                style={{ color: 'var(--color-text-2)', border: '1px solid var(--color-border)' }}
                                strength={0.4}
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            >
                                <FiExternalLink className="text-lg" />
                            </MagneticButton>
                        )}
                    </div>
                </div>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.preview.map((f) => (
                        <span
                            key={f}
                            className="font-mono text-[11px] px-3 py-1.5 rounded-lg"
                            style={{
                                color: project.accent,
                                background: `${project.accent}12`,
                                border: `1px solid ${project.accent}25`,
                            }}
                        >
                            {f}
                        </span>
                    ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-md"
                            style={{
                                color: 'var(--color-text-2)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </TiltCard>
    );
};

/* ── Small project card ── */
const SmallCard = ({
    project,
    number,
    onSelect,
}: {
    project: typeof projects[0];
    number: string;
    onSelect: () => void;
}) => (
    <TiltCard
        onClick={onSelect}
        className="relative rounded-xl overflow-hidden group h-full"
        style={{
            background: 'var(--color-surface)',
            border: '1px solid rgba(255,255,255,0.05)',
        }}
    >
        {/* Left accent */}
        <div
            className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-xl"
            style={{ background: project.accent, opacity: 0.7 }}
        />

        <div className="p-6 pl-8 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: project.accent }}
                >
                    {number}
                </span>
                <div className="flex gap-1.5">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-3)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-3)')}
                    >
                        <FiGithub />
                    </a>
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ color: 'var(--color-text-3)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-3)')}
                        >
                            <FiExternalLink />
                        </a>
                    )}
                </div>
            </div>

            <h3
                className="font-display font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-200"
                style={{ fontSize: '1.15rem', letterSpacing: '-0.02em' }}
            >
                {project.title}
            </h3>

            <p className="font-sans text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--color-text-2)' }}>
                {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded"
                        style={{
                            color: 'var(--color-text-2)',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </TiltCard>
);

/* ── Project modal — full-screen takeover ── */
const ProjectModal = ({
    project,
    onClose,
}: {
    project: typeof projects[0];
    onClose: () => void;
}) => (
    <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        {/* Backdrop */}
        <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
            {/* Top accent */}
            <div className="h-[3px]" style={{ background: project.accent }} />

            <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2 block"
                            style={{ color: project.accent }}
                        >
                            {project.featured ? 'Featured Project' : 'Project'}
                        </span>
                        <h2
                            className="font-display font-bold text-white"
                            style={{ fontSize: '1.8rem', letterSpacing: '-0.03em' }}
                        >
                            {project.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-2)', border: '1px solid var(--color-border)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-2)')}
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <p className="font-sans leading-relaxed mb-7" style={{ color: 'var(--color-text-2)' }}>
                    {project.description}
                </p>

                <div className="mb-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-text-3)' }}>
                        Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.preview.map((f) => (
                            <span
                                key={f}
                                className="font-mono text-xs px-3 py-1.5 rounded-lg"
                                style={{
                                    color: project.accent,
                                    background: `${project.accent}10`,
                                    border: `1px solid ${project.accent}25`,
                                }}
                            >
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-text-3)' }}>
                        Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-xs px-2.5 py-1 rounded-md"
                                style={{
                                    color: 'var(--color-text-2)',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid var(--color-border)',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <MagneticButton
                        as="a"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-sm transition-all"
                        style={{ background: 'var(--color-accent)', color: '#000000' }}
                    >
                        <FiGithub /> View Source
                    </MagneticButton>
                    {project.live && (
                        <MagneticButton
                            as="a"
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-medium text-sm border transition-all hover:bg-white/5"
                            style={{ color: '#FFFFFF', borderColor: 'var(--color-border-hover)' }}
                        >
                            <FiArrowUpRight /> Live Demo
                        </MagneticButton>
                    )}
                </div>
            </div>
        </motion.div>
    </motion.div>
);

/* ── Main Projects section ── */
const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);

    return (
        <section id="projects" className="section-padding relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    index="03"
                    title="Selected Work"
                    subtitle="Projects built from concept to deployment"
                />

                {/* ── Featured: full-width ── */}
                <motion.div
                    className="mb-5"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7 }}
                >
                    <FeaturedCard
                        project={featured[0]}
                        number="01"
                        onSelect={() => setSelectedProject(featured[0].id)}
                    />
                </motion.div>

                {/* ── 2 featured: 2-col ── */}
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                    {featured.slice(1).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <SmallCard
                                project={project}
                                number={`0${i + 2}`}
                                onSelect={() => setSelectedProject(project.id)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* ── Rest: 3-col ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                        >
                            <SmallCard
                                project={project}
                                number={`0${i + 4}`}
                                onSelect={() => setSelectedProject(project.id)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <MagneticButton
                        as="a"
                        href="https://github.com/abhishekmane1911"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans font-medium text-sm transition-colors duration-200"
                        style={{ color: 'var(--color-text-2)' }}
                    >
                        <FiGithub />
                        <span>View all projects on GitHub</span>
                        <FiArrowUpRight />
                    </MagneticButton>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject !== null && (
                    <ProjectModal
                        project={projects.find((p) => p.id === selectedProject)!}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
