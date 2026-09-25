import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  X, 
  Grid, 
  List, 
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, POPULAR_SKILLS, EVENT_TYPES, EXPERIENCE_LEVELS, MODES } from '../data/events';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';

export default function Discover() {
  const { events, recommendations } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [selectedExp, setSelectedExp] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // 'recommended', 'soonest', 'popular', 'relevant'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Sync url param changes (e.g. from categories page or search modal)
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) setSelectedCategory(urlCategory);

    const urlSearch = searchParams.get('search');
    if (urlSearch) setSearchQuery(urlSearch);
  }, [searchParams]);

  // Recommendation score lookup map
  const matchScoreMap = useMemo(() => {
    const map = new Map();
    (recommendations || []).forEach(r => {
      map.set(r.eventId, r.matchScore);
    });
    return map;
  }, [recommendations]);

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (event.title || '').toLowerCase().includes(q);
        const inDesc = (event.description || '').toLowerCase().includes(q);
        const inOrg = (event.organizer || '').toLowerCase().includes(q);
        const inCat = (event.category || '').toLowerCase().includes(q);
        const inLoc = (event.location || '').toLowerCase().includes(q);
        const inTech = (event.technologies || []).some(t => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inOrg && !inCat && !inLoc && !inTech) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }

      // 3. Event Type Filter
      if (selectedType !== 'All' && event.eventType !== selectedType) {
        return false;
      }

      // 4. Technology Filter
      if (selectedTech !== 'All') {
        const hasTech = (event.technologies || []).some(t => t.toLowerCase() === selectedTech.toLowerCase());
        if (!hasTech) return false;
      }

      // 5. Mode Filter
      if (selectedMode !== 'All' && event.mode !== selectedMode && event.mode !== 'Both') {
        return false;
      }

      // 6. Experience Level Filter
      if (selectedExp !== 'All' && event.experienceLevel !== selectedExp && event.experienceLevel !== 'All Levels') {
        return false;
      }

      return true;
    });
  }, [events, searchQuery, selectedCategory, selectedType, selectedTech, selectedMode, selectedExp]);

  // Sorting Logic
  const sortedEvents = useMemo(() => {
    const copy = [...filteredEvents];

    switch (sortBy) {
      case 'recommended':
        return copy.sort((a, b) => {
          const scoreA = matchScoreMap.get(a.id) || 50;
          const scoreB = matchScoreMap.get(b.id) || 50;
          return scoreB - scoreA;
        });

      case 'soonest':
        return copy.sort((a, b) => new Date(a.date) - new Date(b.date));

      case 'popular':
        return copy.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

      case 'relevant':
      default:
        return copy.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.popularity || 0) - (a.popularity || 0);
        });
    }
  }, [filteredEvents, sortBy, matchScoreMap]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedTech('All');
    setSelectedMode('All');
    setSelectedExp('All');
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedType !== 'All' || selectedTech !== 'All' || selectedMode !== 'All' || selectedExp !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Discover Events
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search and filter through 30+ verified technology events, hackathons, and conferences.
          </p>
        </div>

        {/* View Mode & Count */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-slate-400">
            Showing <strong className="text-white">{sortedEvents.length}</strong> events
          </span>
          <div className="flex items-center p-1 rounded-lg bg-dark-900 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-electric-500 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-electric-500 text-white' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Search & Primary Type Tabs */}
      <div className="space-y-4 mb-6">
        
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, technologies, organizers or locations..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-dark-900 border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-electric-500 transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Event Type Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
          {['All', ...EVENT_TYPES].map(type => {
            const active = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  active 
                    ? 'bg-electric-600 text-white shadow-glow-sm' 
                    : 'bg-dark-900 text-slate-400 hover:text-slate-200 border border-white/[0.06] hover:border-white/20'
                }`}
              >
                {type === 'All' ? 'All Formats' : type}
              </button>
            );
          })}
        </div>

      </div>

      {/* Secondary Filter Bar & Sorting */}
      <div className="p-4 rounded-xl bg-dark-900/80 border border-white/[0.08] mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Dropdown Filters (Category, Tech, Mode, Experience) */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-300 focus:outline-none focus:border-electric-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Technology Dropdown */}
          <div className="relative">
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="appearance-none bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-300 focus:outline-none focus:border-electric-500 cursor-pointer"
            >
              <option value="All">All Technologies</option>
              {POPULAR_SKILLS.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Mode Dropdown */}
          <div className="relative">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="appearance-none bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-300 focus:outline-none focus:border-electric-500 cursor-pointer"
            >
              <option value="All">All Modes (Online/In-person)</option>
              {MODES.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Experience Level Dropdown */}
          <div className="relative">
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="appearance-none bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-300 focus:outline-none focus:border-electric-500 cursor-pointer"
            >
              <option value="All">All Levels</option>
              {EXPERIENCE_LEVELS.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters action */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 text-xs flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 text-xs">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-xs text-white font-medium focus:outline-none focus:border-electric-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="recommended">AI Recommended</option>
              <option value="soonest">Soonest Date</option>
              <option value="relevant">Most Relevant</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 mb-6 text-xs">
          <span className="text-slate-500 mr-1 font-mono text-[11px]">ACTIVE FILTERS:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              <span>Query: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedType !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              <span>Format: {selectedType}</span>
              <button onClick={() => setSelectedType('All')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedTech !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              <span>Tech: {selectedTech}</span>
              <button onClick={() => setSelectedTech('All')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedMode !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              <span>Mode: {selectedMode}</span>
              <button onClick={() => setSelectedMode('All')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}

          {selectedExp !== 'All' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
              <span>Level: {selectedExp}</span>
              <button onClick={() => setSelectedExp('All')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
        </div>
      )}

      {/* Events Results Grid / List */}
      {sortedEvents.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              matchScore={matchScoreMap.get(event.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No events match your filters"
          description="We couldn't find any events matching the specified criteria. Try clearing your filters or changing keywords."
          actionLabel="Reset All Filters"
          onActionClick={resetFilters}
        />
      )}

    </div>
  );
}
