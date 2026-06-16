import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TransparencyStage = 0 | 1 | 2 | 3 | 4; // 0: Titles, 1: Explanations, 2: Full Rubric, 3: Orientation Selection, 4: Final Success

interface EvaluationDimensionsProps {
    stage: TransparencyStage;
    scores?: Record<string, number>; // 0-100
    feedback?: Record<string, string>; // Dynamic feedback from AI
}

const EvaluationDimensions: React.FC<EvaluationDimensionsProps> = ({ stage, scores, feedback }) => {
    const dimensions = [
        {
            id: 'curiosity',
            title: 'Curiosity',
            initialComment: 'We value applicants who dig deeper than the basics.',
            explanation: 'Your response shows a healthy level of inquiry, specifically in how you linked different technical concepts.',
            rubric: 'We look for evidence that you didn\'t just answer the question but asked "why?" or "how?"—exploring related concepts or trying multiple approaches.'
        },
        {
            id: 'clarity',
            title: 'Clarity',
            initialComment: 'Clear, concise communication is essential for AI Leaders.',
            explanation: 'Structure is good, but consider breaking down your project descriptions into more distinct phases.',
            rubric: 'Good communication is key. We look for structure, clear language, and a logical flow that connects your skills to your goals.'
        },
        {
            id: 'motivation',
            title: 'Motivation',
            initialComment: 'We want to see your drive for a living-wage career.',
            explanation: 'Your passion for the career transition is evident and highly rated by our analysis.',
            rubric: 'We want to see that you understand what this career path offers and have a personal drive to achieve it, beyond just "getting a job."'
        },
        {
            id: 'experience',
            title: 'Technical Experience',
            initialComment: 'We value hands-on effort and project depth.',
            explanation: 'You clearly articulated your role in previous projects, which demonstrates solid technical foundations.',
            rubric: 'We look for specific examples of technical projects you have worked on. The detail and complexity of your involvement are key.'
        }
    ];

    return (
        <div className="space-y-4 w-full">
            {dimensions.map((dim) => {
                const score = scores?.[dim.id] || 0;
                const isGenerated = stage >= 1;

                return (
                    <motion.div
                        key={dim.id}
                        layout
                        className={`p-6 rounded-xl border transition-all duration-500 overflow-hidden relative ${isGenerated
                            ? `bg-zinc-900/50 shadow-lg shadow-white/5 ${score >= 80 ? 'border-green-500/50' : score >= 50 ? 'border-yellow-500/50' : 'border-indigo-500/50'
                            }`
                            : 'bg-black/40 border-white/30 shadow-none'
                            }`}
                    >
                        {isGenerated && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-bl-lg ${score >= 80 ? 'bg-green-500 text-black' : score >= 50 ? 'bg-yellow-500 text-black' : 'bg-indigo-500 text-white'
                                    }`}
                            >
                                AI Analysis
                            </motion.div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-1">
                                <motion.h4
                                    layout="position"
                                    className={`font-bold text-white ${isGenerated ? 'text-lg' : 'text-base text-gray-300'}`}
                                >
                                    {dim.title}
                                </motion.h4>
                            </div>

                            {isGenerated && scores && scores[dim.id] !== undefined && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-end"
                                >
                                    <span className="text-2xl font-black text-white tracking-normal">{scores[dim.id]}%</span>
                                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${scores[dim.id]}%` }}
                                            className={`h-full ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-indigo-500'}`}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                {isGenerated ? (feedback?.[dim.id] || dim.explanation) : dim.initialComment}
                            </p>

                            <AnimatePresence>
                                {stage >= 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="mt-4 pt-4 border-t border-white/30">
                                            <p className="text-[10px] text-gray-300 uppercase font-black tracking-widest mb-1.5 opacity-60">Scoring Rubric</p>
                                            <p className="text-sm text-gray-300 italic leading-relaxed">
                                                {dim.rubric}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default EvaluationDimensions;
