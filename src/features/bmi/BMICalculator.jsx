import React, { useState } from 'react';
import { Calculator, Info, InfoIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const BMICalculator = () => {
    const [height, setHeight] = useState(() => localStorage.getItem('user_height') || 175);
    const [weight, setWeight] = useState(() => localStorage.getItem('user_weight') || 70);
    const [bmi, setBmi] = useState(() => localStorage.getItem('last_bmi') || null);
    const [category, setCategory] = useState(() => localStorage.getItem('last_bmi_category') || '');
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('bmi_history');
        return saved ? JSON.parse(saved) : [];
    });

    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const result = weight / (heightInMeters * heightInMeters);
        const bmiVal = result.toFixed(1);
        setBmi(bmiVal);

        let cat = '';
        if (result < 18.5) cat = 'Underweight';
        else if (result < 25) cat = 'Normal';
        else if (result < 30) cat = 'Overweight';
        else cat = 'Obese';
        setCategory(cat);

        const newEntry = { date: new Date().toLocaleDateString(), bmi: bmiVal, category: cat };
        const newHistory = [newEntry, ...history].slice(0, 5);
        setHistory(newHistory);

        localStorage.setItem('user_height', height);
        localStorage.setItem('user_weight', weight);
        localStorage.setItem('last_bmi', bmiVal);
        localStorage.setItem('last_bmi_category', cat);
        localStorage.setItem('bmi_history', JSON.stringify(newHistory));
    };

    return (
        <div className="feature-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 className="brand-font" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>BMI Calculator</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Understand your body composition and health markers.</p>
                </div>
                <Calculator size={40} className="text-gradient" />
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Input Metrics</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px' }}>Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            style={{ width: '100%', padding: '12px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                        <input
                            type="range" min="100" max="250" value={height} onChange={(e) => setHeight(e.target.value)}
                            style={{ width: '100%', marginTop: '12px', accentColor: 'var(--accent-primary)' }}
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '8px' }}>Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            style={{ width: '100%', padding: '12px', background: 'var(--bg-charcoal)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                        />
                        <input
                            type="range" min="30" max="200" value={weight} onChange={(e) => setWeight(e.target.value)}
                            style={{ width: '100%', marginTop: '12px', accentColor: 'var(--accent-secondary)' }}
                        />
                    </div>

                    <button onClick={calculateBMI} className="btn-primary" style={{ width: '100%' }}>Calculate BMI</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {bmi ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card"
                            style={{ padding: '32px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
                            <h4 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your BMI Result</h4>
                            <p style={{ fontSize: '4rem', fontWeight: 'bold', margin: '16px 0', color: category === 'Normal' ? 'var(--accent-primary)' : '#ff5a5a' }}>{bmi}</p>
                            <div style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                background: category === 'Normal' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 90, 90, 0.1)',
                                color: category === 'Normal' ? 'var(--accent-primary)' : '#ff5a5a',
                                display: 'inline-block',
                                margin: '0 auto',
                                fontWeight: 'bold'
                            }}>
                                {category}
                            </div>

                            <div style={{ marginTop: '24px', textAlign: 'left', borderTop: '1px solid var(--border-glass)', paddingTop: '24px' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <InfoIcon size={16} />
                                    Recommendation: {category === 'Normal' ? 'Maintain current active lifestyle.' : 'Consult with a fitness coach for personalized path.'}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="glass-card" style={{ padding: '32px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: 0.5 }}>
                            <Info size={48} style={{ margin: '0 auto 16px', color: 'var(--text-dark)' }} />
                            <h3>Awaiting Calculation</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill in your height and weight to see your health profile.</p>
                        </div>
                    )}

                </div>
            </div>

            {history.length > 0 && (
                <div className="glass-card" style={{ padding: '24px' }}>
                    <h4 style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>RECENT HISTORY</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {history.map((h, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', paddingBottom: '8px', borderBottom: i < history.length - 1 ? '1px solid var(--border-glass)' : 'none' }}>
                                <div>
                                    <p style={{ fontWeight: 'bold' }}>{h.bmi}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-dark)' }}>{h.date}</p>
                                </div>
                                <span style={{ color: h.category === 'Normal' ? 'var(--accent-primary)' : '#ff5a5a' }}>{h.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
