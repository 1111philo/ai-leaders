
import React from 'react';
import { motion } from 'framer-motion';

const graduates = [
    { name: "Aaliyah Johnson", initials: "AJ" },
    { name: "Marcus Rivera", initials: "MR" },
    { name: "Priya Patel", initials: "PP" },
    { name: "Devon Williams", initials: "DW" },
    { name: "Sasha Kim", initials: "SK" },
    { name: "Jordan Thompson", initials: "JT" },
    { name: "Fatima Hassan", initials: "FH" },
    { name: "Luis Mendoza", initials: "LM" },
    { name: "Taylor Brooks", initials: "TB" },
    { name: "Amara Osei", initials: "AO" },
    { name: "Riley Chen", initials: "RC" },
    { name: "Isaiah Grant", initials: "IG" },
    { name: "Nadia Torres", initials: "NT" },
    { name: "Caleb Washington", initials: "CW" },
    { name: "Mei-Lin Zhang", initials: "MZ" },
    { name: "Elijah Moore", initials: "EM" },
    { name: "Sofia Reyes", initials: "SR" },
    { name: "Darius Jackson", initials: "DJ" },
    { name: "Leila Ahmed", initials: "LA" },
    { name: "Owen Murphy", initials: "OM" },
    { name: "Zara Singh", initials: "ZS" },
    { name: "Kofi Mensah", initials: "KM" },
    { name: "Brianna Davis", initials: "BD" },
    { name: "Andre Nguyen", initials: "AN" },
    { name: "Yuki Tanaka", initials: "YT" },
    { name: "Cameron Ellis", initials: "CE" },
    { name: "Imani Walker", initials: "IW" },
    { name: "Marco Santos", initials: "MS" },
    { name: "Aisha Coleman", initials: "AC" },
    { name: "Finn O'Brien", initials: "FO" },
    { name: "Keisha Brown", initials: "KB" },
    { name: "Ravi Sharma", initials: "RS" },
    { name: "Simone Laurent", initials: "SL" },
    { name: "Tobias Klein", initials: "TK" },
    { name: "Nia Robinson", initials: "NR" },
    { name: "Carlos Flores", initials: "CF" },
    { name: "Destiny Hall", initials: "DH" },
    { name: "Mikael Johansson", initials: "MJ" },
    { name: "Bianca Morales", initials: "BM" },
    { name: "Ezra Peterson", initials: "EP" },
];

const gradientPairs = [
    "from-blue-600 to-indigo-800",
    "from-purple-600 to-indigo-800",
    "from-cyan-600 to-blue-800",
    "from-indigo-600 to-purple-800",
    "from-violet-600 to-purple-800",
    "from-blue-700 to-cyan-600",
];

const FinalistsBanner: React.FC = () => {
    return (
        <section className="py-24 bg-zinc-950 border-y border-white/20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                        <span className="text-sm font-medium tracking-wide text-gray-300">Cohort 1 · 2024</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Meet Our Finalists
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        40 graduates from our inaugural cohort built professional portfolios showcasing their AI and WordPress skills — ready to compete for living-wage jobs.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 mb-12">
                    {graduates.map((grad, idx) => (
                        <motion.a
                            key={idx}
                            href="https://aileaderswp.blog/"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: idx * 0.03, duration: 0.4 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                            aria-label={`${grad.name}'s portfolio`}
                        >
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradientPairs[idx % gradientPairs.length]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {grad.initials}
                            </div>
                            <span className="text-xs text-gray-400 text-center leading-tight group-hover:text-gray-200 transition-colors">
                                {grad.name}
                            </span>
                        </motion.a>
                    ))}
                </div>

                <div className="text-center">
                    <motion.a
                        href="https://aileaderswp.blog/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.3em] text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                        View All Portfolios
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default FinalistsBanner;
