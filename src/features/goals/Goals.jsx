import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Circle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Goals = () => {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('user_goals_list');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: 'Complete 4 workouts this week', completed: true, type: 'Weekly' },
            { id: 2, text: 'Reach 75kg body weight', completed: false, type: 'Long-term' },
            { id: 3, text: 'Drink 3L water daily', completed: false, type: 'Daily' },
        ];
    });
    const [newGoalText, setNewGoalText] = useState('');

    useEffect(() => {
        localStorage.setItem('user_goals_list', JSON.stringify(goals));

        // Also update the summary for analytics
        const summary = goals.map(g => ({ title: g.text, progress: g.completed ? 100 : 50 }));
        localStorage.setItem('user_goals', JSON.stringify(summary));
    }, [goals]);

    const toggleGoal = (id) => {
        setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const addGoal = () => {
        if (!newGoalText.trim()) return;
        const newGoal = {
            id: Date.now(),
            text: newGoalText,
            completed: false,
            type: 'Custom'
        };
        setGoals([...goals, newGoal]);
        setNewGoalText('');
    };

    return (
        <div className="feature-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Goal Management</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Define your milestones and execute with precision.</p>
                </div>
                <Target size={40} className="text-gradient" />
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                        <input
                            type="text"
                            placeholder="Set a new objective..."
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                            style={{ flex: 1, padding: '14px 20px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                        <button onClick={addGoal} className="btn-primary" style={{ padding: '14px 24px' }}>
                            <Plus size={20} /> ADD GOAL
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {goals.map((g, i) => (
                            <motion.div
                                key={g.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => toggleGoal(g.id)}
                                style={{
                                    padding: '16px 20px',
                                    background: g.completed ? 'rgba(57, 255, 20, 0.05)' : 'var(--bg-charcoal)',
                                    border: '1px solid var(--border-glass)',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    transition: 'var(--transition-smooth)'
                                }}
                            >
                                {g.completed ? <CheckCircle2 size={24} style={{ color: 'var(--accent-primary)' }} /> : <Circle size={24} style={{ color: 'var(--text-dark)' }} />}
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: '500', textDecoration: g.completed ? 'line-through' : 'none', color: g.completed ? 'var(--text-dark)' : '#fff' }}>{g.text}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)', textTransform: 'uppercase' }}>{g.type}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffbd2e, #ff9d00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trophy size={30} style={{ color: '#000' }} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.2rem' }}>Master of Consistency</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You've completed 5 goals this week. 2 more to reach your Pro Milestone!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Goals;
