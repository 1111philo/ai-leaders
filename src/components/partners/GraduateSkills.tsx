import React from 'react';

const skills = [
    {
        title: "AI Tooling",
        body: "Prompting, agentic workflows, and LLM integration applied to real production tasks."
    },
    {
        title: "WordPress Production",
        body: "Building, theming, and maintaining professional, scalable WordPress sites."
    },
    {
        title: "Full-Stack Development",
        body: "Practical PHP, Python, and JavaScript for shipping end-to-end features."
    },
    {
        title: "UI Production",
        body: "Translating designs into clean, responsive, accessible interfaces."
    },
    {
        title: "AI Enablement",
        body: "Bringing AI leverage into a team's existing tools and processes."
    },
    {
        title: "Professional Skills",
        body: "Clear communication, prioritization, and presenting — coached throughout the program."
    }
];

const GraduateSkills: React.FC = () => {
    return (
        <section id="skills" className="py-24 bg-zinc-950 border-y border-white/30">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        What Our Graduates Can Do.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Our graduates don't arrive as freshly-minted technicians — they arrive as people who know themselves, fluent in AI, and ready to apply that combination to production work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="p-8 border border-white/30 rounded-2xl bg-black/40 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{skill.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GraduateSkills;
