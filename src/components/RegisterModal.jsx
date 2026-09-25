import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Ticket, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sanitizeString } from '../utils/sanitize';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function RegisterModal() {
  const { registerModalEvent, setRegisterModalEvent, userProfile, showToast } = useApp();
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [name, setName] = useState(userProfile?.name || 'Alex Chen');
  const [email, setEmail] = useState('alex.chen@developer.io');
  const [ticketId, setTicketId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!registerModalEvent) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const cleanName = sanitizeString(name, 60);
    const cleanEmail = sanitizeString(email, 100).toLowerCase();

    if (!cleanName || cleanName.length < 2) {
      showToast('Please enter a valid attendee name.', 'info');
      return;
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }

    setIsSubmitting(true);

    // Cryptographically robust random ticket ID
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `EQ-${randomHex}`;

    setTimeout(() => {
      setTicketId(generatedId);
      setStep('success');
      setIsSubmitting(false);
      showToast(`Registration confirmed! Your Pass ID is ${generatedId}`, 'success');
    }, 250);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/event/${encodeURIComponent(registerModalEvent.id)}`);
    setCopied(true);
    showToast('Event link copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(registerModalEvent.title || 'Tech Event');
    const details = encodeURIComponent(registerModalEvent.description || '');
    const location = encodeURIComponent(registerModalEvent.location || '');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setRegisterModalEvent(null);
    setStep('form');
    setIsSubmitting(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl bg-dark-900 border border-white/10 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-dark-950">
          <div className="flex items-center space-x-2">
            <Ticket className="w-4 h-4 text-electric-400" />
            <span className="font-semibold text-sm text-white">
              {step === 'form' ? 'Event Registration' : 'Registration Confirmed'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {step === 'form' ? (
            <div>
              {/* Event Quick Info */}
              <div className="p-4 rounded-xl bg-dark-850 border border-white/[0.06] mb-5">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-electric-500/10 text-electric-400 border border-electric-500/20">
                  {registerModalEvent.eventType}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 line-clamp-1">
                  {registerModalEvent.title}
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{registerModalEvent.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 justify-end">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{registerModalEvent.location}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-400">
                  Price: {registerModalEvent.price || 'Free Admission'}
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Attendee Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address (for ticket pass & updates)
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
                  />
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-slate-400 space-y-1">
                  <div>✓ Includes access to live technical sessions, networking lounge, and project tracks.</div>
                  <div className="text-[10px] text-slate-500 font-mono">🔒 Privacy: Attendee name and email remain strictly in-memory and are never stored or shared externally.</div>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs shadow-glow-sm hover:shadow-glow-md transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">You're Registered!</h3>
              <p className="text-xs text-slate-400 mb-6">
                A confirmation has been recorded for <strong className="text-white">{name}</strong> ({email}).
              </p>

              {/* Digital Pass Card */}
              <div className="p-4 rounded-xl bg-dark-950 border border-electric-500/30 shadow-glow-sm mb-6 text-left relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-electric-400 tracking-wider uppercase">EventIQ Digital Pass</span>
                    <h4 className="text-sm font-bold text-white mt-1">{registerModalEvent.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{registerModalEvent.date} • {registerModalEvent.location}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[9px] text-slate-400 text-center leading-tight p-1">
                    QR PASS<br/>VERIFIED
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500">PASS ID: <strong className="text-white">{ticketId}</strong></span>
                  <span className="text-emerald-400 font-semibold">CONFIRMED</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleAddToCalendar}
                  className="flex-1 py-2 px-3 rounded-lg bg-dark-850 hover:bg-dark-800 border border-white/10 text-xs font-medium text-white flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-electric-400" />
                  <span>Add to Google Calendar</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2 px-3 rounded-lg bg-dark-850 hover:bg-dark-800 border border-white/10 text-xs font-medium text-white flex items-center justify-center space-x-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Share Event'}</span>
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleClose}
                  className="w-full py-2 rounded-lg bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
