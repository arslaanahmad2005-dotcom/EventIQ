import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Calendar, 
  MapPin, 
  Globe, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import BookmarkButton from './BookmarkButton';

export default function AIRecommendationCard({ recommendation }) {
  const [expanded, setExpanded] = useState(false);
  const { event, matchScore, reason, matchingFactors, detailedReasons } = recommendation;

  if (!event) return null;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-blue-500 to-electric-500 text-blue-300 border-blue-500/40';
    if (score >= 80) return 'from-indigo-500 to-purple-500 text-indigo-300 border-indigo-500/40';
    return 'from-slate-600 to-slate-500 text-slate-300 border-white/20';
  };

  return (
    <div className="relative rounded-2xl bg-dark-900/90 border border-white/[0.08] hover:border-electric-500/50 shadow-card-dark hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      
      {/* Top Header Row with Match Score & Bookmark */}
      <div className="p-5 sm:p-6 pb-4 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-electric-500/[0.04] to-transparent">
        
        {/* Match Percentage Pill */}
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center space-x-1.5 bg-gradient-to-r ${getScoreColor(matchScore)} bg-opacity-10 border shadow-glow-sm`}>
            <Sparkles className="w-3.5 h-3.5 text-electric-400" />
            <span className="text-white font-mono text-sm">{matchScore}%</span>
            <span className="text-slate-300 font-normal">Match</span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-slate-400 border border-white/[0.06]">
            {event.eventType}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]">
            {event.category}
          </span>
        </div>

        {/* Top Right Save button */}
        <div className="flex items-center space-x-2">
          <BookmarkButton eventId={event.id} showLabel={false} />
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 sm:p-6">
        {/* Event Organizer & Title */}
        <p className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-1">
          {event.organizer}
        </p>
        <Link 
          to={`/event/${event.id}`}
          className="text-lg sm:text-xl font-bold text-white group-hover:text-electric-400 transition-colors line-clamp-2 leading-snug"
        >
          {event.title}
        </Link>

        {/* Date, Location, Mode row */}
        <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-electric-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{event.mode}</span>
          </div>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
            {event.experienceLevel}
          </span>
        </div>

        {/* Short AI-Generated Explanation */}
        <div className="mt-4 p-3.5 rounded-xl bg-electric-500/[0.05] border border-electric-500/20 relative">
          <div className="flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-electric-400 mt-0.5 flex-shrink-0 animate-pulse-subtle" />
            <div>
              <p className="text-xs font-medium text-slate-200 leading-relaxed italic">
                "{reason}"
              </p>
            </div>
          </div>
        </div>

        {/* Verified Matching Factors Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {(matchingFactors || []).map((factor, idx) => (
            <span 
              key={idx}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/[0.08] text-emerald-300 border border-emerald-500/20"
            >
              <Check className="w-3 h-3 text-emerald-400" />
              <span>{factor}</span>
            </span>
          ))}
        </div>

        {/* Technology tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(event.technologies || []).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Collapsible: Why We Recommend This */}
        <div className="mt-5 pt-4 border-t border-white/[0.06]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white transition-colors group/btn py-1"
            aria-expanded={expanded}
          >
            <span className="flex items-center space-x-2">
              <TrendingUp className="w-3.5 h-3.5 text-electric-400" />
              <span>Why we recommend this event</span>
            </span>
            <span className="p-1 rounded bg-white/[0.04] group-hover/btn:bg-white/[0.08] text-slate-400 transition-colors">
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </button>

          {expanded && (
            <div className="mt-3 space-y-2.5 animate-slide-up text-xs bg-dark-950/60 p-3.5 rounded-xl border border-white/[0.06]">
              {detailedReasons && detailedReasons.length > 0 ? (
                detailedReasons.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-electric-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white mr-1.5">{item.type}:</span>
                      <span className="text-slate-300">{item.description}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">
                      <strong>Interest match:</strong> Aligns with your technical interests in {event.category}.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">
                      <strong>Experience fit:</strong> Tailored for {event.experienceLevel} developers.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">
                      <strong>Format preference:</strong> Matches your desired {event.eventType} format.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <BookmarkButton eventId={event.id} showLabel={true} />

          <Link
            to={`/event/${event.id}`}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md transition-all duration-200"
          >
            <span>View Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
