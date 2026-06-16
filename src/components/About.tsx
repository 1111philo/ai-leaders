import React from 'react';
import processGraphic from '../assets/course-process.png';

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Bridging the Gap to the <span className="text-gray-300">Future of Tech.</span>
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                AI Leaders is a remote program that helps you harness Generative AI and WordPress powers &mdash; the technical pairing currently opening doors to living-wage jobs.
                            </p>
                            <p>
                                AI Leaders is reflective by design. Most programs stack skills and hope a career follows. In our experience, people keep jobs longer when they've established <em>who they are</em> than when they're showcasing what they've just learned &mdash; tools change, the person using them is what lasts. So every lesson pairs the technical work with the reflective work, on purpose.
                            </p>
                            <div className="flex gap-4 mt-8">
                                <div className="p-4 border border-white/30 rounded-lg bg-white/10 w-full">
                                    <h3 className="text-xl font-bold mb-2">AI Tooling</h3>
                                    <p className="text-sm text-gray-300">Master prompting, agents, and LLM integration.</p>
                                </div>
                                <div className="p-4 border border-white/30 rounded-lg bg-white/10 w-full">
                                    <h3 className="text-xl font-bold mb-2">WordPress</h3>
                                    <p className="text-sm text-gray-300">Build professional, scalable websites.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative flex justify-center">
                        <img
                            src={processGraphic}
                            alt="Course Process: AI Literacy Mastery, WordPress Micro Credential, and Job Placement"
                            className="w-full max-w-lg rounded-2xl shadow-2xl border border-white/30"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
