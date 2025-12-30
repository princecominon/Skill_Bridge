
import React, { useState, useEffect } from 'react';
import { User, NavigationTab } from '../types';

interface DashboardProps {
  user: User;
  onNavigate: (tab: NavigationTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [onlineCount, setOnlineCount] = useState(42);
  const [showVideo, setShowVideo] = useState(false);

  // Simulate real-time fluctuation of online users
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(35, Math.min(prev + change, 55));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-10">
      {/* Hero Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <h1 className="text-2xl font-bold">Welcome back, {user.name}! 👋</h1>
        <p className="text-blue-100 mt-1 opacity-90">{user.college} • {user.branch}</p>
        
        <div className="mt-6 flex gap-3">
          <div className="flex-1 bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
            <span className="block text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Weekly Streak</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black">4 Days</span>
              <span className="text-orange-400">🔥</span>
            </div>
          </div>
          <div className="flex-1 bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
            <span className="block text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1">Skill Score</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black">740</span>
              <span className="text-blue-300">💎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats Dashboard */}
      <div className="space-y-3">
        <h3 className="text-slate-800 font-bold text-lg px-1 flex items-center justify-between">
          Community Dashboard
          <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">Live</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 text-xl mb-3">🛰️</div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Online Now</span>
            <span className="text-2xl font-black text-slate-800">{onlineCount}</span>
            <p className="text-[9px] text-slate-400 mt-1">Active Students</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-xl mb-3">👥</div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Members</span>
            <span className="text-2xl font-black text-slate-800">1,248</span>
            <p className="text-[9px] text-slate-400 mt-1">Joined Skill Bridge</p>
          </div>
        </div>
      </div>

      {/* Restore Demo Video Section - Linked to Prep */}
      <div className="space-y-3">
        <h3 className="text-slate-800 font-bold text-lg px-1">App Tutorial</h3>
        <div 
          className="bg-slate-900 aspect-video rounded-3xl relative overflow-hidden group shadow-lg"
        >
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" 
            alt="Tutorial Thumbnail" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={() => setShowVideo(true)}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-10"
            >
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-blue-600 border-b-[10px] border-b-transparent ml-1"></div>
            </button>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="bg-blue-600 text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">Featured</span>
              <h4 className="text-white font-bold text-lg">Watch: How Skill Bridge works</h4>
              <p className="text-slate-300 text-xs mt-1">2-minute walkthrough</p>
            </div>
            <button 
              onClick={() => onNavigate(NavigationTab.PREP)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-xl border border-white/20 transition-all uppercase tracking-widest"
            >
              Go to Prep →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid - Fixed to screen width */}
      <div className="space-y-4">
        <h3 className="text-slate-800 font-bold text-lg px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate(NavigationTab.QUIZ)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-3xl flex flex-col items-start gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95 text-left"
          >
            <span className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center text-xl">📝</span>
            <div>
              <span className="block text-[8px] font-bold opacity-75 uppercase tracking-widest">AI Power</span>
              <span className="text-sm font-bold">Take Quiz</span>
            </div>
          </button>

          <button 
            onClick={() => onNavigate(NavigationTab.PREP)}
            className="bg-white border border-slate-100 p-4 rounded-3xl flex flex-col items-start gap-2 shadow-sm transition-all active:scale-95 text-left"
          >
            <span className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center text-purple-600 text-xl">🚀</span>
            <div>
              <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-widest">Tutorial</span>
              <span className="text-sm font-bold text-slate-700">Prep Guide</span>
            </div>
          </button>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 animate-fade-in">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:rotate-90 transition-transform"
          >
            ✕
          </button>
          <div className="w-full max-w-md aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
             <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Skill Bridge Demo"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
          </div>
          <div className="absolute bottom-10 text-center text-white/60 text-xs px-10">
            Click '✕' to return to dashboard
          </div>
        </div>
      )}

      {/* Daily Motivation Card */}
      <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 relative group overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 group-hover:rotate-12 transition-transform">🎓</div>
        <h3 className="text-amber-800 font-bold flex items-center gap-2 mb-2">
          <span className="text-xl">💡</span> Career Insight
        </h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          Students who complete the <strong>Nation Skill-Up</strong> program are 3x more likely to clear technical rounds in top-tier companies.
        </p>
        <button 
          onClick={() => onNavigate(NavigationTab.LEARNING)}
          className="mt-4 text-xs font-bold text-amber-800 underline uppercase tracking-widest"
        >
          Explore NSU
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
