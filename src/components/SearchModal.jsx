import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calendar, MapPin, Sparkles, ArrowRight, History, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SearchModal() {
  const { 
    searchModalOpen, 
    setSearchModalOpen, 
    events, 
    searchHistory, 
    addRecentSearch 
  } = useApp();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Listen for global keyboard shortcuts: Cmd+K / Ctrl+K and /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Focus input on modal open
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [searchModalOpen]);

  // Live search filtering
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const matched = events.filter(event => {
      const matchTitle = (event.title || '').toLowerCase().includes(q);
      const matchOrg = (event.organizer || '').toLowerCase().includes(q);
      const matchCat = (event.category || '').toLowerCase().includes(q);
      const matchLoc = (event.location || '').toLowerCase().includes(q);
      const matchType = (event.eventType || '').toLowerCase().includes(q);
      const matchTech = (event.technologies || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchOrg || matchCat || matchLoc || matchType || matchTech;
    }).slice(0, 8);

    setResults(matched);
  }, [query, events]);

  const handleSelectEvent = (event) => {
    addRecentSearch(query || event.title);
    setSearchModalOpen(false);
    navigate(`/event/${event.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    addRecentSearch(query);
    setSearchModalOpen(false);
    navigate(`/discover?search=${encodeURIComponent(query.trim())}`);
  };

  if (!searchModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={() => setSearchModalOpen(false)}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl bg-dark-900 border border-white/10 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-white/10 px-4 py-3.5">
          <Search className="w-5 h-5 text-electric-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, technologies, organizers, or cities..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 rounded border border-white/10">
            ESC
          </kbd>
        </form>

        {/* Modal Body / Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Live Search Results */}
          {query.trim() && (
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-2">
                <span>RESULTS ({results.length})</span>
                {results.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-electric-400 hover:underline flex items-center space-x-1"
                  >
                    <span>View all in Discover</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {results.length > 0 ? (
                <div className="space-y-1.5">
                  {results.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleSelectEvent(event)}
                      className="p-3 rounded-xl bg-dark-850/60 hover:bg-white/[0.06] border border-white/[0.04] hover:border-electric-500/30 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
                            {event.eventType}
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {event.organizer}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-electric-400 transition-colors truncate">
                          {event.title}
                        </h4>
                        <div className="flex items-center space-x-3 mt-1.5 text-xs text-slate-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{event.date}</span>
                          </span>
                          <span className="flex items-center space-x-1 truncate">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span className="truncate">{event.location}</span>
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-electric-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No technology events found matching "{query}".
                </div>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!query.trim() && searchHistory.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 mb-2 px-2">
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>RECENT SEARCHES</span>
              </div>
              <div className="flex flex-wrap gap-2 px-2">
                {searchHistory.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(item);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 border border-white/[0.06] hover:border-white/20 text-xs text-slate-300 hover:text-white flex items-center space-x-1.5 transition-all"
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filter Categories */}
          {!query.trim() && (
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 mb-2 px-2">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                <span>POPULAR DOMAINS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-2">
                {[
                  'AI & Machine Learning',
                  'Web Development',
                  'Cloud Computing',
                  'Cybersecurity',
                  'DevOps & SRE',
                  'Startups & Tech Founders'
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigate(`/discover?category=${encodeURIComponent(cat)}`);
                    }}
                    className="p-2.5 rounded-xl bg-dark-850/50 hover:bg-dark-800 border border-white/[0.04] hover:border-electric-500/30 text-left text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center justify-between"
                  >
                    <span className="truncate">{cat}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 bg-dark-950 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-3">
            <span>Press <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">↵</kbd> to view full results</span>
            <span><kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">ESC</kbd> to close</span>
          </div>
          <span className="text-electric-400 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>AI Index Active</span>
          </span>
        </div>

      </div>
    </div>
  );
}
