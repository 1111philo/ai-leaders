
import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentId = `faq-content-${question.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="border-b border-white/30">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg group"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={contentId}
            >
                <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-zinc-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div id={contentId} className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                <div className="text-gray-300 leading-relaxed max-w-2xl">{answer}</div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "What is the AI Leader Program and what do I get?",
            answer: "A remote workforce program that helps you earn a WordPress micro-credential and compete for living-wage WordPress job placement."
        },
        {
            question: "How is this different from a bootcamp?",
            answer: "AI Leaders is reflective by design. Bootcamps optimize for the day you get hired; we optimize for the years after. In our experience, people keep jobs longer when they've established who they are than when they're showcasing a stack of newly learned skills — so self-knowledge is built into the curriculum alongside the technical work."
        },
        {
            question: "Who can apply?",
            answer: "AI Leaders is for those interested in exploring a career in technology."
        },
        {
            question: "How do I register, and how are participants selected?",
            answer: (
                <div className="space-y-4">
                    <p>Apply at AI-Leaders.org. The application system immediately informs you if you are a strong candidate.</p>
                    <p>Register for an Orientation. Strong candidates are invited to register for an AI Leaders orientation.</p>
                    <p>Attend an orientation. Orientation participants are introduced to the program and invited in.</p>
                    <p>From the initial cohort, the 40 strongest are invited into the Full Credential — a paid opportunity to build a portfolio that competes for WordPress living-wage placements. It's designed for participants who've shown they're ready to harness their AI and WordPress powers in production work. Those who complete it earn a $1,000 honorarium.</p>
                </div>
            )
        },

        {
            question: "Where do I take the program, and is there a place I can work from?",
            answer: "The program is remote. Optional facility access is available at Louisiana Tech, University of Louisiana Lafayette, Tulane University, and University of Illinois Chicago. Additional locations are added as needed."
        },
        {
            question: "When is the next cohort?",
            answer: (
                <p>
                    We're aiming to announce more by Summer 2026.{" "}
                    <a
                        href="#apply"
                        onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById('apply');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-white hover:text-gray-300 underline underline-offset-4 decoration-white/30 transition-colors"
                    >
                        Subscribe for updates
                    </a>
                    .
                </p>
            )
        }
    ];

    return (
        <section id="faq" className="py-24 bg-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
