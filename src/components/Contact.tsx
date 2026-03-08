import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiMapPin, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission (replace with EmailJS or similar)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactInfo = [
        { icon: <FiMail />, label: 'Email', value: 'abhishekmane1911@gmail.com', href: 'mailto:abhishekmane1911@gmail.com' },
        { icon: <FiMapPin />, label: 'Location', value: 'Indore, India', href: '#' },
    ];

    const socialLinks = [
        { icon: <FiGithub />, href: 'https://github.com/abhishekmane1911', label: 'GitHub' },
        { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/abhishekmane19/', label: 'LinkedIn' },
        { icon: <FiInstagram />, href: 'https://www.instagram.com/abhishek_mane_1911/', label: 'Instagram' },
    ];

    return (
        <section id="contact" className="section-padding relative">
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a project in mind? Let's build something amazing together."
                    icon={<FiMail />}
                />

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="font-heading text-2xl font-bold text-white mb-6">
                            Let's create something{' '}
                            <span className="gradient-text-static">extraordinary</span>
                        </h3>

                        <p className="text-gray-400 leading-relaxed mb-8">
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of your vision. Whether it's a web app,
                            AI project, or just a chat about tech — reach out!
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-4 mb-8">
                            {contactInfo.map((info) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/[0.04] transition-all duration-300 group"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-violet-400 group-hover:text-cyan-400 transition-colors">
                                        {info.icon}
                                    </span>
                                    <div>
                                        <span className="text-xs text-gray-500 font-mono">{info.label}</span>
                                        <p className="text-sm text-gray-300">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 font-mono mr-2">Find me on</span>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg glass text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-400 mb-2 font-mono">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl glass bg-transparent text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all text-sm"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-400 mb-2 font-mono">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl glass bg-transparent text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm text-gray-400 mb-2 font-mono">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl glass bg-transparent text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all text-sm resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:from-violet-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-violet-500/20"
                                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : isSubmitted ? (
                                    'Message Sent! ✨'
                                ) : (
                                    <>
                                        <FiSend /> Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
