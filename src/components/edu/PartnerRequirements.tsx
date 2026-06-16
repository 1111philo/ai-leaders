import React from 'react';

const requirements = [
    {
        title: "Dedicated Faculty Time",
        body: "Commit faculty or staff to facilitate the program, guide students, and coordinate with AI Leaders support."
    },
    {
        title: "Technical Facilities",
        body: "Provide students with access to computers and reliable internet for remote coursework and project work."
    },
    {
        title: "Student Support Services",
        body: "Offer advising, tutoring, or other support mechanisms to help students stay on track and complete the credential."
    },
    {
        title: "Program Promotion",
        body: "Actively recruit and promote the credential to eligible students through existing channels and enrollment pathways."
    }
];

const PartnerRequirements: React.FC = () => {
    return (
        <section id="requirements" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        What We <span className="text-gray-300">Need.</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        To ensure student success, partner institutions commit minimum resources in staff time and facilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {requirements.map((requirement, index) => (
                        <div
                            key={requirement.title}
                            className="relative p-8 border border-white/30 rounded-2xl bg-white/[0.02] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                        >
                            <div className="text-4xl font-black text-white/30 mb-4">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{requirement.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{requirement.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerRequirements;
