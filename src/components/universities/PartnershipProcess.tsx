import React from 'react';

const steps = [
    {
        title: "Connect With Us",
        body: "Share your institution's goals, student population, and interest in the program. We'll schedule a conversation to explore fit."
    },
    {
        title: "Review Partnership Agreement",
        body: "We'll walk through requirements, timelines, and support resources to ensure alignment before launching."
    },
    {
        title: "Launch & Support",
        body: "Get access to curriculum, assessment tools, and ongoing support as you deliver the credential and connect students to jobs."
    }
];

const PartnershipProcess: React.FC = () => {
    return (
        <section id="process" className="py-24 bg-black border-y border-white/20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        How Partnership Works.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A straightforward path from inquiry to active partnership.
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
