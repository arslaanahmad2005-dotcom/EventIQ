import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Brain, 
  ShieldCheck, 
  Terminal, 
  Code, 
  Cloud, 
  Rocket, 
  CheckCircle2, 
  Flame, 
  Users, 
  Calendar 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/events';
import EventCard from '../components/EventCard';

export default function Home() {
  const { events, recommendations, onboardingCompleted } = useApp();

  // Top trending events (featured ones first)
  const trendingEvents = events.filter(e => e.featured || e.popularity >= 92).slice(0, 6);

  // Top recommendation preview (or fallback to top events)
  const topRec = recommendations && recommendations.length > 0 ? recommendations[0] : null;

  return (
    <div className="relative overflow-hidden pb-16">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-gradient pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-electric-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-300 text-xs font-medium mb-6 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-electric-400 animate-pulse-subtle" />
          <span>AI-Powered Tech Event Recommendation Engine</span>
          <span className="w-1 h-1 rounded-full bg-electric-400" />
          <span className="text-slate-400 hidden sm:inline">Linear × Raycast Aesthetics</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Discover the tech events <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-electric-400 to-indigo-400">
            worth showing up for.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Find hackathons, conferences, workshops, and developer meetups curated around what you actually want to learn. Driven by transparent AI personalization.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={onboardingCompleted ? "/recommendations" : "/onboarding"}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 via-electric-500 to-indigo-600 text-white font-semibold text-sm shadow-glow-md hover:shadow-glow-lg hover:brightness-110 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{onboardingCompleted ? 'View Recommendations' : 'Get Recommendations'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            to="/discover"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-900 hover:bg-dark-850 text-slate-200 hover:text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Explore All Events</span>
          </Link>
        </div>

        {/* Subtle Live Interactive Product Preview */}
        <div className="mt-14 max-w-3xl mx-auto">
          <div className="rounded-2xl bg-dark-900/90 border border-white/10 shadow-2xl p-5 sm:p-6 text-left relative overflow-hidden backdrop-blur-md">
            
            {/* Mock Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-500">eventiq.ai/recommendations</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI Matching Engine Active</span>
              </div>
            </div>

            {/* Preview Card Body */}
            {topRec ? (
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-electric-500/20 text-electric-400 border border-electric-500/30">
                      {topRec.matchScore}% Match
                    </span>
                    <span className="text-xs text-slate-400">{topRec.event.category}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white truncate">
                    {topRec.event.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    "{topRec.reason}"
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(topRec.matchingFactors || []).map(factor => (
                      <span key={factor} className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        ✓ {factor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
                  <Link
                    to={`/event/${topRec.event.id}`}
                    className="w-full px-4 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold text-center shadow-glow-sm"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/recommendations"
                    className="w-full text-center text-xs text-slate-400 hover:text-white py-1"
                  >
                    See all matches →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-400 text-xs">
                Complete your preference profile to preview curated matches.
              </div>
            )}

          </div>
        </div>

      </section>

      {/* Trending Events Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-electric-400 mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Trending Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Popular Technology Events
            </h2>
          </div>
          <Link
            to="/discover"
            className="text-xs font-semibold text-electric-400 hover:text-electric-300 flex items-center space-x-1 group"
          >
            <span>Browse all 30+ events</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Explore Categories Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Broad Technical Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Explore by Tech Domain
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            From foundation models to distributed cloud clusters and ethical penetration testing.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.map(category => (
            <Link
              key={category.id}
              to={`/discover?category=${encodeURIComponent(category.name)}`}
              className="p-4 rounded-xl bg-dark-900/80 hover:bg-dark-850 border border-white/[0.06] hover:border-electric-500/40 hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Code className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-electric-400 transition-colors leading-snug">
                  {category.name}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{category.count} events</span>
                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-electric-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-electric-400">
            Intelligent Discovery Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            How EventIQ Personalization Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            A transparent matching engine that learns from what you build, search, and save.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] relative">
            <span className="text-2xl font-mono font-extrabold text-slate-700">01</span>
            <h3 className="text-base font-bold text-white mt-2">
              Declare Your Profile & Stack
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Select your technical interests, skills (React, Python, AWS), experience level, and preferred format (hackathons, workshops, conferences).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] relative">
            <span className="text-2xl font-mono font-extrabold text-electric-500/60">02</span>
            <h3 className="text-base font-bold text-white mt-2">
              Multi-Factor AI Matching
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              The recommendation engine analyzes event agendas, required technologies, experience tiers, and your activity history to calculate weighted scores.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] relative">
            <span className="text-2xl font-mono font-extrabold text-indigo-500/60">03</span>
            <h3 className="text-base font-bold text-white mt-2">
              Transparent Explanations
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Every recommendation comes with transparent reasoning ("Why we recommend this") detailing skill alignment, format match, and relevance factors.
            </p>
          </div>

        </div>

        {/* Final CTA Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-electric-900/30 via-dark-900 to-indigo-950/30 border border-electric-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to find your next tech event?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Personalize your preferences in under 60 seconds and get AI-curated hackathons, conferences, and meetups.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/onboarding"
                className="px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs shadow-glow-md transition-all"
              >
                Start Onboarding
              </Link>
              <Link
                to="/discover"
                className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 font-medium text-xs border border-white/10 transition-all"
              >
                Browse All Events
              </Link>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
