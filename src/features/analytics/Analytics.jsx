import React from 'react';
import { BarChart3, TrendingUp, Target, Activity, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Analytics = () => {
    const stepHistory = JSON.parse(localStorage.getItem('step_history') || '[]');
    const workoutHistory = JSON.parse(localStorage.getItem('workout_history') || '[1,1,0,1,1,0,1]');
    const goals = JSON.parse(localStorage.getItem('user_goals') || '[{"title": "Lose 5kg Fat", "progress": 65}, {"title": "100kg Bench Press", "progress": 80}, {"title": "Run a 5k", "progress": 40}]');

    const data = stepHistory.length > 0 ? stepHistory.map((h, i) => ({
        name: h.day,
        completed: workoutHistory[i] || 0
    })) : [
        { name: 'Mon', completed: 1 },
        { name: 'Tue', completed: 1 },
        { name: 'Wed', completed: 0 },
        { name: 'Thu', completed: 1 },
        { name: 'Fri', completed: 1 },
        { name: 'Sat', completed: 0 },
        { name: 'Sun', completed: 1 },
    ];

    const getDynamicSuggestion = () => {
        const avgSteps = stepHistory.length > 0 ? stepHistory.reduce((acc, h) => acc + h.steps, 0) / stepHistory.length : 0;
        if (avgSteps < 5000) return "Your activity levels are lower than usual. Try a 15-minute brisk walk today to boost your metabolism.";
        if (avgSteps > 10000) return "Excellent activity levels! Ensure you're prioritizing recovery and anti-inflammatory nutrition.";
        return "You're consistently hitting your targets. Consider increasing your intensity or adding 5 minutes to your workouts.";
    };

    return (
        <div className="feature-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Performance Analytics</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Data-driven insights into your physical evolution.</p>
                </div>
                <BarChart3 size={40} className="text-gradient" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Workout Consistency</h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ width: '10px', height: '10px', background: 'var(--accent-primary)', borderRadius: '2px' }}></div> Done
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ width: '10px', height: '10px', background: 'var(--bg-charcoal)', borderRadius: '2px' }}></div> Missed
                                </div>
                            </div>
                        </div>

                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-dark)" axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                        contentStyle={{ background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={index} fill={entry.completed ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <TrendingUp size={24} style={{ color: 'var(--accent-secondary)', marginBottom: '12px' }} />
                            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>METABOLIC RATE</h4>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>+12.4%</p>
                            <p style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>↑ Higher than last month</p>
                        </div>
                        <div className="glass-card" style={{ padding: '24px' }}>
                            <Activity size={24} style={{ color: '#ffbd2e', marginBottom: '12px' }} />
                            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ACTIVE TIME</h4>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>42h 15m</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Total this month</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Target size={20} className="text-gradient" /> Active Goals
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {[
                                { title: 'Lose 5kg Fat', progress: 65 },
                                { title: '100kg Bench Press', progress: 80 },
                                { title: 'Run a 5k', progress: 40 },
                            ].map((g, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                        <span>{g.title}</span>
                                        <span style={{ color: 'var(--accent-primary)' }}>{g.progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'var(--bg-charcoal)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${g.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                                            style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Achievements</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ aspectRatio: '1', borderRadius: '50%', background: 'var(--bg-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-glass)' }}>
                                    <CheckCircle size={24} style={{ opacity: 0.3 }} />
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getDynamicSuggestion()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
