import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { sendEmployerInquiry } from '../../services/notifications';
import { sendEmployerInquiryEmail } from '../../services/email';
import { syncToGoogleSheet } from '../../services/googleSheets';

const FieldError: React.FC<{ id?: string; message?: string }> = ({ id, message }) => {
    if (!message) return null;
    return (
        <div id={id} role="alert" className="flex items-center gap-1.5 mt-2">
            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{message}</p>
        </div>
    );
};

const EmployerForm: React.FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        roles: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        if (!formData.company) newErrors.company = "Please provide your company name.";
        if (!formData.name) newErrors.name = "Please provide your name.";
        if (!formData.email) {
            newErrors.email = "A work email is required so we can reach you.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address (e.g., name@company.com).";
        }
        if (!formData.roles) newErrors.roles = "Please tell us what roles you're hiring for.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErrorId = Object.keys(newErrors)[0];
            const element = document.getElementById(firstErrorId);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!executeRecaptcha) {
            console.warn("ReCAPTCHA has not yet loaded. Please try again in a moment.");
            return;
        }

        const token = await executeRecaptcha('employer_inquiry');
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (!token && !isLocalhost) {
            alert("Security verification failed. Please try again.");
            return;
        }

        setIsSubmitting(true);
        try {
            await Promise.all([
                sendEmployerInquiry(formData),
                sendEmployerInquiryEmail(formData),
                syncToGoogleSheet({
                    email: formData.email,
                    firstName: formData.name,
                    affiliation: formData.company,
                    response: formData.roles
                })
            ]);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section id="connect" className="py-24 bg-zinc-950 min-h-[60vh] flex items-center justify-center">
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
                        <h2 className="text-3xl font-bold text-white mb-4">Thanks — We'll Be in Touch</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            We've received your inquiry and will reach out shortly to learn more about your hiring needs.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="connect" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Hire AI Leaders</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        Tell us what you're hiring for and we'll connect you with vetted, AI-enabled candidates.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-black border border-white/30 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-3">
                            <label htmlFor="company" className="text-xs font-black uppercase tracking-widest text-zinc-300">Company Name</label>
                            <input
                                type="text"
                                id="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                aria-invalid={!!errors.company}
                                aria-describedby={errors.company ? 'company-error' : undefined}
                                className={`w-full bg-zinc-900 border ${errors.company ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                                required
                            />
                            <FieldError id="company-error" message={errors.company} />
                        </div>
                        <div className="space-y-3">
                            <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-zinc-300">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className={`w-full bg-zinc-900 border ${errors.name ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                                required
                            />
                            <FieldError id="name-error" message={errors.name} />
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-zinc-300">Work Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={`w-full bg-zinc-900 border ${errors.email ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium`}
                            required
                        />
                        <FieldError id="email-error" message={errors.email} />
                    </div>

                    <div className="space-y-3 mb-10">
                        <label htmlFor="roles" className="text-xs font-black uppercase tracking-widest text-zinc-300">What Roles Are You Hiring For?</label>
                        <textarea
                            id="roles"
                            value={formData.roles}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Tell us about the roles, skills, and timeline you have in mind."
                            aria-invalid={!!errors.roles}
                            aria-describedby={errors.roles ? 'roles-error' : undefined}
                            className={`w-full bg-zinc-950 border ${errors.roles ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500/50' : 'border-zinc-600'} rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all text-sm leading-relaxed`}
                            required
                        ></textarea>
                        <FieldError id="roles-error" message={errors.roles} />
                    </div>

                    <div className="space-y-4 mb-4">
                        <p className="text-xs text-zinc-300 font-mono px-2">
                            This site is protected by reCAPTCHA and the Google{' '}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Privacy Policy</a>{' '}
                            and{' '}
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Terms of Service</a>{' '}
                            apply.
                        </p>
                        {!import.meta.env.VITE_RECAPTCHA_SITE_KEY && (
                            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-center">
                                <p className="text-red-400 text-xs font-bold mb-1">Configuration Error</p>
                                <p className="text-gray-300 text-[10px] leading-relaxed">
                                    ReCAPTCHA Site Key is missing. Check your <code className="text-white">.env</code> file.
                                </p>
                            </div>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting || !executeRecaptcha}
                        className="group relative w-full font-black py-5 rounded-2xl border border-white/30 mt-4 text-xs tracking-[0.2em] uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300 cursor-pointer hover:bg-white hover:text-black"
                    >
                        <motion.div
                            className="absolute inset-0 z-0 bg-blue-500/5 rounded-2xl blur-lg"
                            animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.98, 1.02, 0.98] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Get in Touch
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </span>
                    </motion.button>
                </form>
            </div>
        </section>
    );
};

export default EmployerForm;
