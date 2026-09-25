import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, Sparkles, ArrowRight } from 'lucide-react';

export default function EmptyState({ 
  icon = 'search', 
  title = 'No events found', 
  description = 'Try adjusting your search criteria or resetting filters.',
  actionLabel = 'Explore All Events',
  actionTo = '/discover',
  onActionClick
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'bookmark':
        return <Bookmark className="w-8 h-8 text-slate-500" />;
      case 'sparkles':
        return <Sparkles className="w-8 h-8 text-electric-400" />;
      default:
        return <Search className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
        {renderIcon()}
      </div>
      <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && (
        onActionClick ? (
          <button
            onClick={onActionClick}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md transition-all"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Link
            to={actionTo}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md transition-all"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )
      )}
    </div>
  );
}
