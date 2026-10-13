
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
            question: "What is the AI Leaders Program and what do I get?",
            answer: "A remote micro-credential program on a mission to upskill students and professionals in AI leadership so they can land living-wage jobs. All graduates receive a micro-credential certificate as proof of completion and a WordPress-powered portfolio. Those selected as top 40 finalists who are seeking employment also receive expert career coaching, a letter of recommendation, and connections to hiring employers — plus more exciting perks to be announced along the way."
        },
        {
            question: "How is this different from a bootcamp?",
            answer: "AI Leaders is reflective by design. Bootcamps optimize for the day you get hired; we optimize for the years after. In our experience, people keep jobs longer when they've established who they are than when they're showcasing a stack of newly learned skills — so self-knowledge is built into the curriculum alongside the technical work."
        },
        {
            question: "Who can apply?",
            answer: "AI Leaders is for students and professionals seeking to compete in today's job market. Anyone can apply, though only participants from partner organizations are eligible to be selected as top 40 finalists."
        },
        {
            question: "How do I register, and how are participants selected?",
            answer: (
                <div className="space-y-4">
                    <p>When a cohort is open for applications, the application will be added to this site. The application system immediately informs you if you are a strong candidate.</p>
                    <p>Strong candidates are invited to register for a cohort orientation. Orientation participants are introduced to the program and invited in.</p>
                    <p>On the platform, you can select courses. The top 40 finalists are selected based on community engagement and quality of work, and receive career coaching, connections to hiring organizations, and other exciting perks, as availability allows.</p>
                </div>
            )
        },

        {
            question: "Where do I take the program, and is there a place I can work from?",
            answer: "The program is fully remote and can be completed from wherever you are. Optional facility access is available at Louisiana Tech University, Cleveland State University, and the University of Illinois Chicago. Additional locations are added as needed."
        },
        {
            question: "When is the next cohort?",
            // No link here: the registration form is the very next section, so a
            // "Register" link immediately followed by a "Register" heading is
            // pure redundancy.
            answer: "Cohort 2 launches November 11, 2026. Register using the form below."
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
