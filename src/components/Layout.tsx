
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import AnnouncementBanner from './AnnouncementBanner';

const SlackIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
        <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111.756 8.43 1.68 8.43h1.682zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682zm6.749 1.682c0-.926.755-1.682 1.68-1.682S16 4.964 16 5.889s-.756 1.681-1.68 1.681h-1.681zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68s.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681z" />
    </svg>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['about', 'advisors', 'faq', 'apply', 'why', 'platform', 'process', 'connect', 'benefits', 'requirements'];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const location = useLocation();

    // Close the mobile menu whenever the route or hash changes.
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname, location.hash]);

    // While the mobile menu is open, lock body scroll and allow Escape to close it.
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isMobileMenuOpen]);

    // Smooth-scroll to the anchor after navigating to a page with a hash.
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            // Wait a tick for the destination page to render.
            const timer = setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location.pathname, location.hash]);

    const primaryNav = [
        {
            name: 'For Students',
            path: '/',
            links: [
                { name: 'About', href: '/#about', id: 'about' },
                { name: 'The Platform', href: '/#platform', id: 'platform' },
                { name: 'Advisors', href: '/#advisors', id: 'advisors' },
                { name: 'FAQ', href: '/#faq', id: 'faq' },
            ],
        },
        {
            name: 'For Employers',
            path: '/employers',
            links: [
                { name: 'Why Hire', href: '/employers#why', id: 'why' },
                { name: 'The Platform', href: '/employers#platform', id: 'platform' },
                { name: 'Hiring Process', href: '/employers#process', id: 'process' },
                { name: 'Get in Touch', href: '/employers#connect', id: 'connect' },
            ],
        },
        {
            name: 'For EDU Partners',
            path: '/edu-partners',
            links: [
                { name: 'Benefits', href: '/edu-partners#benefits', id: 'benefits' },
                { name: 'Requirements', href: '/edu-partners#requirements', id: 'requirements' },
                { name: 'Partnership Process', href: '/edu-partners#process', id: 'process' },
                { name: 'Get in Touch', href: '/edu-partners#connect', id: 'connect' },
            ],
        },
    ];

    // Smooth-scroll when the target section already exists on the current page.
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const [path, id] = href.split('#');
        if (id && location.pathname === (path || '/')) {
            e.preventDefault();
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', href);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-black focus:font-semibold"
            >
                Skip to main content
            </a>
            <nav aria-label="Main navigation" className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/30' : 'bg-transparent'}`}>
                <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>AI LEADERS</Link>
                    <div className="hidden md:flex space-x-8 text-sm font-medium">
                        {primaryNav.map((item) => (
                            <div
                                key={item.path}
                                className="relative group py-2"
                                onKeyDown={(e) => {
                                    // Close the submenu and return focus to the trigger on Escape.
                                    if (e.key === 'Escape') {
                                        (e.currentTarget.querySelector('a') as HTMLElement | null)?.focus();
                                        (document.activeElement as HTMLElement | null)?.blur();
                                    }
                                }}
                            >
                                <Link
                                    to={item.path}
                                    aria-haspopup="true"
                                    className={`transition-all duration-300 ${location.pathname === item.path
                                        ? 'text-white border-b border-white'
                                        : 'text-zinc-300 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                                {/* Submenu: revealed on hover and on keyboard focus (focus-within) */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                                    <div className="min-w-44 bg-black/90 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl py-2">
                                        {item.links.map((link) => (
                                            <Link
                                                key={link.id}
                                                to={link.href}
                                                onClick={(e) => handleAnchorClick(e, link.href)}
                                                className={`block px-5 py-2.5 text-sm transition-colors focus:outline-none focus-visible:bg-white/10 focus-visible:text-white ${activeSection === link.id
                                                    ? 'text-white'
                                                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <a
                            href="https://join.slack.com/t/1111philo/shared_invite/zt-2gmnevnx3-qR6119iBjUFxS4BgP8wXzA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-300 hover:text-[#4A154B] transition-colors"
                            aria-label="Slack Channel"
                        >
                            <SlackIcon className="w-5 h-5" />
                        </a>
                        <a
                            href="http://github.com/1111philo/ai-leaders/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-300 hover:text-white transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
                        <a
                            href="https://learn.ai-leaders.org/courses"
                            className="hidden md:inline-block text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                        >
                            Login
                        </a>
                        <Link
                            to="/#apply"
                            onClick={(e) => handleAnchorClick(e, '/#apply')}
                            className={`px-4 md:px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activeSection === 'apply' ? 'bg-zinc-200 text-black scale-105' : 'bg-white text-black hover:bg-zinc-200'}`}
                        >
                            Sign Up
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            className="md:hidden p-2 -mr-2 text-zinc-200 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-white/30"
                        >
                            <div className="container mx-auto px-4 py-4 space-y-6">
                                {primaryNav.map((item) => (
                                    <div key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block text-base font-semibold mb-2 ${location.pathname === item.path ? 'text-white' : 'text-zinc-200'}`}
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="pl-3 border-l border-white/30 space-y-1">
                                            {item.links.map((link) => (
                                                <Link
                                                    key={link.id}
                                                    to={link.href}
                                                    onClick={(e) => { handleAnchorClick(e, link.href); setIsMobileMenuOpen(false); }}
                                                    className={`block py-2 text-sm transition-colors ${activeSection === link.id ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
                                                >
                                                    {link.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <a
                                    href="https://learn.ai-leaders.org/courses"
                                    className="block pt-2 border-t border-white/30 text-sm font-medium text-zinc-200 hover:text-white"
                                >
                                    Login
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <AnnouncementBanner />

            <main id="main-content" className="flex-grow">
                {children}
            </main>

            <footer className="bg-black border-t border-white/30 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-xl font-bold tracking-tight mb-2 uppercase">AI LEADERS</div>
                            <p className="text-zinc-300 text-sm">Harnessing the next generation of tech leaders.</p>
                        </div>
                        <div className="text-gray-300 text-sm">
                            Questions? Email <a href="mailto:help@ai-leaders.org" className="text-white hover:underline transition-all">help@ai-leaders.org</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
