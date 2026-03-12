import { useState, useEffect, useRef, useCallback } from 'react';
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
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Types ───────────────────────────────────────────────
interface Skill {
    name: string;
    icon: ReactElement;
    color: string;
    glow: string;
}

// ─── Data ────────────────────────────────────────────────
const allSkills: Skill[] = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.3)' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', glow: 'rgba(49, 120, 198, 0.3)' },
    { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.3)' },
    { name: 'Python', icon: <SiPython />, color: '#3776AB', glow: 'rgba(55, 118, 171, 0.3)' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', glow: 'rgba(51, 153, 51, 0.3)' },
    { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.3)' },
    { name: 'Three.js', icon: <SiThreedotjs />, color: '#ffffff', glow: 'rgba(255, 255, 255, 0.2)' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', glow: 'rgba(71, 162, 72, 0.3)' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1', glow: 'rgba(65, 105, 225, 0.3)' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28', glow: 'rgba(255, 202, 40, 0.3)' },
    { name: 'Git', icon: <SiGit />, color: '#F05032', glow: 'rgba(240, 80, 50, 0.3)' },
    { name: 'Docker', icon: <SiDocker />, color: '#2496ED', glow: 'rgba(36, 150, 237, 0.3)' },
    { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26', glow: 'rgba(227, 79, 38, 0.3)' },
    { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6', glow: 'rgba(21, 114, 182, 0.3)' },
    { name: 'Figma', icon: <SiFigma />, color: '#F24E1E', glow: 'rgba(242, 78, 30, 0.3)' },
];

const categories = ['All', 'Frontend', 'Backend', 'Tools'];
const categoryMap: Record<string, string[]> = {
    Frontend: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind', 'Three.js', 'HTML5', 'CSS3'],
    Backend: ['Python', 'Node.js', 'MongoDB', 'PostgreSQL', 'Firebase'],
    Tools: ['Git', 'Docker', 'Figma'],
};

// ─── Arrange skills into pyramid rows ────────────────────
function buildPyramidRows(skills: Skill[]): Skill[][] {
    const rows: Skill[][] = [];
    const total = skills.length;
    // Start with a large top row, each subsequent row has one fewer item
    // Target: rows like [6, 5, 4, 1] for 16 items, or adapt dynamically
    let remaining = total;
    let rowSize = Math.min(6, total); // max 6 per row at top

    while (remaining > 0) {
        const count = Math.min(rowSize, remaining);
        rows.push(skills.slice(total - remaining, total - remaining + count));
        remaining -= count;
        rowSize = Math.max(1, rowSize - 1);
    }

    return rows;
}

// ─── Portal Background Canvas ───────────────────────────
const PortalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    const particlesRef = useRef<{
        x: number; y: number; angle: number; radius: number;
        speed: number; size: number; opacity: number; trail: number;
    }[]>([]);

    const streaksRef = useRef<{
        x: number; y: number; length: number; angle: number;
        speed: number; opacity: number; width: number;
    }[]>([]);

    const initParticles = useCallback((w: number, h: number) => {
        const cx = w / 2, cy = h * 0.60;

        // Swirling vortex particles orbiting the portal center
        const particles = [];
        for (let i = 0; i < 120; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * Math.max(w, h) * 0.45;
            particles.push({
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * radius * 0.6, // elliptical
                angle,
                radius,
                speed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                trail: Math.random() * 20 + 5,
            });
        }
        particlesRef.current = particles;

        // Diagonal light streaks
        const streaks = [];
        for (let i = 0; i < 6; i++) {
            streaks.push({
                x: Math.random() * w,
                y: Math.random() * h,
                length: 100 + Math.random() * 300,
                angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.5, // roughly diagonal
                speed: 0.3 + Math.random() * 0.7,
                opacity: 0.02 + Math.random() * 0.06,
                width: 1 + Math.random() * 2,
            });
        }
        streaksRef.current = streaks;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = parent.offsetWidth * dpr;
            canvas.height = parent.offsetHeight * dpr;
            canvas.style.width = parent.offsetWidth + 'px';
            canvas.style.height = parent.offsetHeight + 'px';
            ctx.scale(dpr, dpr);
            initParticles(parent.offsetWidth, parent.offsetHeight);
        };

        resize();
        window.addEventListener('resize', resize);

        let time = 0;

        const draw = () => {
            if (!ctx || !canvas) return;
            const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
            const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

            ctx.clearRect(0, 0, w, h);
            time += 0.016;

            const cx = w / 2;
            const cy = h * 0.55;

            // ── Large portal glow (pulsating orb) ──
            const pulse = Math.sin(time * 0.8) * 0.15 + 0.85;
            const orbRadius = Math.min(w, h) * 0.12 * pulse;

            // Outer halo
            const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 4);
            halo.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
            halo.addColorStop(0.3, 'rgba(139, 92, 246, 0.06)');
            halo.addColorStop(0.6, 'rgba(99, 102, 241, 0.03)');
            halo.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(cx, cy, orbRadius * 4, 0, Math.PI * 2);
            ctx.fillStyle = halo;
            ctx.fill();

            // Inner bright orb
            const orbGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius);
            orbGrad.addColorStop(0, `rgba(220, 200, 255, ${0.7 * pulse})`);
            orbGrad.addColorStop(0.3, `rgba(168, 85, 247, ${0.5 * pulse})`);
            orbGrad.addColorStop(0.7, `rgba(139, 92, 246, ${0.2 * pulse})`);
            orbGrad.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(cx, cy, orbRadius, 0, Math.PI * 2);
            ctx.fillStyle = orbGrad;
            ctx.fill();

            // ── Swirling vortex rings ──
            ctx.save();
            for (let ring = 0; ring < 4; ring++) {
                const ringRadius = orbRadius * (1.5 + ring * 0.8);
                const ringOpacity = 0.06 - ring * 0.012;
                const rotation = time * (0.3 - ring * 0.05) * (ring % 2 === 0 ? 1 : -1);

                ctx.beginPath();
                ctx.ellipse(cx, cy, ringRadius, ringRadius * 0.35, rotation, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(168, 130, 255, ${ringOpacity})`;
                ctx.lineWidth = 1.5 - ring * 0.2;
                ctx.stroke();
            }
            ctx.restore();

            // ── Swirling particles ──
            for (const p of particlesRef.current) {
                p.angle += p.speed;

                const px = cx + Math.cos(p.angle) * p.radius;
                const py = cy + Math.sin(p.angle) * p.radius * 0.4;

                // Trail
                const trailX = cx + Math.cos(p.angle - p.speed * p.trail) * p.radius;
                const trailY = cy + Math.sin(p.angle - p.speed * p.trail) * p.radius * 0.4;

                const gradient = ctx.createLinearGradient(trailX, trailY, px, py);
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(1, `rgba(200, 180, 255, ${p.opacity * 0.6})`);

                ctx.beginPath();
                ctx.moveTo(trailX, trailY);
                ctx.lineTo(px, py);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = p.size * 0.8;
                ctx.stroke();

                // Particle dot
                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 200, 255, ${p.opacity})`;
                ctx.fill();
            }

            // ── Diagonal light streaks ──
            for (const s of streaksRef.current) {
                s.x -= s.speed * Math.cos(Math.abs(s.angle));
                s.y += s.speed * Math.sin(Math.abs(s.angle));

                // Wrap around
                if (s.x < -s.length) { s.x = w + s.length; s.y = Math.random() * h * 0.5; }
                if (s.y > h + s.length) { s.y = -s.length; s.x = Math.random() * w; }

                const endX = s.x + Math.cos(s.angle) * s.length;
                const endY = s.y + Math.sin(s.angle) * s.length;

                const grad = ctx.createLinearGradient(s.x, s.y, endX, endY);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(0.5, `rgba(180, 160, 255, ${s.opacity})`);
                grad.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = s.width;
                ctx.stroke();
            }

            // ── Scattered tiny stars ──
            for (let i = 0; i < 60; i++) {
                const sx = ((i * 137.508) % w);
                const sy = ((i * 97.31 + 50) % h);
                const flicker = Math.sin(time * 2 + i * 1.7) * 0.3 + 0.4;
                ctx.beginPath();
                ctx.arc(sx, sy, 0.7, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flicker * 0.5})`;
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(draw);
        };

        animFrameRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

// ─── Skill Card ─────────────────────────────────────────
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group cursor-pointer"
        >
            <motion.div
                className="relative flex flex-col items-center justify-center rounded-xl p-2 sm:p-3 md:p-4 border border-white/[0.08] overflow-hidden w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] md:w-[88px] md:h-[88px]"
                style={{
                    background: isHovered
                        ? `linear-gradient(135deg, ${skill.glow}, rgba(255,255,255,0.05))`
                        : 'rgba(255, 255, 255, 0.03)',
                }}
                whileHover={{
                    y: -4,
                    scale: 1.08,
                    boxShadow: `0 12px 30px ${skill.glow}, 0 0 40px ${skill.glow}`,
                    borderColor: `${skill.color}44`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Background glow on hover */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${skill.glow} 0%, transparent 70%)`,
                    }}
                />

                {/* Icon */}
                <motion.div
                    className="relative z-10 text-xl sm:text-2xl md:text-3xl mb-1 transition-colors duration-300"
                    style={{ color: isHovered ? skill.color : 'rgba(180, 170, 200, 0.7)' }}
                    animate={isHovered ? { rotate: [0, -8, 8, -4, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {skill.icon}
                </motion.div>

                {/* Name */}
                <p className="relative z-10 text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300 text-center leading-tight truncate w-full">
                    {skill.name}
                </p>
            </motion.div>
        </motion.div>
    );
};

// ─── Skills Section ─────────────────────────────────────
const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const isMobile = useIsMobile();

    const filteredSkills = activeCategory === 'All'
        ? allSkills
        : allSkills.filter(s => categoryMap[activeCategory]?.includes(s.name));

    const pyramidRows = buildPyramidRows(filteredSkills);

    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {/* Portal animated background — skip on mobile for performance */}
            {!isMobile && <PortalBackground />}

            {/* Static gradient blurs for additional depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/[0.06] rounded-full blur-[180px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/[0.05] rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="Tech Stack"
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

                {/* Pyramid / Triangular Skills Grid */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
                    <AnimatePresence mode="popLayout">
                        {pyramidRows.map((row, rowIdx) => (
                            <motion.div
                                key={`row-${rowIdx}-${row.map(s => s.name).join(',')}`}
                                layout
                                className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, delay: rowIdx * 0.08 }}
                            >
                                {row.map((skill, i) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        index={rowIdx * 6 + i}
                                    />
                                ))}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;
