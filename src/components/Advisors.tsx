import React from 'react';
import { motion } from 'framer-motion';
import maryPortrait from '../assets/mary.jpg';
import blakePortrait from '../assets/blake.jpg';
import stefinPortrait from '../assets/stefin.jpg';

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const Advisors: React.FC = () => {
    const advisors = [
        {
            name: "Mary Hubbard",
            role: "Executive Director, WordPress",
            image: maryPortrait,
            bio: "Mary serves as the Executive Director of WordPress, leading the open-source project that powers over 40% of the web. With over 20 years of experience in product leadership and program management, she has held key roles at TikTok, eBay, and Automattic. Mary is a passionate advocate for open source sustainability and empowering the next generation of creators.",
            linkedin: "https://www.linkedin.com/in/maryfhubbard/"
        },
        {
            name: "Blake Bertuccelli-Booth",
            role: "Entrepreneur & Founder",
            image: blakePortrait,
            bio: "An entrepreneur at heart, Blake ran a successful WordPress agency before founding Equalify, a pioneering web accessibility platform now maintained by the University of Illinois Chicago. He brings deep expertise in building sustainable web businesses and is dedicated to fostering an inclusive digital ecosystem.",
            linkedin: "https://www.linkedin.com/in/blake1111/"
        },
        {
            name: "Stefin Pasternak",
            role: "Leader, Educator & Founder",
            image: stefinPortrait,
            bio: "Stefin is an equity-focused leader at UIC and an experienced educator who founded the Living School. His work bridges technology, education, and community building, with a focus on creating pathways for meaningful employment and civic engagement through open source technology.",
            linkedin: "https://www.linkedin.com/in/stephen-pasternak-11979b155"
        }
    ];

    return (
        <section id="advisors" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Your Advisors</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Your advisors are industry veterans who know what it takes to get an Living-Wage WordPress job. We're your coaches. Your advocates.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {advisors.map((advisor, idx) => (
                        <div key={idx} className="flex flex-col h-full">
                            <div className="aspect-[4/5] bg-zinc-900 rounded-xl mb-8 overflow-hidden relative border border-white/30">
                                <motion.img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    initial={{ filter: "grayscale(100%)", opacity: 0.9 }}
                                    whileInView={{ filter: "grayscale(0%) saturate(120%)", opacity: 1 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-white">{advisor.name}</h3>
                                    <a
                                        href={advisor.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-300 hover:text-[#0077b5] transition-colors p-1"
                                        aria-label={`${advisor.name}'s LinkedIn`}
                                    >
                                        <LinkedinIcon className="w-5 h-5" />
                                    </a>
                                </div>

                                <p className="text-sm text-indigo-400 font-semibold tracking-wide uppercase mb-4">
                                    {advisor.role}
                                </p>

                                <p className="text-gray-300 leading-relaxed">
                                    {advisor.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advisors;
