
import React, { useState } from 'react';
import { MOCK_SYLLABUS } from '../constants';

const LearningSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'academic' | 'professional'>('academic');

  return (
    <div className="space-y-6 pb-10">
      {/* Sub-Navigation */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('academic')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
            activeSubTab === 'academic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          University
        </button>
        <button
          onClick={() => setActiveSubTab('professional')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
            activeSubTab === 'professional' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          Certs & Industry
        </button>
      </div>

      {activeSubTab === 'academic' ? (
        <div className="space-y-6 fade-in">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">🏢</div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">University Portal</h2>
                <p className="text-slate-500 text-sm">Official IET DAVV Curriculum</p>
              </div>
            </div>
            
            <a 
              href="https://www.ietdavv.edu.in/index.php/academics/syllabus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 text-center transition-all active:scale-[0.98]"
            >
              View Full Syllabus
            </a>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Your Curriculum</h3>
              <span className="text-xs bg-indigo-100 text-indigo-600 font-bold px-3 py-1 rounded-full">Sem {MOCK_SYLLABUS.semester}</span>
            </div>

            {MOCK_SYLLABUS.subjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{subject.name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">{subject.code}</p>
                  </div>
                  <span className="text-xs text-indigo-500 font-bold">{subject.topics.length} Units</span>
                </div>
                <div className="p-3">
                  {subject.topics.map(topic => (
                    <div key={topic.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${topic.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        {topic.completed ? '✓' : '▶'}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${topic.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{topic.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{topic.durationMinutes}m</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 fade-in">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-amber-100 text-amber-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Industry Recommended
              </div>
              <span className="text-2xl">🏆</span>
            </div>

            <h2 className="text-2xl font-black text-slate-800 leading-tight">Nation Skill-Up Program</h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Bridge the massive gap between university theories and corporate realities.
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
            </div>

            <a 
              href="https://www.geeksforgeeks.org/nation-skill-up/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-100 text-center transition-all active:scale-[0.98]"
            >
              Enroll Now
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Available Path</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:border-blue-500 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">☁️</div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">AWS Cloud Practitioner</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Industry Standard</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-600">➜</span>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 opacity-50 grayscale">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-2xl">🤖</div>
                <div>
                  <p className="font-bold text-slate-800">Google AI Essentials</p>
                  <p className="text-xs text-slate-400 italic">Prerequisite: NSU Completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningSection;
