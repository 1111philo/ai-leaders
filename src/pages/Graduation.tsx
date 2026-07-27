import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

interface Finalist {
    name: string;
    institution: string;
    role?: string;
    url: string;
}

const finalists: Finalist[] = [
    { name: 'Sharaheel Ali', institution: 'University of Illinois Chicago', role: 'Coding Instructor · Code Ninjas', url: 'https://sharali.blog/' },
    { name: 'Henry Perkins', institution: 'Independent', url: 'https://hperkins.blog' },
    { name: 'Nefthali Arizmendi', institution: 'University of Illinois Chicago', url: 'https://nefthaliarizmendi.blog/' },
    { name: 'Yinkun Qu', institution: 'University of Illinois Chicago', role: 'SDE', url: 'https://kanes.blog/' },
    { name: 'Elijah Burr', institution: 'University of Illinois Chicago', url: 'https://eliburr.blog/' },
    { name: 'Ruiping Huang', institution: 'University of Illinois Chicago', url: 'https://ruipinghuang.blog/' },
    { name: 'Aaron Larson', institution: 'Louisiana Tech University', url: 'https://aaronjlarson.blog' },
    { name: 'Akiem Martin', institution: 'University of Louisiana at Lafayette', url: 'https://akiemmartin.wordpress.com/' },
    { name: 'Alex Chan', institution: 'University of Illinois Chicago', url: 'https://acthetrader.blog/' },
    { name: 'Amanda Gill', institution: 'Louisiana Tech University', role: 'Coordinator of Campus Employer Activities · Louisiana Tech University', url: 'https://amandagill.blog/' },
    { name: 'Andrew Yu', institution: 'University of Illinois Chicago', role: 'Data Analyst Intern · Gala Circle Inc.', url: 'https://andrewyu1229.blog/' },
    { name: 'Angela Adwoa Coffie', institution: 'University of Illinois Chicago', role: 'Nurse', url: 'http://angiebridgescare.wordpress.com/' },
    { name: 'Aurora McCain', institution: 'Louisiana Tech University', role: 'Forestry Intern · Weyerhaeuser', url: 'https://aurorafieldnotes.blog/' },
    { name: 'Charity Eiland', institution: 'Louisiana Tech University', url: 'https://charityeiland.blog' },
    { name: 'Christopher Harrison', institution: 'University of Illinois Chicago', url: 'https://christopherharrison.blog/' },
    { name: 'Daniel Heller', institution: 'University of Illinois Chicago', role: 'Student · UIC', url: 'https://csircles.blog/' },
    { name: 'Enkhtsetseg Shirendev', institution: 'Independent', role: 'Founder · Future Thinking', url: 'https://enkhtsetsegshiren.com/' },
    { name: 'Faithe Metellus', institution: 'University of Illinois Chicago', url: 'https://faithinaihealth.blog' },
    { name: 'Furqan Ali', institution: 'University of Illinois Chicago', role: 'Startup Program Intern · Everyone Can Code Chicago', url: 'https://furqanali.blog/' },
    { name: 'Harrison Gothelf', institution: 'University of Illinois Chicago', role: 'Legal Intern · Wenixo', url: 'https://harrisonaileaders.blog/' },
    { name: 'Kharielle Lewis', institution: 'Independent', url: 'https://the-pink-room.blog' },
    { name: 'Marina Ridchenko', institution: 'University of Illinois Chicago', role: 'Teaching Assistant · UIC', url: 'https://marinaridchenko.blog' },
    { name: 'Michael Gilmore', institution: 'Louisiana Tech University', role: 'Student Support, Academic Affairs · Louisiana Tech University', url: 'https://michaelgilmore.work' },
    { name: 'Mohammad Alfaiz', institution: 'University of Illinois Chicago', url: 'https://mohammadalfaiz.blog/' },
    { name: 'Mubashra Sohail', institution: 'University of Illinois Chicago', url: 'https://sohailmubashra.blog/' },
    { name: 'Nickholas Gherman', institution: 'University of Illinois Chicago', role: 'Network Engineering Assistant · UIC Technology Solutions', url: 'https://nickholasg.blog/' },
    { name: 'Raheem Harris', institution: 'University of Louisiana at Lafayette', url: 'https://raheemharris.blog' },
    { name: 'Sabina Kurkowska', institution: 'University of Illinois Chicago', url: 'https://sabinakurkowska.blog/' },
    { name: 'Sadiksha Lamsal', institution: 'Louisiana Tech University', role: 'Undergraduate Researcher & SOC Analyst · Louisiana Tech University', url: 'https://lamsalsadiksha.blog/' },
    { name: 'Shalom Chime', institution: 'University of Illinois Chicago', role: 'Student · UIC', url: 'https://shalomchime.blog/' },
    { name: 'Stefan Poole', institution: 'Independent', role: 'Freelance Software / Workflow Engineer', url: 'https://stefanpoole.dev' },
    { name: 'Sujit Lopchan', institution: 'Louisiana Tech University', role: 'Software Engineering Intern · SleepNavigator', url: 'https://lopchan-ops.dev' },
    { name: 'Toochukwu Ogbonna', institution: 'Louisiana Tech University', role: 'Research Assistant · Louisiana Tech University', url: 'https://toochukwuogbonna.com/' },
    { name: 'William Dvorak', institution: 'University of Illinois Chicago', url: 'https://williamdvorak.blog/' },
];

const initials = (name: string) =>
    name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const shot = (url: string) =>
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=900&h=600`;

const stats = [
    { value: String(finalists.length), label: 'Finalists' },
    { value: '4', label: 'Institutions' },
    { value: '2026', label: 'Graduation' },
];

const Graduation: React.FC = () => {
    usePageTitle('Graduation');
    return (
        <div className="bg-black text-white">
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-60 z-0 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                            <span className="text-sm font-medium tracking-wide text-gray-300">Cohort 1 · Class of 2026</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                            Finalist <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Portfolios</span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Cohort One was designed to get students prepared for job placement. Explore the project portfolios built by Cohort One finalists.
                        </p>
                    </div>

                    <div className="flex justify-center gap-10 md:gap-16 mt-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{stat.value}</div>
                                <div className="text-sm tracking-wide text-gray-400 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {finalists.map((finalist) => (
                            <a
                                key={finalist.name}
                                href={finalist.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col rounded-2xl border border-white/30 bg-white/5 overflow-hidden transition-all hover:bg-white/10 hover:border-white/50 hover:-translate-y-1"
                            >
                                <div className="relative aspect-[3/2] bg-white/5 overflow-hidden">
                                    <img
                                        src={shot(finalist.url)}
                                        alt={`Screenshot of ${finalist.name}'s portfolio`}
                                        loading="lazy"
                                        width={900}
                                        height={600}
                                        className="w-full h-full object-cover object-top"
                                    />
                                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm border border-white/30 flex items-center justify-center text-sm font-bold">
                                        {initials(finalist.name)}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-xs font-medium tracking-wide text-indigo-300 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View portfolio ↗
                                    </span>
                                    <h3 className="text-lg font-bold">{finalist.name}</h3>
                                    <p className="text-sm text-gray-400">{finalist.institution}</p>
                                    {finalist.role && (
                                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{finalist.role}</p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 py-8">
                <div className="container mx-auto px-6 text-center text-sm text-gray-400">
                    Graduation 2026
                </div>
            </footer>
        </div>
    );
};

export default Graduation;
