import { motion } from 'framer-motion';
import { FiUser, FiCode, FiCoffee, FiAward, FiGithub } from 'react-icons/fi';
import { GitHubCalendar } from 'react-github-calendar';
import SectionHeading from './SectionHeading';
import profilePic from '../../public/pic.jpg';

const stats = [
    { icon: <FiCode />, value: '28+', label: 'Projects' },
    { icon: <FiCoffee />, value: '4+', label: 'Years Coding' },
    { icon: <FiAward />, value: '10+', label: 'Technologies' },
    { icon: <FiUser />, value: '100%', label: 'Dedication' },
];

const About = () => {
    return (
        <section id="about" className="section-padding relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="About Me"
                    subtitle="Get to know the person behind the code"
                    icon={<FiUser />}
                />

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Avatar/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative">
                            {/* Glowing border */}
                            <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl gradient-border glass overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-violet-600/20 via-dark-800 to-cyan-500/20 flex items-center justify-center">
                                    <div className="text-center">
                                        {/* <span className="text-7xl md:text-8xl font-heading font-bold gradient-text">AM</span> */}
                                        <img src={profilePic} alt="Profile" />
                                        <p className="text-gray-500 text-sm mt-2 font-mono">{'< developer />'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg glass-strong text-xs font-mono text-violet-400"
                            >
                                React.tsx
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg glass-strong text-xs font-mono text-cyan-400"
                            >
                                Python.py
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                                className="absolute top-1/2 -right-8 px-3 py-1.5 rounded-lg glass-strong text-xs font-mono text-magenta-400"
                            >
                                AI/ML
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6">
                            Turning ideas into{' '}
                            <span className="gradient-text-static">reality</span>
                        </h3>

                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                I'm a passionate <span className="text-white font-medium">Full-Stack Developer</span> and{' '}
                                <span className="text-white font-medium">Designer</span> with a deep love for building
                                innovative digital solutions. My journey spans across web development, AI/ML,
                                and creative design.
                            </p>
                            <p>
                                From complete end to end Club management platform like <span className="text-violet-400">CSESA Website</span> to
                                AI-powered systems like <span className="text-cyan-400">DR Classification</span>,
                                I build projects that push boundaries and solve real-world problems.
                            </p>
                            <p>
                                My tech arsenal includes <span className="text-white">React, TypeScript, Python, Django, Node.js, Framer Motion</span>,
                                and various AI/ML frameworks. I believe in writing clean, performant code and
                                creating designs that tell stories.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="text-center p-4 rounded-xl glass hover:bg-white/5 transition-all duration-300 group"
                                >
                                    <span className="text-violet-400 text-lg mb-2 block group-hover:text-cyan-400 transition-colors">
                                        {stat.icon}
                                    </span>
                                    <span className="block text-2xl font-bold text-white font-heading">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* GitHub Contribution Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 p-6 md:p-8 overflow-hidden"
                >
                    {/* <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                        <div>
                            <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                                <FiGithub className="text-violet-400" />
                                GitHub Activity
                            </h4>
                        </div>
                        <a
                            href="https://github.com/abhishekmane1911"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl glass hover:bg-white/5 text-sm font-medium text-gray-300 transition-all flex items-center gap-2"
                        >
                            View Profile
                        </a>
                    </div> */}
                    <div className="flex justify-center overflow-x-auto py-2 custom-scrollbar">
                        <a href="https://github.com/abhishekmane1911" target="_blank" rel="noopener noreferrer">
                            <GitHubCalendar
                                username="abhishekmane1911"
                                theme={{
                                    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                }}
                                blockSize={12}
                                blockMargin={4}
                                fontSize={12}
                            />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
