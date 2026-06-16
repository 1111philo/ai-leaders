import React from 'react';

const reasons = [
    {
        title: "AI-Enabled",
        body: "They bring their own judgment, amplified by fluency in prompting, agents, and LLM integration."
    },
    {
        title: "WordPress-Skilled",
        body: "Hands-on, portfolio-backed experience building professional, scalable WordPress sites and full-stack features."
    },
    {
        title: "Rigorously Vetted",
        body: "Graduates earn a micro-credential through real production work, not multiple-choice tests — proof, not promises."
    },
    {
        title: "Built to Stay",
        body: "Reflective by design: graduates spend as much time learning who they are as what they can do — so they integrate faster, adapt under change, and stay on teams longer."
    }
];

const WhyHire: React.FC = () => {
    return (
        <section id="why" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Why Hire <span className="text-gray-300">AI Leaders.</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Our graduates pair human judgment with AI leverage — the exact combination teams need to move faster without sacrificing quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((reason) => (
                        <div
                            key={reason.title}
                            className="p-8 border border-white/30 rounded-2xl bg-white/[0.02] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{reason.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyHire;
