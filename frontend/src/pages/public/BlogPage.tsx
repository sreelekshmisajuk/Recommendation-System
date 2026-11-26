import React from 'react';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { PublicPage } from '../../types';

interface BlogPageProps {
  onNavigate: (page: PublicPage) => void;
}

export const BlogPage: React.FC<BlogPageProps> = () => {
  const articles = [
    {
      id: 'post-1',
      title: 'Taming LLM Hallucinations in Recommender Systems with Prefix-Tree Decoding',
      summary: 'How RecLM-uni enforces token-level vocabulary constraints to guarantee that generated recommendations always resolve to valid inventory IDs.',
      category: 'Research',
      date: 'November 24, 2026',
      readTime: '6 min read'
    },
    {
      id: 'post-2',
      title: 'Building InteRecAgent: Combining Gemini LLMs with Dynamic SQL Tools',
      summary: 'A deep-dive into conversational CRS architectures where LLMs query latent similarity matrices and user preference databases on the fly.',
      category: 'Engineering',
      date: 'November 18, 2026',
      readTime: '8 min read'
    },
    {
      id: 'post-3',
      title: 'Explainable AI: Why Explanations Drive 35% Higher Click-Through Rates',
      summary: 'Empirical studies comparing surrogate model explanations (RecExplainer) against opaque recommendation lists across retail benchmarks.',
      category: 'Insights',
      date: 'November 10, 2026',
      readTime: '5 min read'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Insights & Whitepapers</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">RecAI Engineering Blog</h1>
        <p className="text-xs text-slate-500">
          Technical deep dives, benchmark results, and system design papers from our recommendation research team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold">{art.category}</span>
                <span>{art.readTime}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{art.summary}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-6">
              <span>{art.date}</span>
              <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Paper <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
