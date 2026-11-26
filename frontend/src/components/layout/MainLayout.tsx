import React, { useState } from 'react';
import { NavTab, UserPreferences } from '../../types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  savedCount: number;
  preferences: UserPreferences;
  globalSearch: string;
  onGlobalSearchChange: (q: string) => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  activeTab,
  onNavigate,
  savedCount,
  globalSearch,
  onGlobalSearchChange,
  children
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={onNavigate}
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        savedCount={savedCount}
      />

      {/* Main Container with responsive transition */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          globalSearch={globalSearch}
          onGlobalSearchChange={onGlobalSearchChange}
          onTabChange={onNavigate}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-sm py-4 px-6 md:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>RecAI Engine 2.4-lite • Gemini LLM Hybrid Recommendation Mesh</span>
          </div>
          <div>
            <span>© 2026 RecAI Technologies Inc. • Enterprise Multi-agent CRS Platform</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
