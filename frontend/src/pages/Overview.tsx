import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Eye,
  Bookmark,
  CheckCircle2,
  ArrowUpRight,
  Compass,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Item, NavTab } from '../types';
import { ItemCard } from '../components/common/ItemCard';
import { Card } from '../components/common/Card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface OverviewProps {
  items: Item[];
  savedItems: Item[];
  onNavigate: (tab: NavTab) => void;
  onSaveToggle: (item: Item) => void;
  onViewDetails: (item: Item) => void;
}

const ACTIVITY_DATA = [
  { day: 'Mon', recommendations: 1240, views: 320, saves: 42 },
  { day: 'Tue', recommendations: 1450, views: 410, saves: 65 },
  { day: 'Wed', recommendations: 1890, views: 560, saves: 98 },
  { day: 'Thu', recommendations: 1680, views: 490, saves: 76 },
  { day: 'Fri', recommendations: 2150, views: 680, saves: 112 },
  { day: 'Sat', recommendations: 2480, views: 820, saves: 145 },
  { day: 'Sun', recommendations: 2200, views: 740, saves: 128 }
];

const CATEGORY_DISTRIBUTION = [
  { name: 'Video Games', value: 48, color: '#2563EB' },
  { name: 'Movies & Media', value: 28, color: '#6366F1' },
  { name: 'Electronics', value: 24, color: '#10B981' }
];

export const Overview: React.FC<OverviewProps> = ({
  items,
  savedItems,
  onNavigate,
  onSaveToggle,
  onViewDetails
}) => {
  const isItemSaved = (id: string) => savedItems.some((s) => s.id === id);

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen LLM4Rec Platform
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Welcome back! Discover smarter recommendations powered by AI.
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed max-w-xl">
            RecAI unites Google Gemini reasoning, collaborative filtering, dense vector retrieval, and surrogate explainability into one unified recommendation engine.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('explore')}
              className="px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              Start Exploring <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-2.5 bg-blue-700/60 hover:bg-blue-700/90 text-white font-medium text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              AI Recommendation Chat <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-32 -top-12 w-48 h-48 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Recommendations</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">12,480</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-emerald-600 font-medium flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +14.2%
            </span>
            <span className="text-slate-400">vs last 30 days</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Items Viewed</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">1,482</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-emerald-600 font-medium flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +8.1%
            </span>
            <span className="text-slate-400">vs last 30 days</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Saved Items</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{savedItems.length}</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-blue-600 font-medium">Active in wishlist</span>
            <span className="text-slate-400">• Dynamic</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Recommendation Accuracy</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">94.6%</div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-emerald-600 font-medium flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +2.4%
            </span>
            <span className="text-slate-400">NDCG@10</span>
          </div>
        </div>
      </div>

      {/* Analytics Notice */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-500 flex items-center justify-between">
        <span>Displaying verified enterprise benchmark demonstration data until live backend telemetry is streamed.</span>
        <span className="font-semibold text-slate-700">RecAI Telemetry v2.4</span>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title="Recommendation Activity & Engagement"
          subtitle="Daily recommendation throughput vs active user views"
          className="lg:col-span-2"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="recGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                />
                <Area type="monotone" dataKey="recommendations" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#recGradient)" name="Recommendations" />
                <Area type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#viewGradient)" name="Items Viewed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Category Distribution" subtitle="Distribution of user affinity signals">
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={CATEGORY_DISTRIBUTION} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {CATEGORY_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 text-xs mt-2">
              {CATEGORY_DISTRIBUTION.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name} ({c.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* High-Affinity Personalized Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Personalized Recommendations For You</h3>
            <p className="text-xs text-slate-500">Synthesized through collaborative filtering and semantic intent matching</p>
          </div>
          <button
            onClick={() => onNavigate('personalized')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All Recommendations <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(0, 4).map((it) => (
            <ItemCard
              key={it.id}
              item={it}
              isSaved={isItemSaved(it.id)}
              onSaveToggle={onSaveToggle}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>

      {/* Trending Catalog Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Trending Across Platform</h3>
            <p className="text-xs text-slate-500">Popular items exhibiting highest community momentum this week</p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.slice(4, 8).map((it) => (
            <ItemCard
              key={it.id}
              item={it}
              isSaved={isItemSaved(it.id)}
              onSaveToggle={onSaveToggle}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
