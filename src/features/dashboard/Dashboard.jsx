import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Footprints, Utensils, Activity, Target, ChevronRight, Zap } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    const steps = Number(localStorage.getItem('user_steps')) || 8432;
    const stepGoal = Number(localStorage.getItem('user_step_goal')) || 10000;
    const macros = JSON.parse(localStorage.getItem('diet_macros') || '{"calories": 1240}');
    const workout = JSON.parse(localStorage.getItem('current_workout') || 'null');
    const goals = JSON.parse(localStorage.getItem('user_goals_list') || '[]');
    const activeTime = Number(localStorage.getItem('active_time')) || 45;
    const completedGoals = goals.filter(g => g.completed).length;

    const [isCompleting, setIsCompleting] = React.useState(false);

    const completeWorkout = () => {
        setIsCompleting(true);
        setTimeout(() => {
            const history = JSON.parse(localStorage.getItem('workout_history') || '[1,1,0,1,1,0,1]');
            // Mark today (last item) as completed
            history[history.length - 1] = 1;
            localStorage.setItem('workout_history', JSON.stringify(history));
            localStorage.setItem('active_time', activeTime + 45);
            setIsCompleting(false);
            window.location.reload(); // Refresh to update charts/stats
        }, 1500);
    };

    const stats = [
        { title: 'Steps', value: steps.toLocaleString(), color: 'var(--accent-primary)', icon: <Footprints size={24} />, progress: (steps / stepGoal) * 100 },
        { title: 'Calories', value: macros.calories.toLocaleString(), color: 'var(--accent-secondary)', icon: <Utensils size={24} />, progress: (macros.calories / 2500) * 100 },
        { title: 'Active', value: `${activeTime}m`, color: '#ffbd2e', icon: <Activity size={24} />, progress: (activeTime / 60) * 100 },
        { title: 'Goals', value: `${completedGoals}/${goals.length}`, color: '#ff5a5a', icon: <Target size={24} />, progress: (completedGoals / (goals.length || 1)) * 100 },
    ];

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="brand-font"
                    style={{ fontSize: '2.5rem', marginBottom: '8px' }}
                >
                    Welcome back, <span className="text-gradient">{user?.name}</span>
                </motion.h1>
                <p style={{ color: 'var(--text-secondary)' }}>You've completed 75% of your weekly targets. Stay focused!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={{ padding: '24px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ color: stat.color }}>{stat.icon}</div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: 'bold' }}>DAILY</span>
                        </div>
                        <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px', textTransform: 'uppercase' }}>{stat.title}</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>{stat.value}</p>
                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                            <div style={{ width: `${stat.progress}%`, height: '100%', background: stat.color, borderRadius: '2px' }}></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                <div className="glass-card" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.2rem' }}>Next Workout</h3>
                        <button className="text-gradient" style={{ background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            VIEW ALL <ChevronRight size={16} />
                        </button>
                    </div>
                    <div style={{ background: 'var(--bg-charcoal)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ padding: '16px', background: 'rgba(57, 255, 20, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                            <Zap size={32} />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{workout ? workout[0].day : 'No Plan Generated'}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{workout ? `${workout[0].exercises.length} Exercises • 45-60 Minutes • Advanced` : 'Head to Workout Generator to start'}</p>
                        </div>
                        <button
                            disabled={!workout || isCompleting}
                            onClick={completeWorkout}
                            className="btn-primary"
                            style={{ marginLeft: 'auto', padding: '10px 20px', fontSize: '0.8rem', opacity: !workout ? 0.5 : 1 }}
                        >
                            {isCompleting ? 'COMPLETING...' : 'START NOW'}
                        </button>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Quick Tips</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ padding: '12px', borderLeft: '3px solid var(--accent-primary)', background: 'rgba(255,255,255,0.02)' }}>
                            <p style={{ fontSize: '0.9rem' }}>Hydration: Drink 500ml of water before your workout for better performance.</p>
                        </div>
                        <div style={{ padding: '12px', borderLeft: '3px solid var(--accent-secondary)', background: 'rgba(255,255,255,0.02)' }}>
                            <p style={{ fontSize: '0.9rem' }}>Recovery: Aim for 7-8 hours of sleep tonight to optimize muscle repair.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
