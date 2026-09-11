import React from 'react';

const steps = [
    {
        title: "Meet With Us",
        body: "We start by understanding your technology, the communities you want to reach, and what exposure looks like for your team."
    },
    {
        title: "Build the Module",
        body: "Together we design a competition, credential track, or event — custom-built to work with the vendor technology our universities already run."
    },
    {
        title: "Reach Students",
        body: "Your tech goes live across partner campuses. Students build with it, publish with it, and carry it into their careers."
    }
];

const PartnershipProcess: React.FC = () => {
    return (
        <section id="process" className="py-24 bg-zinc-950 border-y border-white/20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Partnership Process.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A simple path from a first conversation to your technology in students' hands.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative">
                            <div className="text-5xl font-black text-white/30 mb-4">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnershipProcess;
