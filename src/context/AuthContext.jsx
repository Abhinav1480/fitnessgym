import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('fitness_coach_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = { id: '1', email, name: email.split('@')[0], goal: 'Muscle Gain' };
    setUser(mockUser);
    localStorage.setItem('fitness_coach_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (name, email, password) => {
    // Mock signup logic
    const mockUser = { id: Date.now().toString(), email, name, goal: 'Fat Loss' };
    setUser(mockUser);
    localStorage.setItem('fitness_coach_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitness_coach_user');
  };

  const updateGoal = (goal) => {
    const updatedUser = { ...user, goal };
    setUser(updatedUser);
    localStorage.setItem('fitness_coach_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateGoal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
