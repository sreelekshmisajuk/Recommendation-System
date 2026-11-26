import React from 'react';
import { BarChart3, TrendingUp, Layers, Sparkles, PieChart as PieIcon, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

const CATEGORY_ENGAGEMENT = [
  { category: 'Action RPGs', impressions: 4800, clicks: 1250, conversionRate: '26.0%' },
  { category: 'Sci-Fi Films', impressions: 3200, clicks: 820, conversionRate: '25.6%' },
  { category: 'Audio Gear', impressions: 2400, clicks: 680, conversionRate: '28.3%' },
  { category: 'Open World', impressions: 4100, clicks: 1100, conversionRate: '26.8%' },
  { category: 'Dark Fantasy', impressions: 3900, clicks: 1040, conversionRate: '26.6%' }
];

const ENGAGEMENT_TRENDS = [
  { week: 'W1', ctr: 18.2, relevance: 88, coverage: 76 },
  { week: 'W2', ctr: 21.4, relevance: 91, coverage: 79 },
  { week: 'W3', ctr: 24.8, relevance: 93, coverage: 82 },
  { week: 'W4', ctr: 27.2, relevance: 95, coverage: 86 }
];

const SCORE_DISTRIBUTION = [
  { range: '90-100%', count: 48, fill: '#2563EB' },
  { range: '80-89%', count: 32, fill: '#3B82F6' },
  { range: '70-79%', count: 14, fill: '#60A5FA' },
  { range: '<70%', count: 6, fill: '#93C5FD' }
];

export const RecommendationInsights: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> Intelligence Analytics
          </span>
          <span className="text-xs text-slate-400">• Behavioral Analytics Engine</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Recommendation Behavior & Quality Insights</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Deep-dive telemetry assessing candidate diversity, click-through rates (CTR), and multi-turn recommendation conversions.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Average Click-Through Rate</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">26.8%</div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center mt-2">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +3.4% this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Mean Relevance Score</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">94.2%</div>
          <span className="text-xs text-blue-600 font-semibold flex items-center mt-2">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> High-confidence tier
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Catalog Coverage</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">86.4%</div>
          <span className="text-xs text-indigo-600 font-semibold flex items-center mt-2">
            <Layers className="w-3.5 h-3.5 mr-1" /> Diverse multi-modal ground
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Explanation Engagement</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">78.1%</div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center mt-2">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> Read detailed reasoning
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weekly Quality Progression" subtitle="Correlation of CTR (%) vs Mean Relevance (%)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENGAGEMENT_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="week" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                <Line type="monotone" dataKey="relevance" stroke="#2563EB" strokeWidth={2.5} name="Relevance Score (%)" />
                <Line type="monotone" dataKey="ctr" stroke="#10B981" strokeWidth={2.5} name="Click-Through Rate (%)" />
                <Line type="monotone" dataKey="coverage" stroke="#6366F1" strokeWidth={2} strokeDasharray="4 4" name="Catalog Coverage (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Candidate Relevance Score Distribution" subtitle="Percentage of candidates generated per score tier">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCORE_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="range" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                <Bar dataKey="count" name="Candidate Items (%)" radius={[6, 6, 0, 0]}>
                  {SCORE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Categories Breakdown Table */}
      <Card title="Top Performing Categories" subtitle="Aggregated performance by primary domain cluster">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Category Cluster</th>
                <th className="py-3 px-4">Total Impressions</th>
                <th className="py-3 px-4">Active Clicks</th>
                <th className="py-3 px-4">Conversion Rate</th>
                <th className="py-3 px-4">Model Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {CATEGORY_ENGAGEMENT.map((row) => (
                <tr key={row.category} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{row.category}</td>
                  <td className="py-3 px-4">{row.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4">{row.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">{row.conversionRate}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      High (&gt;90%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
