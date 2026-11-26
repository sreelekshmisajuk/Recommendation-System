import React from 'react';
import { X, Star, Bookmark, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { Item } from '../../types';
import { Badge } from './Badge';

interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onSaveToggle?: (item: Item) => void;
  onFindSimilar?: (item: Item) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  isOpen,
  onClose,
  isSaved = false,
  onSaveToggle,
  onFindSimilar
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors z-10 border border-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="primary" size="sm" className="bg-blue-600 text-white border-transparent">
                {item.category}
              </Badge>
              {item.releaseYear && <span className="text-xs text-slate-200">• {item.releaseYear}</span>}
              {item.relevanceScore && (
                <span className="text-xs font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {item.relevanceScore}% Match
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold">{item.title}</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-600 font-semibold text-lg">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-slate-400">({item.reviewCount.toLocaleString()} verified ratings)</span>
            </div>
            {item.price !== undefined && (
              <div className="text-2xl font-bold text-slate-900">${item.price.toFixed(2)}</div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Genres & Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {item.genres.map((g) => (
                <Badge key={g} variant="secondary" size="sm">{g}</Badge>
              ))}
              {item.tags.map((t) => (
                <Badge key={t} variant="neutral" size="sm">#{t}</Badge>
              ))}
            </div>
          </div>

          {/* Explainability Breakdown */}
          <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-semibold text-blue-950">AI Recommendation Reasoning (RecExplainer)</h4>
            </div>
            <p className="text-xs text-blue-900/80 mb-3">{item.matchReason || 'Matches your general profile and high-affinity topics.'}</p>

            {item.factors && item.factors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-blue-100/80">
                <p className="text-[11px] font-medium text-blue-800">Key Latent Factor Weights:</p>
                {item.factors.map((f) => (
                  <div key={f.name} className="space-y-1">
                    <div className="flex justify-between text-xs text-blue-950">
                      <span>{f.name}</span>
                      <span className="font-semibold">{f.weight}%</span>
                    </div>
                    <div className="w-full bg-blue-200/50 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${f.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onSaveToggle?.(item)}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border flex items-center justify-center gap-2 transition-colors ${
                isSaved
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
              {isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}
            </button>
            <button
              onClick={() => {
                onClose();
                onFindSimilar?.(item);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Compass className="w-4 h-4" /> Find Similar Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
