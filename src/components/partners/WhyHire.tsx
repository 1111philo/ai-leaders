import React from 'react';

const reasons = [
    {
        title: "Institutional Partnerships",
        body: "We partner with major universities and colleges to source candidates from a diverse, motivated talent pool — before they hit the open market."
    },
    {
        title: "A Direct Pipeline",
        body: "Tell us what you're building and we connect you with vetted, portfolio-backed candidates matched to your roles — proof of real production work, not promises."
    },
    {
        title: "Future Workforce Leaders",
        body: "Our courses cultivate leaders, not just hires: reflective by design, graduates integrate faster, adapt under change, and stay on teams longer."
    }
];

const WhyHire: React.FC = () => {
    return (
        <section id="why" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        What We <span className="text-gray-300">Offer</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        <strong className="font-bold text-white">A pipeline for future talent.</strong> Work with major institutions to find talent and cultivate workforce leaders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
