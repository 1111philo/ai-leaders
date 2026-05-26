import React from 'react';

const steps = [
    {
        title: "Tell Us What You Need",
        body: "Share the roles, skills, and start dates you're hiring for. The more detail, the better the match."
    },
    {
        title: "We Match Candidates",
        body: "We surface graduates whose portfolios and skills fit your needs — each with verified, evidence-backed work."
    },
    {
        title: "Interview & Hire",
        body: "Meet your shortlist, review their real production work, and bring on team members who can hit the ground running."
    }
];

const HiringProcess: React.FC = () => {
    return (
        <section id="process" className="py-24 bg-zinc-950 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        How Hiring Works.
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        A simple path from your open role to a vetted, AI-enabled hire.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative">
                            <div className="text-5xl font-black text-white/10 mb-4">
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
