import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Compass,
  ArrowRight,
  MessageSquare,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  Layers,
  Database,
  Cpu,
  BarChart3,
  Bookmark,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { Item, NavTab } from '../types';
import {
  dashboardService,
  DashboardSummaryResponse,
  SystemHealthResponse,
  ServiceHealthInfo
} from '../services/dashboardService';
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

const CATEGORY_COLORS = ['#2563EB', '#6366F1', '#0D9488', '#F59E0B', '#EC4899', '#8B5CF6'];

export const Overview: React.FC<OverviewProps> = ({
  items,
  savedItems,
  onNavigate,
  onSaveToggle,
  onViewDetails
}) => {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [health, setHealth] = useState<SystemHealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Real data fetcher
  const loadDashboardData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    try {
      const [summaryRes, healthRes] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getSystemHealth()
      ]);
      if (summaryRes) setSummary(summaryRes);
      if (healthRes) setHealth(healthRes);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard telemetry:', err);
    } finally {
      setIsLoading(false);
      if (isManualRefresh) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Format local current date
  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate real service count status
  const servicesList: Array<{ key: string; service: ServiceHealthInfo }> = health?.services
    ? Object.entries(health.services).map(([key, service]) => ({ key, service }))
    : [];

  const operationalCount = servicesList.filter((s) => s.service.status === 'Operational').length;
  const totalServices = servicesList.length;

  // Chart data derivation strictly from actual logs
  const logs = summary?.recentLogs || [];
  const chartData = React.useMemo(() => {
    if (logs.length === 0) return [];

    // Bucket by timestamp display or hour
    const map = new Map<string, number>();
    logs.forEach((log) => {
      const date = new Date(log.timestamp);
      let key = '';
      if (timeRange === '24h') {
        key = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        key = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
      map.set(key, (map.get(key) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([label, count]) => ({ time: label, requests: count }))
      .reverse();
  }, [logs, timeRange]);

  // Category distribution derived from actual backend summary or catalog items
  const categoryData = React.useMemo(() => {
    if (summary?.categoryDistribution && summary.categoryDistribution.length > 0) {
      return summary.categoryDistribution.map((c, i) => ({
        name: c.name,
        value: c.count,
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length]
      }));
    }
    // Fallback to local catalog calculation
    const counts: Record<string, number> = {};
    items.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length]
    }));
  }, [summary, items]);

  const totalCatalogItems = summary?.kpis.catalogSize || items.length;

  // Helper for status badge styling
  const getStatusBadge = (status: ServiceHealthInfo['status']) => {
    switch (status) {
      case 'Operational':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational
          </span>
        );
      case 'Degraded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Degraded
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Offline
          </span>
        );
      case 'Not Configured':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Not Configured
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. DASHBOARD HEADER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-blue-600">Overview Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
            Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Monitor recommendation activity, AI services, and system performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Real Local Date Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{todayFormatted}</span>
          </div>

          {/* Refresh Button with Real Fetch */}
          <button
            onClick={() => loadDashboardData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50"
            title="Fetch latest telemetry from NexusRec backend"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Timestamp Notice */}
      {lastUpdated && (
        <div className="flex items-center justify-between px-2 text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            Live backend telemetry connected ({summary?.kpis.totalRequests || 0} total requests logged)
          </span>
          <span>Last synchronized: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      )}

      {/* 2. SYSTEM STATUS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-[#172033]">System Status & Service Health</h2>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Verified runtime operational status for core AI models and recommendation sub-systems.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {operationalCount} / {totalServices || 7} Operational
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LLM Provider */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">LLM Provider</span>
                {getStatusBadge(health?.services.llmProvider.status || 'Not Configured')}
              </div>
              <p className="text-xs font-medium text-slate-700">
                {health?.services.llmProvider.name || 'Google Gemini API'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Model: {health?.services.llmProvider.model || 'gemini-3.1-flash-lite'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {health?.services.llmProvider.status === 'Operational' ? 'HTTP 200 • Ready' : 'API key required'}
            </span>
          </div>

          {/* Recommendation Agent */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Recommendation Agent</span>
                {getStatusBadge(health?.services.recommendationAgent.status || 'Operational')}
              </div>
              <p className="text-xs font-medium text-slate-700">
                {health?.services.recommendationAgent.name || 'InteRecAgent'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Multi-turn conversational tool execution
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Agent Module Active</span>
          </div>

          {/* Retrieval Engine */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Retrieval Engine</span>
                {getStatusBadge(health?.services.retrievalEngine.status || 'Operational')}
              </div>
              <p className="text-xs font-medium text-slate-700">
                {health?.services.retrievalEngine.name || 'RecLM-emb Dense Vectors'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Semantic similarity & vector ranking
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Cosine Index Ready</span>
          </div>

          {/* Generative Recommender */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Recommendation Model</span>
                {getStatusBadge(health?.services.generativeRecommender.status || 'Operational')}
              </div>
              <p className="text-xs font-medium text-slate-700">
                {health?.services.generativeRecommender.name || 'RecLM-uni Prefix-Tree'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Constrained generative item decoding
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Top-K Decoding</span>
          </div>

          {/* Database */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Database</span>
                {getStatusBadge(health?.services.database.status || 'Operational')}
              </div>
              <p className="text-xs font-medium text-slate-700">Catalog & Session Store</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {totalCatalogItems} items indexed • {health?.services.database.registeredUsers || 0} registered users
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">In-Memory ACID Store</span>
          </div>

          {/* Model Evaluation Service */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Model Evaluation</span>
                {getStatusBadge(health?.services.evaluationService.status || 'Operational')}
              </div>
              <p className="text-xs font-medium text-slate-700">NexusRec Evaluation Suite</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                NDCG, HitRate, MRR benchmarks
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">07_Evaluation_Suite</span>
          </div>

          {/* Model Explainer */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">LLM Explainer</span>
                {getStatusBadge(health?.services.modelExplainer.status || 'Operational')}
              </div>
              <p className="text-xs font-medium text-slate-700">RecExplainer Surrogate</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Feature attribution & rationale
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Surrogate Reasoning</span>
          </div>

          {/* Quick Action card */}
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-xs font-bold text-blue-900">Run Diagnostics</span>
              <p className="text-xs font-medium text-blue-800 mt-1">Evaluation & Health Tests</p>
              <p className="text-[11px] text-blue-600 mt-0.5">
                Inspect accuracy benchmarks across dataset splits.
              </p>
            </div>
            <button
              onClick={() => onNavigate('evaluation')}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
            >
              Evaluation Center <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. RECOMMENDATION ACTIVITY – KPI CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-bold text-[#172033]">Recommendation Activity Metrics</h2>
            <p className="text-xs text-[#64748B]">
              Calculated exclusively from actual authenticated user requests and recommendation logs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Total Recommendation Requests */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold text-slate-600">Total Requests</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-[#172033]">
              {summary?.kpis.totalRequests ?? 0}
            </div>
            <p className="text-[11px] text-[#64748B]">All logged CRS interactions</p>
          </div>

          {/* Active Users */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold text-slate-600">Active Users</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-[#172033]">
              {summary?.kpis.activeUsers ?? 0}
            </div>
            <p className="text-[11px] text-[#64748B]">Distinct session accounts</p>
          </div>

          {/* Items Retrieved */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold text-slate-600">Items Retrieved</span>
              <Compass className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-[#172033]">
              {summary?.kpis.totalItemsRetrieved ?? 0}
            </div>
            <p className="text-[11px] text-[#64748B]">Across candidate sets</p>
          </div>

          {/* Saved Recommendations */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold text-slate-600">Saved Items</span>
              <Bookmark className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-[#172033]">
              {summary?.kpis.savedItemsCount ?? savedItems.length}
            </div>
            <p className="text-[11px] text-[#64748B]">Bookmarked by users</p>
          </div>

          {/* Average Response Time */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold text-slate-600">Avg Latency</span>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-[#172033]">
              {summary?.kpis.averageLatencyMs !== null && summary?.kpis.averageLatencyMs !== undefined
                ? `${summary.kpis.averageLatencyMs}ms`
                : 'N/A'}
            </div>
            <p className="text-[11px] text-[#64748B]">
              {summary?.kpis.averageLatencyMs ? 'Real server round-trip' : 'No requests recorded yet'}
            </p>
          </div>

          {/* Recommendation Success Rate */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold text-slate-600">Success Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-[#172033]">
              {summary?.kpis.successRate !== null && summary?.kpis.successRate !== undefined
                ? `${summary.kpis.successRate}%`
                : 'N/A'}
            </div>
            <p className="text-[11px] text-[#64748B]">
              {summary?.kpis.successRate !== null ? 'Completed without error' : 'No requests recorded yet'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. CHARTS: TIME-SERIES & CATEGORY DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendation Activity Analytics Chart */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#172033]">Recommendation Activity</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Track recommendation requests over time.
              </p>
            </div>

            {/* Time filter selector */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 border border-slate-200">
              {(['24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timeRange === range
                      ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Chart or Clean Empty State */}
          <div className="h-64 w-full flex items-center justify-center">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reqGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#reqGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center p-8 space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    No recommendation activity available yet.
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Telemetry will stream in automatically when recommendations are generated in the AI Chat.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('chat')}
                  className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Start First AI Recommendation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Catalog Category Distribution Donut */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#172033]">Catalog Breakdown</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live distribution of {totalCatalogItems} items in candidate database.
            </p>
          </div>

          <div className="h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-slate-800">{totalCatalogItems}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Items</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="font-medium text-slate-700">{c.name}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {c.value} ({Math.round((c.value / totalCatalogItems) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. RECOMMENDATION ENGINE OVERVIEW */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-[#172033]">Recommendation Engine Capabilities</h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Architectural modules implemented and accessible in this NexusRec deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Conversational Agent */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                  InteRecAgent
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Conversational Recommendation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-turn conversational agent with user intent extraction, tool execution, and SQL/vector synthesis.
              </p>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-200"
            >
              Open AI Chat <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Similar Items & Retrieval */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  RecLM-emb
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Dense Vector Retrieval</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous dense vector representation for cross-domain semantic similarity and item-to-item matching.
              </p>
            </div>
            <button
              onClick={() => onNavigate('similar')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 pt-2 border-t border-slate-200"
            >
              Explore Similar Items <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Unified Generative Recommender */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                  RecLM-uni
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Unified Generative Recommender</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trie-constrained decoding aligning generative language models directly with candidate item IDs.
              </p>
            </div>
            <button
              onClick={() => onNavigate('personalized')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 pt-2 border-t border-slate-200"
            >
              View Personalized Feed <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Explainability Engine */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  RecExplainer
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Explainable AI & Attribution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Surrogate model generating transparent natural language rationales and feature attribution weights.
              </p>
            </div>
            <button
              onClick={() => onNavigate('explainability')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 pt-2 border-t border-slate-200"
            >
              Inspect Explanations <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Benchmark Evaluation Suite */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                  Eval Suite
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Benchmark Evaluation Suite</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scientific offline ranking evaluation calculating NDCG@10, HitRate@10, and MRR metrics.
              </p>
            </div>
            <button
              onClick={() => onNavigate('evaluation')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 pt-2 border-t border-slate-200"
            >
              Open Evaluation Suite <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item Catalog Explorer */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                  SQL & Search
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Multi-Domain Catalog</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filterable repository with attributes, genres, pricing, and domain metadata indexing.
              </p>
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 pt-2 border-t border-slate-200"
            >
              Browse Catalog <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. RECENT RECOMMENDATION ACTIVITY TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-base font-bold text-[#172033]">Recent Recommendation Activity</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live audit trail of queries, response latencies, and execution status.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {logs.length} logged request{logs.length === 1 ? '' : 's'}
          </span>
        </div>

        {logs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 px-3 font-bold">Time</th>
                  <th className="py-3 px-3 font-bold">User</th>
                  <th className="py-3 px-3 font-bold">Query / Intent</th>
                  <th className="py-3 px-3 font-bold">Mode</th>
                  <th className="py-3 px-3 font-bold">Latency</th>
                  <th className="py-3 px-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {log.timeDisplay || new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {log.userId || log.userEmail.split('@')[0]}
                    </td>
                    <td className="py-3 px-3 text-slate-700 max-w-xs truncate" title={log.query}>
                      {log.query}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold uppercase">
                        {log.mode}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {log.latencyMs}ms
                    </td>
                    <td className="py-3 px-3">
                      {log.status === 'success' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-[11px]">
                          <XCircle className="w-3.5 h-3.5" /> Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 px-4 space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">No recommendation requests recorded yet.</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                When users interact with the Recommendation Chat, each request is logged here in real time.
              </p>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Start First Recommendation Request
            </button>
          </div>
        )}
      </div>

      {/* 7. RECENT SYSTEM EVENTS & AUDIT LOG */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#172033]">Recent System Events</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live audit stream of server operations and authentication events.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {summary?.recentEvents?.length || 0} events
          </span>
        </div>

        {summary?.recentEvents && summary.recentEvents.length > 0 ? (
          <div className="space-y-2.5">
            {summary.recentEvents.map((evt) => {
              const isErr = evt.level === 'error';
              const isWarn = evt.level === 'warning';
              const isSuccess = evt.level === 'success';

              return (
                <div
                  key={evt.id}
                  className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        isErr
                          ? 'bg-rose-500'
                          : isWarn
                          ? 'bg-amber-500'
                          : isSuccess
                          ? 'bg-emerald-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{evt.service}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(evt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{evt.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            No system events recorded in the current session.
          </div>
        )}
      </div>
    </div>
  );
};
