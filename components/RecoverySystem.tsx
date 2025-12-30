import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const RecoverySystem: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Safely access the API Key
  const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

  const recoverTopic = async () => {
    if (!topic.trim()) return;

    if (!API_KEY) {
      alert("Missing API Key! Please check your .env file.");
      return;
    }

    setLoading(true);
    setSuggestion(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `I am a college student struggling with the topic: "${topic}". Please provide a short 3-step recovery plan to understand this topic, including one real-world industry application. Keep it concise for mobile reading.`,
      });

      // --- FIX: Access .text directly (no parenthesis) ---
      const text = response.text;
      setSuggestion(text || "Couldn't generate a plan. Try again.");
    
    } catch (error: any) {
      console.error("Recovery failed:", error);
      
      if (error.toString().includes("400") || error.toString().includes("API key")) {
         setSuggestion("⚠️ API Key Error: The key may be expired. Please renew it.");
      } else {
         setSuggestion("AI Recovery is currently unavailable. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 border-t-4 border-t-blue-500">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>🧠</span> AI Concept Recovery
        </h2>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          Struggling with a specific syllabus topic? Enter it below and our AI will build a custom recovery roadmap for you.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
            placeholder="e.g. Normalization in DBMS"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={recoverTopic}
            disabled={loading || !topic}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
          >
            {loading ? 'Analyzing Topic...' : 'Generate Recovery Plan'}
          </button>
        </div>
      </div>

      {suggestion && (
        <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 fade-in">
          <h3 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">
            <span>🗺️</span> Custom Roadmap
          </h3>
          <div className="text-indigo-900 text-sm leading-relaxed whitespace-pre-wrap">
            {suggestion}
          </div>
        </div>
      )}

      {!suggestion && !loading && (
        <div className="text-center py-10 opacity-30">
          <div className="text-5xl mb-4">🛸</div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ready for analysis</p>
        </div>
      )}
    </div>
  );
};

export default RecoverySystem;