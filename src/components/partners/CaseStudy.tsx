import React from 'react';
import FinalistsPanel from '../FinalistsPanel';

const CaseStudy: React.FC = () => {
    return (
        <section id="case-study" aria-labelledby="case-study-heading" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                            <span className="text-sm font-medium tracking-wide text-gray-300">Case Study · WordPress</span>
                        </div>
                        <h2 id="case-study-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Building the Next Generation of <span className="text-gray-300">WordPress Leaders.</span>
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                WordPress wanted to leverage their platform for new educational opportunities.
                            </p>
                            <p>
                                We built a course that centered students' job search around building a WordPress portfolio. Along the way, participants contribute to real projects, get to know the platform, and prove their skills through evidence, not tests.
                            </p>
                            <p>
                                The result: a new generation of WordPress-enabled leaders.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <FinalistsPanel
                            headingId="case-study-finalists-heading"
                            heading="WordPress Cohort Finalists"
                            description="34 finalists shipped production-ready WordPress portfolios — and joined the contributor pipeline."
                            ctaLabel="View All Portfolios"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudy;
