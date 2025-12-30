
import React from 'react';

const CertificationSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-amber-100 text-amber-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Industry Recommended
          </div>
          <span className="text-2xl">🏆</span>
        </div>

        <h2 className="text-2xl font-black text-slate-800 leading-tight">Nation Skill-Up Program</h2>
        <p className="text-slate-500 text-sm mt-3 leading-relaxed">
          Bridge the massive gap between university theories and corporate realities. This government-aligned initiative prepares you for high-ticket roles.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-slate-600">
            <span className="text-green-500">✔</span>
            <span className="text-sm font-medium">Full Stack Mastery</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span className="text-green-500">✔</span>
            <span className="text-sm font-medium">Cloud Fundamentals</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span className="text-green-500">✔</span>
            <span className="text-sm font-medium">Soft Skill Leadership</span>
          </div>
        </div>

        <a 
          href="https://www.geeksforgeeks.org/nation-skill-up/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-100 text-center transition-all active:scale-[0.98]"
        >
          Enroll Now
        </a>
        
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Government-aligned initiative
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">More Certifications</h3>
        <div className="grid grid-cols-1 gap-4 opacity-50 grayscale pointer-events-none">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">☁️</div>
            <div>
              <p className="font-bold text-slate-800">AWS Certified Cloud</p>
              <p className="text-xs text-slate-400">Locked - Req. NSU Completion</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-2xl">🤖</div>
            <div>
              <p className="font-bold text-slate-800">Google AI Essentials</p>
              <p className="text-xs text-slate-400">Locked - Req. NSU Completion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationSection;
