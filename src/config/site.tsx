import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import type { ReactElement } from 'react';

export const siteConfig = {
    name: 'Abhishek Mane',
    email: 'mailto:abhishekmane1911@gmail.com',
    emailDisplay: 'abhishekmane1911@gmail.com',
    github: 'https://github.com/abhishekmane1911',
    linkedin: 'https://www.linkedin.com/in/abhishekmane19/',
    twitter: 'https://x.com/Abhishe27821349',
    instagram: 'https://www.instagram.com/abhishek_mane_1911',
};

export interface SocialLink {
    name: string;
    url: string;
    icon: ReactElement;
}

export const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: siteConfig.github, icon: <FiGithub size={18} /> },
    { name: 'LinkedIn', url: siteConfig.linkedin, icon: <FiLinkedin size={18} /> },
    { name: 'Twitter', url: siteConfig.twitter, icon: <FiTwitter size={18} /> },
    { name: 'Instagram', url: siteConfig.instagram, icon: <FiInstagram size={18} /> },
];

export const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];
