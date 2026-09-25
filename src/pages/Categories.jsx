import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Code, 
  Cloud, 
  ShieldCheck, 
  Terminal, 
  Database, 
  Rocket, 
  GitFork, 
  Layers, 
  Palette, 
  ArrowRight
} from 'lucide-react';
import { CATEGORIES, EVENTS } from '../data/events';

const ICON_MAP = {
  Brain,
  Code,
  Cloud,
  ShieldCheck,
  Terminal,
  Database,
  Rocket,
  GitFork,
  Layers,
  Palette
};

export default function Categories() {
  // Compute live event count for each category
  const categoriesWithCounts = CATEGORIES.map(cat => {
    const liveCount = EVENTS.filter(e => e.category === cat.name).length;
    return {
      ...cat,
      liveCount: liveCount || cat.count
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-electric-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Taxonomies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Event Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Discover hackathons, symposiums, and engineering conferences curated by specialization.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCounts.map(cat => {
          const IconComponent = ICON_MAP[cat.icon] || Code;

          return (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] hover:border-electric-500/40 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-20 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {cat.liveCount} events
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-electric-400 transition-colors">
                  {cat.name}
                </h3>
                
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <Link
                  to={`/discover?category=${encodeURIComponent(cat.name)}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-dark-950 hover:bg-electric-600 border border-white/10 hover:border-electric-500 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between transition-all duration-200"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
