import React, { useState } from 'react';
import { Sparkles, History, Flame, Compass, RefreshCw, Layers } from 'lucide-react';
import { Item } from '../types';
import { ItemCard } from '../components/common/ItemCard';

interface PersonalizedRecommendationsProps {
  items: Item[];
  savedItems: Item[];
  onSaveToggle: (item: Item) => void;
  onViewDetails: (item: Item) => void;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  items,
  savedItems,
  onSaveToggle,
  onViewDetails
}) => {
  const [activeSection, setActiveSection] = useState<'forYou' | 'history' | 'popular' | 'discoveries'>('forYou');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Video Games', 'Movies & Media', 'Electronics'];

  const getFilteredItems = () => {
    let list = [...items];

    if (activeSection === 'history') {
      list = list.filter((i) => ['item-101', 'item-102', 'item-104'].includes(i.id));
    } else if (activeSection === 'popular') {
      list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (activeSection === 'discoveries') {
      list = list.filter((i) => ['item-105', 'item-107', 'item-108'].includes(i.id));
    } else {
      list = [...list].sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    }

    if (selectedCategory !== 'All') {
      list = list.filter((it) => it.category === selectedCategory);
    }

    return list;
  };

  const currentItems = getFilteredItems();
  const isItemSaved = (id: string) => savedItems.some((s) => s.id === id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Personalized Feed
            </span>
            <span className="text-xs text-slate-400">• Updated in real-time</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Personalized Recommendations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by multi-task collaborative filtering, sequential SASRec embeddings, and LLM reasoning.
          </p>
        </div>

        <button
          onClick={() => setActiveSection(activeSection)}
          className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-compute Recommendations
        </button>
      </div>

      {/* Sections Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSection('forYou')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
              activeSection === 'forYou'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Recommended For You
          </button>

          <button
            onClick={() => setActiveSection('history')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
              activeSection === 'history'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <History className="w-3.5 h-3.5" /> Based on Interactions
          </button>

          <button
            onClick={() => setActiveSection('popular')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
              activeSection === 'popular'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Popular in Your Categories
          </button>

          <button
            onClick={() => setActiveSection('discoveries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
              activeSection === 'discoveries'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> New Discoveries
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === c ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Attribution Alert */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 text-xs text-blue-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Model Attribution:</strong> Recommendations in this feed were ranked using <strong>RecLM-gen (SFT + RL)</strong> and calibrated against your preferences.
          </span>
        </div>
        <span className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-800">
          Source: Grounded Catalog
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((item) => (
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
  );
};
