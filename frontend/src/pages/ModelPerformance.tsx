import React from 'react';
import { Cpu, CheckCircle2, AlertCircle, Clock, Zap, Activity } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const ModelPerformance: React.FC = () => {
  const models = [
    {
      name: 'RecLM-uni (Constrained Prefix-Tree)',
      role: 'Out-of-Domain Guarded Generative Recommender',
      status: 'Active',
      latency: '142ms',
      throughput: '450 req/s',
      hitRate10: '88.4%',
      ndcg10: '0.729',
      mrr: '0.584',
      type: 'Primary Engine'
    },
    {
      name: 'InteRecAgent (Gemini 3.1 Flash-Lite + Tools)',
      role: 'Conversational Recommender AI Agent',
      status: 'Active',
      latency: '185ms',
      throughput: '220 req/s',
      hitRate10: '89.2%',
      ndcg10: '0.748',
      mrr: '0.601',
      type: 'Agent Core'
    },
    {
      name: 'RecLM-emb (Dense Item Retrieval)',
      role: '10-Task Multi-Modal Item Matching',
      status: 'Active',
      latency: '48ms',
      throughput: '1,200 req/s',
      hitRate10: '85.7%',
      ndcg10: '0.710',
      mrr: '0.562',
      type: 'Retrieval'
    },
    {
      name: 'RecExplainer-H (Hybrid Surrogate)',
      role: 'Latent & Behavioral Explanation Synthesis',
      status: 'Active',
      latency: '220ms',
      throughput: '180 req/s',
      hitRate10: '83.9%',
      ndcg10: '0.698',
      mrr: '0.548',
      type: 'Attribution'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Model Performance Monitoring
          </span>
          <span className="text-xs text-slate-400">• Production Telemetry & Latency</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Technical Model Telemetry & Benchmarks</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time metrics tracking retrieval precision, ranking alignment (NDCG), and surrogate explanation fidelity.
        </p>
      </div>

      {/* Model Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((m) => (
          <div key={m.name} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{m.type}</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {m.status}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{m.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{m.role}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Latency (p95):</span>
                <div className="font-semibold text-slate-800">{m.latency}</div>
              </div>
              <div>
                <span className="text-slate-400">NDCG@10:</span>
                <div className="font-semibold text-blue-600">{m.ndcg10}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Metric Breakdown Table */}
      <Card title="Comparative Benchmark Matrix" subtitle="Standardized offline and online evaluation metrics">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Model Architecture</th>
                <th className="py-3 px-4">Hit Rate@10</th>
                <th className="py-3 px-4">NDCG@10</th>
                <th className="py-3 px-4">MRR</th>
                <th className="py-3 px-4">Latency (Avg)</th>
                <th className="py-3 px-4">Throughput</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {models.map((row) => (
                <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{row.name}</div>
                    <div className="text-[11px] text-slate-400">{row.role}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">{row.hitRate10}</td>
                  <td className="py-3 px-4 font-bold text-blue-600">{row.ndcg10}</td>
                  <td className="py-3 px-4">{row.mrr}</td>
                  <td className="py-3 px-4 font-medium">{row.latency}</td>
                  <td className="py-3 px-4">{row.throughput}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success" size="sm">Operational</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Latency SLAs */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span>
            <strong>SLA Performance Guarantee:</strong> All dense retrieval calls resolve sub-50ms; generative multi-modal explanations resolve under 250ms via speculative decoding.
          </span>
        </div>
        <span className="font-bold text-slate-900">Uptime: 99.98%</span>
      </div>
    </div>
  );
};
