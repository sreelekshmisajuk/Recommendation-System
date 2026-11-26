import React from 'react';
import { Star, Bookmark, ExternalLink, Sparkles } from 'lucide-react';
import { Item } from '../../types';
import { Badge } from './Badge';

interface ItemCardProps {
  item: Item;
  isSaved?: boolean;
  onSaveToggle?: (item: Item) => void;
  onViewDetails?: (item: Item) => void;
  viewMode?: 'grid' | 'list';
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isSaved = false,
  onSaveToggle,
  onViewDetails,
  viewMode = 'grid'
}) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full md:w-32 h-32 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">{item.category}</Badge>
            {item.releaseYear && <span className="text-xs text-slate-400">• {item.releaseYear}</span>}
            {item.relevanceScore && (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {item.relevanceScore}% Match
              </span>
            )}
          </div>
          <h4 className="text-base font-semibold text-slate-900 truncate hover:text-blue-600 cursor-pointer" onClick={() => onViewDetails?.(item)}>
            {item.title}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2 my-1">{item.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
            <span className="flex items-center gap-1 font-medium text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {item.rating.toFixed(1)}
              <span className="text-slate-400">({item.reviewCount.toLocaleString()})</span>
            </span>
            {item.price !== undefined && (
              <span className="font-semibold text-slate-800 text-sm">${item.price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="flex md:flex-col items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => onSaveToggle?.(item)}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
              isSaved
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save to Wishlist'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600 text-blue-600' : ''}`} />
            <span className="md:hidden">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={() => onViewDetails?.(item)}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors w-full md:w-auto"
          >
            Details <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-md transition-all flex flex-col group">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <Badge variant="neutral" size="sm" className="bg-white/90 backdrop-blur-sm shadow-xs">
            {item.category}
          </Badge>
          {item.relevanceScore && (
            <span className="text-xs font-bold text-emerald-700 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> {item.relevanceScore}%
            </span>
          )}
        </div>
        <button
          onClick={() => onSaveToggle?.(item)}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-colors shadow-xs ${
            isSaved
              ? 'bg-blue-600 text-white'
              : 'bg-white/90 text-slate-600 hover:bg-white hover:text-blue-600'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Item'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <div className="flex items-center gap-1 text-amber-600 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{item.rating.toFixed(1)}</span>
            <span className="text-slate-400">({item.reviewCount.toLocaleString()})</span>
          </div>
          {item.price !== undefined && (
            <span className="font-semibold text-slate-900 text-sm">${item.price.toFixed(2)}</span>
          )}
        </div>

        <h4
          className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 cursor-pointer"
          onClick={() => onViewDetails?.(item)}
        >
          {item.title}
        </h4>

        <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 mb-3 flex-1">{item.description}</p>

        {item.matchReason && (
          <div className="mb-3 p-2 bg-blue-50/70 rounded-lg border border-blue-100 text-[11px] text-blue-900 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{item.matchReason}</span>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-auto">
          <button
            onClick={() => onViewDetails?.(item)}
            className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            View Details
          </button>
          <button
            onClick={() => onSaveToggle?.(item)}
            className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors ${
              isSaved
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'border-slate-200 hover:bg-slate-50 text-slate-600'
            }`}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};
