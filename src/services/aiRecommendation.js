/**
 * EventIQ - AI Recommendation Client Service
 * Abstraction layer that calls the secure server route `/api/recommend`
 * with automatic, seamless fallback to the local recommendation engine.
 */

import { calculateLocalRecommendations } from './localRecommendation';

/**
 * Reusable recommendation service function
 * @param {Object} userProfile - User interests, skills, experience, etc.
 * @param {Array} events - Available events dataset
 * @returns {Promise<{ recommendations: Array, source: 'ai' | 'local', message?: string }>}
 */
export async function recommendEvents(userProfile, events) {
  if (!events || events.length === 0) {
    return { recommendations: [], source: 'local', message: 'No events available' };
  }

  try {
    const payload = {
      userProfile: {
        interests: userProfile?.interests || [],
        skills: userProfile?.skills || [],
        experienceLevel: userProfile?.experienceLevel || 'Intermediate',
        preferredEventTypes: userProfile?.preferredEventTypes || [],
        preferredMode: userProfile?.preferredMode || 'Both',
        location: userProfile?.location || '',
        viewedEvents: userProfile?.viewedEvents || [],
        savedEvents: userProfile?.savedEvents || [],
        searchHistory: userProfile?.searchHistory || []
      },
      events: events.map(e => ({
        id: e.id,
        title: e.title,
        organizer: e.organizer,
        category: e.category,
        technologies: e.technologies,
        eventType: e.eventType,
        date: e.date,
        location: e.location,
        mode: e.mode,
        experienceLevel: e.experienceLevel,
        description: e.description,
        popularity: e.popularity
      }))
    };

    // Attempt to call the secure backend API endpoint
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();

      // Validate AI recommendations
      if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        const eventsMap = new Map(events.map(e => [e.id, e]));
        const validRecommendations = [];

        for (const item of data.recommendations) {
          // Strictly verify that the AI recommended an existing event ID
          if (item.eventId && eventsMap.has(item.eventId)) {
            const rawEvent = eventsMap.get(item.eventId);
            validRecommendations.push({
              eventId: item.eventId,
              matchScore: Math.min(99, Math.max(50, Number(item.matchScore) || 85)),
              reason: item.reason || `Directly matches your interest in ${rawEvent.category}.`,
              matchingFactors: Array.isArray(item.matchingFactors) ? item.matchingFactors : [rawEvent.category],
              detailedReasons: Array.isArray(item.detailedReasons) ? item.detailedReasons : [
                { type: 'Match Alignment', description: item.reason || 'Curated by AI for your profile.' }
              ],
              event: rawEvent,
              source: data.source || 'ai'
            });
          }
        }

        if (validRecommendations.length > 0) {
          return {
            recommendations: validRecommendations,
            source: data.source || 'ai',
            message: data.message || 'AI-curated recommendations generated successfully.'
          };
        }
      }
    }
  } catch (error) {
    // Graceful silent fallback without crashing or leaking details
    console.warn('[EventIQ] Server recommendation endpoint unavailable, invoking local intelligence fallback.');
  }

  // Fallback to local recommendation algorithm
  const localResults = calculateLocalRecommendations(userProfile, events);
  return {
    recommendations: localResults,
    source: 'local',
    message: 'AI recommendations are temporarily unavailable. Showing personalized recommendations based on your preferences.'
  };
}
