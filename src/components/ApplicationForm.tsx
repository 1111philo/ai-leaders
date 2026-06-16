import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import type { TransparencyStage } from './EvaluationDimensions';
import EvaluationDimensions from './EvaluationDimensions';
import { analyzeApplication } from '../services/ai';
import { sendNotification, sendOrientationSelection } from '../services/notifications';
import { syncToGoogleSheet } from '../services/googleSheets';

const ApplicationForm: React.FC = () => {
    const [stage, setStage] = useState<TransparencyStage>(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSubmittingOrientation, setIsSubmittingOrientation] = useState(false);
    const [orientationSelection, setOrientationSelection] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.createsend1.com/javascript/copypastesubscribeformlogic.js';
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const ORIENTATION_DETAILS: Record<string, { start: string, end: string, zoom: string, googleDates: string }> = {
        'March 18, 11:00 AM – 12:30 PM CST': {
            start: '20260318T110000',
            end: '20260318T123000',
            googleDates: '20260318T160000Z/20260318T173000Z',
            zoom: 'https://uic.zoom.us/j/86432720876?pwd=o1NMd7ofuR8p2rVm4l8aZwfGNBiaQ2.1'
        },
        'March 19, 6:00 PM – 7:30 PM CST': {
            start: '20260319T180000',
            end: '20260319T193000',
            googleDates: '20260319T230000Z/20260320T003000Z',
            zoom: 'https://uic.zoom.us/j/89904973433?pwd=RFASIn1S2vIfl2Eb7EhbwP19IToX06.1'
        }
    };

    const handleCopyLink = (url: string) => {
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const downloadICS = (option: string) => {
        const details = ORIENTATION_DETAILS[option];
        if (!details) return;

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//AI Leaders//Orientation//EN',
            'BEGIN:VEVENT',
            'UID:' + Date.now() + '@ai-leaders.org',
            'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
            `DTSTART:${details.start}`,
            `DTEND:${details.end}`,
            'SUMMARY:AI Leaders Orientation',
            `DESCRIPTION:Zoom Link: ${details.zoom}`,
            'LOCATION:Zoom',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'AI-Leaders-Orientation.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };




    const { executeRecaptcha } = useGoogleReCaptcha();

    const [scores, setScores] = useState<Record<string, number>>({
        curiosity: 0,
        clarity: 0,
        motivation: 0,
        experience: 0
    });
    const [aiFeedback, setAiFeedback] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        linkedin: '',
        affiliation: '',
        response: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validation
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "Please provide your first name.";
        if (!formData.lastName) newErrors.lastName = "Please provide your last name.";
        if (!formData.email) {
            newErrors.email = "Email address is required to contact you.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address (e.g., name@example.com).";
        }
        if (formData.linkedin && !formData.linkedin.includes('linkedin.com/')) {
            newErrors.linkedin = "Please enter a valid LinkedIn URL (must include linkedin.com).";
        }
        if (!formData.affiliation) newErrors.affiliation = "Please select your primary affiliation from the list.";
        if (!formData.response) {
            newErrors.response = "Please describe your projects and interest in the program.";
        } else if (formData.response.length < 50) {
            newErrors.response = "Your response is too brief. Please provide at least 50 characters to help us evaluate your candidacy.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Scroll to the first error
            const firstErrorId = Object.keys(newErrors)[0];
            const element = document.getElementById(firstErrorId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }



        // 3. Captcha Check & Token Generation
        if (!executeRecaptcha) {
            console.warn("ReCAPTCHA has not yet loaded. Please try again in a moment.");
            return;
        }

        const token = await executeRecaptcha?.('application_submit');
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        if (!token && !isLocalhost) {
            alert("Security verification failed. Please try again.");
            return;
        }

        // 4. Marketing Integration (Sync all information on every submission)
        syncToGoogleSheet(formData);

        setIsAnalyzing(true);

        try {
            // 5. AI Analysis
            const result = await analyzeApplication(formData.response);

            // Update scores and feedback from AI result
            const newScores = {
                curiosity: result.curiosity,
                clarity: result.clarity,
                motivation: result.motivation,
                experience: result.experience
            };
            setScores(newScores);
            setAiFeedback(result.feedback);

            // Calculate average score
            const averageScore = Object.values(newScores).reduce((a, b) => a + b, 0) / Object.values(newScores).length;



            // Check for immediate pass (80%+)
            if (averageScore >= 80) {
                await sendNotification({
                    ...formData,
                    scores: newScores,
                    status: 'ACCEPTED'
                });
                setStage(3);
                return;
            }

            // Determine Stage based on persistence
            if (stage === 0) {
                setStage(1); // Reveal Explanations
            } else if (stage === 1) {
                setStage(2); // Reveal Full Rubric
            }

        } catch (error: any) {
            console.error(error);
            alert(error.message || "An error occurred during analysis. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleOrientationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orientationSelection) return;

        setIsSubmittingOrientation(true);
        try {
            await Promise.all([
                sendOrientationSelection({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    selection: orientationSelection
                }),
                syncToGoogleSheet({
                    ...formData,
                    orientation: orientationSelection
                })
            ]);
            setStage(4);
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmittingOrientation(false);
        }
    };

    if (stage === 4) {
        return (
            <section id="apply" className="py-24 bg-zinc-950 min-h-[80vh] flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900/50 border border-green-500/30 p-12 rounded-2xl shadow-2xl backdrop-blur-sm"
                    >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Registration Confirmed</h2>
                        <div className="text-gray-300 mb-10 text-lg leading-relaxed space-y-4 text-center">
                            {orientationSelection === 'I cannot make either of those dates' ? (
                                <p>Thank you for letting us know. We will be in touch with alternative orientation options soon.</p>
                            ) : (
                                <>
                                    <p>We've confirmed your registration for the orientation on <span className="text-white font-bold">{orientationSelection}</span>.</p>

                                    <div className="mt-10 p-6 bg-white/5 border border-white/30 rounded-2xl text-left">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Your Zoom Link</h3>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <code className="flex-grow bg-black/40 border border-white/30 p-4 rounded-xl text-xs text-blue-400 break-all font-mono">
                                                {ORIENTATION_DETAILS[orientationSelection]?.zoom}
                                            </code>
                                            <button
                                                onClick={() => handleCopyLink(ORIENTATION_DETAILS[orientationSelection]?.zoom)}
                                                className="shrink-0 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                            >
                                                {isCopied ? (
                                                    <>
                                                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                        </svg>
                                                        Copy URL
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <a
                                            href={`https://www.google.com/calendar/render?action=TEMPLATE&text=AI+Leaders+Orientation&dates=${ORIENTATION_DETAILS[orientationSelection]?.googleDates}&details=Zoom+Link:+${encodeURIComponent(ORIENTATION_DETAILS[orientationSelection]?.zoom)}&location=Zoom`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-white/5 border border-white/30 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
                                            </svg>
                                            Add to Google Calendar
                                        </a>
                                        <button
                                            onClick={() => downloadICS(orientationSelection)}
                                            className="p-4 bg-white/5 border border-white/30 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-center transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download .ics File
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (stage === 3) {
        return (
            <section id="apply" className="py-24 bg-zinc-950 min-h-[80vh] flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/50 border border-green-500/30 p-10 md:p-12 rounded-3xl shadow-2xl backdrop-blur-md"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white">Strong Candidate</h2>
                        </div>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-10">
                            <p>
                                Based on your responses, you've demonstrated the curiosity, persistence, and willingness to improve that defines an AI Leader. <strong>You are invited to register for an orientation.</strong>
                            </p>
                            <p className="text-sm border-l-2 border-white/30 pl-6 text-gray-300 italic">
                                Orientation participants are introduced to the program and invited in. From the initial cohort, the 40 strongest are invited into the Full Credential — a paid opportunity to build a portfolio that competes for WordPress living-wage placements. It's designed for participants who've shown they're ready to harness their AI and WordPress powers in production work. Those who complete it earn a $1,000 honorarium.
                            </p>
                        </div>

                        <form onSubmit={handleOrientationSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Select an Orientation Date</h3>

                                {[
                                    'March 18, 11:00 AM – 12:30 PM CST',
                                    'March 19, 6:00 PM – 7:30 PM CST',
                                    'I cannot make either of those dates'
                                ].map((option) => (
                                    <label
                                        key={option}
                                        className={`flex items-center p-5 rounded-2xl border cursor-pointer transition-all ${orientationSelection === option
                                            ? 'bg-green-500/10 border-green-500/50 text-white'
                                            : 'bg-zinc-900/50 border-zinc-600 text-gray-300 hover:border-zinc-400'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="orientation"
                                            value={option}
                                            checked={orientationSelection === option}
                                            onChange={(e) => setOrientationSelection(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${orientationSelection === option ? 'border-green-400' : 'border-zinc-500'
                                            }`}>
                                            {orientationSelection === option && <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />}
                                        </div>
                                        <span className="font-medium">{option}</span>
                                    </label>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={!orientationSelection || isSubmittingOrientation}
                                className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
                            >
                                {isSubmittingOrientation ? "Registering..." : "Confirm Orientation Registration"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        );
    }



    return (
        <section id="apply" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Subscribe for updates</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
                        <strong>Cohort One is now full.</strong> Subscribe for updates and be the first to know when applications open for Cohort Two.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Center Column: The Form */}
                    <div className="w-full">
                        <form id="subForm" className="js-cm-form bg-black border border-white/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="5B5E7037DA78A748374AD499497E309E0871BD843AA9E2CFA467A8A3E7853931272BD796FD1DE54DBBECCB9B003E01BAC1231EF71648E4A2F7E698E44C38A9E1">
                            {/* Identity Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-3">
                                    <label htmlFor="fieldName" className="text-xs font-black uppercase tracking-widest text-zinc-300">Name</label>
                                    <input
                                        type="text"
                                        id="fieldName"
                                        name="cm-name"
                                        maxLength={200}
                                        className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="fieldEmail" className="text-xs font-black uppercase tracking-widest text-zinc-300">Email Address</label>
                                    <input
                                        type="email"
                                        id="fieldEmail"
                                        name="cm-nthljjj-nthljjj"
                                        maxLength={200}
                                        className="js-cm-email-input qa-input-email w-full bg-zinc-900 border border-zinc-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-8 mb-10">
                                <div className="space-y-3">
                                    <label htmlFor="fielddkjrtkyu" className="text-xs font-black uppercase tracking-widest text-zinc-300">Affiliation</label>
                                    <div className="relative group">
                                        <select
                                            id="fielddkjrtkyu"
                                            name="cm-fo-dkjrtkyu"
                                            className="w-full bg-zinc-900 border border-zinc-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium appearance-none cursor-pointer pr-12 hover:border-zinc-500"
                                            required
                                        >
                                            <option value="" disabled selected={true}>Select your affiliation...</option>
                                            <option value="34030736">University of Illinois Chicago</option>
                                            <option value="34030737">Louisiana Tech University</option>
                                            <option value="34030738">University of Louisiana at Lafayette</option>
                                            <option value="34030739">None</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300 group-hover:text-zinc-300 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group relative w-full font-black py-5 rounded-2xl border border-white/30 mt-4 text-xs tracking-[0.2em] uppercase overflow-hidden flex items-center justify-center transition-colors duration-300 cursor-pointer hover:bg-white hover:text-black"
                            >
                                <motion.div
                                    className="absolute inset-0 z-0 bg-blue-500/5 rounded-2xl blur-lg"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                        scale: [0.98, 1.02, 0.98],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Subscribe for Updates
                                </span>
                            </button>
                        </form>
                    </div>

                    {false && (
                        <>
                            <div className="lg:col-span-3 order-2 lg:order-1">
                        <form onSubmit={handleSubmit} className="bg-black border border-white/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                            {/* Identity Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-3">
                                    <label htmlFor="firstName" className="text-xs font-black uppercase tracking-widest text-zinc-300">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full bg-zinc-900 border ${errors.firstName ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                                        required
                                    />
                                    {errors.firstName && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.firstName}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="lastName" className="text-xs font-black uppercase tracking-widest text-zinc-300">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full bg-zinc-900 border ${errors.lastName ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                                        required
                                    />
                                    {errors.lastName && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.lastName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-8 mb-10">
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-300">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full bg-zinc-900 border ${errors.email ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                                        required
                                    />
                                    {errors.email && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.email}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="linkedin" className="text-xs font-black uppercase tracking-widest text-zinc-300">LinkedIn Profile URL (Optional)</label>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className={`w-full bg-zinc-900 border ${errors.linkedin ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                                    />
                                    {errors.linkedin && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.linkedin}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="affiliation" className="text-xs font-black uppercase tracking-widest text-zinc-300">Affiliation</label>
                                    <div className="relative group">
                                        <select
                                            id="affiliation"
                                            value={formData.affiliation}
                                            onChange={handleInputChange}
                                            className={`w-full bg-zinc-900 border ${errors.affiliation ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium appearance-none cursor-pointer pr-12 hover:border-zinc-500`}
                                            required
                                        >
                                            <option value="" disabled>Select your affiliation</option>
                                            <option value="University of Illinois Chicago">University of Illinois Chicago</option>
                                            <option value="University of Louisiana at Lafayette">University of Louisiana at Lafayette</option>
                                            <option value="Louisiana Tech University">Louisiana Tech University</option>
                                            <option value="None">None</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300 group-hover:text-zinc-300 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.affiliation && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.affiliation}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6 mt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-none px-3 py-1 bg-zinc-800 rounded text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                                            Application Task
                                        </div>
                                        <div className="flex-grow h-px bg-white/5" />
                                        <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-green-400 border border-green-500/20 px-3 py-1 rounded-full bg-green-500/5">
                                            AI Usage Encouraged
                                        </span>
                                    </div>
                                    <p className="text-xl md:text-2xl font-light text-white leading-relaxed max-w-2xl">
                                        Describe technical projects you've worked on and why you're interested in harnessing your AI and WordPress powers to earn a living-wage job.
                                    </p>
                                </div>
                                <textarea
                                    id="response"
                                    value={formData.response}
                                    onChange={handleInputChange}
                                    rows={12}
                                    className={`w-full bg-zinc-950 border ${errors.response ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-2xl px-6 py-6 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-mono text-sm leading-relaxed`}
                                    placeholder="Write your response here... feel free to use AI to help you draft and refine it."
                                    aria-label="Technical project description and personal interest"
                                    required
                                ></textarea>
                                {errors.response && (
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-10a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.response}</p>
                                    </div>
                                )}
                            </div>

                            {/* Feedback Area */}
                            <AnimatePresence>
                                {stage > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 p-6 rounded-2xl bg-yellow-900/10 border border-yellow-500/20 shadow-xl"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="text-3xl">🎯</span>
                                            <div>
                                                <h4 className="text-yellow-500 font-black text-sm uppercase tracking-wider mb-2">
                                                    {stage === 1 ? "Guidance: Level 1" : "Guidance: Final Push"}
                                                </h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {stage === 1
                                                        ? "Your draft has been analyzed. We've unlocked the 4 dimension explanations on the right to help you improve your score. Dig deeper into each area."
                                                        : "Great persistence! We've now unlocked the full scoring rubric. Align your response with these specific targets to complete your application."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Attempts & Status */}
                            <div className="mt-8 space-y-10">
                                {Object.keys(errors).length > 0 && (
                                    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-red-500 text-xs font-bold uppercase tracking-widest">Action Required</p>
                                            <p className="text-gray-300 text-[10px] leading-relaxed">
                                                Please correct the {Object.keys(errors).length} highlighted field{Object.keys(errors).length === 1 ? '' : 's'} above to continue.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-2">
                                        <p className="text-xs text-zinc-300 font-mono">
                                            This site is protected by reCAPTCHA and the Google{' '}
                                            <a
                                                href="https://policies.google.com/privacy"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline hover:text-white"
                                            >
                                                Privacy Policy
                                            </a>{' '}
                                            and{' '}
                                            <a
                                                href="https://policies.google.com/terms"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline hover:text-white"
                                            >
                                                Terms of Service
                                            </a>{' '}
                                            apply.
                                        </p>
                                    </div>
                                    {!import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
                                        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-center">
                                            <p className="text-red-400 text-xs font-bold mb-1">Configuration Error</p>
                                            <p className="text-gray-300 text-[10px] leading-relaxed">
                                                ReCAPTCHA Site Key is missing. Check your <code className="text-white">.env</code> file.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <motion.button
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                type="submit"
                                disabled={isAnalyzing || !executeRecaptcha}
                                className="group relative w-full font-black py-5 rounded-2xl border border-white/30 mt-4 text-xs tracking-[0.2em] uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300 cursor-pointer"
                            >
                                {/* 1. Pulsing Glow Layer */}
                                <motion.div
                                    className="absolute inset-0 z-0 bg-blue-500/5 rounded-2xl blur-lg"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                        scale: [0.98, 1.02, 0.98],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* 2. Background Layer */}
                                <motion.div
                                    className="absolute inset-0 z-1"
                                    variants={{
                                        initial: { backgroundColor: "rgba(24, 24, 27, 1)" },
                                        hover: { backgroundColor: "rgba(255, 255, 255, 1)" }
                                    }}
                                />

                                {/* 3. Continuous Color Shimmer */}
                                <motion.div
                                    className="absolute inset-0 z-2 w-[200%] h-full bg-gradient-to-r from-transparent via-blue-500/5 via-purple-500/15 via-blue-500/5 to-transparent"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />

                                {/* 4. Content */}
                                <motion.span
                                    className="relative z-10 flex items-center justify-center gap-3"
                                    variants={{
                                        initial: { color: "#ffffff" },
                                        hover: { color: "#000000" }
                                    }}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analyzing...
                                        </>
                                    ) : (
                                        stage === 0 ? "Submit Initial Draft" : "Process Revision"
                                    )}
                                </motion.span>
                            </motion.button>
                        </form>
                    </div>

                    {/* Column 4 & 5: Evaluation Dimensions (Right) */}
                    <div className="lg:col-span-2 space-y-10 order-1 lg:order-2">
                        <div className="border-l-2 border-white/30 pl-6 py-2">
                            <h3 className="text-2xl font-black text-white mb-3">Evaluation Criteria</h3>
                            <p className="text-zinc-300 leading-relaxed italic">
                                We don't judge you on what you already know. We value how you think, learn, and iterate.
                            </p>
                        </div>

                        <EvaluationDimensions stage={stage} scores={scores} feedback={aiFeedback} />

                        <div className="bg-white/5 border border-white/30 rounded-2xl p-6 mt-10">
                            <p className="text-xs text-gray-300 leading-relaxed italic">
                            </p>
                        </div>
                    </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ApplicationForm;
