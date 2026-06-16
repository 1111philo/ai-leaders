
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

interface Lesson {
    slug: string;
    id: string;
    title: string;
    domain: string;
    progression: string;
    content: string;
}

const Lessons: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        const modules = import.meta.glob('../content/lessons/*.md', { query: '?raw', import: 'default', eager: true });

        const loadedLessons = Object.entries(modules).map(([path, content]) => {
            const fileName = path.split('/').pop()?.replace('.md', '') || '';
            const fileContent = content as string;
            const match = fileContent.match(/---\n([\s\S]*?)\n---/);
            const frontmatterRaw = match ? match[1] : '';

            const frontmatter: any = {};
            frontmatterRaw.split('\n').forEach(line => {
                const [key, ...value] = line.split(':');
                if (key && value) {
                    let val = value.join(':').trim();
                    if (val.startsWith('"') && val.endsWith('"')) {
                        val = val.slice(1, -1);
                    }
                    frontmatter[key.trim()] = val;
                }
            });

            return {
                slug: fileName,
                id: frontmatter.id || '',
                title: frontmatter.title || fileName,
                domain: frontmatter.domain || '',
                progression: frontmatter.progression || '',
                content: fileContent
            };
        });

        // Sort by ID
        loadedLessons.sort((a, b) => {
            const idA = a.id.split('.').map(Number);
            const idB = b.id.split('.').map(Number);

            for (let i = 0; i < Math.max(idA.length, idB.length); i++) {
                const partA = idA[i] || 0;
                const partB = idB[i] || 0;
                if (partA !== partB) return partA - partB;
            }
            return 0;
        });

        setLessons(loadedLessons);
    }, []);

    const { isLessonComplete, getDomainProgress } = useProgress();
    const domainProgress = getDomainProgress(lessons);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">Curriculum Lessons</h1>

            {/* Progress Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                {Object.entries(domainProgress).map(([domain, stats]) => (
                    <div key={domain} className="bg-zinc-900 border border-white/30 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold text-zinc-400 mb-1">{domain.replace(/^\d+\.\s*/, '')}</h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-2xl font-bold text-white">{stats.completed}</span>
                            <span className="text-sm text-zinc-500 mb-1">/ {stats.total} completed</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-purple-500 h-full transition-all duration-500"
                                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => (
                    <Link to={`/lessons/${lesson.slug}`} key={lesson.slug} className="block group">
                        <div className="bg-zinc-900 border border-white/30 p-6 rounded-lg h-full transition-all duration-300 group-hover:bg-zinc-800 group-hover:border-white/30 group-hover:scale-[1.02]">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${lesson.domain === 'Domain' ? 'bg-gray-700' :
                                    lesson.domain === '0. Foundations' ? 'bg-blue-900 text-blue-100' :
                                        lesson.domain === '1. AI Leadership' ? 'bg-purple-900 text-purple-100' :
                                            lesson.domain === '2. WordPress' ? 'bg-orange-900 text-orange-100' :
                                                'bg-green-900 text-green-100' // Success Skills
                                    }`}>
                                    {lesson.domain.replace(/^\d+\.\s*/, '')}
                                </span>
                                <div className="flex items-center gap-2">
                                    {isLessonComplete(lesson.id) && (
                                        <span className="text-green-500 text-xs font-bold border border-green-500/30 bg-green-900/20 px-2 py-0.5 rounded">
                                            ✓ DONE
                                        </span>
                                    )}
                                    <span className="text-zinc-500 text-xs">{lesson.id}</span>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mb-2 group-hover:text-white text-zinc-100">{lesson.title}</h2>
                            <p className="text-zinc-400 text-sm mb-4">{lesson.progression}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Lessons;
