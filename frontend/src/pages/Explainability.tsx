import React, { useState } from 'react';
import { Eye, Sparkles, CheckCircle2, GitMerge, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Item } from '../types';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';

interface ExplainabilityProps {
  items: Item[];
  onViewDetails: (item: Item) => void;
}

export const Explainability: React.FC<ExplainabilityProps> = ({
  items,
  onViewDetails
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(items[0]?.id || 'item-101');
  const currentItem = items.find((i) => i.id === selectedItemId) || items[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Explainable AI (RecExplainer)
          </span>
          <span className="text-xs text-slate-400">• Surrogate LLM Alignment</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Recommendation Attribution & Interpretability</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          RecExplainer decodes target recommender model activations (SASRec, MF) into human-interpretable natural language reasoning and weighted attribution factors.
        </p>

        {/* Item Selector Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 mr-1">Select Item to Inspect:</span>
          {items.slice(0, 5).map((it) => (
            <button
              key={it.id}
              onClick={() => setSelectedItemId(it.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedItemId === it.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {it.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Target Item Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="relative h-48 rounded-xl overflow-hidden bg-slate-100">
            <img src={currentItem.image} alt={currentItem.title} className="w-full h-full object-cover" />
            <div className="absolute top-2.5 left-2.5">
              <Badge variant="primary" size="sm" className="bg-white/95 text-blue-700 shadow-xs">
                {currentItem.category}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">{currentItem.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {currentItem.rating.toFixed(1)}
              </span>
              <span>({currentItem.reviewCount.toLocaleString()} reviews)</span>
              {currentItem.price !== undefined && (
                <span className="font-bold text-slate-900 text-sm">${currentItem.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{currentItem.description}</p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => onViewDetails(currentItem)}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition-colors"
            >
              View Full Item Specifications
            </button>
          </div>
        </div>

        {/* Center/Right Column: Explainability Decomposition */}
        <div className="lg:col-span-2 space-y-6">
          {/* Natural Language Rationale Card */}
          <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 rounded-2xl border border-blue-200/80 p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-blue-950">RecExplainer Natural Language Synthesis</h4>
              </div>
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                Surrogate Alignment (RecExplainer-H)
              </span>
            </div>
            <p className="text-xs text-blue-950/90 leading-relaxed font-normal">
              {currentItem.matchReason ||
                'This item was surfaced because your previous interaction history demonstrated high affinity for deeply immersive worldbuilding and complex choice consequence systems.'}
            </p>
          </div>

          {/* Factor Weight Breakdown */}
          <Card
            title="Attribution Factor Decomposition"
            subtitle="Calculated contribution of latent vectors to recommendation rank"
          >
            <div className="space-y-4">
              {currentItem.factors && currentItem.factors.length > 0 ? (
                currentItem.factors.map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-800">
                      <span className="font-semibold">{f.name}</span>
                      <span className="font-bold text-blue-600">{f.weight}% Influence</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${f.weight}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-slate-500">Historical co-visitation factor: 65%</div>
                  <div className="text-xs text-slate-500">Category preference factor: 35%</div>
                </div>
              )}
            </div>
          </Card>

          {/* Triggering User Behaviors */}
          <Card title="Triggering Historical User Signals" subtitle="Prior actions that directly informed this recommendation">
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900">Interaction with 'Dark Souls III'</span>
                  <div className="text-[11px] text-slate-500">Established mechanical mastery and high tolerance for challenging gameplay.</div>
                </div>
                <Badge variant="success" size="sm">+38% Boost</Badge>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900">Interaction with 'The Witcher 3: Wild Hunt'</span>
                  <div className="text-[11px] text-slate-500">Established preference for open-world exploration and environmental lore.</div>
                </div>
                <Badge variant="primary" size="sm">+32% Boost</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
