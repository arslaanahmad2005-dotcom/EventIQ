import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { validateRecommendPayload, sanitizeString } from './src/config/authSecurity.js';

dotenv.config();

// Vite plugin to provide secure /api endpoints directly inside the Vite dev server
function devApiPlugin() {
  const MAX_PAYLOAD_BYTES = 512 * 1024; // 512 KB

  return {
    name: 'eventiq-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Enforce pre-deployment security headers on all dev API responses
        const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        res.setHeader('X-Correlation-ID', correlationId);

        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'healthy',
            service: 'EventIQ Dev Server API',
            aiConfigured: Boolean(process.env.AI_API_KEY && process.env.AI_API_KEY.trim()),
            provider: process.env.AI_PROVIDER || 'gemini',
            correlationId,
            timestamp: new Date().toISOString()
          }));
          return;
        }

        if (req.url === '/api/recommend' && req.method === 'POST') {
          let body = '';
          let receivedBytes = 0;
          let aborted = false;

          req.on('data', chunk => {
            receivedBytes += chunk.length;
            if (receivedBytes > MAX_PAYLOAD_BYTES) {
              aborted = true;
              res.statusCode = 413;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: 'Payload Too Large. Maximum allowed size is 512KB.',
                correlationId
              }));
              req.destroy();
              return;
            }
            body += chunk;
          });

          req.on('end', async () => {
            if (aborted) return;

            try {
              const parsed = JSON.parse(body || '{}');
              const validation = validateRecommendPayload(parsed);

              if (!validation.valid) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  error: validation.error || 'Invalid recommendation payload.',
                  correlationId
                }));
                return;
              }

              const { userProfile, events } = validation.sanitized;
              const apiKey = process.env.AI_API_KEY ? process.env.AI_API_KEY.trim() : '';

              if (!apiKey) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  source: 'local',
                  fallback: true,
                  correlationId,
                  message: 'Local personalized recommendations active (AI_API_KEY not configured).'
                }));
                return;
              }

              // Candidate scoring to reduce tokens by 80%
              const userInterests = (userProfile?.interests || []).map(i => i.toLowerCase());
              const userSkills = (userProfile?.skills || []).map(s => s.toLowerCase());

              const scoredCandidates = (events || []).map(e => {
                let prio = 0;
                const catLower = (e.category || '').toLowerCase();
                if (userInterests.some(i => catLower.includes(i) || i.includes(catLower))) prio += 3;
                if ((e.technologies || []).some(t => userSkills.includes(t.toLowerCase()))) prio += 2;
                return { event: e, prio };
              }).sort((a, b) => b.prio - a.prio).slice(0, 8).map(item => ({
                id: item.event.id,
                title: item.event.title,
                category: item.event.category,
                technologies: item.event.technologies,
                eventType: item.event.eventType,
                experienceLevel: item.event.experienceLevel
              }));

              const promptText = `
You are EventIQ's fast recommendation engine. Rank the best 4-6 matching events for the user.
User Profile:
- Interests: ${(userProfile?.interests || []).join(', ')}
- Skills: ${(userProfile?.skills || []).join(', ')}
- Experience: ${userProfile?.experienceLevel || 'Intermediate'}
- Formats: ${(userProfile?.preferredEventTypes || []).join(', ')}

Candidate Events:
${JSON.stringify(scoredCandidates)}

Rules:
1. Pick top 4-6 events from Candidate Events ONLY.
2. Give matchScore (75-99).
3. Concise 1-sentence reason (max 15 words).
4. Return STRICT JSON array ONLY, no markdown, no explanation:
[{"eventId":"event-01","matchScore":95,"reason":"Strong match for your AI and Python skills.","matchingFactors":["AI","Python"]}]
`;

              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 6000);

              const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
                method: 'POST',
                signal: controller.signal,
                headers: { 
                  'Content-Type': 'application/json',
                  'x-goog-api-key': apiKey
                },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: promptText }] }],
                  generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 450,
                    responseMimeType: "application/json"
                  }
                })
              });

              clearTimeout(timeoutId);

              if (!response.ok) {
                throw new Error(`AI API failed with status ${response.status}`);
              }

              const data = await response.json();
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
              const aiParsed = JSON.parse(cleaned);

              const validEventIds = new Set(events.map(e => e.id));
              const filteredRecommendations = (Array.isArray(aiParsed) ? aiParsed : [])
                .filter(r => r && validEventIds.has(r.eventId))
                .map(r => ({
                  eventId: r.eventId,
                  matchScore: Math.min(99, Math.max(50, Number(r.matchScore) || 85)),
                  reason: sanitizeString(r.reason || 'Recommended based on your profile.', 150),
                  matchingFactors: Array.isArray(r.matchingFactors) ? r.matchingFactors.map(f => sanitizeString(f, 30)) : []
                }));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                recommendations: filteredRecommendations,
                source: 'ai',
                fallback: false,
                correlationId
              }));
            } catch (err) {
              // Graceful deterministic fallback without leaking internal errors, file paths, or keys
              const fallbackCandidates = (events || []).slice(0, 6).map(e => ({
                eventId: e.id,
                matchScore: 88,
                reason: `Recommended based on your technical profile in ${e.category}.`,
                matchingFactors: [e.category, e.eventType]
              }));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                recommendations: fallbackCandidates,
                source: 'local',
                fallback: true,
                correlationId,
                message: 'AI recommendations are temporarily unavailable. Showing personalized recommendations based on your preferences.'
              }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
