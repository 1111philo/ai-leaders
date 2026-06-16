
import React, { useState, useRef, useEffect } from 'react';
import { chatWithLesson } from '../services/ai';

interface LessonChatProps {
    lessonContext: string;
    lessonTitle: string;
    masteryCriteria: string;
}

const LessonChat: React.FC<LessonChatProps> = ({ lessonContext, lessonTitle, masteryCriteria }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
        { role: 'model', content: `Hi! I'm your AI tutor for "${lessonTitle}". Ask me anything about this lesson!` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            // Filter out the initial greeting from history if needed, or keep it.
            // keeping only user/model exchanges for history context passed to API
            const history = messages.slice(1);
            const response = await chatWithLesson(lessonContext, masteryCriteria, history, userMsg);

            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-white/30 rounded-lg flex flex-col h-[600px] shadow-xl">
            <div className="p-4 border-b border-white/30 font-bold bg-zinc-800 rounded-t-lg flex justify-between items-center">
                <h2 className="text-base font-bold">AI Tutor</h2>
                <span className="text-xs text-blue-400 animate-pulse" role="status" aria-live="polite">
                    {isLoading ? 'Thinking…' : ''}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite" aria-label="Conversation with AI tutor">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-zinc-800 text-zinc-300 border border-white/30'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/30 bg-zinc-900 rounded-b-lg">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        aria-label="Ask the AI tutor a question"
                        disabled={isLoading}
                        className="flex-1 bg-black border border-zinc-600 rounded p-2 text-white focus:border-blue-500 outline-none disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LessonChat;
