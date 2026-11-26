import React from 'react';
import { ShieldCheck, FileText, Lock } from 'lucide-react';
import { PublicPage } from '../../types';

interface LegalPageProps {
  page: 'privacy' | 'terms' | 'cookies';
  onNavigate: (page: PublicPage) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Legal Documentation</span>
        <h1 className="text-3xl font-black text-slate-900 capitalize">
          {page === 'privacy' && 'Privacy Policy'}
          {page === 'terms' && 'Terms of Service'}
          {page === 'cookies' && 'Cookie Policy'}
        </h1>
        <p className="text-xs text-slate-400">Last updated: November 26, 2026 • Effective immediately</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs prose prose-slate text-xs text-slate-600 leading-relaxed space-y-6">
        {page === 'privacy' && (
          <>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">1. Information We Collect</h3>
              <p>
                RecAI collects account metadata, API telemetry logs, and recommendation query inputs strictly to provide, optimize, and secure conversational recommendation workloads. We do NOT sell user interaction logs to third parties.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">2. LLM Model Zero-Retention Policy</h3>
              <p>
                When utilizing proprietary backend models such as Google Gemini or OpenAI endpoints, customer prompts and user items are transmitted via enterprise zero-data-retention APIs and are not used to train foundation models without explicit opt-in.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">3. Data Security & Encryption</h3>
              <p>
                All data in transit is encrypted using TLS 1.3. Stored database indexes and embedding caches are protected with AES-256 encryption at rest.
              </p>
            </section>
          </>
        )}

        {page === 'terms' && (
          <>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">1. Acceptance of Terms</h3>
              <p>
                By creating an account or accessing the RecAI platform and API, you agree to comply with these Terms of Service and all applicable data privacy regulations.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">2. API Usage & Rate Limits</h3>
              <p>
                Accounts are assigned specific tier quotas. Attempting to bypass rate limiting or conduct automated denial of service against RecAI infrastructure is strictly prohibited.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">3. Intellectual Property</h3>
              <p>
                All algorithmic models, trademarks, prefix-tree indexing methods, and proprietary surrogate architectures remain the intellectual property of RecAI Technologies Inc.
              </p>
            </section>
          </>
        )}

        {page === 'cookies' && (
          <>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">1. Purpose of Cookies</h3>
              <p>
                We use strictly necessary cookies to authenticate your session, maintain user security tokens, and remember your display preferences across navigation tabs.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">2. Managing Cookie Preferences</h3>
              <p>
                You may disable optional performance cookies at any time via the bottom banner or your browser settings without impairing core recommendation functionality.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
