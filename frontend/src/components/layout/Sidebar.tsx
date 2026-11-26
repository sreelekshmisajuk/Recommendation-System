import React from 'react';
import {
  LayoutDashboard,
  MessageSquareText,
  Compass,
  Sparkles,
  GitFork,
  SlidersHorizontal,
  History,
  Bookmark,
  BarChart3,
  Cpu,
  Eye,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot
} from 'lucide-react';
import { NavTab } from '../../types';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  savedCount: number;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  savedCount
}) => {
  const sections: NavSection[] = [
    {
      title: 'MAIN',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'chat', label: 'AI Recommendation Chat', icon: MessageSquareText },
        { id: 'explore', label: 'Explore Items', icon: Compass },
        { id: 'personalized', label: 'Personalized Recommendations', icon: Sparkles },
        { id: 'similar', label: 'Similar Items', icon: GitFork }
      ]
    },
    {
      title: 'PERSONALIZATION',
      items: [
        { id: 'preferences', label: 'My Preferences', icon: SlidersHorizontal },
        { id: 'history', label: 'Interaction History', icon: History },
        { id: 'saved', label: 'Saved Items', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined }
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'insights', label: 'Recommendation Insights', icon: BarChart3 },
        { id: 'performance', label: 'Model Performance', icon: Cpu },
        { id: 'explainability', label: 'Explainability', icon: Eye }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'evaluation', label: 'Evaluation Center', icon: Target },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-200 z-40 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onTabChange('overview')}>
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs flex-shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                RecAI <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded border border-blue-200">v2.4</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate">Intelligent Recommendations</span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {sec.title}
              </h4>
            )}
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-blue-100 text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer" onClick={() => onTabChange('settings')}>
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border border-blue-200 text-xs">
              U
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-800 truncate">My Workspace</span>
              <span className="text-[11px] text-slate-400 truncate">Session Active</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
