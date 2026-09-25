import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EVENTS } from '../data/events';
import { recommendEvents } from '../services/aiRecommendation';
import { calculateLocalRecommendations } from '../services/localRecommendation';
import { sanitizeString, sanitizeStringArray } from '../utils/sanitize';

const AppContext = createContext(null);

const DEFAULT_PROFILE = {
  name: 'Alex Chen',
  role: 'Fullstack & AI Engineer',
  bio: 'Building intelligent developer tools and modern web applications. Excited about hackathons and agentic systems.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  location: 'San Francisco, CA',
  experienceLevel: 'Intermediate',
  interests: ['AI/ML', 'Web Development', 'Cloud'],
  skills: ['Python', 'React', 'TypeScript', 'Docker', 'Machine Learning'],
  preferredEventTypes: ['Hackathon', 'Conference', 'Workshop'],
  preferredMode: 'Both'
};

const STORAGE_KEYS = {
  PROFILE: 'eventiq_user_profile',
  SAVED: 'eventiq_saved_events',
  VIEWED: 'eventiq_viewed_events',
  ONBOARDED: 'eventiq_onboarding_completed',
  RECOMMENDATIONS: 'eventiq_recommendations',
  REC_SOURCE: 'eventiq_rec_source',
  SEARCH_HISTORY: 'eventiq_search_history',
};

// Safe validator for LocalStorage UserProfile to prevent Prototype Pollution & Type Confusion
function safeValidateProfile(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return DEFAULT_PROFILE;
  }
  return {
    name: sanitizeString(raw.name || DEFAULT_PROFILE.name, 60),
    role: sanitizeString(raw.role || DEFAULT_PROFILE.role, 60),
    bio: sanitizeString(raw.bio || DEFAULT_PROFILE.bio, 200),
    avatar: typeof raw.avatar === 'string' && (raw.avatar.startsWith('https://') || raw.avatar.startsWith('data:') || raw.avatar === '')
      ? raw.avatar.slice(0, 500)
      : DEFAULT_PROFILE.avatar,
    location: sanitizeString(raw.location || DEFAULT_PROFILE.location, 60),
    experienceLevel: ['Beginner', 'Intermediate', 'Advanced'].includes(raw.experienceLevel)
      ? raw.experienceLevel
      : DEFAULT_PROFILE.experienceLevel,
    interests: sanitizeStringArray(raw.interests || DEFAULT_PROFILE.interests, 15, 40),
    skills: sanitizeStringArray(raw.skills || DEFAULT_PROFILE.skills, 30, 40),
    preferredEventTypes: sanitizeStringArray(raw.preferredEventTypes || DEFAULT_PROFILE.preferredEventTypes, 10, 30),
    preferredMode: ['In-person', 'Online', 'Both'].includes(raw.preferredMode)
      ? raw.preferredMode
      : 'Both',
  };
}

// Safe validator for string arrays from LocalStorage
function safeValidateArray(raw, fallback = [], maxItems = 50) {
  if (!Array.isArray(raw)) return fallback;
  return sanitizeStringArray(raw, maxItems, 60);
}

