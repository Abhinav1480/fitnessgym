import React, { useState, useEffect } from 'react';
import { Footprints, Plus, Minus, TrendingUp, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StepTracker = () => {
    const [steps, setSteps] = useState(() => Number(localStorage.getItem('user_steps')) || 8432);
    const [goal, setGoal] = useState(() => Number(localStorage.getItem('user_step_goal')) || 10000);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('step_history');
        return saved ? JSON.parse(saved) : [
            { day: 'Mon', steps: 6500 },
            { day: 'Tue', steps: 8200 },
            { day: 'Wed', steps: 9100 },
            { day: 'Thu', steps: 7800 },
            { day: 'Fri', steps: 11000 },
            { day: 'Sat', steps: 9500 },
            { day: 'Sun', steps: 8432 },
        ];
    });

    useEffect(() => {
        localStorage.setItem('user_steps', steps);
        localStorage.setItem('user_step_goal', goal);

        // Update today's steps in history
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = days[new Date().getDay()];
        const newHistory = history.map(h => h.day === today ? { ...h, steps } : h);
        setHistory(newHistory);
        localStorage.setItem('step_history', JSON.stringify(newHistory));
    }, [steps, goal]);

    const percentage = Math.min((steps / goal) * 100, 100);

    return (
        <div className="feature-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Step Tracker</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Every step is a stride towards your ultimate potential.</p>
                </div>
                <Footprints size={40} className="text-gradient" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem' }}>DAILY PROGRESS</h3>

                        <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px' }}>
                            <svg width="200" height="200" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg-charcoal)" strokeWidth="12" />
                                <motion.circle
                                    cx="100" cy="100" r="90" fill="none"
                                    stroke="var(--accent-primary)"
                                    strokeWidth="12"
                                    strokeDasharray="565.48"
                                    strokeDashoffset={565.48 - (565.48 * percentage) / 100}
                                    strokeLinecap="round"
                                    transform="rotate(-90 100 100)"
                                />
                            </svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{steps}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ {goal}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <button
                                onClick={() => setSteps(s => Math.max(0, s - 500))}
                                style={{ padding: '12px', borderRadius: '50%', border: '1px solid var(--border-glass)', background: 'transparent', color: '#fff', cursor: 'pointer' }}
                            >
                                <Minus size={20} />
                            </button>
                            <button
                                onClick={() => setSteps(s => s + 500)}
                                className="btn-primary"
                                style={{ height: '44px', width: '44px', padding: 0, borderRadius: '50%' }}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '24px', height: '300px' }}>
                        <h3 style={{ marginBottom: '20px', fontSize: '1rem', color: 'var(--text-secondary)' }}>WEEKLY PERFORMANCE</h3>
                        <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" stroke="var(--text-dark)" fontSize={12} />
                                <YAxis stroke="var(--text-dark)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--accent-primary)' }}
                                />
                                <Line type="monotone" dataKey="steps" stroke="var(--accent-primary)" strokeWidth={3} dot={{ fill: 'var(--accent-primary)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <Award size={32} style={{ color: '#ffbd2e' }} />
                            <div>
                                <h4 style={{ fontSize: '1.2rem' }}>Current Streak</h4>
                                <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>12 Days</p>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You're in the top 5% of users this week. Keep pushing!</p>
                    </div>

                    <div className="glass-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <TrendingUp size={32} style={{ color: 'var(--accent-secondary)' }} />
                            <div>
                                <h4 style={{ fontSize: '1.2rem' }}>Weekly Average</h4>
                                <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>8,642 Steps</p>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--bg-charcoal)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: '86%', height: '100%', background: 'var(--accent-secondary)' }}></div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h4 style={{ marginBottom: '16px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={18} /> Daily Goal
                        </h4>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {[5000, 10000, 15000].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setGoal(val)}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        borderRadius: 'var(--radius-sm)',
                                        border: goal === val ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                                        background: goal === val ? 'rgba(57, 255, 20, 0.05)' : 'transparent',
                                        color: goal === val ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {val / 1000}k
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepTracker;
