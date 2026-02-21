import React, { useState, useEffect } from 'react';
import { Dumbbell, RefreshCw, CheckCircle2, Trophy, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateAIWorkout } from '../aiService';

const WorkoutGenerator = () => {
    const [goal, setGoal] = useState(() => localStorage.getItem('workout_goal') || 'Muscle Gain');
    const [level, setLevel] = useState(() => localStorage.getItem('workout_level') || 'Intermediate');
    const [workout, setWorkout] = useState(() => {
        const saved = localStorage.getItem('current_workout');
        return saved ? JSON.parse(saved) : null;
    });
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        localStorage.setItem('workout_goal', goal);
        localStorage.setItem('workout_level', level);
    }, [goal, level]);

    const generateWorkout = async () => {
        setGenerating(true);
        try {
            const newWorkout = await generateAIWorkout(goal, level);
            setWorkout(newWorkout);
            localStorage.setItem('current_workout', JSON.stringify(newWorkout));
        } catch (error) {
            console.error("AI Generation Error:", error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="feature-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>AI Workout Generator</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Advanced algorithms tailoring your path to peak performance.</p>
                </div>
                <Dumbbell size={40} className="text-gradient" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                <div className="glass-card" style={{ padding: '24px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Personalize Plan</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px' }}>Primary Goal</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            style={{ width: '100%', padding: '12px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        >
                            <option>Fat Loss</option>
                            <option>Muscle Gain</option>
                            <option>Strength</option>
                            <option>Endurance</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px' }}>Experience Level</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {['Beginner', 'Intermediate', 'Pro'].map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLevel(l)}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        fontSize: '0.8rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: level === l ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                                        background: level === l ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
                                        color: level === l ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={generateWorkout}
                        disabled={generating}
                        className="btn-primary"
                        style={{ width: '100%' }}
                    >
                        {generating ? <RefreshCw size={20} className="animate-spin" /> : 'Generate AI Plan'}
                    </button>
                </div>

                <div className="workout-display">
                    {!workout && !generating && (
                        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', opacity: 0.7 }}>
                            <Zap size={48} style={{ marginBottom: '16px', color: 'var(--text-dark)' }} />
                            <h3>Ready to transform?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Configure your goals and click generate to see your AI plan.</p>
                        </div>
                    )}

                    {generating && (
                        <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
                            <RefreshCw size={48} className="animate-spin" style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
                            <h3>AI is processing...</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Analyzing muscle recovery patterns and biomechanics.</p>
                        </div>
                    )}

                    {workout && !generating && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {workout.map((item, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={idx}
                                    className="glass-card"
                                    style={{ padding: '24px' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{item.day}</h4>
                                        <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                            EST. 60 MIN
                                        </span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {item.exercises.map((ex, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                                <CheckCircle2 size={16} style={{ color: 'var(--text-dark)' }} />
                                                {ex}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            <div style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
                                <div className="glass-card" style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Trophy size={20} style={{ color: '#ffbd2e' }} />
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Focus</p>
                                        <p style={{ fontWeight: 'bold' }}>Hypertrophy</p>
                                    </div>
                                </div>
                                <div className="glass-card" style={{ flex: 1, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Clock size={20} style={{ color: 'var(--accent-secondary)' }} />
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rest Period</p>
                                        <p style={{ fontWeight: 'bold' }}>90 Seconds</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default WorkoutGenerator;
