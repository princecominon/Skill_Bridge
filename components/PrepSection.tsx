
import React, { useState } from 'react';
import { PREP_MODULES } from '../constants';

const PrepSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'roadmap' | 'guides'>('roadmap');
  const [showVideo, setShowVideo] = useState<string | null>(null);

  const videoResources = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'App Walkthrough & Roadmap',
      desc: 'How to use Skill Bridge to land your first role.',
      tag: 'Onboarding',
      thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'z-36KndxL-k', // Just a placeholder tech interview ID
      title: 'Cracking the Coding Interview',
      desc: 'Top 5 strategies used by FAANG engineers.',
      tag: 'Technical',
      thumb: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'HG68Ymazo18', // Placeholder resume ID
      title: 'Modern Resume Building',
      desc: 'ATS-friendly templates and keyword optimization.',
      tag: 'Career',
      thumb: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-2xl font-black italic tracking-tighter uppercase">Interview Prep</h2>
        <p className="text-slate-400 text-sm mt-1">High-Level Industry Readiness</p>
      </div>

      {/* Sub-Navigation Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('roadmap')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
            activeSubTab === 'roadmap' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          Roadmap
        </button>
        <button
          onClick={() => setActiveSubTab('guides')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
            activeSubTab === 'guides' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          Video Guides
        </button>
      </div>

      {activeSubTab === 'roadmap' ? (
        <div className="space-y-6 fade-in">
          <div className="bg-amber-100 border border-amber-200 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-3xl opacity-20">🔒</div>
            <p className="text-amber-800 text-sm font-bold leading-relaxed pr-8">
              Complete the "Nation Skill-Up" program to unlock high-level interview preparation modules.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 grayscale opacity-40">
            {PREP_MODULES.map((module) => (
              <div 
                key={module.id} 
                className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-3">
                  {module.icon === 'Calculator' && '🧮'}
                  {module.icon === 'Brain' && '🧠'}
                  {module.icon === 'Code' && '💻'}
                  {module.icon === 'Users' && '🗣️'}
                </div>
                <span className="text-slate-800 font-bold text-sm">{module.name}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Locked</span>
              </div>
            ))}
          </div>

          <button className="w-full border-2 border-dashed border-slate-200 py-6 rounded-3xl text-slate-300 font-bold uppercase tracking-widest text-xs flex flex-col items-center gap-2">
            <span>+</span>
            <span>More Modules Coming Soon</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5 fade-in">
          {videoResources.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm group hover:border-purple-200 transition-all"
            >
              <div 
                onClick={() => setShowVideo(video.id)}
                className="aspect-video relative cursor-pointer overflow-hidden"
              >
                <img 
                  src={video.thumb} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-purple-600 group-hover:border-purple-500 transition-all">
                    <span className="ml-1">▶</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {video.tag}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-slate-800 font-bold text-base">{video.title}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{video.desc}</p>
              </div>
            </div>
          ))}

          <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 text-center">
            <p className="text-purple-800 text-xs font-bold uppercase tracking-widest mb-1">New Content Weekly</p>
            <p className="text-slate-500 text-[10px]">Premium members get early access to mock interview recordings.</p>
          </div>
        </div>
      )}

      {/* Video Modal Overlay */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 animate-fade-in">
          <button 
            onClick={() => setShowVideo(null)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:rotate-90 transition-transform"
          >
            ✕
          </button>
          <div className="w-full max-w-md aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
             <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${showVideo}?autoplay=1`} 
                title="Skill Bridge Video Library"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepSection;
