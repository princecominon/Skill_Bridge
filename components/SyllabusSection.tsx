
import React from 'react';
import { MOCK_SYLLABUS } from '../constants';

const SyllabusSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">🏢</div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">University Portal</h2>
            <p className="text-slate-500 text-sm">Official IET DAVV Curriculum</p>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
          <p className="text-sm text-slate-600 leading-relaxed italic">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
        </div>

        <a 
          href="https://www.ietdavv.edu.in/index.php/academics/syllabus" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 text-center transition-all active:scale-[0.98]"
        >
          View Official DAVV Syllabus
        </a>
        <p className="text-[10px] text-center text-slate-400 mt-2 font-semibold uppercase tracking-widest">
          Official University Resource
        </p>
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
                      {topic.isPremium && (
                        <span className="text-[8px] bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded uppercase">Premium</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusSection;
