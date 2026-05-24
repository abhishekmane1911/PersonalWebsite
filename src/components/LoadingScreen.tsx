import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Google Fonts ── */
const FontLoader = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400&display=swap');
    `}</style>
);

/* ── Characters used during scramble ── */
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?><[]{}~';
const rand = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];

/* ── Status messages that cycle during load ── */
const STATUS = [
    'INITIALIZING_RUNTIME',
    'MOUNTING_COMPONENTS',
    'LOADING_ASSETS',
    'RESOLVING_MODULES',
    'COMPILING_SHADERS',
    'SYSTEM_READY',
];

/* ──────────────────────────────────────────
   ScrambleChar
   A single character that starts as random
   flicker, then snaps to target with a brief
   RGB chromatic-aberration split.
   ────────────────────────────────────────── */
const ScrambleChar = ({
    target,
    startDelay,      // ms before scrambling begins
    scrambleDuration, // ms of flickering before lock
}: {
    target: string;
    startDelay: number;
    scrambleDuration: number;
}) => {
    const [current, setCurrent] = useState('\u00A0'); // non-breaking space placeholder
    const [phase, setPhase] = useState<'idle' | 'scrambling' | 'chromatic' | 'settled'>('idle');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (target === ' ') {
            setPhase('settled');
            setCurrent(' ');
            return;
        }

        const startScramble = setTimeout(() => {
            setPhase('scrambling');
            intervalRef.current = setInterval(() => setCurrent(rand()), 55);

            const lockIn = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrent(target);
                setPhase('chromatic');

                const settle = setTimeout(() => setPhase('settled'), 220);
                return () => clearTimeout(settle);
            }, scrambleDuration);

            return () => clearTimeout(lockIn);
        }, startDelay);

        return () => {
            clearTimeout(startScramble);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (target === ' ') {
        return <span style={{ display: 'inline-block', width: '0.25em' }} />;
    }

    const isChromatic = phase === 'chromatic';

    return (
        <span
            style={{
                display: 'inline-block',
                position: 'relative',
            }}
        >
            {/* Red left ghost */}
            <span
                aria-hidden
                style={{
                    position: 'absolute',
                    left: isChromatic ? '-5px' : '0px',
                    top: 0,
                    color: '#FF2020',
                    opacity: isChromatic ? 0.8 : 0,
                    transition: 'opacity 0.08s ease, left 0.08s ease',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                {current}
            </span>
            {/* Blue right ghost */}
            <span
                aria-hidden
                style={{
                    position: 'absolute',
                    left: isChromatic ? '5px' : '0px',
                    top: 0,
                    color: '#2070FF',
                    opacity: isChromatic ? 0.8 : 0,
                    transition: 'opacity 0.08s ease, left 0.08s ease',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                {current}
            </span>
            {/* Main glyph */}
            <span
                style={{
                    color:
                        phase === 'idle'
                            ? 'transparent'
                            : phase === 'scrambling'
                                ? '#282828'
                                : '#FFFFFF',
                    transition: 'color 0.1s ease',
                }}
            >
                {current}
            </span>
        </span>
    );
};

/* ──────────────────────────────────────────
   ScrambleWord  —  row of ScrambleChars
   ────────────────────────────────────────── */
const ScrambleWord = ({
    text,
    startDelay,
    charDelay = 80,
    scrambleDuration = 460,
    fontSize,
}: {
    text: string;
    startDelay: number;
    charDelay?: number;
    scrambleDuration?: number;
    fontSize: string;
}) => (
    <div
        style={{
            display: 'flex',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize,
            lineHeight: 0.86,
            letterSpacing: '0.025em',
        }}
    >
        {text.split('').map((char, i) => (
            <ScrambleChar
                key={i}
                target={char}
                startDelay={startDelay + i * charDelay}
                scrambleDuration={scrambleDuration}
            />
        ))}
    </div>
);

/* ──────────────────────────────────────────
   Electric spark progress line
   ────────────────────────────────────────── */
const SparkLine = ({ progress, visible }: { progress: number; visible: boolean }) => (
    <div
        style={{
            position: 'relative',
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.4s ease',
        }}
    >
        {/* Fill */}
        <div
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, rgba(255,200,0,0.3), #FFCC00)',
                transition: 'width 0.1s linear',
            }}
        />
        {/* Spark bead */}
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: `${progress}%`,
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#FFCC00',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 8px #FFCC00, 0 0 20px rgba(255,204,0,0.6)',
                transition: 'left 0.1s linear',
                display: progress === 0 ? 'none' : 'block',
            }}
        />
    </div>
);

/* ──────────────────────────────────────────
   Cycling status text
   ────────────────────────────────────────── */
const StatusCycler = ({ visible }: { visible: boolean }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!visible) return;
        const id = setInterval(() => setIdx(p => (p + 1) % STATUS.length), 340);
        return () => clearInterval(id);
    }, [visible]);

    return (
        <span
            style={{
                color: '#FFCC00',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s',
            }}
        >
            {STATUS[idx]}
        </span>
    );
};

/* ──────────────────────────────────────────
   Scanline overlay (subtle CRT texture)
   ────────────────────────────────────────── */
const Scanlines = () => (
    <div
        aria-hidden
        style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
            pointerEvents: 'none',
            zIndex: 2,
        }}
    />
);

/* ──────────────────────────────────────────
   MAIN LOADING SCREEN
   ────────────────────────────────────────── */
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<'loading' | 'crt-exit' | 'done'>('loading');
    const [progress, setProgress] = useState(0);
    const [progressVisible, setProgressVisible] = useState(false);
    const [whiteFlash, setWhiteFlash] = useState(false);
    const progressRef = useRef(0);

    useEffect(() => {
        // Smooth stochastic progress
        const tick = setInterval(() => {
            progressRef.current = Math.min(progressRef.current + Math.random() * 7 + 2, 100);
            setProgress(Math.floor(progressRef.current));
            if (progressRef.current >= 100) clearInterval(tick);
        }, 80);

        // Show progress bar after name starts settling
        const progressTimer = setTimeout(() => setProgressVisible(true), 1600);

        // Trigger CRT collapse exit
        const flashTimer = setTimeout(() => setWhiteFlash(true), 2700);
        const exitTimer = setTimeout(() => setPhase('crt-exit'), 2800);
        const doneTimer = setTimeout(() => { setPhase('done'); onComplete(); }, 3300);

        return () => {
            clearInterval(tick);
            clearTimeout(progressTimer);
            clearTimeout(flashTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onComplete]);

    // Timing layout:
    // 0ms     — screen mounts
    // 150ms   — ABHISHEK starts scrambling (8 chars × 80ms + 460ms = ~1100ms total)
    // 850ms   — MANE starts scrambling (4 chars × 85ms + 460ms = ~800ms total → done ~1650ms)
    // 1600ms  — progress bar fades in
    // 2700ms  — white flash
    // 2800ms  — CRT collapse begins (scaleY → 0, ~500ms)
    // 3300ms  — done, onComplete fires

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#0C0C0C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        transformOrigin: '50% 50%',
                    }}
                    animate={
                        phase === 'crt-exit'
                            ? { scaleY: 0, opacity: 1 }
                            : { scaleY: 1, opacity: 1 }
                    }
                    transition={
                        phase === 'crt-exit'
                            ? { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
                            : { duration: 0 }
                    }
                >
                    <FontLoader />
                    <Scanlines />

                    {/* White flash overlay for CRT pop */}
                    <AnimatePresence>
                        {whiteFlash && (
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: '#FFFFFF',
                                    zIndex: 20,
                                    pointerEvents: 'none',
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.7, 0] }}
                                transition={{ duration: 0.18, times: [0, 0.35, 1] }}
                            />
                        )}
                    </AnimatePresence>

                    {/* ── Corner tags ── */}
                    {/* <motion.div
                        style={{
                            position: 'absolute',
                            top: '1.8rem',
                            left: '2.2rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.58rem',
                            letterSpacing: '0.18em',
                            color: '#2A2A2A',
                            textTransform: 'uppercase',
                            zIndex: 5,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                    >
                        sys://portfolio.init
                    </motion.div> */}

                    {/* <motion.div
                        style={{
                            position: 'absolute',
                            top: '1.8rem',
                            right: '2.2rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.58rem',
                            letterSpacing: '0.18em',
                            color: '#2A2A2A',
                            textTransform: 'uppercase',
                            zIndex: 5,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        v2.0.26
                    </motion.div> */}

                    {/* ── Central block ── */}
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0,
                            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
                        }}
                    >
                        {/* ABHISHEK — starts at 150ms, char 80ms apart, 460ms scramble */}
                        <ScrambleWord
                            text="ABHISHEK"
                            startDelay={150}
                            charDelay={80}
                            scrambleDuration={460}
                            fontSize="clamp(4.8rem, 15vw, 11rem)"
                        />

                        {/* MANE — starts at 850ms for a staggered "second line" feel */}
                        <ScrambleWord
                            text="MANE"
                            startDelay={850}
                            charDelay={90}
                            scrambleDuration={460}
                            fontSize="clamp(4.8rem, 15vw, 11rem)"
                        />

                        {/* Separator + progress */}
                        <div
                            style={{
                                marginTop: '1.6rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.6rem',
                                width: 'clamp(280px, 50vw, 520px)',
                            }}
                        >
                            <SparkLine progress={progress} visible={progressVisible} />

                            {/* Status row */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.6rem',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    opacity: progressVisible ? 1 : 0,
                                    transition: 'opacity 0.4s ease',
                                }}
                            >
                                <StatusCycler visible={progressVisible} />
                                <span
                                    style={{
                                        color: '#383838',
                                        fontVariantNumeric: 'tabular-nums',
                                    }}
                                >
                                    {String(progress).padStart(3, '0')}
                                    <span style={{ color: '#222' }}>%</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom role strip ── */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: '1.8rem',
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.52rem',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#1E1E1E',
                            zIndex: 5,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                    >
                        <span>Full-Stack Dev</span>
                        <span style={{ color: '#FFCC00', opacity: 0.4 }}>×</span>
                        <span>UI/UX Designer</span>
                        <span style={{ color: '#FFCC00', opacity: 0.4 }}>×</span>
                        <span>AI Enthusiast</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
