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
