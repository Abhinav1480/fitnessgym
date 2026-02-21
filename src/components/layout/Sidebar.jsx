import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Dumbbell,
    Utensils,
    Footprints,
    Calculator,
    BarChart3,
    Target,
    MessageSquare,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { name: 'Workout AI', icon: <Dumbbell size={20} />, path: '/workouts' },
        { name: 'Diet Planner', icon: <Utensils size={20} />, path: '/diet' },
        { name: 'Step Tracker', icon: <Footprints size={20} />, path: '/steps' },
        { name: 'BMI Calculator', icon: <Calculator size={20} />, path: '/bmi' },
        { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
        { name: 'Goals', icon: <Target size={20} />, path: '/goals' },
        { name: 'AI Assistant', icon: <MessageSquare size={20} />, path: '/assistant' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar" style={{
            width: '280px',
            height: '100vh',
            background: 'var(--bg-charcoal)',
            borderRight: '1px solid var(--border-glass)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            <div className="sidebar-header" style={{ marginBottom: '40px' }}>
                <h2 className="brand-font" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="text-gradient">Coach</span> Pro
                </h2>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            background: isActive ? 'rgba(57, 255, 20, 0.05)' : 'transparent',
                            transition: 'var(--transition-smooth)',
                            fontWeight: isActive ? '600' : '400'
                        })}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                        {item.path === window.location.pathname && <ChevronRight size={16} />}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '24px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                        {user?.name?.[0].toUpperCase()}
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user?.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pro Member</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn-glass"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
