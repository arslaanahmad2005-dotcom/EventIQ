import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sliders, 
  Moon, 
  Bell, 
  Sparkles, 
  Download, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  UserCheck,
  UserX,
  Trash2,
  Lock,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { 
    userProfile, 
    recommendationSource, 
    savedEvents, 
    viewedEvents, 
    resetAllData,
    anonymizeUserData,
    deleteAllUserData,
    showToast 
  } = useApp();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [notifications, setNotifications] = useState({
    reminders: true,
    newEvents: true,
    weeklyDigest: false
  });

  const handleExportData = () => {
    const data = {
      profile: userProfile,
      savedEvents,
      viewedEvents,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eventiq-data-${Date.now()}.json`;
    a.click();
    showToast('Exported profile & activity data!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08] mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Preferences, recommendation engine diagnostics, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Recommendation Engine Status */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-electric-400">
            <Cpu className="w-4 h-4" />
            <span>AI Recommendation Engine Status</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Recommendation Mode:</span>
              <span className="font-semibold text-emerald-400 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{recommendationSource === 'ai' ? 'Cloud AI (Gemini 2.5 Flash)' : 'Deterministic Local Fallback'}</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
              <span className="text-slate-400">Scoring Architecture:</span>
              <span className="font-mono text-slate-200">
                Interests (30%) + Skills (25%) + Type (15%) + Exp (10%) + Loc (10%) + Signals (10%)
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
              <span className="text-slate-400">Server API Route:</span>
              <span className="font-mono text-electric-400">POST /api/recommend</span>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-white">
            <Moon className="w-4 h-4 text-electric-400" />
            <span>Theme & Display</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-dark-950 border border-white/[0.06] text-xs">
            <div>
              <h4 className="font-semibold text-white">Dark Mode (Vercel / Linear Aesthetic)</h4>
              <p className="text-slate-400 mt-0.5">Optimized for high contrast and reduced eye fatigue.</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-electric-500/20 text-electric-300 font-mono text-[11px] border border-electric-500/30">
              Active
            </span>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-white">
            <Bell className="w-4 h-4 text-electric-400" />
            <span>Notifications</span>
          </div>

          <div className="space-y-2">
            {[
              { key: 'reminders', label: 'Event Registration Deadlines', desc: 'Alerts before hackathon and conference tickets sell out' },
              { key: 'newEvents', label: 'New AI Recommendations', desc: 'Notify when new events match your skill matrix' }
            ].map(item => (
              <div 
                key={item.key}
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                className="flex items-center justify-between p-3.5 rounded-xl bg-dark-950 border border-white/[0.06] hover:border-white/10 cursor-pointer text-xs transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-white">{item.label}</h4>
                  <p className="text-slate-400 mt-0.5">{item.desc}</p>
                </div>
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${notifications[item.key] ? 'bg-electric-500' : 'bg-slate-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data & Privacy Controls */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-electric-400" />
              <span>Data Privacy & User Rights (GDPR / CCPA)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Zero External PII
            </span>
          </div>

          {/* Privacy Transparency Overview */}
          <div className="p-4 rounded-xl bg-dark-950 border border-white/[0.06] text-xs space-y-2">
            <h4 className="font-semibold text-white flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-electric-400" />
              <span>How your personal data is handled:</span>
            </h4>
            <ul className="text-slate-400 space-y-1.5 pl-5 list-disc text-[11px] leading-relaxed">
              <li><strong>Local Storage Only:</strong> Name, bio, role, bookmarks, and search queries reside strictly inside your local browser storage.</li>
              <li><strong>AI Engine Privacy:</strong> External LLM queries receive only non-identifying technical tags (interests & skills). Names, bios, and emails are stripped prior to transmission.</li>
              <li><strong>No Third-Party Trackers:</strong> No analytics pixels, ad beacons, or session recorders are embedded.</li>
            </ul>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Export */}
            <button
              type="button"
              onClick={handleExportData}
              className="py-2.5 px-3 rounded-xl bg-dark-950 hover:bg-dark-850 border border-white/10 text-white text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-electric-400" />
              <span>Export Data (JSON)</span>
            </button>

            {/* Anonymize */}
            <button
              type="button"
              onClick={anonymizeUserData}
              className="py-2.5 px-3 rounded-xl bg-dark-950 hover:bg-amber-950/30 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Anonymize Profile</span>
            </button>

            {/* Full Purge / Delete Account */}
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="py-2.5 px-3 rounded-xl bg-dark-950 hover:bg-rose-950/40 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All Data</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => {
                    deleteAllUserData();
                    setConfirmDelete(false);
                  }}
                  className="flex-1 py-2 px-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold shadow-glow-sm"
                >
                  Confirm Wipe
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="py-2 px-2.5 rounded-xl bg-dark-850 text-slate-400 hover:text-white text-[11px]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
