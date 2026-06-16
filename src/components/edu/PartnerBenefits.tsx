import React from 'react';

const benefits = [
    {
        title: "Ready-to-Use Curriculum",
        body: "A complete program that helps students harness what they know and pair it with AI — identity comes first."
    },
    {
        title: "Ongoing Support",
        body: "Access to our team for implementation guidance, technical support, and student advising throughout the program."
    },
    {
        title: "Real Assessment",
        body: "Performance-based credentialing tied to production work, not multiple-choice tests — students build portfolios employers trust."
    },
    {
        title: "Job Placement Pipeline",
        body: "Direct connections to hiring partners — students compete for living-wage jobs, not certificates."
    }
];

const PartnerBenefits: React.FC = () => {
    return (
        <section id="benefits" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        What You <span className="text-gray-300">Receive.</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Everything you need to help students harness who they are and what they know — then connect to living-wage jobs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="p-8 border border-white/30 rounded-2xl bg-white/[0.02] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{benefit.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerBenefits;
