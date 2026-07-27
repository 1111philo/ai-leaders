import React from 'react';
import platoLesson from '../assets/plato-lesson.webp';

const callouts = [
    {
        title: "Coaches, doesn't lecture",
        body: "Plato asks the questions that surface what you already know, then helps you sharpen it."
    },
    {
        title: "Reflective by design",
        body: "Every lesson pairs the technical work with the question: who are you doing this as?"
    },
    {
        title: "Paced to you",
        body: "Work when you're ready. Step away when you're not. The lesson will be here."
    }
];

const PlatoSection: React.FC = () => {
    return (
        <section id="platform" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-60 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
                    <div className="md:w-1/2">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                            <span className="text-sm font-medium tracking-wide text-gray-300">The Platform</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Meet <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Plato</span>.
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Your agentic coach throughout the program — meeting you where you are, and ready when you are.
                        </p>

                        <div className="space-y-5">
                            {callouts.map((c) => (
                                <div key={c.title}>
                                    <h3 className="text-base font-bold text-white mb-1">{c.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{c.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <figure className="w-full">
                            <img
                                src={platoLesson}
                                alt="Plato lesson view: the conversational coach asks a reflective question and patiently waits for the participant to be ready"
                                loading="lazy"
                                width={1400}
                                height={1025}
                                className="w-full h-auto rounded-2xl shadow-2xl border border-white/30"
                            />
                            <figcaption className="text-center text-sm text-gray-400 -mt-4">
                                Plato's chat-based interface
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatoSection;
