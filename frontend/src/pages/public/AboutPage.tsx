import React from 'react';
import { Sparkles, Brain, Cpu, ShieldCheck, ArrowRight, Code, BookOpen } from 'lucide-react';
import { PublicPage } from '../../types';

interface AboutPageProps {
  onNavigate: (page: PublicPage) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Our Mission</span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Pioneering Cognitive & Explainable Conversational Recommendations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          NexusRec was founded by AI researchers and engineers dedicated to moving recommendation technology beyond black-box matrix factorization into interactive, interpretable agentic experiences.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Zero Hallucinations</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Using prefix-tree trie constraints during generative decoding (RecLM-uni), we mathematically guarantee that generated recommendations always exist in your inventory.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Multi-Modal Retrieval</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            RecLM-emb encodes multi-task item attributes, user interaction sequences, and deep text descriptions into a shared high-dimensional vector space.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Complete Transparency</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            RecExplainer synthesizes natural language rationales for why items are surfaced, eliminating consumer distrust and black-box skepticism.
          </p>
        </div>
      </div>

      {/* Team CTA */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-base text-slate-900">Experience the live platform</h4>
          <p className="text-xs text-slate-500">Log in or create a developer account to try our interactive recommendation assistant.</p>
        </div>
        <button
          onClick={() => onOpenAuth('signup')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
        >
          Explore Member Console <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
