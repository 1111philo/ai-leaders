import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        title: "Fully Agentic",
        body: "AI agents guide every participant through hands-on production work, adapting in real time to how they think and build."
    },
    {
        title: "Evidence-Based",
        body: "Skills are demonstrated through real projects and assessed continuously — producing a portfolio, not just a grade."
    },
    {
        title: "Built to Scale",
        body: "Plato delivers personalized, mentor-quality guidance to every participant at once, so quality never dilutes with growth."
    }
];

const PlatoPlatform: React.FC = () => {
    return (
        <section id="platform" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-60 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-sm font-medium tracking-wide text-gray-300">The Platform</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Meet <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Plato</span>.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        The first fully agentic platform built to support a new generation of practitioners — and the engine behind every AI Leaders graduate you hire.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm hover:border-indigo-400/30 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{feature.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatoPlatform;
