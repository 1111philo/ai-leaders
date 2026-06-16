
import React, { useState } from 'react';
import { assessLessonWork } from '../services/ai';
import { syncToGoogleSheet } from '../services/googleSheets';

interface LessonAssessmentProps {
    lessonTitle: string;
    lessonId: string;
    masteryCriteria: string;
}

const LessonAssessment: React.FC<LessonAssessmentProps> = ({ lessonTitle, lessonId, masteryCriteria }) => {
    const [submission, setSubmission] = useState('');
    const [isAssessing, setIsAssessing] = useState(false);
    const [result, setResult] = useState<{ score: number; passed: boolean; feedback: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleAssess = async () => {
        if (!submission.trim()) return;
        setIsAssessing(true);
        setResult(null);

        try {
            const assessment = await assessLessonWork(lessonTitle, masteryCriteria, submission);
            setResult(assessment);
        } catch (error) {
            console.error(error);
            alert("Assessment failed. Please try again.");
        } finally {
            setIsAssessing(false);
        }
    };

    const handleFinalSubmit = async () => {
        if (!result || !result.passed) return;
        setIsSubmitting(true);

        // We need user email to store the record. 
        // For now, we will prompt for email if we don't have auth context.
        // Ideally this comes from a global auth state.
        const email = prompt("Please enter your email to save your progress:");

        if (!email) {
            setIsSubmitting(false);
            return;
        }

        try {
            await syncToGoogleSheet({
                email: email,
                lessonId: lessonId,
                lessonTitle: lessonTitle,
                submissionContent: submission,
                aiScore: result.score.toString(),
                aiFeedback: result.feedback
            });
            setIsSubmitted(true);
            alert("Lesson completed and recorded!");
        } catch (error) {
            console.error(error);
            alert("Submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-900/30 border border-green-500/50 p-6 rounded-lg mt-8 text-center">
                <h3 className="text-2xl font-bold text-green-400 mb-2">Lesson Completed!</h3>
                <p className="text-green-200">Your work has been recorded.</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-white/30 p-6 rounded-lg mt-12">
            <h2 className="text-2xl font-bold mb-4">Assessment Project</h2>


            <textarea
                className="w-full bg-black border border-zinc-600 rounded p-4 text-white min-h-[150px] mb-4 focus:border-blue-500 outline-none"
                placeholder="Type your response or paste your work here..."
                aria-label="Your assessment submission"
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                disabled={isAssessing || isSubmitted}
            />

            <div className="flex gap-4 items-center">
                <button
                    onClick={handleAssess}
                    disabled={isAssessing || !submission.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold transition-colors disabled:opacity-50"
                >
                    {isAssessing ? 'Analyzing...' : 'Assess My Work'}
                </button>

                <div className="flex-1" role="status" aria-live="polite">
                    {result && (
                        result.passed ? (
                            <span className="text-green-400 font-bold">Passed ({result.score}/100)</span>
                        ) : (
                            <span className="text-red-400 font-bold">Try Again ({result.score}/100)</span>
                        )
                    )}
                </div>
            </div>

            {result && (
                <div className={`mt-4 p-4 rounded border ${result.passed ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                    <h4 className="font-bold mb-2">AI Feedback:</h4>
                    <p className="text-sm">{result.feedback}</p>

                    {result.passed && (
                        <div className="mt-4 pt-4 border-t border-white/30">
                            <p className="mb-4 text-sm text-zinc-300">Great job! Submit your work to mark this lesson as complete.</p>
                            <button
                                onClick={handleFinalSubmit}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition-colors w-full md:w-auto"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit to Record'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LessonAssessment;
