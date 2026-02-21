import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '../aiService';

const Assistant = () => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('chat_history');
        return saved ? JSON.parse(saved) : [
            { role: 'bot', content: "Hello! I'm your AI Fitness Coach. How can I help you optimize your training or nutrition today?" }
        ];
    });
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('chat_history', JSON.stringify(messages));
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        try {
            const botContent = await getAIResponse(messages, input);
            setMessages(prev => [...prev, { role: 'bot', content: botContent }]);
        } catch (error) {
            console.error("AI Chat Error:", error);
            setMessages(prev => [...prev, { role: 'bot', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setTyping(false);
        }
    };

    return (
        <div className="feature-container" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>AI Assistant</h1>
                    <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} /> Your personalized 24/7 fitness intelligence.
                    </p>
                </div>
                <Bot size={40} className="text-gradient" />
            </div>

            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                display: 'flex',
                                justifyContent: m.role === 'bot' ? 'flex-start' : 'flex-end',
                                gap: '12px'
                            }}
                        >
                            {m.role === 'bot' && <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(57, 255, 20, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}><Bot size={18} /></div>}
                            <div style={{
                                maxWidth: '70%',
                                padding: '12px 16px',
                                borderRadius: '16px',
                                background: m.role === 'bot' ? 'var(--bg-charcoal)' : 'var(--accent-primary)',
                                color: m.role === 'bot' ? '#fff' : '#000',
                                border: m.role === 'bot' ? '1px solid var(--border-glass)' : 'none',
                                fontSize: '0.95rem',
                                lineHeight: '1.5'
                            }}>
                                {m.content}
                            </div>
                            {m.role === 'user' && <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px solid var(--border-glass)' }}><User size={18} /></div>}
                        </motion.div>
                    ))}
                    {typing && (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(57, 255, 20, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}><Bot size={18} /></div>
                            <div className="typing-indicator" style={{ padding: '12px 16px', borderRadius: '16px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', display: 'flex', gap: '4px' }}>
                                <div className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-dark)', borderRadius: '50%' }}></div>
                                <div className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-dark)', borderRadius: '50%' }}></div>
                                <div className="dot" style={{ width: '6px', height: '6px', background: 'var(--text-dark)', borderRadius: '50%' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                <form onSubmit={handleSend} style={{ padding: '24px', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        placeholder="Ask anything about fitness, diet, or training..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ flex: 1, padding: '14px 20px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', color: '#fff' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '14px', borderRadius: '50%' }}>
                        <Send size={20} />
                    </button>
                </form>
            </div>

            <style>{`
        .dot { animation: pulse 1.5s infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
        </div>
    );
};

export default Assistant;
