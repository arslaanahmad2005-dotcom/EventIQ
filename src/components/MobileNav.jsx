import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Sparkles, Bookmark, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MobileNav() {
  const location = useLocation();
  const { savedEvents } = useApp();

  const tabs = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/discover', label: 'Discover', icon: Compass },
    { 
      path: '/recommendations', 
      label: 'AI Recs', 
      icon: Sparkles, 
      highlight: true 
    },
    { 
      path: '/saved', 
      label: 'Saved', 
      icon: Bookmark, 
      count: savedEvents.length 
    },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-950/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-2 safe-bottom">
      <nav className="flex items-center justify-around">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                active 
                  ? 'text-electric-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {tab.highlight && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-electric-500 animate-ping" />
                )}
                
                <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110 text-electric-400' : 'text-slate-400'}`} />

                {typeof tab.count === 'number' && tab.count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-electric-600 text-white text-[10px] font-mono flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium mt-1 tracking-tight ${active ? 'text-electric-400 font-semibold' : 'text-slate-400'}`}>
                {tab.label}
              </span>

              {/* Active pill bar */}
              {active && (
                <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-electric-500" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
