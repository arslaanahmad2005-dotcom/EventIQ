import React, { useState } from 'react';
import { 
  User, 
  Save, 
  Plus, 
  X, 
  RotateCcw, 
  MapPin, 
  Briefcase, 
  Layers, 
  Bookmark, 
  Eye,
  RotateCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, POPULAR_SKILLS, EVENT_TYPES, EXPERIENCE_LEVELS, MODES } from '../data/events';

export default function Profile() {
  const { 
    userProfile, 
    updateUserProfile, 
    generateRecommendations, 
    savedEvents, 
    viewedEvents, 
    resetAllData, 
    showToast 
  } = useApp();

  // Local editable form state with safe array defaults
  const [formData, setFormData] = useState(() => ({
    name: userProfile?.name || 'Alex Chen',
    role: userProfile?.role || 'Fullstack & AI Engineer',
    bio: userProfile?.bio || '',
    avatar: userProfile?.avatar || '',
    location: userProfile?.location || 'San Francisco, CA',
    experienceLevel: userProfile?.experienceLevel || 'Intermediate',
    interests: Array.isArray(userProfile?.interests) ? [...userProfile.interests] : ['AI/ML', 'Web Development'],
    skills: Array.isArray(userProfile?.skills) ? [...userProfile.skills] : ['Python', 'React', 'Docker'],
    preferredEventTypes: Array.isArray(userProfile?.preferredEventTypes) ? [...userProfile.preferredEventTypes] : ['Hackathon', 'Conference'],
    preferredMode: userProfile?.preferredMode || 'Both'
  }));
  const [newSkill, setNewSkill] = useState('');
  const [saving, setSaving] = useState(false);

  // Toggle interest
  const handleToggleInterest = (categoryName) => {
    setFormData(prev => {
      const interests = prev.interests || [];
      const exists = interests.includes(categoryName);
      const updated = exists ? interests.filter(i => i !== categoryName) : [...interests, categoryName];
      return { ...prev, interests: updated };
    });
  };

  // Add custom skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const clean = newSkill.trim();
    setFormData(prev => {
      const skills = prev.skills || [];
      if (!skills.includes(clean)) {
        return { ...prev, skills: [...skills, clean] };
      }
      return prev;
    });
    setNewSkill('');
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(s => s !== skillToRemove)
    }));
  };

  // Toggle preferred event type
  const handleToggleType = (type) => {
    setFormData(prev => {
      const types = prev.preferredEventTypes || [];
      const exists = types.includes(type);
      const updated = exists ? types.filter(t => t !== type) : [...types, type];
      return { ...prev, preferredEventTypes: updated };
    });
  };

  // Save changes & regenerate
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    updateUserProfile(formData);
    
    // Immediately regenerate recommendations using the new profile
    await generateRecommendations(formData);
    setSaving(false);
    showToast('Profile updated & recommendations refreshed!', 'success');
  };

  const currentInterests = formData.interests || [];
  const currentSkills = formData.skills || [];
  const currentTypes = formData.preferredEventTypes || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-electric-400">
            Personalization Settings
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Your Developer Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            EventIQ uses these parameters to score and rank relevant tech events for you.
          </p>
        </div>

        {/* Activity Summary Pills */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 flex items-center space-x-1.5">
            <Bookmark className="w-3.5 h-3.5 text-electric-400" />
            <span>{(savedEvents || []).length} Saved</span>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 flex items-center space-x-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{(viewedEvents || []).length} Viewed</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Identity Card */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center space-x-2">
            <User className="w-4 h-4 text-electric-400" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Role / Title
              </label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Short Bio / Current Focus
              </label>
              <textarea
                rows={2}
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Preferred City / Region
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA or London"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Experience Tier
              </label>
              <select
                value={formData.experienceLevel || 'Intermediate'}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500 cursor-pointer"
              >
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Technical Interests Section */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-electric-400" />
              <span>Areas of Interest (30% Weight)</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              {currentInterests.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => {
              const selected = currentInterests.includes(category.name);
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => handleToggleInterest(category.name)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selected
                      ? 'bg-electric-500/20 text-electric-300 border border-electric-500/50 shadow-glow-sm'
                      : 'bg-dark-950 text-slate-400 hover:text-slate-200 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {selected && '✓ '}
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills & Tech Stack Section */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-electric-400" />
              <span>Skills & Technologies (25% Weight)</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              {currentSkills.length} skills listed
            </span>
          </div>

          {/* Current Skills Chips */}
          <div className="flex flex-wrap gap-2 min-h-[38px] p-3 rounded-xl bg-dark-950 border border-white/10">
            {currentSkills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-electric-500/10 text-electric-300 border border-electric-500/30 text-xs font-mono"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add Skill Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Next.js, PyTorch, Rust, Docker)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-electric-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 border border-white/10 text-white text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="text-[11px] text-slate-400 flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-slate-500 font-mono">Suggestions:</span>
            {POPULAR_SKILLS.filter(s => !currentSkills.includes(s)).slice(0, 7).map(s => (
              <button
                type="button"
                key={s}
                onClick={() => setFormData(prev => ({ ...prev, skills: [...(prev.skills || []), s] }))}
                className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono whitespace-nowrap"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>

        {/* Format & Mode Preferences */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-white/[0.08] space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
            Format & Mode Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Preferred Event Formats
              </label>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map(type => {
                  const selected = currentTypes.includes(type);
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleToggleType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selected
                          ? 'bg-electric-500/20 text-electric-300 border border-electric-500/40'
                          : 'bg-dark-950 text-slate-400 border border-white/10'
                      }`}
                    >
                      {selected && '✓ '}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Preferred Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MODES.map(mode => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setFormData({ ...formData, preferredMode: mode })}
                    className={`py-2 rounded-lg text-xs font-medium transition-all text-center ${
                      formData.preferredMode === mode
                        ? 'bg-electric-600 text-white shadow-glow-sm'
                        : 'bg-dark-950 text-slate-400 border border-white/10'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={resetAllData}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Defaults</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-electric-600 to-indigo-600 hover:from-electric-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-glow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {saving ? <RotateCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Regenerating...' : 'Update & Regenerate Recommendations'}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
