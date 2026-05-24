import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import SectionHeading from './SectionHeading';

/* ── Underline input / textarea ── */
const LineInput = ({
    label,
    id,
    type = 'text',
    value,
    onChange,
    placeholder,
    required,
    rows,
}: {
    label: string;
    id: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
}) => {
    const [focused, setFocused] = useState(false);
    const commonStyle: React.CSSProperties = {
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${focused ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)'}`,
        color: 'var(--color-text)',
        outline: 'none',
        width: '100%',
        padding: '12px 0',
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        transition: 'border-color 0.25s ease',
        resize: 'none' as const,
    };

    return (
        <div className="relative group">
            <label
                htmlFor={id}
                className="block font-mono text-[10px] uppercase tracking-[0.25em] mb-3 transition-colors duration-200"
                style={{ color: focused ? 'var(--color-accent)' : 'var(--color-text-2)' }}
            >
                {label}
            </label>
            {rows ? (
                <textarea
                    id={id}
                    required={required}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{ ...commonStyle, display: 'block' }}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    required={required}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={commonStyle}
                />
            )}
            {/* Focus line accent */}
            <motion.div
                className="absolute bottom-0 left-0 h-px"
                style={{ background: 'var(--color-accent)' }}
                animate={{ width: focused ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
        </div>
    );
};

/* ── Contact Section ── */
const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!form.current) return;
            
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || '', 
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '', 
                form.current, 
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
            );
            
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error('FAILED...', error);
            alert('Failed to send message. Please try emailing directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const socials = [
        { icon: <FiGithub />,    href: 'https://github.com/abhishekmane1911',             label: 'GitHub' },
        { icon: <FiLinkedin />,  href: 'https://www.linkedin.com/in/abhishekmane19/',     label: 'LinkedIn' },
        { icon: <FiInstagram />, href: 'https://www.instagram.com/abhishek_mane_1911/',   label: 'Instagram' },
    ];

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    index="05"
                    title="Get In Touch"
                    subtitle="Open to new projects, collaborations, or just a conversation"
                />

                {/* ── Large email CTA ── */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p
                        className="font-mono text-[11px] uppercase tracking-[0.3em] mb-4"
                        style={{ color: 'var(--color-text-2)' }}
                    >
                        Reach me directly
                    </p>
                    <motion.a
                        href="mailto:abhishekmane1911@gmail.com"
                        className="inline-flex items-end gap-3 group"
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span
                            className="font-display font-bold leading-none"
                            style={{
                                fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
                                letterSpacing: '-0.03em',
                                color: '#FFFFFF',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                        >
                            abhishekmane1911@gmail.com
                        </span>
                        <FiArrowUpRight
                            className="mb-1 shrink-0 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                            style={{ fontSize: '1.8rem', color: 'var(--color-accent)' }}
                        />
                    </motion.a>
                </motion.div>

                {/* ── Grid: form + info ── */}
                <div className="grid md:grid-cols-2 gap-14 lg:gap-20">

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                            <LineInput
                                label="Your Name"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="John Doe"
                                required
                            />
                            {/* Hidden input to map to EmailJS template variable if you use from_name */}
                            <input type="hidden" name="from_name" value={formData.name} />

                            <LineInput
                                label="Email Address"
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                                required
                            />
                            {/* Hidden input to map to EmailJS template variable if you use reply_to */}
                            <input type="hidden" name="reply_to" value={formData.email} />

                            <LineInput
                                label="Message"
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell me about your project..."
                                required
                                rows={4}
                            />
                            <input type="hidden" name="message" value={formData.message} />

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-3 font-sans font-medium text-sm transition-all duration-200 disabled:opacity-40"
                                style={{ color: isSubmitted ? '#4ADE80' : 'var(--color-accent)' }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span
                                            className="w-4 h-4 rounded-full border-2 animate-spin"
                                            style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
                                        />
                                        Sending...
                                    </>
                                ) : isSubmitted ? (
                                    'Message sent ✓'
                                ) : (
                                    <>
                                        Send Message
                                        <FiArrowUpRight />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Info side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-10"
                    >
                        {/* Location */}
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2"
                                style={{ color: 'var(--color-text-2)' }}
                            >
                                Based in
                            </p>
                            <p className="font-display font-bold text-white text-2xl" style={{ letterSpacing: '-0.02em' }}>
                                Indore, India
                            </p>
                        </div>

                        {/* Availability */}
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2"
                                style={{ color: 'var(--color-text-2)' }}
                            >
                                Status
                            </p>
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: '#4ADE80', boxShadow: '0 0 8px rgba(74,222,128,0.7)' }}
                                />
                                <span className="font-sans text-white">Open to opportunities</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div>
                            <p
                                className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
                                style={{ color: 'var(--color-text-2)' }}
                            >
                                Elsewhere
                            </p>
                            <div className="space-y-3">
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 group transition-colors duration-200"
                                        style={{ color: 'var(--color-text-2)' }}
                                        whileHover={{ x: 4, color: '#FFFFFF' } as any}
                                    >
                                        <span className="text-base">{s.icon}</span>
                                        <span className="font-sans text-sm">{s.label}</span>
                                        <FiArrowUpRight
                                            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ color: 'var(--color-accent)' }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
