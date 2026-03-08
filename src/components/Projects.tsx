import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiX } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

const projects = [
    {
        title: 'CSESA Website',
        description: 'Official website for the Computer Science and Engineering Student Association at IIT Indore. Built with modern web technologies featuring event management, team profiles, and dynamic content.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
        github: 'https://github.com/CSESA-IITI/CSESA-Website',
        live: 'https://csesa-website-pi.vercel.app',
        featured: true,
        accent: 'violet' as const,
        preview: 'Events Management · Contribution Management · Team Profiles · Responsive · CMS · Animations',
    },
    {
        title: 'Linkup',
        description: 'A modern social media platform where you can share your thoughts, connect with friends, and discover trending topics. Features real-time interactions and a sleek interface.',
        tags: ['Python', 'Django', 'WebSockets', 'PostgreSQL'],
        github: 'https://github.com/abhishekmane1911/Linkup',
        featured: true,
        accent: 'cyan' as const,
        preview: 'Social · Real-time · Messaging · Feed · Profile · Notifications',
    },
    {
        title: 'CredixSolana',
        description: 'A decentralized finance application built on the Solana blockchain, enabling peer-to-peer lending, borrowing, and liquidity provision with fast transactions and low fees.',
        tags: ['Solana', 'Rust', 'Web3', 'DeFi'],
        github: 'https://github.com/ninad00/CredixSolana',
        live: 'https://ninad00.github.io/CredixSolana/',
        featured: true,
        accent: 'magenta' as const,
        preview: 'Solana · Lending · Borrowing · Liquidity · Smart Contracts',
    },
    {
        title: 'Secure Medical File Management',
        description: 'A healthcare-focused secure file management system with encryption, access controls, and HIPAA-compliant data handling for medical records.',
        tags: ['Python', 'Security', 'Encryption', 'Django'],
        github: 'https://github.com/abhishekmane1911/Secure-Medical-File-Management-Project',
        featured: false,
        accent: 'violet' as const,
        preview: 'Encryption · HIPAA · Access Control · Secure Upload',
    },
    {
        title: 'Ride Sharing Website',
        description: 'A ride-sharing platform connecting travellers going the same way. Features ride matching, route optimization, and a clean user interface for seamless trip coordination.',
        tags: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/DaemonLab/Ride-Sharing-Website',
        featured: false,
        accent: 'cyan' as const,
        preview: 'Ride Matching · Routes · Maps · Coordination',
    },
    {
        title: 'AI CourtRoom Simulation',
        description: 'An AI-powered courtroom simulation that models legal proceedings with intelligent agents representing different roles — judge, prosecution, and defense.',
        tags: ['Python', 'AI/ML', 'NLP', 'LangChain'],
        github: 'https://github.com/abhishekmane1911/AI_CourtRoom_Simulation',
        featured: false,
        accent: 'magenta' as const,
        preview: 'AI Agents · NLP · Legal · Multi-Agent · Simulation · LLMs',
    },
];

const accentColors = {
    violet: {
        gradient: 'from-violet-500/20 to-violet-600/5',
        border: 'hover:border-violet-500/30',
        tag: 'bg-violet-500/10 text-violet-400',
        dot: 'bg-violet-500',
        color: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.15)',
    },
    cyan: {
        gradient: 'from-cyan-500/20 to-cyan-600/5',
        border: 'hover:border-cyan-500/30',
        tag: 'bg-cyan-500/10 text-cyan-400',
        dot: 'bg-cyan-500',
        color: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.15)',
    },
    magenta: {
        gradient: 'from-magenta-500/20 to-magenta-400/5',
        border: 'hover:border-magenta-500/30',
        tag: 'bg-magenta-500/10 text-magenta-400',
        dot: 'bg-magenta-500',
        color: '#ec4899',
        glow: 'rgba(236, 72, 153, 0.15)',
    },
};

const ProjectCard = ({ project, index, onSelect }: {
    project: typeof projects[0];
    index: number;
    onSelect: () => void;
}) => {
    const colors = accentColors[project.accent];
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelect}
            className={`relative glass rounded-2xl overflow-hidden group border border-white/5 ${colors.border} transition-all duration-500 cursor-pointer`}
        >
            {/* Mouse-following spotlight */}
            {isHovered && (
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                    style={{
                        background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, ${colors.glow}, transparent 70%)`,
                    }}
                />
            )}

            {/* Top Gradient Bar */}
            <div className={`h-1 bg-gradient-to-r ${colors.gradient} relative z-10`} />

            <div className="p-6 relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <FiFolder className="text-xl text-gray-500 group-hover:text-violet-400 transition-colors" />
                        {project.featured && (
                            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-gray-300 border border-white/10">
                                Featured
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <MagneticButton
                            as="a"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                            strength={0.4}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FiGithub className="text-lg" />
                        </MagneticButton>
                        {project.live && (
                            <MagneticButton
                                as="a"
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                                strength={0.4}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FiExternalLink className="text-lg" />
                            </MagneticButton>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:gradient-text-static transition-all">
                    {project.title}
                </h3>

                {/* Description / Hover Preview */}
                <div className="relative min-h-[60px] mb-5">
                    <motion.p
                        className="text-gray-400 text-sm leading-relaxed"
                        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {project.description}
                    </motion.p>
                    <motion.div
                        className="absolute inset-0 flex flex-wrap gap-2 items-start content-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
                    >
                        {project.preview.split(' · ').map((item, i) => (
                            <motion.span
                                key={item}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ delay: i * 0.05 + 0.1 }}
                                className="px-2.5 py-1 text-xs font-medium rounded-lg border"
                                style={{
                                    color: colors.color,
                                    backgroundColor: `${colors.color}15`,
                                    borderColor: `${colors.color}30`,
                                }}
                            >
                                {item}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`px-2.5 py-1 text-xs rounded-md font-mono ${colors.tag}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ── Expanded project modal ── */
const ProjectModal = ({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
    const colors = accentColors[project.accent];
    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10"
                style={{ background: '#0a0a1a' }}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                {/* Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />

                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-white mb-1">
                                {project.title}
                            </h2>
                            <div className="flex gap-2">
                                {project.featured && (
                                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-gray-300 border border-white/10">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <FiX className="text-xl" />
                        </button>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {/* Features preview */}
                    <div className="mb-6">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">Key Features</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.preview.split(' · ').map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1.5 text-sm font-medium rounded-xl border"
                                    style={{
                                        color: colors.color,
                                        backgroundColor: `${colors.color}10`,
                                        borderColor: `${colors.color}25`,
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className={`px-3 py-1.5 text-sm rounded-xl font-mono ${colors.tag}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                        <MagneticButton
                            as="a"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-all"
                        >
                            <FiGithub /> View Source
                        </MagneticButton>
                        {project.live && (
                            <MagneticButton
                                as="a"
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all"
                            >
                                <FiExternalLink /> Live Demo
                            </MagneticButton>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    return (
        <section id="projects" className="section-padding relative">
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-magenta-500/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="Featured Projects"
                    subtitle="A curated selection of my recent work and creative experiments"
                    icon={<FiFolder />}
                />

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            onSelect={() => setSelectedProject(i)}
                        />
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <MagneticButton
                        as="a"
                        href="https://github.com/abhishekmane1911"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-sm text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/25 transition-all duration-300 font-medium"
                    >
                        <FiGithub /> View All Projects on GitHub
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject !== null && (
                    <ProjectModal
                        project={projects[selectedProject]}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
