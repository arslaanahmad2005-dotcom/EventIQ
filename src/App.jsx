import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sparkles, Compass, Bookmark, Layers, User } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import SearchModal from './components/SearchModal';
import RegisterModal from './components/RegisterModal';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import Recommendations from './pages/Recommendations';
import EventDetails from './pages/EventDetails';
import Saved from './pages/Saved';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-950 text-slate-100 selection:bg-electric-500/30 selection:text-white pb-16 md:pb-0">
      <ScrollToTop />
      
      {/* Global Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Modern Developer Product Footer */}
      <footer className="border-t border-white/[0.08] bg-dark-950/90 py-10 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand & Mission */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-electric-600 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-white text-sm">
                  Event<span className="text-electric-500">IQ</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/5">
                  v1.0.0 Pro
                </span>
              </div>
              <p className="text-slate-400 text-center md:text-left text-xs max-w-sm">
                Discover the tech events worth showing up for. Curated with AI personalization.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-medium">
              <Link to="/discover" className="text-slate-400 hover:text-white transition-colors">
                Discover
              </Link>
              <Link to="/recommendations" className="text-slate-400 hover:text-white transition-colors">
                Recommendations
              </Link>
              <Link to="/categories" className="text-slate-400 hover:text-white transition-colors">
                Categories
              </Link>
              <Link to="/saved" className="text-slate-400 hover:text-white transition-colors">
                Saved Events
              </Link>
              <Link to="/profile" className="text-slate-400 hover:text-white transition-colors">
                Profile
              </Link>
              <Link to="/settings" className="text-slate-400 hover:text-white transition-colors">
                Settings
              </Link>
            </div>

            {/* Technical Stack Pills */}
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">React 19</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">Vite</span>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>© 2026 EventIQ Systems. Built for developers, students, and founders.</span>
            <span className="flex items-center space-x-1">
              <span>Crafted for high-performance discovery</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Global Interactive Overlays */}
      <SearchModal />
      <RegisterModal />
      <Toast />
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout />
      </Router>
    </AppProvider>
  );
}
