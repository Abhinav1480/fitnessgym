import React, { useState, useEffect } from 'react';
import { Utensils, Zap, Scale, PieChart as PieIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAIDiet } from '../aiService';

const DietPlanner = () => {
    const [weight, setWeight] = useState(() => localStorage.getItem('diet_weight') || 75);
    const [goal, setGoal] = useState(() => localStorage.getItem('diet_goal') || 'Muscle Gain');
    const [macros, setMacros] = useState(() => {
        const saved = localStorage.getItem('diet_macros');
        return saved ? JSON.parse(saved) : null;
    });
    const [meals, setMeals] = useState(() => {
        const saved = localStorage.getItem('diet_meals');
        return saved ? JSON.parse(saved) : null;
    });
    const [calculating, setCalculating] = useState(false);

    useEffect(() => {
        localStorage.setItem('diet_weight', weight);
        localStorage.setItem('diet_goal', goal);
    }, [weight, goal]);

    const calculateDiet = async () => {
        setCalculating(true);
        try {
            const data = await generateAIDiet(weight, goal);
            setMacros(data.macros);
            setMeals(data.meals);
            localStorage.setItem('diet_macros', JSON.stringify(data.macros));
            localStorage.setItem('diet_meals', JSON.stringify(data.meals));
        } catch (error) {
            console.error("AI Diet Error:", error);
        } finally {
            setCalculating(false);
        }
    };

    return (
        <div className="feature-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>AI Diet Planner</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Precision nutrition for your specific physiological needs.</p>
                </div>
                <Utensils size={40} className="text-gradient" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                <div className="glass-card" style={{ padding: '24px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Configure Metrics</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px' }}>Current Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            style={{ width: '100%', padding: '12px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px' }}>Health Goal</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {['Fat Loss', 'Muscle Gain', 'Maintenance'].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGoal(g)}
                                    style={{
                                        padding: '12px',
                                        textAlign: 'left',
                                        borderRadius: 'var(--radius-sm)',
                                        border: goal === g ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                                        background: goal === g ? 'rgba(57, 255, 20, 0.05)' : 'transparent',
                                        color: goal === g ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {g}
                                    {goal === g && <Zap size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={calculateDiet}
                        disabled={calculating}
                        className="btn-primary"
                        style={{ width: '100%' }}
                    >
                        {calculating ? 'Analyzing...' : 'Generate Diet Plan'}
                    </button>
                </div>

                <div className="diet-results" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {!macros && !calculating && (
                        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                            <Scale size={48} style={{ color: 'var(--text-dark)', marginBottom: '16px' }} />
                            <h3>Nutritional Analysis</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Calculations based on BMI, activity level, and metabolic rate.</p>
                        </div>
                    )}

                    {macros && !calculating && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ padding: '24px' }}
                            >
                                <h4 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>DAILY MACRONUTRIENT TARGETS</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{macros.calories}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>KCAL</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{macros.protein}g</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PROTEIN</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{macros.carbs}g</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CARBS</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{macros.fats}g</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>FATS</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '4px' }}>AI MEAL SUGGESTIONS</h4>
                                {meals.map((meal, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="glass-card"
                                        style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <div>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>{meal.type}</span>
                                            <p style={{ fontWeight: '600', marginTop: '4px' }}>{meal.name}</p>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '4px' }}>{meal.macros}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: 'bold' }}>{meal.cal} kcal</p>
                                            <button style={{ color: 'var(--accent-primary)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: '4px' }}>LOG MEAL</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DietPlanner;
