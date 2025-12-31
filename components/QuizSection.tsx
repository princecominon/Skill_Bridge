import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai'; 
import { MOCK_SYLLABUS } from '../constants';
import { QuizQuestion } from '../types';

const QuizSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'recover'>('quiz');
  
  // Quiz states
  const [gameState, setGameState] = useState<'selection' | 'loading' | 'quiz' | 'result'>('selection');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Recovery states
  const [recoveryTopic, setRecoveryTopic] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoverySuggestion, setRecoverySuggestion] = useState<string | null>(null);

  // Safely access env variable
  const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

  const generateQuiz = async (subject: string) => {
    if (!subject.trim()) return;

    if (!API_KEY) {
      alert("Missing API Key! Please check your .env file.");
      return;
    }

    setSelectedSubject(subject);
    setGameState('loading');

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview', 
        contents: `Generate a 5-question multiple choice quiz for the topic: "${subject}". Return ONLY valid JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctIndex", "explanation"]
                }
              }
            },
            required: ["questions"]
          }
        }
      });

      // --- CRITICAL FIX: Clean the data before parsing ---
      let rawText = response.text || '{"questions": []}';
      
      // Remove ```json and ``` marks if the AI adds them
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

      console.log("Cleaned JSON:", rawText); // Debugging log

      const data = JSON.parse(rawText);
      
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setGameState('quiz');
        setCurrentIndex(0);
        setScore(0);
        setUserAnswer(null);
        setIsLocked(false);
      } else {
        throw new Error("No questions generated");
      }

    } catch (error: any) {
      console.error("Quiz generation failed:", error);
      if (error.toString().includes("400") || error.toString().includes("API key")) {
         alert("API Key Error: The key may be expired. Check console.");
      } else {
         alert("Failed to generate quiz. Try again.");
      }
      setGameState('selection');
    }
  };

  const handleAnswer = (index: number) => {
    if (isLocked) return;
    setUserAnswer(index);
    setIsLocked(true);
    if (index === questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setUserAnswer(null);
      setIsLocked(false);
    } else {
      // --- SAVE RESULT LOGIC (Option B) ---
      const newResult = {
        id: Date.now(),
        topic: selectedSubject,
        score: score,
        totalQuestions: questions.length,
        date: new Date().toLocaleDateString()
      };

      const existingHistory = JSON.parse(localStorage.getItem('sb_activity') || '[]');
      localStorage.setItem('sb_activity', JSON.stringify([newResult, ...existingHistory]));
      
      setGameState('result');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQuiz(searchQuery);
  };

  const recoverTopic = async () => {
    if (!recoveryTopic.trim()) return;
    if (!API_KEY) {
        alert("Missing API Key! Please check .env");
        return;
    }

    setRecoveryLoading(true);
    setRecoverySuggestion(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a college student struggling with: "${recoveryTopic}". Provide a short 3-step recovery plan.`,
      });
      
      setRecoverySuggestion(response.text || "Couldn't generate a plan.");
    
    } catch (error) {
      console.error("Recovery failed", error);
      setRecoverySuggestion("AI Recovery unavailable.");
    } finally {
      setRecoveryLoading(false);
    }
  };

  const renderQuizContent = () => {
    if (gameState === 'selection') {
      return (
        <div className="space-y-8 fade-in">
          <div className="text-center pt-2">
            <h2 className="text-2xl font-black text-slate-800">AI Knowledge Lab 🧪</h2>
            <p className="text-slate-500 text-sm mt-1">Generate a quiz on any topic instantly</p>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search any topic (e.g. React, Cloud, AI...)"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-slate-700 font-medium bg-slate-50/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform disabled:bg-slate-300"
                >
                  Go
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Curriculum Subjects</h3>
            <div className="grid gap-3">
              {MOCK_SYLLABUS.subjects.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => generateQuiz(sub.name)}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-500 hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{sub.code}</span>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600">{sub.name}</h3>
                  </div>
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span className="text-lg">➜</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (gameState === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 fade-in">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🤖</div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Gemini is Thinking...</h3>
            <p className="text-slate-400 text-sm italic">Searching for the best questions...</p>
          </div>
        </div>
      );
    }

    if (gameState === 'quiz' && questions.length > 0) {
      const q = questions[currentIndex];
      const progress = ((currentIndex + 1) / questions.length) * 100;

      return (
        <div className="space-y-6 fade-in">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
            <div className="flex justify-between items-center mb-6 pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
              <span className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full truncate max-w-[150px]">{selectedSubject}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-snug">{q.question}</h2>
          </div>

          <div className="grid gap-3">
            {q.options.map((option, idx) => {
              let buttonClass = "bg-white border-slate-100 text-slate-700 hover:border-blue-200";
              if (isLocked) {
                if (idx === q.correctIndex) buttonClass = "bg-green-50 border-green-500 text-green-700 ring-4 ring-green-100";
                else if (idx === userAnswer) buttonClass = "bg-rose-50 border-rose-500 text-rose-700 ring-4 ring-rose-100";
                else buttonClass = "bg-white border-slate-100 opacity-50";
              }

              return (
                <button
                  key={idx}
                  disabled={isLocked}
                  onClick={() => handleAnswer(idx)}
                  className={`p-4 rounded-2xl border text-left font-semibold transition-all active:scale-[0.98] ${buttonClass}`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs flex-shrink-0 font-bold ${
                      isLocked && idx === q.correctIndex ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="pt-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {isLocked && (
            <div className="space-y-4 fade-in">
              <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 shadow-sm">
                <p className="text-blue-700 text-sm leading-relaxed italic">{q.explanation}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'} <span>➜</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    if (gameState === 'result') {
      const isSuccess = score >= 3;
      return (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-8 fade-in">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl border-8 ${isSuccess ? 'bg-green-50 border-green-100' : 'bg-rose-50 border-rose-100'}`}>
            {isSuccess ? '🏆' : '📖'}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">{isSuccess ? 'Excellent Job!' : 'Keep Learning!'}</h2>
            <p className="text-slate-500 mt-2">You scored <span className="text-blue-600 font-black text-xl px-1">{score}/{questions.length}</span></p>
          </div>
          <button
            onClick={() => setGameState('selection')}
            className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            Try Another Topic
          </button>
        </div>
      );
    }
  };

  const renderRecoverContent = () => {
    return (
      <div className="space-y-6 fade-in">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 border-t-4 border-t-indigo-500">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span>🧠</span> AI Concept Recovery
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Struggling with a specific concept? Enter it below for a customized AI roadmap.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
              placeholder="e.g. Normalization in DBMS"
              value={recoveryTopic}
              onChange={(e) => setRecoveryTopic(e.target.value)}
            />
            <button
              onClick={recoverTopic}
              disabled={recoveryLoading || !recoveryTopic.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
            >
              {recoveryLoading ? 'Generating Plan...' : 'Generate Recovery Plan'}
            </button>
          </div>
        </div>

        {recoverySuggestion && (
          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 fade-in">
            <h3 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">
              <span>🗺️</span> Custom Roadmap
            </h3>
            <div className="text-indigo-900 text-sm leading-relaxed whitespace-pre-wrap">
              {recoverySuggestion}
            </div>
          </div>
        )}

        {!recoverySuggestion && !recoveryLoading && (
          <div className="text-center py-10 opacity-30">
            <div className="text-5xl mb-4">🛸</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ready for analysis</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Sub-Navigation Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'quiz' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          Quiz Lab
        </button>
        <button
          onClick={() => setActiveTab('recover')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
            activeTab === 'recover' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'
          }`}
        >
          Concept Recovery
        </button>
      </div>

      {activeTab === 'quiz' ? renderQuizContent() : renderRecoverContent()}
    </div>
  );
};

export default QuizSection;