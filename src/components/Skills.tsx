import { useState, useRef, useEffect, useCallback } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import {
    SiReact, SiTypescript, SiPython, SiTailwindcss,
    SiNodedotjs, SiGit, SiDocker, SiMongodb,
    SiPostgresql, SiFirebase, SiNextdotjs, SiFigma,
    SiJavascript, SiHtml5, SiCss3, SiThreedotjs,
} from 'react-icons/si';
import SectionHeading from './SectionHeading';
import { useIsMobile } from '../hooks/useIsMobile';

interface Skill {
    name: string;
    icon: ReactElement;
    color: string;
}

/* ── Skill data split into two rows ── */
const row1: Skill[] = [
    { name: 'React',      icon: <SiReact />,      color: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />,  color: '#3178C6' },
    { name: 'JavaScript', icon: <SiJavascript />,  color: '#F7DF1E' },
    { name: 'Next.js',    icon: <SiNextdotjs />,   color: '#ffffff' },
    { name: 'Tailwind',   icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'Three.js',   icon: <SiThreedotjs />,  color: '#ffffff' },
    { name: 'HTML5',      icon: <SiHtml5 />,       color: '#E34F26' },
    { name: 'CSS3',       icon: <SiCss3 />,        color: '#1572B6' },
];

const row2: Skill[] = [
    { name: 'Python',     icon: <SiPython />,      color: '#3776AB' },
    { name: 'Node.js',    icon: <SiNodedotjs />,   color: '#339933' },
    { name: 'MongoDB',    icon: <SiMongodb />,     color: '#47A248' },
    { name: 'PostgreSQL', icon: <SiPostgresql />,  color: '#4169E1' },
    { name: 'Firebase',   icon: <SiFirebase />,    color: '#FFCA28' },
    { name: 'Git',        icon: <SiGit />,         color: '#F05032' },
    { name: 'Docker',     icon: <SiDocker />,      color: '#2496ED' },
    { name: 'Figma',      icon: <SiFigma />,       color: '#F24E1E' },
];

/* ── Single skill pill ── */
const SkillPill = ({ skill }: { skill: Skill }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-full cursor-default select-none shrink-0"
            style={{
                border: `1px solid ${hovered ? skill.color + '55' : 'rgba(255,255,255,0.07)'}`,
                background: hovered ? `${skill.color}0D` : 'rgba(255,255,255,0.025)',
                transition: 'all 0.25s ease',
                boxShadow: hovered ? `0 0 20px ${skill.color}20` : 'none',
            }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
        >
            <span
                className="text-xl"
                style={{ color: hovered ? skill.color : 'rgba(200,200,200,0.5)', transition: 'color 0.25s' }}
            >
                {skill.icon}
            </span>
            <span
                className="font-mono text-sm font-medium whitespace-nowrap"
                style={{ color: hovered ? '#FFFFFF' : 'var(--color-text-2)', transition: 'color 0.25s' }}
            >
                {skill.name}
            </span>
        </motion.div>
    );
};

/* ── Marquee row ── */
const MarqueeRow = ({
    skills,
    direction = 'forward',
}: {
    skills: Skill[];
    direction?: 'forward' | 'reverse';
}) => {
    // Triple for seamless loop
    const tripled = [...skills, ...skills, ...skills];

    return (
        <div
            className="marquee-wrapper overflow-hidden py-2"
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
        >
            <div
                className={`marquee-track ${direction === 'forward' ? 'marquee-track--forward' : 'marquee-track--reverse'}`}
                style={{ display: 'flex' }}
            >
                {tripled.map((skill, i) => (
                    <SkillPill key={`${skill.name}-${i}`} skill={skill} />
                ))}
            </div>
        </div>
    );
};

/* ── Amber portal canvas ── */
const PortalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    const particlesRef = useRef<{
        x: number; y: number; angle: number; radius: number;
        speed: number; size: number; opacity: number; trail: number;
    }[]>([]);

    const initParticles = useCallback((w: number, h: number) => {
        const cx = w / 2, cy = h * 0.60;
        const particles = [];
        for (let i = 0; i < 90; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * Math.max(w, h) * 0.4;
            particles.push({
                x: cx + Math.cos(angle) * radius,
                y: cy + Math.sin(angle) * radius * 0.6,
                angle, radius,
                speed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1),
                size: Math.random() * 1.5 + 0.4,
                opacity: Math.random() * 0.5 + 0.15,
                trail: Math.random() * 18 + 4,
            });
        }
        particlesRef.current = particles;
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
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;

            ctx.clearRect(0, 0, w, h);
            time += 0.016;

            const cx = w / 2;
            const cy = h * 0.55;

            // Amber outer halo
            const pulse = Math.sin(time * 0.7) * 0.12 + 0.88;
            const orbRadius = Math.min(w, h) * 0.10 * pulse;

            const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius * 5);
            halo.addColorStop(0, 'rgba(232, 197, 71, 0.08)');
            halo.addColorStop(0.4, 'rgba(232, 197, 71, 0.03)');
            halo.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(cx, cy, orbRadius * 5, 0, Math.PI * 2);
            ctx.fillStyle = halo;
            ctx.fill();

            // Inner amber orb
            const orbGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRadius);
            orbGrad.addColorStop(0, `rgba(255, 225, 120, ${0.6 * pulse})`);
            orbGrad.addColorStop(0.4, `rgba(232, 197, 71, ${0.35 * pulse})`);
            orbGrad.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(cx, cy, orbRadius, 0, Math.PI * 2);
            ctx.fillStyle = orbGrad;
            ctx.fill();

            // Swirling rings
            for (let ring = 0; ring < 3; ring++) {
                const ringRadius = orbRadius * (1.5 + ring * 0.9);
                const ringOpacity = 0.05 - ring * 0.01;
                const rotation = time * (0.25 - ring * 0.04) * (ring % 2 === 0 ? 1 : -1);

                ctx.beginPath();
                ctx.ellipse(cx, cy, ringRadius, ringRadius * 0.3, rotation, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(232, 197, 71, ${ringOpacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Particles
            for (const p of particlesRef.current) {
                p.angle += p.speed;
                const px = cx + Math.cos(p.angle) * p.radius;
                const py = cy + Math.sin(p.angle) * p.radius * 0.4;
                const trailX = cx + Math.cos(p.angle - p.speed * p.trail) * p.radius;
                const trailY = cy + Math.sin(p.angle - p.speed * p.trail) * p.radius * 0.4;

                const grad = ctx.createLinearGradient(trailX, trailY, px, py);
                grad.addColorStop(0, 'transparent');
                grad.addColorStop(1, `rgba(232, 197, 71, ${p.opacity * 0.5})`);

                ctx.beginPath();
                ctx.moveTo(trailX, trailY);
                ctx.lineTo(px, py);
                ctx.strokeStyle = grad;
                ctx.lineWidth = p.size * 0.7;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(px, py, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 220, 100, ${p.opacity})`;
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

/* ── Skills Section ── */
const Skills = () => {
    const isMobile = useIsMobile();

    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {!isMobile && <PortalBackground />}

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    index="02"
                    title="Tech Stack"
                    subtitle="Tools I use to build things that matter"
                />
            </div>

            {/* ── Full-bleed marquee rows ── */}
            <motion.div
                className="mt-4 space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <MarqueeRow skills={row1} direction="forward" />
                <MarqueeRow skills={row2} direction="reverse" />
            </motion.div>
        </section>
    );
};

export default Skills;
