import React, { useState } from 'react';
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
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Bot,
  LogOut,
  User,
  Shield,
  ChevronUp
} from 'lucide-react';
import { NavTab, UserProfile } from '../../types';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  savedCount: number;
  user: UserProfile | null;
  onLogout: () => void;
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
  savedCount,
  user,
  onLogout
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const sections: NavSection[] = [
    {
      title: 'MAIN',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'chat', label: 'AI Recommendation Chat', icon: MessageSquareText },
        { id: 'explore', label: 'Explore Items', icon: Compass },
        { id: 'personalized', label: 'Personalized For You', icon: Sparkles },
        { id: 'similar', label: 'Similar Items', icon: GitFork }
      ]
    },
    {
      title: 'PERSONALIZATION',
      items: [
        { id: 'profile', label: 'My Profile & Preferences', icon: User },
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
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'billing', label: 'Billing & Plan', icon: CreditCard }
      ]
    }
  ];

  const displayName = user?.name || 'Workspace Member';
  const displayRole = user?.role || 'AI Researcher';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out select-none ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-base font-extrabold tracking-tight text-slate-900 truncate flex items-center gap-1.5">
                Rec<span className="text-blue-600">AI</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  2.4
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate">
                Enterprise CRS Engine
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive
                    ? 'bg-blue-50 text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
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

      {/* User Profile Footer with Popover Menu & Logout */}
      <div className="relative p-3 border-t border-slate-100 bg-slate-50/70">
        {/* Profile Popover Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-bottom-2 space-y-2">
            <div className="px-2 py-1.5 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-900 truncate">{displayName}</div>
              <div className="text-[11px] text-slate-400 truncate">{user?.email || 'member@recai.io'}</div>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {user?.plan || 'Pro Tier'} Active
              </div>
            </div>

            <div className="space-y-0.5 text-xs">
              <button
                onClick={() => {
                  onTabChange('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-slate-400" /> My Profile & Preferences
              </button>
              <button
                onClick={() => {
                  onTabChange('settings');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" /> Account Settings
              </button>
              <button
                onClick={() => {
                  onTabChange('billing');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Subscription & Plan
              </button>
            </div>

            <div className="pt-1.5 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-50 font-bold text-rose-600 flex items-center gap-2 text-xs transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" /> Log Out
              </button>
            </div>
          </div>
        )}

        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-slate-200 shadow-2xs group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-xs">
                {initial}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                  {displayName}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {displayRole}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          )}
        </div>
      </div>
    </aside>
  );
};
