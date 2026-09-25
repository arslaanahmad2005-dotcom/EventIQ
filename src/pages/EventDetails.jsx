import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Share2, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle, 
  Ticket 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import BookmarkButton from '../components/BookmarkButton';
import EventCard from '../components/EventCard';
import EmptyState from '../components/EmptyState';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    events, 
    recordView, 
    setRegisterModalEvent, 
    recommendations, 
    showToast 
  } = useApp();

  const event = useMemo(() => {
    return events.find(e => e.id === id);
  }, [events, id]);

  // Record viewed event on mount
  useEffect(() => {
    if (event) {
      recordView(event.id);
    }
  }, [event, recordView]);

  // Find match score if in recommendations
  const matchInfo = useMemo(() => {
    if (!event) return null;
    return (recommendations || []).find(r => r.eventId === event.id);
  }, [recommendations, event]);

  // Related events (same category or similar technologies)
  const relatedEvents = useMemo(() => {
    if (!event) return [];
    return events
      .filter(e => e.id !== event.id && (e.category === event.category || e.eventType === event.eventType))
      .slice(0, 3);
  }, [events, event]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Event link copied to clipboard!', 'info');
  };

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          icon="search"
          title="Event Not Found"
          description="The event ID you requested does not exist or may have expired."
          actionLabel="Browse All Events"
          actionTo="/discover"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to events</span>
        </button>
      </div>

      {/* Hero Visual Card */}
      <div className="rounded-2xl bg-dark-900 border border-white/[0.08] overflow-hidden shadow-2xl mb-8">
        
        {/* Banner Graphic Header */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${event.bannerGradient || 'from-blue-600/30 via-indigo-600/20 to-transparent'} border-b border-white/[0.08] relative`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-electric-500/20 text-electric-300 border border-electric-500/40">
                {event.eventType}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-dark-950/80 text-slate-300 border border-white/10">
                {event.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/5">
                {event.experienceLevel}
              </span>
            </div>

            {/* Actions: Bookmark & Share */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-dark-950/80 hover:bg-dark-850 text-slate-400 hover:text-white border border-white/10 transition-colors"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <BookmarkButton eventId={event.id} showLabel={true} />
            </div>

          </div>

          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Organized by {event.organizer}
          </p>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {event.title}
          </h1>

          {/* AI Match Badge if available */}
          {matchInfo && (
            <div className="mt-4 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-electric-500/20 border border-electric-500/40 text-electric-300 text-xs shadow-glow-sm">
              <Sparkles className="w-4 h-4 text-electric-400" />
              <span className="font-bold">{matchInfo.matchScore}% Match for your profile:</span>
              <span className="text-slate-300">{matchInfo.reason}</span>
            </div>
          )}
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-dark-950/60 border-b border-white/[0.06] text-xs">
          <div>
            <span className="text-slate-500 block mb-1 font-mono uppercase text-[10px]">Date</span>
            <div className="flex items-center space-x-1.5 text-white font-medium">
              <Calendar className="w-3.5 h-3.5 text-electric-400" />
              <span>{event.date}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-1 font-mono uppercase text-[10px]">Time</span>
            <div className="flex items-center space-x-1.5 text-white font-medium">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>{event.time}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-1 font-mono uppercase text-[10px]">Location</span>
            <div className="flex items-center space-x-1.5 text-white font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-1 font-mono uppercase text-[10px]">Format & Price</span>
            <div className="flex items-center space-x-1.5 text-white font-medium">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{event.mode} • {event.price || 'Free'}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* About The Event */}
          <div>
            <h2 className="text-lg font-bold text-white mb-3">About This Event</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Technologies & Skills Covered */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
              Technologies & Frameworks
            </h2>
            <div className="flex flex-wrap gap-2">
              {(event.technologies || []).map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-dark-950 border border-white/10 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Venue & Logistics */}
          {event.venue && (
            <div className="p-4 rounded-xl bg-dark-950 border border-white/[0.06] text-xs">
              <h3 className="font-semibold text-white mb-1">Venue & Access Details</h3>
              <p className="text-slate-400">{event.venue}</p>
            </div>
          )}

          {/* Schedule / Agenda Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Event Schedule</h2>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/[0.08]">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 pl-8 relative">
                    <span className="w-2.5 h-2.5 rounded-full bg-electric-500 absolute left-2 top-1.5 ring-4 ring-dark-950" />
                    <div>
                      <span className="text-xs font-mono font-semibold text-electric-400 block">
                        {item.time}
                      </span>
                      <span className="text-sm font-medium text-slate-200">
                        {item.activity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Speakers & Mentors */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Featured Speakers & Mentors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.speakers.map((speaker, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-dark-950 border border-white/[0.06] flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {speaker.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{speaker.name}</h4>
                      <p className="text-xs text-slate-400">{speaker.role} • {speaker.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration Action Section */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Registration Status</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Open for registration • {event.price || 'Free Admission'}</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setRegisterModalEvent(event)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs shadow-glow-md hover:shadow-glow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Register / Get Pass</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-6">
            Similar Events You Might Like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEvents.map(re => (
              <EventCard key={re.id} event={re} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
