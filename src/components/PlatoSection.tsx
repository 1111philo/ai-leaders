import React from 'react';
import platoDashboard from '../assets/plato-dashboard.webp';

const GithubIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const PlatoSection: React.FC = () => {
    return (
        <section id="plato" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-60 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-sm font-medium tracking-wide text-gray-300">The Platform</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Meet <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Plato</span>.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        The agentic platform you'll harness throughout the program — meeting you where you are, adapting to how you think, and helping you put your AI and WordPress powers to work on real production.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto mb-12">
                    <img
                        src={platoDashboard}
                        alt="Plato admin dashboard showing learner engagement metrics, lesson pacing, and on-target rates"
                        loading="lazy"
                        width={1600}
                        height={1220}
                        className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                    />
                </div>

                <div className="text-center">
                    <a
                        href="https://github.com/1111philo/plato"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
                    >
                        <GithubIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        <span>Plato is Open Source — view on GitHub</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PlatoSection;
