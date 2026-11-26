import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Bot,
  Layers,
  ChevronDown,
  CheckCircle2,
  Cpu,
  Star
} from 'lucide-react';
import { PublicPage } from '../../types';

interface HomePageProps {
  onNavigate: (page: PublicPage) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAuth }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does RecAI differ from traditional recommender systems?',
      a: 'Traditional recommender systems rely purely on matrix factorization and click logs. RecAI integrates conversational Large Language Models (LLMs) with constrained prefix-tree decoding, dense vector embeddings (RecLM-emb), and surrogate explainability (RecExplainer), giving users conversational agency without hallucinated items.'
    },
    {
      q: 'Which LLMs can be used with RecAI?',
      a: 'RecAI features seamless support for Google Gemini (including gemini-3.1-flash-lite, gemini-3.8-flash), OpenAI GPT-4o, Anthropic Claude 3.5, and open-weight Hugging Face models via OpenAI-compatible endpoints.'
    },
    {
      q: 'Can I integrate my own custom product catalog?',
      a: 'Yes! RecAI supports CSV, JSONL, and direct SQL database ingestion. You can run offline evaluation suites across standard benchmarks like MovieLens, Steam, or your proprietary telemetry.'
    },
    {
      q: 'Is there enterprise support and private cloud deployment?',
      a: 'Enterprise tiers include dedicated VPC deployment, custom prefix-tree indexing on private models, zero data retention agreements, and SLA guarantees.'
    }
  ];

  return (
    <div className="space-y-24 py-12">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Enterprise Conversational CRS Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Recommendations powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Cognitive AI</span> & Semantic Models
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Unify multi-turn LLM reasoning, dense vector retrieval, and surrogate explainability to deliver hyper-personalized item discovery at enterprise scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenAuth('signup')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            Start Free Trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl font-bold text-sm border border-slate-200 shadow-xs transition-all"
          >
            View Pricing & Plans
          </button>
        </div>

        {/* Feature Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> SOC2 Compliant</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> &lt;150ms P95 Latency</span>
          <span className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-blue-600" /> Gemini & GPT Powered</span>
        </div>
      </section>

      {/* 2. PRODUCT DEMO PREVIEW CARD */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Live Architecture</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Multi-Agent Recommender Pipeline</h3>
            </div>
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            >
              Sign In to View Live Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">InteRecAgent</div>
              <p className="text-xs text-slate-500">Conversational intent parsing with SQL and semantic retrieval tools.</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <div className="font-bold text-sm text-slate-900">RecLM-emb</div>
              <p className="text-xs text-slate-500">10-task dense representation model for zero-shot item matching.</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div className="font-bold text-sm text-slate-900">RecLM-uni</div>
              <p className="text-xs text-slate-500">Prefix-tree constrained decoding ensuring zero item hallucinations.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div className="font-bold text-sm text-slate-900">RecExplainer</div>
              <p className="text-xs text-slate-500">Surrogate language models decoding latent vector reasons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF / ENTERPRISE TESTIMONIALS */}
      <section className="bg-slate-100/60 py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Trusted by modern media & e-commerce teams</h2>
            <p className="text-xs text-slate-500">Leading companies deploy RecAI to replace static collaborative filtering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "RecAI increased our catalog session duration by 42%. Users love the conversational recommendations backed by clear explanations."
              </p>
              <div>
                <div className="font-bold text-xs text-slate-900">David M.</div>
                <div className="text-[11px] text-slate-400">VP Engineering, StreamVerse</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "The constrained decoding (RecLM-uni) eliminated hallucinated products completely. Our return rates dropped dramatically."
              </p>
              <div>
                <div className="font-bold text-xs text-slate-900">Elena R.</div>
                <div className="text-[11px] text-slate-400">Head of Data Science, RetailSphere</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "Setting up the Gemini-based conversational CRS took less than an hour. The offline evaluation center gives us immense confidence."
              </p>
              <div>
                <div className="font-bold text-xs text-slate-900">Marcus T.</div>
                <div className="text-[11px] text-slate-400">Chief Product Officer, OmniCommerce</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about RecAI architecture and deployment.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl sm:text-4xl font-black">Transform your recommendations with AI today</h2>
          <p className="text-blue-100 max-w-xl mx-auto text-sm">
            Deploy conversational agents, benchmark your algorithms, and boost user engagement in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-lg transition-colors"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 bg-blue-700/60 hover:bg-blue-700 text-white font-bold rounded-xl text-xs border border-blue-400/30 transition-colors"
            >
              Talk to an AI Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
