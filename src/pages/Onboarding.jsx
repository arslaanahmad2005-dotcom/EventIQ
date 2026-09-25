import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  X, 
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, POPULAR_SKILLS, MODES } from '../data/events';
import AILoadingState from '../components/AILoadingState';

const TOTAL_STEPS = 5;

export default function Onboarding() {
  const navigate = useNavigate();
  const { userProfile, completeOnboarding } = useApp();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [interests, setInterests] = useState(userProfile.interests || ['AI/ML', 'Web Development']);
  const [skills, setSkills] = useState(userProfile.skills || ['Python', 'React', 'Docker']);
  const [newSkill, setNewSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(userProfile.experienceLevel || 'Intermediate');
  const [preferredEventTypes, setPreferredEventTypes] = useState(userProfile.preferredEventTypes || ['Hackathon', 'Conference']);
  const [preferredMode, setPreferredMode] = useState(userProfile.preferredMode || 'Both');
  const [location, setLocation] = useState(userProfile.location || 'San Francisco, CA');

  // Toggle interest
  const toggleInterest = (name) => {
    setInterests(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  // Add custom skill
  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const clean = newSkill.trim();
    if (!skills.includes(clean)) {
      setSkills(prev => [...prev, clean]);
    }
    setNewSkill('');
  };

  const removeSkill = (s) => {
    setSkills(prev => prev.filter(item => item !== s));
  };

  // Toggle event type
  const toggleType = (t) => {
    setPreferredEventTypes(prev => 
      prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
    );
  };

  // Complete and submit
  const handleFinalSubmit = async () => {
    setIsProcessing(true);

    const updatedProfile = {
      ...userProfile,
      interests,
      skills,
      experienceLevel,
      preferredEventTypes,
      preferredMode,
      location
    };

    try {
      await completeOnboarding(updatedProfile);
    } finally {
      setIsProcessing(false);
      navigate('/recommendations');
    }
  };

  if (isProcessing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <AILoadingState />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>STEP {step} OF {TOTAL_STEPS}</span>
          <span className="text-electric-400 font-semibold">{Math.round((step / TOTAL_STEPS) * 100)}% COMPLETE</span>
        </div>
        <div className="w-full bg-dark-900 rounded-full h-1.5 border border-white/10 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-electric-500 to-indigo-500 h-full rounded-full transition-all duration-300 shadow-glow-sm"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-white/[0.08] shadow-2xl">
        
        {/* STEP 1: Interests */}
        {step === 1 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-electric-400">Step 1</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                What are you interested in?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select technical fields you want to explore or build projects in.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
              {CATEGORIES.map(category => {
                const selected = interests.includes(category.name);
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleInterest(category.name)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      selected
                        ? 'bg-electric-500/20 text-electric-300 border-electric-500/50 shadow-glow-sm'
                        : 'bg-dark-950 text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{category.name}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-electric-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Skills */}
        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-electric-400">Step 2</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                What skills & tools do you use?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                This helps us recommend hackathons and workshops matching your technical proficiency.
              </p>
            </div>

            {/* Current Skills list */}
            <div className="min-h-[44px] p-3 rounded-xl bg-dark-950 border border-white/10 flex flex-wrap gap-2">
              {skills.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-electric-500/15 text-electric-300 border border-electric-500/30 text-xs font-mono"
                >
                  <span>{s}</span>
                  <button onClick={() => removeSkill(s)} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-xs text-slate-500 italic">No skills selected yet.</span>
              )}
            </div>

            {/* Add Custom Skill */}
            <form onSubmit={addSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Type a skill (e.g. Next.js, PyTorch, Kubernetes)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 border border-white/10 text-white text-xs font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Popular skill suggestions */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-2">QUICK SUGGESTIONS:</span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SKILLS.filter(s => !skills.includes(s)).slice(0, 10).map(s => (
                  <button
                    key={s}
                    onClick={() => setSkills(prev => [...prev, s])}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono text-xs border border-white/5"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Experience */}
        {step === 3 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-electric-400">Step 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                What is your experience level?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                We'll tailor sessions so you're neither overwhelmed nor bored.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { level: 'Beginner', title: 'Beginner / Student', desc: 'Learning the fundamentals, seeking hands-on introductory workshops and mentorship.' },
                { level: 'Intermediate', title: 'Intermediate Engineer', desc: 'Comfortable building fullstack projects, eager to dive into advanced frameworks & hackathons.' },
                { level: 'Advanced', title: 'Senior / Staff / Lead', desc: 'Focusing on distributed architecture, system design, security, and specialized conferences.' },
              ].map(item => (
                <div
                  key={item.level}
                  onClick={() => setExperienceLevel(item.level)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    experienceLevel === item.level
                      ? 'bg-electric-500/15 border-electric-500/50 shadow-glow-sm'
                      : 'bg-dark-950 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    {experienceLevel === item.level && <Check className="w-4 h-4 text-electric-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Preferred Events */}
        {step === 4 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-electric-400">Step 4</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Which event formats do you prefer?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select all formats you're interested in attending.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: 'Hackathon', desc: 'Fast-paced 24-48h collaborative coding & prizes.' },
                { type: 'Conference', desc: 'Industry keynotes, technical tracks, and expo booths.' },
                { type: 'Workshop', desc: 'Interactive live-coding and instructor-led labs.' },
                { type: 'Meetup', desc: 'Casual community talks and local developer networking.' },
                { type: 'Webinar', desc: 'Virtual technical demos and Q&A sessions.' }
              ].map(item => {
                const selected = preferredEventTypes.includes(item.type);
                return (
                  <div
                    key={item.type}
                    onClick={() => toggleType(item.type)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selected
                        ? 'bg-electric-500/15 border-electric-500/50 shadow-glow-sm'
                        : 'bg-dark-950 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.type}</h4>
                      {selected && <Check className="w-4 h-4 text-electric-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Mode & Location */}
        {step === 5 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-electric-400">Step 5</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Preferred Attendance & Location
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Let us know where you are or whether you prefer virtual attendance.
              </p>
            </div>

            {/* Mode Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Event Format Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MODES.map(mode => (
                  <button
                    key={mode}
                    onClick={() => setPreferredMode(mode)}
                    className={`py-3 rounded-xl text-xs font-medium border transition-all text-center ${
                      preferredMode === mode
                        ? 'bg-electric-600 text-white border-electric-500 shadow-glow-sm'
                        : 'bg-dark-950 text-slate-400 border-white/10'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Preferred City or Tech Hub
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA, London, or Bengaluru"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                We will prioritize in-person events in this region alongside global online opportunities.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs shadow-glow-sm flex items-center space-x-1.5 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-electric-600 to-indigo-600 hover:from-electric-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-glow-md flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate My Recommendations</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
