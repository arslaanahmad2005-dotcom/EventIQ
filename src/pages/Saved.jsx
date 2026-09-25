import React, { useState, useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';

export default function Saved() {
  const { events, savedEvents } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'upcoming' | 'past'

  // Map saved event IDs to event objects
  const savedList = useMemo(() => {
    return events.filter(e => savedEvents.includes(e.id));
  }, [events, savedEvents]);

  // Tab filtering by date
  const filteredList = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    switch (activeTab) {
      case 'upcoming':
        return savedList.filter(e => e.date >= today);
      case 'past':
        return savedList.filter(e => e.date < today);
      case 'all':
      default:
        return savedList;
    }
  }, [savedList, activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-electric-400 mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your Bookmarked Events
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Keep track of upcoming hackathons, conferences, and technical workshops.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-dark-900 border border-white/10 text-xs">
          {[
            { id: 'all', label: `All (${savedList.length})` },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-electric-600 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid or Empty State */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="bookmark"
          title="No saved events yet"
          description="When you discover conferences, hackathons, or workshops you like, bookmark them to access them here anytime."
          actionLabel="Discover Tech Events"
          actionTo="/discover"
        />
      )}

    </div>
  );
}
