import React, { useState } from 'react';
import { Bookmark, Search, Trash2, ArrowRight, Compass } from 'lucide-react';
import { Item, NavTab } from '../types';
import { ItemCard } from '../components/common/ItemCard';

interface SavedItemsProps {
  savedItems: Item[];
  onSaveToggle: (item: Item) => void;
  onViewDetails: (item: Item) => void;
  onNavigate: (tab: NavTab) => void;
}

export const SavedItems: React.FC<SavedItemsProps> = ({
  savedItems,
  onSaveToggle,
  onViewDetails,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = savedItems.filter(
    (it) =>
      it.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      it.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 fill-amber-600 text-amber-600" /> Wishlist Vault
            </span>
            <span className="text-xs text-slate-400">• {savedItems.length} Saved Items</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Saved Recommendations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Items you have bookmarked across AI Chat, Explore, and Personalized Recommendation feeds.
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in saved..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {savedItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-900">Your wishlist is currently empty</h3>
            <p className="text-xs text-slate-500">
              When exploring items or asking the AI assistant for recommendations, click the bookmark icon to save items for future reference.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
            >
              <Compass className="w-4 h-4" /> Explore Catalog
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          No saved items match your search term "{searchTerm}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isSaved={true}
              onSaveToggle={onSaveToggle}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
