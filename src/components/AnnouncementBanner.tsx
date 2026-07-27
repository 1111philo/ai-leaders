import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnnouncementBanner = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 border-b border-purple-500/30 mt-20 overflow-hidden"
            role="banner"
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
                    to="/graduation"
                    className="px-6 py-2 text-sm font-bold bg-white text-purple-900 rounded-full hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800 whitespace-nowrap"
                    aria-label="Meet the Finalists"
                >
                    Meet the Finalists <span aria-hidden="true">→</span>
                </Link>
            </div>
        </motion.div>
    );
};

export default AnnouncementBanner;
