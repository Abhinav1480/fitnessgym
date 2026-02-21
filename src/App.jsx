import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Features
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import Dashboard from './features/dashboard/Dashboard';
import WorkoutGenerator from './features/workouts/WorkoutGenerator';
import DietPlanner from './features/diet/DietPlanner';
import StepTracker from './features/steps/StepTracker';
import BMICalculator from './features/bmi/BMICalculator';
import Analytics from './features/analytics/Analytics';
import Goals from './features/goals/Goals';
import Assistant from './features/assistant/Assistant';

const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
    <div className="loader" style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>Optimizing Performance...</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout><Dashboard /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/workouts" element={
              <ProtectedRoute>
                <DashboardLayout><WorkoutGenerator /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/diet" element={
              <ProtectedRoute>
                <DashboardLayout><DietPlanner /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/steps" element={
              <ProtectedRoute>
                <DashboardLayout><StepTracker /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/bmi" element={
              <ProtectedRoute>
                <DashboardLayout><BMICalculator /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/analytics" element={
              <ProtectedRoute>
                <DashboardLayout><Analytics /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/goals" element={
              <ProtectedRoute>
                <DashboardLayout><Goals /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/assistant" element={
              <ProtectedRoute>
                <DashboardLayout><Assistant /></DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
