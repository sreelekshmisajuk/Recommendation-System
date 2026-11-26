import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Item } from '../types';
import { ItemCard } from '../components/common/ItemCard';

interface ExploreItemsProps {
  items: Item[];
  savedItems: Item[];
  onSaveToggle: (item: Item) => void;
  onViewDetails: (item: Item) => void;
}

export const ExploreItems: React.FC<ExploreItemsProps> = ({
  items,
  savedItems,
  onSaveToggle,
  onViewDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'priceAsc' | 'priceDesc'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Video Games', 'Movies & Media', 'Electronics'];

  const filteredItems = useMemo(() => {
    return items
      .filter((it) => {
        const matchesSearch =
          it.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          it.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          it.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCat = selectedCategory === 'All' || it.category === selectedCategory;
        const matchesRating = it.rating >= minRating;
        const matchesPrice = it.price === undefined || it.price <= maxPrice;

        return matchesSearch && matchesCat && matchesRating && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceAsc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'priceDesc') return (b.price || 0) - (a.price || 0);
        return (b.relevanceScore || 0) - (a.relevanceScore || 0);
      });
  }, [items, searchTerm, selectedCategory, minRating, maxPrice, sortBy]);

  const isItemSaved = (id: string) => savedItems.some((s) => s.id === id);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMinRating(0);
    setMaxPrice(500);
    setSortBy('relevance');
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Field */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, genre, keyword, or features..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option value="relevance">Sort: Recommended</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="priceAsc">Sort: Price: Low to High</option>
              <option value="priceDesc">Sort: Price: High to Low</option>
            </select>

            {/* Grid/List View Toggle */}
            <div className="flex rounded-xl border border-slate-200 p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills & Rating Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>Rating:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs"
              >
                <option value={0}>All Ratings</option>
                <option value={4.0}>4.0+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Max Price:</span>
              <span className="font-semibold text-slate-800">${maxPrice}</span>
              <input
                type="range"
                min={20}
                max={500}
                step={20}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-blue-600"
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Item Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredItems.length}</strong> items in catalog</span>
        <span className="flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" /> Catalog Index: 100% Grounded
        </span>
      </div>

      {/* Items Grid/List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-800">No matching items found</h4>
          <p className="text-xs text-slate-500">Try adjusting your keyword, categories, or price filter criteria.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'space-y-3'
          }
        >
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isSaved={isItemSaved(item.id)}
              onSaveToggle={onSaveToggle}
              onViewDetails={onViewDetails}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
