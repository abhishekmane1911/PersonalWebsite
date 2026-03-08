import { useState } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLayers } from 'react-icons/fi';
import {
    SiReact, SiTypescript, SiPython, SiTailwindcss,
    SiNodedotjs, SiGit, SiDocker, SiMongodb,
    SiPostgresql, SiFirebase, SiNextdotjs, SiFigma,
    SiJavascript, SiHtml5, SiCss3, SiThreedotjs,
} from 'react-icons/si';
import SectionHeading from './SectionHeading';

interface Skill {
    name: string;
    icon: ReactElement;
    level: number;
    color: string;
    glow: string;
}

const allSkills: Skill[] = [
    { name: 'React', icon: <SiReact />, level: 90, color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.3)' },
    { name: 'TypeScript', icon: <SiTypescript />, level: 85, color: '#3178C6', glow: 'rgba(49, 120, 198, 0.3)' },
    { name: 'JavaScript', icon: <SiJavascript />, level: 90, color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.3)' },
    { name: 'Python', icon: <SiPython />, level: 85, color: '#3776AB', glow: 'rgba(55, 118, 171, 0.3)' },
    { name: 'Next.js', icon: <SiNextdotjs />, level: 80, color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'Node.js', icon: <SiNodedotjs />, level: 80, color: '#339933', glow: 'rgba(51, 153, 51, 0.3)' },
    { name: 'Tailwind', icon: <SiTailwindcss />, level: 90, color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.3)' },
    { name: 'Three.js', icon: <SiThreedotjs />, level: 70, color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'MongoDB', icon: <SiMongodb />, level: 75, color: '#47A248', glow: 'rgba(71, 162, 72, 0.3)' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, level: 75, color: '#4169E1', glow: 'rgba(65, 105, 225, 0.3)' },
    { name: 'Firebase', icon: <SiFirebase />, level: 80, color: '#FFCA28', glow: 'rgba(255, 202, 40, 0.3)' },
    { name: 'Git', icon: <SiGit />, level: 85, color: '#F05032', glow: 'rgba(240, 80, 50, 0.3)' },
    { name: 'Docker', icon: <SiDocker />, level: 70, color: '#2496ED', glow: 'rgba(36, 150, 237, 0.3)' },
    { name: 'HTML5', icon: <SiHtml5 />, level: 95, color: '#E34F26', glow: 'rgba(227, 79, 38, 0.3)' },
    { name: 'CSS3', icon: <SiCss3 />, level: 90, color: '#1572B6', glow: 'rgba(21, 114, 182, 0.3)' },
    { name: 'Figma', icon: <SiFigma />, level: 80, color: '#F24E1E', glow: 'rgba(242, 78, 30, 0.3)' },
];

const categories = ['All', 'Frontend', 'Backend', 'Tools'];
const categoryMap: Record<string, string[]> = {
    Frontend: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind', 'Three.js', 'HTML5', 'CSS3'],
    Backend: ['Python', 'Node.js', 'MongoDB', 'PostgreSQL', 'Firebase'],
    Tools: ['Git', 'Docker', 'Figma'],
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group cursor-pointer"
        >
            <motion.div
                className="relative rounded-2xl p-5 border border-white/[0.06] overflow-hidden"
                style={{
                    background: isHovered
                        ? `linear-gradient(135deg, ${skill.glow}, rgba(255,255,255,0.03))`
                        : 'rgba(255, 255, 255, 0.02)',
                }}
                whileHover={{
                    y: -8,
                    boxShadow: `0 20px 40px ${skill.glow}, 0 0 60px ${skill.glow}`,
                    borderColor: `${skill.color}33`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Animated background glow */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${skill.glow} 0%, transparent 70%)`,
                    }}
                />

                {/* Icon */}
                <motion.div
                    className="relative z-10 text-3xl mb-3 transition-colors duration-300"
                    style={{ color: isHovered ? skill.color : '#9ca3af' }}
                    animate={isHovered ? { rotate: [0, -10, 10, -5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {skill.icon}
                </motion.div>

                {/* Name */}
                <p className="relative z-10 text-sm font-semibold text-white mb-3">
                    {skill.name}
                </p>

                {/* Circular progress */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                            <circle
                                cx="18" cy="18" r="14"
                                fill="none"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="3"
                            />
                            <motion.circle
                                cx="18" cy="18" r="14"
                                fill="none"
                                stroke={skill.color}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 14}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                                whileInView={{
                                    strokeDashoffset: 2 * Math.PI * 14 * (1 - skill.level / 100)
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: index * 0.05, ease: 'easeOut' }}
                                style={{ filter: `drop-shadow(0 0 6px ${skill.glow})` }}
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                            {skill.level}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: skill.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: index * 0.05 + 0.3 }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredSkills = activeCategory === 'All'
        ? allSkills
        : allSkills.filter(s => categoryMap[activeCategory]?.includes(s.name));

    return (
        <section id="skills" className="section-padding relative">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="Skills & Technologies"
                    subtitle="The tools and technologies I use to bring ideas to life"
                    icon={<FiLayers />}
                />

                {/* Category Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl liquid-glass">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${activeCategory === cat ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="skillTab"
                                        className="absolute inset-0 rounded-xl"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(6, 182, 212, 0.2))',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Skills Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, i) => (
                            <SkillCard key={skill.name} skill={skill} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Floating decorative gradient */}
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-full blur-[100px] animate-glow-pulse" />
            </div>
        </section>
    );
};

export default Skills;
