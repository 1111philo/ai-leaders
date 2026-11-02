import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Pages aimed at institutions get a different banner that points to the
// Cohort 1 report instead of the finalist portfolios.
const REPORT_PAGES = ['/partners', '/universities'];

interface AnnouncementBannerProps {
    /** Height of the fixed nav, so the banner sits flush beneath it. */
    topOffset?: number;
}

const AnnouncementBanner = ({ topOffset }: AnnouncementBannerProps) => {
    const { pathname } = useLocation();
    const showReport = REPORT_PAGES.includes(pathname);
    const cta = showReport
        ? {
            to: '/report',
            label: 'Read the Report',
            background: 'from-indigo-950 via-blue-900 to-cyan-800 border-cyan-400/30',
            button: 'text-blue-950 hover:bg-cyan-50 hover:shadow-cyan-500/50 focus:ring-offset-blue-900',
        }
        : {
            to: '/graduation',
            label: 'Meet the Finalists',
            background: 'from-purple-900 via-purple-800 to-purple-700 border-purple-500/30',
            button: 'text-purple-900 hover:bg-purple-50 hover:shadow-purple-500/50 focus:ring-offset-purple-800',
        };

    // role="region", not "banner": banner is the site-header landmark, and this
    // is a notice sitting below the header.
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative w-full bg-gradient-to-r ${cta.background} border-b overflow-hidden`}
            style={{ marginTop: topOffset ?? '5rem' }}
            role="region"
            aria-label="Announcement"
        >
            {/* Animated background accent */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent motion-reduce:hidden"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                aria-hidden="true"
            />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }} aria-hidden="true" />

            <div className="relative container mx-auto px-4 md:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                <motion.p
                    className="text-white text-sm md:text-base font-semibold text-center sm:text-left tracking-wide"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span aria-hidden="true">🎉 </span>Cohort One Complete!
                </motion.p>
                <Link
                    to={cta.to}
                    className={`px-6 py-2 text-sm font-bold bg-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 whitespace-nowrap ${cta.button}`}
                >
                    {cta.label} <span aria-hidden="true">→</span>
                </Link>
            </div>
        </motion.div>
    );
};

export default AnnouncementBanner;
