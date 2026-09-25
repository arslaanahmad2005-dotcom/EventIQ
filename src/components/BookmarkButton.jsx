import React from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookmarkButton({ eventId, showLabel = false, className = '' }) {
  const { isSaved, toggleSaveEvent } = useApp();
  const saved = isSaved(eventId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveEvent(eventId);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Remove from saved events' : 'Save event'}
      className={`relative inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded-lg group ${
        showLabel 
          ? `px-3.5 py-2 text-xs font-medium border ${
              saved 
                ? 'bg-electric-500/15 border-electric-500/40 text-electric-400' 
                : 'bg-dark-800/80 border-white/10 hover:border-white/20 text-slate-300 hover:text-white'
            }`
          : `p-2 rounded-lg border ${
              saved 
                ? 'bg-electric-500/20 border-electric-500/40 text-electric-400 shadow-glow-sm' 
                : 'bg-dark-900/80 border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-dark-800'
            }`
      } ${className}`}
    >
      <Bookmark 
        className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
          saved ? 'fill-electric-400 text-electric-400' : 'text-current'
        }`} 
      />
      {showLabel && (
        <span className="ml-1.5">{saved ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
}
