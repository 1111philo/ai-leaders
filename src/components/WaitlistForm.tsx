import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Registration goes straight into the plato wait list. No API key: a key in a
// static site is public, so this relies on the list being open in plato admin
// (Users → Wait List). The questions come from plato, so fields added there
// show up here without a deploy.
const PLATO_URL = 'https://plato.courses';

type UserField = {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'dropdown' | 'link' | 'phone';
    required: boolean;
    options?: string[];
};

type Status = 'loading' | 'open' | 'closed' | 'unavailable' | 'done';

const LABEL_CLASS = 'text-xs font-black uppercase tracking-widest text-zinc-300';
const INPUT_CLASS = 'w-full bg-zinc-900 border border-zinc-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-medium';

const ChevronIcon = () => (
    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    </div>
);

const RequiredMark = () => (
    // aria-required already announces it, so screen readers skip the visible mark.
    <span className="ml-2 normal-case tracking-normal font-medium text-zinc-400" aria-hidden="true">(required)</span>
);

const WaitlistForm: React.FC = () => {
    const [status, setStatus] = useState<Status>('loading');
    const [groups, setGroups] = useState<string[]>([]);
    const [userFields, setUserFields] = useState<UserField[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [group, setGroup] = useState('');
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
    const [website, setWebsite] = useState(''); // honeypot, see below
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getJson = (path: string) =>
            fetch(`${PLATO_URL}${path}`).then(r => {
                if (!r.ok) throw new Error(`${path} returned ${r.status}`);
                return r.json();
            });

        Promise.all([getJson('/v1/waitlist'), getJson('/v1/groups'), getJson('/v1/user-fields')])
            .then(([waitlist, groupData, fieldData]) => {
                setGroups(groupData.userGroups || []);
                setUserFields(fieldData.userFields || []);
                setStatus(waitlist.open ? 'open' : 'closed');
            })
            .catch(() => setStatus('unavailable'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const missing: string[] = [];
        if (!name.trim()) missing.push('Name');
        if (!email.trim()) missing.push('Email Address');
        if (groups.length > 0 && !group) missing.push('Affiliation');
        userFields.forEach(f => {
            if (f.required && !(fieldValues[f.id] || '').trim()) missing.push(f.label);
        });
        if (missing.length) {
            setError(`Please fill in: ${missing.join(', ')}.`);
            return;
        }

        setSubmitting(true);
        setError('');
        try {
            const customFields: Record<string, string> = {};
            Object.entries(fieldValues).forEach(([id, value]) => {
                if (value.trim()) customFields[id] = value.trim();
            });
            const res = await fetch(`${PLATO_URL}/v1/waitlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    userGroup: group || undefined,
                    customFields: Object.keys(customFields).length ? customFields : undefined,
                    website: website || undefined,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || 'Registration failed. Please try again.');
            setStatus('done');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderField = (f: UserField) => {
        const id = `waitlist-${f.id}`;
        const common = {
            id,
            value: fieldValues[f.id] || '',
            'aria-required': f.required || undefined,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                setFieldValues(prev => ({ ...prev, [f.id]: e.target.value })),
        };

        let control: React.ReactNode;
        if (f.type === 'textarea') {
            control = <textarea rows={3} className={`${INPUT_CLASS} resize-y`} {...common} />;
        } else if (f.type === 'dropdown') {
            control = (
                <div className="relative">
                    <select className={`${INPUT_CLASS} appearance-none cursor-pointer pr-12`} {...common}>
                        <option value="">Select...</option>
                        {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronIcon />
                </div>
            );
        } else if (f.type === 'phone') {
            control = <input type="tel" autoComplete="tel" className={INPUT_CLASS} {...common} />;
        } else if (f.type === 'link') {
            control = <input type="url" inputMode="url" placeholder="https://" className={INPUT_CLASS} {...common} />;
        } else {
            control = <input type="text" className={INPUT_CLASS} {...common} />;
        }

        return (
            <div key={f.id} className="space-y-3">
                <label htmlFor={id} className={LABEL_CLASS}>
                    {f.label}
                    {f.required && <RequiredMark />}
                </label>
                {control}
            </div>
        );
    };

    let body: React.ReactNode;
    if (status === 'loading') {
        body = <p className="text-center text-zinc-300" role="status">Loading registration...</p>;
    } else if (status === 'done') {
        body = (
            <p className="text-center text-lg text-white" role="status">
                You're registered for Cohort 2. We'll email you an invitation to join.
            </p>
        );
    } else if (status === 'closed') {
        body = <p className="text-center text-lg text-zinc-300">Registration is closed right now. Please check back soon.</p>;
    } else if (status === 'unavailable') {
        body = <p className="text-center text-lg text-zinc-300">Registration couldn't load. Please refresh the page or try again later.</p>;
    } else {
        body = (
            <form onSubmit={handleSubmit} noValidate>
                {error && (
                    <div className="mb-8 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-200" role="alert">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-3">
                        <label htmlFor="waitlist-name" className={LABEL_CLASS}>Name<RequiredMark /></label>
                        <input id="waitlist-name" type="text" autoComplete="name" maxLength={200} aria-required="true"
                            value={name} onChange={e => setName(e.target.value)} className={INPUT_CLASS} />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="waitlist-email" className={LABEL_CLASS}>Email Address<RequiredMark /></label>
                        <input id="waitlist-email" type="email" autoComplete="email" maxLength={200} aria-required="true"
                            value={email} onChange={e => setEmail(e.target.value)} className={INPUT_CLASS} />
                    </div>
                </div>

                <div className="space-y-8 mb-10">
                    {groups.length > 0 && (
                        <div className="space-y-3">
                            <label htmlFor="waitlist-group" className={LABEL_CLASS}>Affiliation<RequiredMark /></label>
                            <div className="relative">
                                <select id="waitlist-group" aria-required="true" value={group} onChange={e => setGroup(e.target.value)}
                                    className={`${INPUT_CLASS} appearance-none cursor-pointer pr-12`}>
                                    <option value="">Select your affiliation...</option>
                                    {groups.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                                <ChevronIcon />
                            </div>
                        </div>
                    )}
                    {userFields.map(renderField)}
                </div>

                {/* Honeypot: off-screen, hidden from assistive tech, and out of the tab
                    order, so only bots fill it. Plato silently drops those entries. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="waitlist-website">Website</label>
                    <input id="waitlist-website" type="text" name="website" tabIndex={-1} autoComplete="off"
                        value={website} onChange={e => setWebsite(e.target.value)} />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="group relative w-full font-black py-5 rounded-2xl border border-white/30 mt-4 text-xs tracking-[0.2em] uppercase overflow-hidden flex items-center justify-center transition-colors duration-300 cursor-pointer hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-70"
                >
                    {/* A span, not a div: a div inside a button made VoiceOver
                        announce the control as a group. */}
                    <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 z-0 block bg-blue-500/5 rounded-2xl blur-lg"
                        animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.98, 1.02, 0.98] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {submitting ? 'Registering...' : 'Register'}
                    </span>
                </button>
            </form>
        );
    }

    return (
        <section id="apply" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Register for Cohort 2 - Launching 11/11/26</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
                        <strong>Cohort 2 launches November 11, 2026.</strong> Register below to get launch details and next steps.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="relative bg-black border border-white/30 p-10 rounded-3xl shadow-2xl overflow-hidden">
                        {body}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WaitlistForm;