export function AppProvider({ children }) {
  // 1. User Profile with safe parsing
  const [userProfile, setUserProfileState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? safeValidateProfile(JSON.parse(saved)) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // 2. Saved Events
  const [savedEvents, setSavedEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? safeValidateArray(JSON.parse(saved), ['event-01', 'event-02']) : ['event-01', 'event-02'];
    } catch {
      return ['event-01', 'event-02'];
    }
  });

  // 3. Viewed Events
  const [viewedEvents, setViewedEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEWED);
      return saved ? safeValidateArray(JSON.parse(saved), ['event-01']) : ['event-01'];
    } catch {
      return ['event-01'];
    }
  });

  // 4. Onboarding Status
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ONBOARDED);
      return saved ? JSON.parse(saved) === true : false;
    } catch {
      return false;
    }
  });

  // 5. Recommendations Cache
  const [recommendations, setRecommendations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return saved && Array.isArray(JSON.parse(saved)) ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recommendationSource, setRecommendationSource] = useState(() => {
    try {
      const src = localStorage.getItem(STORAGE_KEYS.REC_SOURCE);
      return src === 'ai' ? 'ai' : 'local';
    } catch {
      return 'local';
    }
  });

  // 6. Search History
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return saved ? safeValidateArray(JSON.parse(saved), ['AI Hackathon', 'React 19', 'Kubernetes'], 8) : ['AI Hackathon', 'React 19', 'Kubernetes'];
    } catch {
      return ['AI Hackathon', 'React 19', 'Kubernetes'];
    }
  });

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [registerModalEvent, setRegisterModalEvent] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch {
      // Storage quota or privacy mode - silent safe fallback
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedEvents));
    } catch {
      // Storage quota or privacy mode - silent safe fallback
    }
  }, [savedEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify(viewedEvents));
    } catch {
      // Storage quota or privacy mode - silent safe fallback
    }
  }, [viewedEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDED, JSON.stringify(onboardingCompleted));
    } catch {
      // Storage quota or privacy mode - silent safe fallback
    }
  }, [onboardingCompleted]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(recommendations));
      localStorage.setItem(STORAGE_KEYS.REC_SOURCE, recommendationSource);
    } catch {
      // Storage quota or privacy mode - silent safe fallback
    }
  }, [recommendations, recommendationSource]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory));
    } catch {
      // Storage quota or privacy mode - silent safe fallback
    }
  }, [searchHistory]);

  // Toast helper
  const showToast = useCallback((message, type = 'info') => {
    const cleanMsg = sanitizeString(message, 120);
    setToast({ id: Date.now(), message: cleanMsg, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === cleanMsg ? null : prev));
    }, 4000);
  }, []);

  // Toggle Save Event
  const toggleSaveEvent = useCallback((eventId) => {
    if (!eventId || typeof eventId !== 'string') return;
    const cleanId = sanitizeString(eventId, 40);

    setSavedEvents(prev => {
      const isAlreadySaved = prev.includes(cleanId);
      let updated;
      if (isAlreadySaved) {
        updated = prev.filter(id => id !== cleanId);
        showToast('Event removed from your saved list', 'info');
      } else {
        updated = [...prev, cleanId].slice(0, 50); // Bound capacity
        showToast('Event saved to your collection!', 'success');
      }
      return updated;
    });
  }, [showToast]);

  const isSaved = useCallback((eventId) => {
    return savedEvents.includes(eventId);
  }, [savedEvents]);

  // Record Viewed Event (bounded to max 50 items)
  const recordView = useCallback((eventId) => {
    if (!eventId || typeof eventId !== 'string') return;
    const cleanId = sanitizeString(eventId, 40);
    setViewedEvents(prev => {
      if (prev.includes(cleanId)) return prev;
      return [cleanId, ...prev].slice(0, 50);
    });
  }, []);

  // Update Profile with sanitization
  const updateUserProfile = useCallback((updates) => {
    setUserProfileState(prev => safeValidateProfile({
      ...prev,
      ...updates
    }));
    showToast('Profile updated successfully!', 'success');
  }, [showToast]);

  // Add Recent Search (bounded to max 8 items)
  const addRecentSearch = useCallback((term) => {
    if (!term || typeof term !== 'string' || !term.trim()) return;
    const clean = sanitizeString(term.trim(), 50);
    if (!clean) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 8);
    });
  }, []);

  // Core Recommendation Action (Instant Optimistic + Background AI Refinement)
  const generateRecommendations = useCallback(async (customProfile = null) => {
    setIsGenerating(true);
    const profileToUse = customProfile ? safeValidateProfile(customProfile) : userProfile;

    const enrichedProfile = {
      ...profileToUse,
      savedEvents,
      viewedEvents,
      searchHistory
    };

    // 1. INSTANT LOCAL FIRST: Immediately render personalized matches in 0ms!
    const immediateLocal = calculateLocalRecommendations(enrichedProfile, EVENTS);
    setRecommendations(immediateLocal);
    setRecommendationSource('local');

    try {
      // 2. BACKGROUND AI ENHANCEMENT: Fetch cloud AI refined scores
      const result = await recommendEvents(enrichedProfile, EVENTS);
      if (result && result.recommendations && result.recommendations.length > 0) {
        setRecommendations(result.recommendations);
        setRecommendationSource(result.source);
        if (result.source === 'ai') {
          showToast('Refined with Google Gemini AI!', 'success');
        }
      }
      return result.recommendations;
    } catch {
      // Graceful local fallback without leaking stack traces or internal errors
      return immediateLocal;
    } finally {
      setIsGenerating(false);
    }
  }, [userProfile, savedEvents, viewedEvents, searchHistory, showToast]);

  // Initial load: Generate recommendations if none exist
  useEffect(() => {
    if (recommendations.length === 0) {
      generateRecommendations();
    }
  }, []);

  // Complete onboarding
  const completeOnboarding = useCallback((finalProfile) => {
    const validated = finalProfile ? safeValidateProfile(finalProfile) : userProfile;
    setUserProfileState(validated);
    setOnboardingCompleted(true);
    return generateRecommendations(validated);
  }, [generateRecommendations, userProfile]);

  // Reset demo data to default baseline
  const resetAllData = useCallback(() => {
    try {
      localStorage.clear();
    } catch {
      // Safe fallback
    }
    setUserProfileState(DEFAULT_PROFILE);
    setSavedEvents(['event-01', 'event-02']);
    setViewedEvents([]);
    setOnboardingCompleted(false);
    setSearchHistory(['AI Hackathon', 'React 19', 'Kubernetes']);
    generateRecommendations(DEFAULT_PROFILE);
    showToast('Reset all data to defaults.', 'info');
  }, [generateRecommendations, showToast]);

  // Anonymize user profile (strip name, bio, role, avatar, location, history)
  const anonymizeUserData = useCallback(() => {
    setUserProfileState(prev => ({
      ...prev,
      name: 'Anonymous Developer',
      role: 'Software Engineer',
      bio: '',
      avatar: '',
      location: ''
    }));
    setSearchHistory([]);
    setViewedEvents([]);
    showToast('Personal identifiers have been anonymized.', 'info');
  }, [showToast]);

  // Full Permanent Data Deletion (GDPR Right to be Forgotten)
  const deleteAllUserData = useCallback(() => {
    try {
      localStorage.clear();
    } catch {
      // Safe fallback
    }
    const blankProfile = {
      name: 'Anonymous Developer',
      role: 'Developer',
      bio: '',
      avatar: '',
      location: '',
      experienceLevel: 'Intermediate',
      interests: [],
      skills: [],
      preferredEventTypes: [],
      preferredMode: 'Both'
    };
    setUserProfileState(blankProfile);
    setSavedEvents([]);
    setViewedEvents([]);
    setOnboardingCompleted(false);
    setSearchHistory([]);
    setRecommendations([]);
    setRecommendationSource('local');
    showToast('All personal data & history permanently erased.', 'success');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        events: EVENTS,
        userProfile,
        updateUserProfile,
        savedEvents,
        toggleSaveEvent,
        isSaved,
        viewedEvents,
        recordView,
        onboardingCompleted,
        setOnboardingCompleted,
        completeOnboarding,
        recommendations,
        recommendationSource,
        isGenerating,
        generateRecommendations,
        searchHistory,
        addRecentSearch,
        searchModalOpen,
        setSearchModalOpen,
        registerModalEvent,
        setRegisterModalEvent,
        toast,
        showToast,
        resetAllData,
        anonymizeUserData,
        deleteAllUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
