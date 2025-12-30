
import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LearningSection from './components/LearningSection';
import PrepSection from './components/PrepSection';
import QuizSection from './components/QuizSection';
import { User, NavigationTab } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);

  useEffect(() => {
    const savedUser = localStorage.getItem('sb_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('sb_user', JSON.stringify(userData));
  };

  if (!user || !user.isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard user={user} onNavigate={setActiveTab} />;
      case NavigationTab.LEARNING:
        return <LearningSection />;
      case NavigationTab.QUIZ:
        return <QuizSection />;
      case NavigationTab.PREP:
        return <PrepSection />;
      default:
        return <Dashboard user={user} onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userName={user.name}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
