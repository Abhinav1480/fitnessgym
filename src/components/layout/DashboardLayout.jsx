import React from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-deep)' }}>
            <Sidebar />
            <main style={{
                flex: 1,
                marginLeft: '280px',
                padding: '40px',
                overflowY: 'auto'
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default DashboardLayout;
