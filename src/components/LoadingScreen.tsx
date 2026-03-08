import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Animated rolling digit ── */
const RollingDigit = ({ digit, delay }: { digit: string; delay: number }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const isNumber = !isNaN(Number(digit));

    if (!isNumber) {
        return (
            <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {digit}
            </motion.span>
        );
    }

    return (
        <span className="relative inline-block w-[1ch] h-[1.1em] overflow-hidden align-bottom">
            <motion.span
                className="absolute inset-0 flex flex-col items-center"
                initial={{ y: '-900%' }}
                animate={{ y: isVisible ? '0%' : '-900%' }}
                transition={{
                    duration: 1.2,
                    delay: 0,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {/* Roll through 0-9 then land on the target digit */}
                {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className="block h-[1.1em] leading-[1.1em]">
                        {(Number(digit) + 10 - i) % 10}
                    </span>
                ))}
            </motion.span>
        </span>
    );
};

/* ── Counter row (e.g. "2024") ── */
const CounterRow = ({ text, delay, size = 'text-6xl' }: {
    text: string;
    delay: number;
    size?: string;
}) => (
    <div className={`${size} font-mono font-bold tracking-tighter flex justify-center`}>
        {text.split('').map((char, i) => (
            <RollingDigit key={`${char}-${i}`} digit={char} delay={delay + i * 80} />
        ))}
    </div>
);

/* ── Animated scanning line ── */
const ScanLine = () => (
    <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
        style={{
            background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), transparent)',
        }}
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
        }}
    />
);

/* ── Grid lines background ── */
const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
            }}
        />
    </div>
);

/* ── Main loading screen ── */
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<'numbers' | 'exit' | 'done'>('numbers');
    const [progress, setProgress] = useState(0);

    const dataPoints = useMemo(() => [
        { label: 'INIT', value: '00:01' },
        { label: 'LOAD', value: '24.8K' },
        { label: 'STAT', value: 'OK' },
    ], []);

    useEffect(() => {
        // Progress counter
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 8 + 2;
            });
        }, 80);

        // Exit phase
        const exitTimer = setTimeout(() => setPhase('exit'), 2400);
        // Done
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
                    style={{ backgroundColor: '#030014' }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <GridBackground />
                    <ScanLine />

                    {/* Corner data readouts */}
                    <motion.div
                        className="absolute top-6 left-6 font-mono text-[10px] text-white/20 space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {dataPoints.map((dp, i) => (
                            <div key={dp.label} className="flex gap-3">
                                <span className="text-violet-400/40">{dp.label}</span>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.2 }}
                                >
                                    {dp.value}
                                </motion.span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="absolute top-6 right-6 font-mono text-[10px] text-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="text-violet-400/40">&lt;</span>
                        portfolio.v2
                        <span className="text-violet-400/40"> /&gt;</span>
                    </motion.div>

                    {/* Main content */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center gap-8"
                        animate={phase === 'exit' ? {
                            scale: 0.95,
                            opacity: 0,
                            filter: 'blur(12px)',
                        } : {}}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Year-style rolling numbers */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.div
                                className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Initializing
                            </motion.div>

                            <div className="text-white">
                                <CounterRow text="2026" delay={200} size="text-7xl md:text-9xl" />
                            </div>

                            <motion.div
                                className="text-xl md:text-2xl font-mono font-light tracking-[0.5em] text-white/30 uppercase"
                                initial={{ opacity: 0, letterSpacing: '1em' }}
                                animate={{ opacity: 1, letterSpacing: '0.5em' }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            >
                                Abhishek
                            </motion.div>
                        </div>

                        {/* Progress bar */}
                        <div className="flex flex-col items-center gap-3 w-64">
                            <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full"
                                    style={{
                                        background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                                    }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            <div className="flex justify-between w-full font-mono text-[10px] text-white/20">
                                <span>SYS.READY</span>
                                <span className="tabular-nums text-white/40">
                                    {Math.min(Math.round(progress), 100)}%
                                </span>
                            </div>
                        </div>

                        {/* Blinking cursor */}
                        <motion.div
                            className="flex items-center gap-1 font-mono text-xs text-white/15"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <motion.span
                                className="w-2 h-4 bg-violet-400/50"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                            <span>loading modules...</span>
                        </motion.div>
                    </motion.div>

                    {/* Bottom status */}
                    <motion.div
                        className="absolute bottom-6 left-0 right-0 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center gap-6 font-mono text-[10px] text-white/15">
                            <div className="flex items-center gap-1.5">
                                <motion.span
                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span>ONLINE</span>
                            </div>
                            <span>·</span>
                            <span>v2.0.26</span>
                            <span>·</span>
                            <span>2709 MODULES</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
