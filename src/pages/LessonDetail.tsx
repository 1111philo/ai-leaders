
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import LessonAssessment from '../components/LessonAssessment';
import LessonChat from '../components/LessonChat';

interface Lesson {
    slug: string;
    id: string;
    title: string;
    domain: string;
    progression: string;
    content: string;
    rawContent: string;
    mastery_criteria: string;
}

const LessonDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        const loadLesson = async () => {
            const modules = import.meta.glob('../content/lessons/*.md', { query: '?raw', import: 'default', eager: true });
            const path = `../content/lessons/${slug}.md`;
            const content = modules[path] as string;

            if (content) {
                const match = content.match(/---\n([\s\S]*?)\n---/);
                const frontmatterRaw = match ? match[1] : '';
                const body = content.replace(/---\n([\s\S]*?)\n---/, '').trim();

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

                setLesson({
                    slug: slug || '',
                    id: frontmatter.id || '',
                    title: frontmatter.title || '',
                    domain: frontmatter.domain || '',
                    progression: frontmatter.progression || '',
                    content: body.replace(/^#\s+.*?\n/, ''),
                    rawContent: content,
                    mastery_criteria: frontmatter.mastery_criteria || ''
                });
            }
        };

        if (slug) loadLesson();
    }, [slug]);

    if (!lesson) {
        return <div className="text-center py-20">Loading lesson...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <Link to="/lessons" className="text-zinc-500 hover:text-white mb-6 inline-block">&larr; Back to Curriculum</Link>
                <div className="mb-8">
                    <span className="text-sm text-purple-400 font-semibold">{lesson.domain.replace(/^\d+\.\s*/, '')} &bull; {lesson.id}</span>
                    <h1 className="text-4xl font-bold mt-2 mb-4">{lesson.title}</h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <ReactMarkdown>{lesson.content}</ReactMarkdown>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/30 pt-8">
                    <LessonAssessment
                        lessonTitle={lesson.title}
                        lessonId={lesson.id}
                        masteryCriteria={lesson.mastery_criteria}
                    />
                </div>
            </div>

            <div className="lg:w-1/3 border-l border-white/30 pl-0 lg:pl-12 pt-8 lg:pt-0">
                <div className="sticky top-24">
                    <LessonChat
                        lessonContext={lesson.rawContent}
                        lessonTitle={lesson.title}
                        masteryCriteria={lesson.mastery_criteria}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;
