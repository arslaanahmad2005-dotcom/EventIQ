import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCw, 
  Sliders, 
  Info, 
  CheckCircle2, 
  BrainCircuit, 
  Eye, 
  Bookmark, 
  TrendingUp 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AIRecommendationCard from '../components/AIRecommendationCard';
import AILoadingState from '../components/AILoadingState';
import EmptyState from '../components/EmptyState';

export default function Recommendations() {
  const { 
    recommendations, 
    recommendationSource, 
    isGenerating, 
    generateRecommendations, 
    userProfile, 
    savedEvents, 
    viewedEvents 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');

  const handleRegenerate = async () => {
    await generateRecommendations();
  };

  const filteredRecs = recommendations.filter(rec => {
    if (activeFilter === 'All') return true;
    return rec.event?.eventType === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-electric-500/15 text-electric-300 border border-electric-500/30 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-electric-400" />
              <span>AI Recommendation Engine</span>
            </span>

            {/* Engine Provider Indicator */}
            <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] text-slate-400 border border-white/[0.06]">
              <span className={`w-1.5 h-1.5 rounded-full ${recommendationSource === 'ai' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{recommendationSource === 'ai' ? 'Gemini AI Active' : 'Adaptive Local Intelligence'}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recommended for you
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            AI-curated opportunities based on your technical interests, skills, experience level, and viewing history.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/profile"
            className="px-4 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-2 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span>Refine Preferences</span>
          </Link>

          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-indigo-600 hover:from-electric-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-glow-sm hover:shadow-glow-md flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Analyzing...' : 'Regenerate Recommendations'}</span>
          </button>
        </div>
      </div>

      {/* Real-Time Personalization Signal Banner */}
      <div className="my-6 p-4 rounded-xl bg-dark-900/60 border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-electric-500/10 border border-electric-500/20 flex items-center justify-center flex-shrink-0">
            <BrainCircuit className="w-4 h-4 text-electric-400" />
          </div>
          <div>
            <span className="font-semibold text-white">Active Personalization Signals: </span>
            <span className="text-slate-400">
              Targeting {userProfile.interests.slice(0, 3).join(', ')} • {userProfile.experienceLevel} Tier • {userProfile.preferredMode} Mode
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-slate-400 font-mono text-[11px]">
          <span className="flex items-center space-x-1">
            <Bookmark className="w-3 h-3 text-electric-400" />
            <span>{savedEvents.length} Saved</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3 text-slate-500" />
            <span>{viewedEvents.length} Viewed</span>
          </span>
          <span className="flex items-center space-x-1 text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>Weighted Scoring</span>
          </span>
        </div>
      </div>

      {/* AI Refining Live Status Banner */}
      {isGenerating && (
        <div className="mb-6 p-3.5 rounded-xl bg-electric-500/10 border border-electric-500/30 flex items-center justify-between text-xs text-electric-300 animate-pulse">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-electric-400 animate-spin" />
            <span className="font-medium">Refining recommendations with Google Gemini AI in the background...</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">Instant preview active</span>
        </div>
      )}

      {/* Format Filter Tabs */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Hackathon', 'Conference', 'Workshop', 'Meetup', 'Webinar'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === tab
                ? 'bg-electric-600 text-white shadow-glow-sm'
                : 'bg-dark-900 text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {tab === 'All' ? 'All Recommendations' : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Recommendation Cards List */}
      {filteredRecs.length > 0 ? (
        <div className="space-y-6">
              {filteredRecs.map(rec => (
                <AIRecommendationCard 
                  key={rec.eventId} 
                  recommendation={rec} 
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="sparkles"
              title="No recommendations match this filter"
              description="Try selecting 'All Recommendations' or updating your profile to find more matches."
              actionLabel="View All Recommendations"
              onActionClick={() => setActiveFilter('All')}
            />
          )}

    </div>
  );
}
