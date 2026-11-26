import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PublicPage } from '../../types';

interface PricingPageProps {
  onNavigate: (page: PublicPage) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenAuth }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tiers = [
    {
      name: 'Developer Starter',
      desc: 'Ideal for prototyping recommendation agents and local evaluation benchmark testing.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '10,000 Monthly RecAI API Calls',
        'Google Gemini 3.1 Flash-Lite Engine',
        'Top-K Benchmark Evaluation Harness',
        'Standard Community Support',
        '1 Project Workspace'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro Engine',
      desc: 'Designed for production apps requiring conversational agents and vector matching.',
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        '500,000 Monthly RecAI API Calls',
        'All Gemini & GPT-4o Models',
        'Prefix-Tree Constrained Decoding (RecLM-uni)',
        'Dense Embedding Vector Search (RecLM-emb)',
        'Explainable AI Attribution (RecExplainer)',
        'Priority Technical Support'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true
    },
    {
      name: 'Enterprise Mesh',
      desc: 'Dedicated infrastructure, custom prefix-tree models, and private cloud deployment.',
      monthlyPrice: 499,
      yearlyPrice: 399,
      features: [
        'Unlimited Monthly API Calls',
        'Dedicated Private VPC Deployment',
        'Custom Fine-Tuning & Offline Alignment',
        'Zero Data Retention Guarantee',
        'Custom SLA & 24/7 Dedicated Architect',
        'SOC2 & HIPAA Compliance Package'
      ],
      cta: 'Contact Enterprise Sales',
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Transparent Pricing</span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Flexible plans for developers and enterprise teams
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Scale your conversational recommendation platform with zero hidden fees. Upgrade or cancel anytime.
        </p>

        {/* Billing cycle toggle */}
        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Yearly <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
              tier.popular
                ? 'bg-white border-2 border-blue-600 shadow-2xl relative scale-105'
                : 'bg-white border border-slate-200 shadow-xs'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
                Most Popular
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{tier.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  ${billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice}
                </span>
                <span className="text-xs text-slate-400">/month</span>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-800">Everything in this plan:</span>
                <ul className="space-y-2.5">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => (tier.name === 'Enterprise Mesh' ? onNavigate('contact') : onOpenAuth('signup'))}
              className={`w-full py-3 rounded-xl text-xs font-bold mt-8 transition-all ${
                tier.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
