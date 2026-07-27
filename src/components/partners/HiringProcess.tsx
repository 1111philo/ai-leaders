import React from 'react';

const steps = [
    {
        title: "Meet With Us",
        body: "We start by understanding your team, your hiring needs, and the skills you're looking to build."
    },
    {
        title: "Build the Program",
        body: "Together we establish a course or internship that cultivates the talent your roles require."
    },
    {
        title: "Interview & Hire",
        body: "Meet your shortlist, review their real production work, and bring on team members who can hit the ground running."
    }
];

const HiringProcess: React.FC = () => {
    return (
        <section id="process" className="py-24 bg-zinc-950 border-y border-white/20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Partnership Process.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A simple path from a first conversation to talent built for your team.
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

export default HiringProcess;
