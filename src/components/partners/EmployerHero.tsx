import React from 'react';
import { motion } from 'framer-motion';

const EmployerHero: React.FC = () => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-40 z-0"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                    <span className="text-sm font-medium tracking-wide text-gray-300">For Employers &amp; Partners</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent pb-2">
                    Workforce Talent <br className="hidden md:block" />
                    Pipeline
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    We build courses and internships that cultivate job-ready talent.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="w-full sm:w-auto pb-1">
                        <motion.button
                            onClick={() => scrollTo('connect')}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            variants={{
                                initial: { y: 0, opacity: 1, boxShadow: "0 4px 0 0 #1e1b4b" },
                                hover: { scale: 1 },
                                tap: {
                                    y: 4,
                                    boxShadow: "0 0 0 0 #1e1b4b",
                                    opacity: 0.9,
                                    transition: { duration: 0.05 }
                                }
                            }}
                            className="group relative w-full sm:w-auto px-10 py-5 font-black rounded-2xl border-t border-white/20 shadow-2xl overflow-hidden flex items-center justify-center cursor-pointer"
                        >
                            {/* 1. Pulsing Multi-color Glow (Behind) */}
                            <motion.div
                                className="absolute -inset-4 z-0 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                                animate={{
                                    background: [
                                        "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                                        "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
                                        "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
                                        "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                                    ],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />

                            {/* 2. Liquid Gradient Base */}
                            <motion.div
                                className="absolute -inset-[100%] z-0 bg-[linear-gradient(45deg,#1e40af,#3730a3,#6b21a8,#3730a3,#1e40af)]"
                                style={{ backgroundSize: "400% 400%" }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />

                            {/* 3. Surface Shimmer */}
                            <motion.div
                                className="absolute inset-0 z-1 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />

                            {/* 4. Top Polish */}
                            <div className="absolute inset-0 z-2 bg-gradient-to-b from-white/5 to-transparent h-1/2 pointer-events-none" />

                            {/* 5. Text Content */}
                            <span className="relative z-10 text-white uppercase text-xs tracking-[0.3em] flex items-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                Partner
                                <motion.svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    variants={{
                                        initial: { x: 0 },
                                        hover: { x: 5 }
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </motion.svg>
                            </span>
                        </motion.button>
                    </div>
                    <button
                        onClick={() => scrollTo('process')}
                        className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase text-xs tracking-[0.2em] flex items-center justify-center cursor-pointer"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EmployerHero;
