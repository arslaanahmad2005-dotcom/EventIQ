/**
 * EventIQ - Local Personalized Recommendation Engine
 * Weighted multi-factor recommendation algorithm with deterministic explanation generation.
 * 
 * Weights:
 * - Interest match: 30%
 * - Skill match: 25%
 * - Event type: 15%
 * - Experience level: 10%
 * - Location / Mode: 10%
 * - User activity history: 10%
 */

export function calculateLocalRecommendations(userProfile, events = []) {
  if (!events || events.length === 0) return [];

  const profile = {
    interests: userProfile?.interests || [],
    skills: userProfile?.skills || [],
    experienceLevel: userProfile?.experienceLevel || 'Intermediate',
    preferredEventTypes: userProfile?.preferredEventTypes || [],
    preferredMode: userProfile?.preferredMode || 'Both',
    location: (userProfile?.location || '').toLowerCase().trim(),
    viewedEvents: userProfile?.viewedEvents || [],
    savedEvents: userProfile?.savedEvents || [],
    searchHistory: userProfile?.searchHistory || [],
  };

  // Build activity frequency map
  const viewedCategories = {};
  const viewedTechs = {};
  
  // Extract category and tech preferences from saved and viewed events
  events.forEach(evt => {
    const isSaved = profile.savedEvents.includes(evt.id);
    const isViewed = profile.viewedEvents.includes(evt.id);
    const weight = isSaved ? 2.5 : isViewed ? 1.0 : 0;

    if (weight > 0) {
      viewedCategories[evt.category] = (viewedCategories[evt.category] || 0) + weight;
      (evt.technologies || []).forEach(tech => {
        viewedTechs[tech] = (viewedTechs[tech] || 0) + weight;
      });
    }
  });

  const scoredEvents = events.map(event => {
    const factors = [];
    const detailedReasons = [];

    // 1. Interest Match (30 points)
    let interestScore = 0;
    const eventCategoryLower = (event.category || '').toLowerCase();
    const matchedInterests = profile.interests.filter(interest => {
      const intLower = interest.toLowerCase();
      return eventCategoryLower.includes(intLower) || 
             intLower.includes(eventCategoryLower) ||
             (event.technologies || []).some(t => t.toLowerCase() === intLower);
    });

    if (matchedInterests.length > 0) {
      interestScore = Math.min(30, 20 + matchedInterests.length * 5);
      matchedInterests.forEach(i => factors.push(i));
      detailedReasons.push({
        type: 'Interest Match',
        description: `Direct alignment with your interest in ${matchedInterests.join(', ')}.`
      });
    } else if (profile.interests.length === 0) {
      interestScore = 15; // neutral baseline
    }

    // 2. Skill Match (25 points)
    let skillScore = 0;
    const userSkillsLower = profile.skills.map(s => s.toLowerCase());
    const matchedSkills = (event.technologies || []).filter(tech => 
      userSkillsLower.includes(tech.toLowerCase())
    );

    if (matchedSkills.length > 0) {
      const ratio = matchedSkills.length / Math.max(1, (event.technologies || []).length);
      skillScore = Math.min(25, 12 + matchedSkills.length * 6);
      matchedSkills.forEach(s => {
        if (!factors.includes(s)) factors.push(s);
      });
      detailedReasons.push({
        type: 'Skill Alignment',
        description: `Hands-on technologies include ${matchedSkills.join(', ')}.`
      });
    } else if (profile.skills.length === 0) {
      skillScore = 12; // neutral baseline
    }

    // 3. Event Type Match (15 points)
    let typeScore = 0;
    if (profile.preferredEventTypes.length > 0) {
      if (profile.preferredEventTypes.includes(event.eventType)) {
        typeScore = 15;
        factors.push(event.eventType);
        detailedReasons.push({
          type: 'Event Format',
          description: `Matches your preferred format of ${event.eventType}s.`
        });
      } else {
        typeScore = 5;
      }
    } else {
      typeScore = 10;
    }

    // 4. Experience Level Match (10 points)
    let expScore = 0;
    const userExp = profile.experienceLevel.toLowerCase();
    const eventExp = (event.experienceLevel || 'all levels').toLowerCase();

    if (eventExp === 'all levels' || eventExp === userExp) {
      expScore = 10;
      factors.push(`${event.experienceLevel} Level`);
      detailedReasons.push({
        type: 'Experience Fit',
        description: `Tailored for ${event.experienceLevel} experience developers.`
      });
    } else if (
      (userExp === 'intermediate' && (eventExp === 'beginner' || eventExp === 'advanced')) ||
      (userExp === 'beginner' && eventExp === 'intermediate') ||
      (userExp === 'advanced' && eventExp === 'intermediate')
    ) {
      expScore = 6;
    } else {
      expScore = 3;
    }

    // 5. Location & Mode Match (10 points)
    let locScore = 0;
    const prefMode = profile.preferredMode.toLowerCase();
    const eventMode = (event.mode || '').toLowerCase();

    if (prefMode === 'both' || eventMode === 'both' || eventMode === prefMode) {
      locScore += 5;
    }

    if (profile.location) {
      const eventLoc = (event.location || '').toLowerCase();
      if (eventLoc.includes(profile.location) || profile.location.includes(eventLoc) || eventMode === 'online') {
        locScore += 5;
        if (eventLoc.includes(profile.location)) {
          factors.push(event.location);
          detailedReasons.push({
            type: 'Location',
            description: `Happening in or accessible to ${event.location}.`
          });
        }
      }
    } else {
      locScore += 5;
    }

    // 6. User Activity History (10 points)
    let actScore = 0;
    if (viewedCategories[event.category]) {
      actScore += Math.min(5, viewedCategories[event.category] * 2);
    }
    const techActivityBonus = (event.technologies || []).reduce((acc, t) => acc + (viewedTechs[t] || 0), 0);
    if (techActivityBonus > 0) {
      actScore += Math.min(5, techActivityBonus * 1.5);
    }
    if (actScore > 0) {
      detailedReasons.push({
        type: 'Activity Signal',
        description: `Consistent with categories and technologies you frequently explore.`
      });
    }

    // Total raw score (max ~ 100)
    let totalScore = interestScore + skillScore + typeScore + expScore + locScore + actScore;
    
    // Add small popularity dampener/boost (max 3 points)
    const popularityAdjustment = ((event.popularity || 85) - 85) * 0.2;
    totalScore = Math.min(99, Math.max(45, Math.round(totalScore + popularityAdjustment)));

    // Generate concise main reason
    let mainReason = '';
    if (matchedInterests.length > 0 && matchedSkills.length > 0) {
      mainReason = `Strong match for your ${matchedInterests.slice(0, 2).join(' & ')} interests and ${matchedSkills.slice(0, 2).join(' & ')} skills.`;
    } else if (matchedInterests.length > 0) {
      mainReason = `Curated for your passion in ${matchedInterests.join(', ')} and preferred ${event.eventType} format.`;
    } else if (matchedSkills.length > 0) {
      mainReason = `Recommended because you practice ${matchedSkills.join(', ')} at the ${event.experienceLevel} level.`;
    } else {
      mainReason = `Selected as a trending high-impact ${event.category} ${event.eventType.toLowerCase()} for ${profile.experienceLevel}s.`;
    }

    return {
      eventId: event.id,
      matchScore: totalScore,
      reason: mainReason,
      matchingFactors: Array.from(new Set(factors)).slice(0, 5),
      detailedReasons: detailedReasons.slice(0, 4),
      event: event
    };
  });

  // Sort by match score descending
  return scoredEvents.sort((a, b) => b.matchScore - a.matchScore);
}
