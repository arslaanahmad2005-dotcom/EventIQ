import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Globe, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import BookmarkButton from './BookmarkButton';

export default function EventCard({ event, matchScore, matchReason, className = '' }) {
  if (!event) return null;

  // Format human-friendly date
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const getModeBadge = (mode) => {
    if (mode === 'Online') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Globe className="w-3 h-3" />
          <span>Online</span>
        </span>
      );
    }
    if (mode === 'Offline') {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <MapPin className="w-3 h-3" />
          <span>In-Person</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
        <Globe className="w-3 h-3" />
        <span>Hybrid</span>
      </span>
    );
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Hackathon':
        return 'bg-electric-500/10 text-electric-400 border-electric-500/30';
      case 'Conference':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Workshop':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Meetup':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Webinar':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div 
      className={`group relative flex flex-col justify-between bg-dark-900/90 rounded-xl border border-white/[0.08] hover:border-electric-500/40 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden ${className}`}
    >
      {/* Top Banner Gradient / Visual Header */}
      <div className={`h-24 w-full bg-gradient-to-r ${event.bannerGradient || 'from-blue-600/20 via-indigo-600/10 to-transparent'} p-4 flex items-start justify-between relative`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        {/* Category & Type badges */}
        <div className="flex flex-wrap items-center gap-1.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${getTypeColor(event.eventType)}`}>
            {event.eventType}
          </span>
          <span className="text-[11px] font-medium text-slate-400 bg-dark-950/70 px-2 py-0.5 rounded border border-white/5">
            {event.category}
          </span>
        </div>

        {/* Right action: Bookmark & Match Badge */}
        <div className="flex items-center space-x-2 z-10">
          {matchScore && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-electric-500/20 text-electric-300 border border-electric-500/40 shadow-glow-sm">
              <Sparkles className="w-3 h-3 text-electric-400" />
              <span>{matchScore}%</span>
            </span>
          )}
          <BookmarkButton eventId={event.id} />
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Organizer */}
          <p className="text-xs font-medium text-slate-400 tracking-wide uppercase font-mono mb-1 truncate">
            {event.organizer}
          </p>

          {/* Event Title */}
          <Link 
            to={`/event/${event.id}`}
            className="block text-base sm:text-lg font-bold text-white group-hover:text-electric-400 transition-colors line-clamp-2 leading-snug"
          >
            {event.title}
          </Link>

          {/* Short description */}
          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Match Reason snippet if supplied */}
          {matchReason && (
            <div className="mt-3 p-2 rounded-lg bg-electric-500/5 border border-electric-500/20 text-[11px] text-electric-300/90 leading-tight flex items-start space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-electric-400 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{matchReason}</span>
            </div>
          )}
        </div>

        {/* Meta details & tags */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
          
          {/* Date, Location, and Mode */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-1.5 truncate justify-end">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              {getModeBadge(event.mode)}
              <span className="text-[11px] text-slate-400 font-mono">
                {event.experienceLevel}
              </span>
            </div>
            {event.attendeesCount && (
              <span className="flex items-center space-x-1 text-[11px] text-slate-400">
                <Users className="w-3 h-3 text-slate-500" />
                <span>{event.attendeesCount.toLocaleString()}</span>
              </span>
            )}
          </div>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(event.technologies || []).slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
              >
                {tech}
              </span>
            ))}
            {(event.technologies || []).length > 4 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.02] text-slate-400">
                +{event.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Footer Card Actions */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              {event.price || 'Free'}
            </span>
            <Link
              to={`/event/${event.id}`}
              className="inline-flex items-center space-x-1 text-xs font-medium text-electric-400 hover:text-electric-300 group-hover:translate-x-0.5 transition-all"
            >
              <span>View Event</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
