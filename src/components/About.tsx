import React from 'react';
import FinalistsPanel from './FinalistsPanel';

const About: React.FC = () => {
    return (
        <section id="about" aria-labelledby="about-heading" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <h2 id="about-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Bridging the Gap to <span className="text-gray-300">Your Workforce Potential.</span>
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                <strong className="font-bold text-white">AI Leaders</strong> prepares students for living-wage jobs. Our 3-month cohorts pair self-guided lessons with real job placement opportunities.
                            </p>
                            <p>
                                Our courses are built for reflection. Most programs teach skill after skill and assume a career will follow. But we've found that people hold onto jobs longer when they know <em>who they are</em>, not just what they last learned &mdash; tools come and go, the person using them stays. That's why every lesson pairs technical work with reflection, on purpose.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <div className="p-4 border border-white/30 rounded-lg bg-white/10 w-full">
                                    <h3 className="text-xl font-bold mb-2">AI Leader Micro Credential</h3>
                                    <p className="text-sm text-gray-300">Master core concepts of AI literacy.</p>
                                </div>
                                <div className="p-4 border border-white/30 rounded-lg bg-white/10 w-full">
                                    <h3 className="text-xl font-bold mb-2">WordPress Portfolio</h3>
                                    <p className="text-sm text-gray-300">Build a website for your professional identity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <FinalistsPanel />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
