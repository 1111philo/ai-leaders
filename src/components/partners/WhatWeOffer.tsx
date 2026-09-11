import React from 'react';

const offerings = [
    {
        title: "Branded Competitions",
        body: "Sponsor a competition that pushes students to create professional assets using your tech. Their best work becomes a public portfolio piece — and a reference implementation of your platform."
    },
    {
        title: "Micro-Credential Modules",
        body: "Embed your existing micro-credentials into our platform. Students earn them as coursework, giving your credential far greater exposure across partner universities."
    },
    {
        title: "Sponsored Events",
        body: "Sponsor an event where our graduates gain in-person experience — and meet the team behind the tools they have been building with."
    }
];

const WhatWeOffer: React.FC = () => {
    return (
        <section id="offer" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        What We <span className="text-gray-300">Offer</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        <strong className="font-bold text-white">A pathway to expose your technology to students.</strong> We custom-build modules that work with the vendor technology universities already run.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {offerings.map((offering) => (
                        <div
                            key={offering.title}
                            className="p-8 border border-white/30 rounded-2xl bg-white/[0.02] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold mb-3">{offering.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{offering.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
