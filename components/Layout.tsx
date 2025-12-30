
import React from 'react';
import { NavigationTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userName }) => {
  const tabs = [
    { id: NavigationTab.DASHBOARD, icon: '🏠', label: 'Home' },
    { id: NavigationTab.LEARNING, icon: '📚', label: 'Learning' },
    { id: NavigationTab.QUIZ, icon: '📝', label: 'Quiz & AI' },
    { id: NavigationTab.PREP, icon: '🚀', label: 'Prep' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 max-w-md mx-auto bg-slate-50 shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Skill Bridge</h2>
          <p className="text-xs text-slate-400 font-medium">Academic & Industry Pilot</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-200">
          {userName.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-6 pt-6 fade-in" key={activeTab}>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center max-w-md mx-auto z-20 overflow-x-auto no-scrollbar">
        <div className="flex w-full justify-between px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 transition-all min-w-[60px] ${
                activeTab === tab.id ? 'text-blue-600 scale-105' : 'text-slate-400'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className={`text-[9px] font-bold uppercase tracking-tight ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
