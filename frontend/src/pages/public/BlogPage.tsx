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
      title: 'Scaling Conversational Recommender Systems for Indian E-Commerce and D2C',
      summary: 'How RecLM-uni enforces token-level vocabulary constraints to eliminate product hallucinations across multilingual Indian catalogs on Flipkart and ONDC ecosystems.',
      category: 'Research • Bengaluru Lab',
      date: 'November 24, 2026',
      readTime: '6 min read',
      institution: 'RecAI Research Bengaluru'
    },
    {
      id: 'post-2',
      title: 'Dense Vector Retrieval across Indian Vernacular Contexts using RecLM-emb',
      summary: 'Benchmarking 10-task embedding models on Indian media, OTT streaming catalogs, and localized search intents in collaboration with research cohorts.',
      category: 'Engineering • Hyderabad Hub',
      date: 'November 18, 2026',
      readTime: '8 min read',
      institution: 'RecAI Labs India'
    },
    {
      id: 'post-3',
      title: 'Compliance with India’s Digital Personal Data Protection (DPDP) Act in AI Recommenders',
      summary: 'Architectural blueprints for zero-retention LLM inference and local AWS Mumbai (ap-south-1) data residency for high-throughput consumer apps.',
      category: 'Policy & Infrastructure',
      date: 'November 10, 2026',
      readTime: '5 min read',
      institution: 'DPDP Working Group'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          🇮🇳 Indian AI Research & Whitepapers
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">RecAI India Engineering Blog</h1>
        <p className="text-xs text-slate-500">
          Technical deep-dives, benchmark reports from our Bengaluru AI lab, and system design papers tailored for the Indian digital ecosystem.
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
                Read Whitepaper <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
