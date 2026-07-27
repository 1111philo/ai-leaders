
import React from 'react';
import uicLogo from '../assets/partner-uic.png';
import wordpressLogo from '../assets/partner-wordpress.png';
import latechLogo from '../assets/partner-latech.png';
import ullLogo from '../assets/partner-ull.png';

const Partners: React.FC = () => {
    const partners = [
        {
            name: "University of Illinois Chicago",
            logo: uicLogo,
            url: "http://uic.edu/"
        },
        {
            name: "WordPress",
            logo: wordpressLogo,
            url: "https://wordpress.org"
        },
        {
            name: "Louisiana Tech University",
            logo: latechLogo,
            url: "https://www.latech.edu/"
        },
        {
            name: "University of Louisiana at Lafayette",
            logo: ullLogo,
            url: "https://louisiana.edu/educate"
        }
    ];

    return (
        <section id="partners" aria-labelledby="partners-heading" className="py-24 bg-zinc-950 border-y border-white/20">
            <div className="container mx-auto px-6 text-center">
                <h2 id="partners-heading" className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-12">AI Leaders Partners</h2>

                <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 list-none m-0 p-0">
                    {partners.map((partner) => (
                        <li key={partner.name}>
                            <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${partner.name} (opens in a new tab)`}
                                className="h-32 bg-white/[0.02] border border-white/30 rounded-xl flex items-center justify-center hover:bg-white/5 hover:border-white/40 transition-all duration-300 group p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                            >
                                {/* Logo is decorative: the link's aria-label already names the partner. */}
                                <img
                                    src={partner.logo}
                                    alt=""
                                    className="max-h-full max-w-full w-auto object-contain transition-all duration-500 group-hover:scale-105"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Partners;

