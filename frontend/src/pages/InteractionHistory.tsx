import React, { useState } from 'react';
import { History, Eye, ThumbsUp, ThumbsDown, Bookmark, Search, Trash2, ArrowUpRight } from 'lucide-react';
import { Interaction } from '../types';
import { Badge } from '../components/common/Badge';

interface InteractionHistoryProps {
  interactions: Interaction[];
  onClearHistory?: () => void;
  onItemClick?: (itemId: string) => void;
}

export const InteractionHistory: React.FC<InteractionHistoryProps> = ({
  interactions,
  onClearHistory,
  onItemClick
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInteractions = interactions.filter((act) => {
    const matchesType = filterType === 'all' || act.type === filterType;
    const matchesSearch =
      act.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (act.details && act.details.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getActionIcon = (type: Interaction['type']) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="w-4 h-4 text-emerald-600" />;
      case 'dislike':
        return <ThumbsDown className="w-4 h-4 text-rose-600" />;
      case 'save':
        return <Bookmark className="w-4 h-4 text-blue-600" />;
      case 'search':
        return <Search className="w-4 h-4 text-amber-600" />;
      case 'view':
      default:
        return <Eye className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getActionBadgeVariant = (type: Interaction['type']) => {
    switch (type) {
      case 'like':
        return 'success';
      case 'save':
        return 'primary';
      case 'search':
        return 'warning';
      case 'view':
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <History className="w-3.5 h-3.5" /> Sequential User Behavior
            </span>
            <span className="text-xs text-slate-400">• Feeds into SASRec Sequential Tokenizer</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">User Interaction History</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit log of implicit and explicit interaction signals recording your items viewed, liked, saved, and searched.
          </p>
        </div>

        {onClearHistory && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-xl text-xs font-medium border border-slate-200 hover:border-rose-200 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear History
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'view', 'like', 'save', 'search'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterType === t
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t === 'all' ? 'All Activities' : t + 's'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter log entries..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* History Timeline Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filteredInteractions.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <History className="w-8 h-8 text-slate-300 mx-auto" />
            <p>No interaction logs match your search filter.</p>
          </div>
        ) : (
          filteredInteractions.map((act) => (
            <div
              key={act.id}
              className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                  {getActionIcon(act.type)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      onClick={() => onItemClick?.(act.itemId)}
                      className="text-sm font-semibold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                    >
                      {act.itemTitle}
                    </span>
                    <Badge variant={getActionBadgeVariant(act.type)} size="sm">
                      {act.type.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{act.details || `Interacted in ${act.category}`}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right flex-shrink-0">
                <span className="text-xs text-slate-400">{act.timestamp}</span>
                <button
                  onClick={() => onItemClick?.(act.itemId)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="View Item"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
