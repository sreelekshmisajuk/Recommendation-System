import React, { useState } from 'react';
import { Target, Play, CheckCircle2, RotateCw, Sparkles, Layers, FileText } from 'lucide-react';
import { EvaluationResult } from '../types';
import { INITIAL_EVALUATIONS } from '../data/mockData';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const EvaluationCenter: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationResult[]>(INITIAL_EVALUATIONS);
  const [selectedModel, setSelectedModel] = useState<string>('RecLM-uni (Prefix-Tree Constrained)');
  const [selectedDataset, setSelectedDataset] = useState<string>('Steam Game Catalog (2024)');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');

  const models = [
    'RecLM-uni (Prefix-Tree Constrained)',
    'InteRecAgent (Gemini 3.1 Flash-Lite + SQL Tools)',
    'RecLM-gen (SFT + RL Alignment)',
    'RecLM-emb (Dense 10-Task Retrieval)',
    'Base Collaborative Filtering (SASRec)'
  ];

  const datasets = [
    'Steam Game Catalog (2024)',
    'MovieLens 1M Benchmark',
    'Amazon Video Games v3',
    'Multi-Domain E-Commerce Benchmark'
  ];

  const handleRunEvaluation = () => {
    setIsRunning(true);
    setProgress(5);
    setCurrentStage('Initializing evaluation harness & loading ground truth test set...');

    setTimeout(() => {
      setProgress(35);
      setCurrentStage('Generating candidate recommendations and performing constrained decoding...');
    }, 700);

    setTimeout(() => {
      setProgress(75);
      setCurrentStage('Computing Top-K ranking metrics (Hit@10, NDCG@10, MRR)...');
    }, 1500);

    setTimeout(() => {
      setProgress(100);
      setCurrentStage('Evaluation complete! Aggregated metrics stored in audit log.');
      setIsRunning(false);

      const newEval: EvaluationResult = {
        id: `eval-${Date.now()}`,
        model: selectedModel,
        dataset: selectedDataset,
        hitRate5: 0.755,
        hitRate10: 0.891,
        ndcg5: 0.628,
        ndcg10: 0.742,
        mrr: 0.596,
        precision: 0.832,
        recall: 0.891,
        latencyMs: 154,
        hallucinationRate: selectedModel.includes('uni') ? 0.0 : 0.01,
        timestamp: 'Just now',
        status: 'completed'
      };

      setEvaluations((prev) => [newEval, ...prev]);
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" /> RecLM-eval Suite
          </span>
          <span className="text-xs text-slate-400">• Multi-Dimensional Benchmarking</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Recommendation Model Evaluation Center</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Execute reproducible benchmarks across retrieval precision, ranking quality (NDCG), and out-of-domain hallucination avoidance.
        </p>
      </div>

      {/* Runner Config Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" /> Configure Evaluation Run
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Recommendation Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isRunning}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500"
            >
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Test Dataset Benchmark</label>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              disabled={isRunning}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-blue-500"
            >
              {datasets.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar & Status */}
        {isRunning && (
          <div className="space-y-2 p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-900 flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                {currentStage}
              </span>
              <span className="font-bold text-blue-700">{progress}%</span>
            </div>
            <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleRunEvaluation}
            disabled={isRunning}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? 'Running Evaluation...' : 'Execute Evaluation Run'}</span>
          </button>
        </div>
      </div>

      {/* Historical Evaluation Runs Table */}
      <Card title="Evaluation Run History" subtitle="Verified benchmark results and metric records">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Evaluation Run</th>
                <th className="py-3 px-4">Dataset</th>
                <th className="py-3 px-4">Hit Rate@10</th>
                <th className="py-3 px-4">NDCG@10</th>
                <th className="py-3 px-4">MRR</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Hallucination Rate</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {evaluations.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{ev.model}</div>
                    <div className="text-[10px] text-slate-400">{ev.timestamp}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{ev.dataset}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">{(ev.hitRate10 * 100).toFixed(1)}%</td>
                  <td className="py-3 px-4 font-bold text-blue-600">{ev.ndcg10.toFixed(3)}</td>
                  <td className="py-3 px-4 font-medium">{ev.mrr.toFixed(3)}</td>
                  <td className="py-3 px-4">{ev.latencyMs}ms</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      ev.hallucinationRate === 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {(ev.hallucinationRate * 100).toFixed(1)}% OOD
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success" size="sm">Completed</Badge>
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
