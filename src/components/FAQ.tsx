
import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentId = `faq-content-${question.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="border-b border-white/30">
            {/* The question is a heading so screen reader users can navigate the
                FAQ by heading; the button inside it is what toggles the answer. */}
            <h3 className="m-0">
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
            </h3>
            {/* `hidden` (not just max-height:0) so collapsed answers are genuinely
                gone: out of the accessibility tree and out of the tab order. The
                previous max-h-0 version stayed readable to screen readers, and
                max-h-96 clipped the longer answers when open. */}
            <div id={contentId} hidden={!isOpen}>
                <div className="text-gray-300 leading-relaxed max-w-2xl pb-6">{answer}</div>
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
                    <p>When a cohort is open for applications, the application will be added to this site. The application system immediately informs you if you are a strong candidate.</p>
                    <p>Strong candidates are invited to register for a cohort orientation. Orientation participants are introduced to the program and invited in.</p>
                    <p>On the platform, you can select courses. Top Learners are selected for outcomes, as availability allows.</p>
                </div>
            )
        },

        {
            question: "Where do I take the program, and is there a place I can work from?",
            answer: "The program is remote. Optional facility access is available at Louisiana Tech, University of Louisiana Lafayette, and University of Illinois Chicago. Additional locations are added as needed."
        },
        {
            question: "When is the next cohort?",
            // No link here: the subscribe form is the very next section, so a
            // "Subscribe for updates" link immediately followed by a
            // "Subscribe for updates" heading is pure redundancy.
            answer: "We're aiming to announce more by Summer 2026. Use the subscribe form below to be the first to know."
        }
    ];

    return (
        <section id="faq" aria-labelledby="faq-heading" className="py-24 bg-black">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 id="faq-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
                {/* A real list, so screen readers announce "6 items" up front. */}
                <ul className="space-y-2 list-none m-0 p-0">
                    {faqs.map((faq, index) => (
                        <li key={index}>
                            <FaqItem question={faq.question} answer={faq.answer} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FAQ;
