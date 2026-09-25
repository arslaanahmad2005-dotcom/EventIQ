import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Search, Bookmark, Compass, User, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const { savedEvents, setSearchModalOpen, userProfile } = useApp();

  const navLinks = [
    { path: '/discover', label: 'Discover', icon: Compass },
    { 
      path: '/recommendations', 
      label: 'Recommendations', 
      icon: Sparkles,
      badge: 'AI'
    },
    { path: '/categories', label: 'Categories', icon: Layers },
    { 
      path: '/saved', 
      label: 'Saved', 
      icon: Bookmark,
      count: savedEvents.length
    },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-dark-950/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 via-indigo-600 to-electric-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-electric-400 transition-colors">
                  Event<span className="text-electric-500">IQ</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-slate-400">
                  AI Beta
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    active
                      ? 'text-white bg-white/[0.08] shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-electric-400' : 'text-slate-500'}`} />
                  <span>{link.label}</span>

                  {/* AI Badge */}
                  {link.badge && (
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.2 rounded-full bg-electric-500/20 text-electric-400 border border-electric-500/30">
                      {link.badge}
                    </span>
                  )}

                  {/* Saved Count Badge */}
                  {typeof link.count === 'number' && link.count > 0 && (
                    <span className="text-[11px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-3">
          
          {/* Global Search trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/[0.08] hover:border-white/20 text-slate-400 hover:text-slate-200 transition-all text-xs"
            aria-label="Search events"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search events...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/[0.05] rounded border border-white/[0.08]">
              Ctrl+K
            </kbd>
          </button>

          {/* Quick AI Rec CTA button */}
          <Link
            to="/recommendations"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-electric-600 to-indigo-600 text-white font-medium text-xs shadow-glow-sm hover:shadow-glow-md hover:brightness-110 transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Recs</span>
          </Link>

          {/* User Profile Avatar Link */}
          <Link
            to="/profile"
            className={`p-1 rounded-full border transition-all ${
              isActive('/profile')
                ? 'border-electric-500 ring-2 ring-electric-500/20'
                : 'border-white/10 hover:border-white/30'
            }`}
            title="Your Profile"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-xs font-semibold text-slate-200 overflow-hidden">
              {userProfile.avatar ? (
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <User className="w-4 h-4 text-slate-300" />
              )}
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
}
