import React, { useState } from 'react';
import { Search, Bell, HelpCircle, ChevronRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { NavTab } from '../../types';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  globalSearch: string;
  onGlobalSearchChange: (q: string) => void;
}

const TAB_TITLES: Record<NavTab, { title: string; category: string }> = {
  overview: { title: 'Platform Overview', category: 'Main' },
  chat: { title: 'AI Recommendation Chat', category: 'Main' },
  explore: { title: 'Explore Item Catalog', category: 'Main' },
  personalized: { title: 'Personalized Recommendations', category: 'Main' },
  similar: { title: 'Semantic Similarity Discovery', category: 'Main' },
  preferences: { title: 'Taste Profile & Preferences', category: 'Personalization' },
  history: { title: 'Interaction & Audit History', category: 'Personalization' },
  saved: { title: 'Saved Items & Wishlist', category: 'Personalization' },
  insights: { title: 'Recommendation Insights', category: 'Intelligence' },
  performance: { title: 'Model Performance Monitoring', category: 'Intelligence' },
  explainability: { title: 'Explainability & Attribution', category: 'Intelligence' },
  evaluation: { title: 'Evaluation Center', category: 'System' },
  settings: { title: 'System Settings', category: 'System' },
  billing: { title: 'Billing & Plan Manager', category: 'System' }
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  globalSearch,
  onGlobalSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const { title, category } = TAB_TITLES[activeTab] || { title: 'Dashboard', category: 'Main' };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Breadcrumbs & Title */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="hover:text-slate-700 cursor-pointer" onClick={() => onTabChange('overview')}>
          RecAI
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-500 font-medium">{category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">{title}</span>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global Search */}
        <div className="relative w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            placeholder="Search items, models, or topics..."
            className="w-full pl-9 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all as read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors text-xs space-y-1 cursor-pointer">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Model Benchmark Completed
                  </div>
                  <p className="text-slate-600">RecLM-uni evaluation on Steam catalog finished with NDCG@10 of 0.729.</p>
                  <span className="text-[10px] text-slate-400">10m ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors text-xs space-y-1 cursor-pointer">
                  <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> High-Affinity Item Discovered
                  </div>
                  <p className="text-slate-600">New release aligned with your dark fantasy RPG interest: Elden Ring DLC.</p>
                  <span className="text-[10px] text-slate-400">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Platform Architecture & Docs"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Help Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">About RecAI Enterprise Platform</h3>
                <button onClick={() => setShowHelpModal(false)} className="text-xs text-slate-400 hover:text-slate-700">Close</button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                RecAI combines Large Language Models (LLMs) with traditional collaborative filtering, dense retrieval, and surrogate explainability models.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div className="font-semibold text-slate-900">Core Sub-systems:</div>
                <div>• <strong>InteRecAgent</strong>: Conversational agent with SQL and similarity tools.</div>
                <div>• <strong>RecLM-emb</strong>: Multi-task dense vector retrieval model.</div>
                <div>• <strong>RecLM-uni</strong>: Prefix-tree constrained generation avoiding hallucinated items.</div>
                <div>• <strong>RecExplainer</strong>: Behavioral and latent model explainability.</div>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
