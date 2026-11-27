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
      name: 'Developer Sandbox',
      desc: 'Ideal for Indian startups, students, and engineers prototyping recommendation agents.',
      monthlyPrice: '₹0',
      yearlyPrice: '₹0',
      gstNote: 'Free forever • No credit card required',
      features: [
        '10,000 Monthly RecAI API Calls',
        'Google Gemini 3.1 Flash-Lite Engine',
        'Top-K Benchmark Evaluation Harness',
        'Indian Developer Community Support',
        '1 Production Workspace',
        'Standard Rate Limiting'
      ],
      cta: 'Start Free in India',
      popular: false
    },
    {
      name: 'Startup Pro Engine',
      desc: 'Designed for fast-growing Indian D2C, media, and OTT platforms needing low latency.',
      monthlyPrice: '₹4,999',
      yearlyPrice: '₹3,999',
      gstNote: '+ 18% GST applicable • UPI & RuPay accepted',
      features: [
        '500,000 Monthly RecAI API Calls',
        'Google Gemini & GPT-4o Hybrid Endpoints',
        'Prefix-Tree Constrained Decoding (RecLM-uni)',
        'Dense Embedding Vector Search (RecLM-emb)',
        'Explainable AI Attribution (RecExplainer)',
        'Priority Slack & WhatsApp Support (IST Hours)',
        'Razorpay & NetBanking Invoicing'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true
    },
    {
      name: 'Bharat Enterprise Mesh',
      desc: 'Dedicated private VPC hosting in AWS Mumbai (ap-south-1) / GCP Delhi with Indian data compliance.',
      monthlyPrice: '₹29,999',
      yearlyPrice: '₹24,999',
      gstNote: 'Custom GST invoicing • TDS compliant billing',
      features: [
        'Unlimited Monthly API Calls',
        'Indian Cloud VPC (Mumbai / Hyderabad / Delhi)',
        'Digital Personal Data Protection (DPDP) Act Compliant',
        'Custom Fine-Tuning on Indian Catalogues & Languages',
        'Dedicated Solution Architect in Bengaluru',
        '24/7 Phone & Enterprise On-Call Support',
        '99.95% Uptime SLA Guarantee'
      ],
      cta: 'Contact Indian Sales Team',
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          🇮🇳 Tailored for Indian Startups, D2C Brands & Enterprises
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Transparent Pricing in Indian Rupees (INR)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Scale your conversational recommendation platform with instant UPI, RuPay, Corporate NetBanking, and GST tax invoice receipts.
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
            Annual Billing <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">Save 20%</span>
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
                Most Popular in India
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{tier.desc}</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    {billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{tier.gstNote}</div>
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
              onClick={() => (tier.name === 'Bharat Enterprise Mesh' ? onNavigate('contact') : onOpenAuth('signup'))}
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

      {/* Payment methods footer */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500 space-y-2">
        <div className="font-semibold text-slate-700">Supported Indian Payment Gateways & Rails</div>
        <p className="text-[11px]">UPI (Google Pay, PhonePe, Paytm), RuPay Cards, Visa/Mastercard (Domestic & International), Corporate NetBanking, and NEFT/RTGS for Enterprises.</p>
      </div>
    </div>
  );
};
