import React, { useState } from 'react';
import { GitFork, Star, ArrowRight, Check, Sparkles, Scale, Info } from 'lucide-react';
import { Item } from '../types';
import { ItemCard } from '../components/common/ItemCard';
import { Badge } from '../components/common/Badge';

interface SimilarItemsProps {
  items: Item[];
  savedItems: Item[];
  onSaveToggle: (item: Item) => void;
  onViewDetails: (item: Item) => void;
}

export const SimilarItems: React.FC<SimilarItemsProps> = ({
  items,
  savedItems,
  onSaveToggle,
  onViewDetails
}) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(items[0]?.id || 'item-101');
  const [comparedItemId, setComparedItemId] = useState<string>(items[1]?.id || 'item-102');

  const sourceItem = items.find((i) => i.id === selectedSourceId) || items[0];
  const comparedItem = items.find((i) => i.id === comparedItemId) || items[1];

  const similarItems = items
    .filter((i) => i.id !== sourceItem.id)
    .map((i, idx) => ({
      ...i,
      similarityScore: Math.max(72, 98 - idx * 4)
    }))
    .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0));

  const isItemSaved = (id: string) => savedItems.some((s) => s.id === id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" /> Dense Vector Retrieval
          </span>
          <span className="text-xs text-slate-400">• RecLM-emb 10-Task Alignment</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Semantic Item Similarity Discovery</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          Select any reference item to extract high-dimensional embedding neighbors across genre, latent gameplay mechanics, and collaborative co-visitation patterns.
        </p>

        {/* Source Item Selector Dropdown */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">Choose Seed Item:</span>
          <select
            value={selectedSourceId}
            onChange={(e) => {
              setSelectedSourceId(e.target.value);
              // ensure compared item is different
              if (comparedItemId === e.target.value) {
                const other = items.find((i) => i.id !== e.target.value);
                if (other) setComparedItemId(other.id);
              }
            }}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500"
          >
            {items.map((it) => (
              <option key={it.id} value={it.id}>
                {it.title} ({it.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Source Item Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={sourceItem.image}
            alt={sourceItem.title}
            className="w-20 h-20 rounded-xl object-cover border border-white/20 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300">Seed Reference</span>
              <span className="text-xs text-slate-400">• {sourceItem.category}</span>
            </div>
            <h3 className="text-lg font-bold">{sourceItem.title}</h3>
            <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{sourceItem.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end md:self-center">
          <div className="text-right">
            <span className="text-xs text-slate-400">Rating</span>
            <div className="text-base font-bold text-amber-400 flex items-center justify-end gap-1">
              <Star className="w-4 h-4 fill-amber-400" /> {sourceItem.rating.toFixed(1)}
            </div>
          </div>
          {sourceItem.price !== undefined && (
            <div className="text-right border-l border-white/20 pl-4">
              <span className="text-xs text-slate-400">Price</span>
              <div className="text-base font-bold">${sourceItem.price.toFixed(2)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Comparison Module */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Side-by-Side Latent Feature Comparison</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Compare with:</span>
            <select
              value={comparedItemId}
              onChange={(e) => setComparedItemId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium"
            >
              {items
                .filter((i) => i.id !== sourceItem.id)
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Item Specs */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Target Item A</span>
              <Badge variant="primary" size="sm">Seed</Badge>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{sourceItem.title}</h4>
            <div className="text-xs text-slate-600 space-y-1 pt-1">
              <div><strong>Category:</strong> {sourceItem.category}</div>
              <div><strong>Genres:</strong> {sourceItem.genres.join(', ')}</div>
              <div><strong>Key Tags:</strong> {sourceItem.tags.join(', ')}</div>
            </div>
          </div>

          {/* Compared Item Specs */}
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-700">Compared Item B</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                {comparedItem.similarityScore || 94}% Cosine Match
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{comparedItem.title}</h4>
            <div className="text-xs text-slate-600 space-y-1 pt-1">
              <div><strong>Category:</strong> {comparedItem.category}</div>
              <div><strong>Genres:</strong> {comparedItem.genres.join(', ')}</div>
              <div><strong>Key Tags:</strong> {comparedItem.tags.join(', ')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Candidates Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ranked Similar Items</h3>
            <p className="text-xs text-slate-500">Ordered by embedding proximity in RecLM-emb representation space</p>
          </div>
          <span className="text-xs text-slate-400">Total {similarItems.length} neighbors discovered</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isSaved={isItemSaved(item.id)}
              onSaveToggle={onSaveToggle}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
