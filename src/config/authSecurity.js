/**
 * EventIQ - Production Cryptography, JWT & Payload Validation Module (Node.js Server)
 * 
 * Provides:
 * 1. Cryptographically secure JWT issuing and verification (HMAC-SHA256)
 * 2. Timing-safe equality checks to eliminate timing attacks
 * 3. Strict schema validation and sanitization (XSS & Prompt Injection defense)
 * 4. Role-based Access Control (RBAC) middleware
 */

import crypto from 'crypto';
import { sanitizeString, sanitizeForPrompt, sanitizeStringArray } from '../utils/sanitize.js';

export { sanitizeString, sanitizeForPrompt, sanitizeStringArray };

// Base64URL encoding / decoding helpers
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Creates a cryptographically signed JWT token
 * @param {Object} payload - Token claims (e.g. { sub: 'user_123', role: 'user' })
 * @param {string} secret - Secret key (minimum 32 characters)
 * @param {number} expiresInSeconds - Lifetime in seconds (default: 3600 = 1 hour)
 * @returns {string} - JWT Token
 */
export function signJwt(payload, secret, expiresInSeconds = 3600) {
  if (!secret || secret.length < 32) {
    throw new Error('JWT Secret must be at least 32 characters long.');
  }

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
    nbf: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${dataToSign}.${signature}`;
}

/**
 * Validates and decodes a JWT token with strict verification:
 * - Checks 3-part structure
 * - Rejects 'none' algorithm
 * - Enforces HMAC-SHA256 signature verification via timing-safe comparison
 * - Checks expiration (exp) and not-before (nbf) claims
 * @param {string} token - Raw JWT string
 * @param {string} secret - Secret key (minimum 32 characters)
 * @returns {{ valid: boolean, payload?: Object, error?: string }}
 */
export function verifyJwt(token, secret) {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token missing or invalid type.' };
  }

  if (!secret || secret.length < 32) {
    return { valid: false, error: 'Server authentication secret is improperly configured.' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed JWT structure.' };
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  try {
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    
    // Strict algorithm enforcement: reject 'none' or unsupported algs
    if (header.alg !== 'HS256') {
      return { valid: false, error: `Unsupported or insecure algorithm: ${header.alg}` };
    }

    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(dataToSign)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    // Constant-time signature comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return { valid: false, error: 'Invalid token signature.' };
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    // Expiration check
    if (typeof payload.exp === 'number' && now >= payload.exp) {
      return { valid: false, error: 'Token has expired.' };
    }

    // Not before check
    if (typeof payload.nbf === 'number' && now < payload.nbf) {
      return { valid: false, error: 'Token not yet active.' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: 'Corrupt token payload or header.' };
  }
}

/**
 * Validates recommendation request payload
 * Enforces strict schemas and reasonable limits to prevent DoS & memory exhaustion
 * @param {Object} body
 * @returns {{ valid: boolean, error?: string, sanitized?: Object }}
 */
export function validateRecommendPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, error: 'Request body must be a valid JSON object.' };
  }

  const { userProfile, events } = body;

  if (!events || !Array.isArray(events) || events.length === 0) {
    return { valid: false, error: 'Events dataset is required and must be a non-empty array.' };
  }

  if (events.length > 100) {
    return { valid: false, error: 'Events dataset exceeds maximum limit of 100 items.' };
  }

  // Sanitize userProfile
  const sanitizedProfile = {
    interests: sanitizeStringArray(userProfile?.interests, 15, 40),
    skills: sanitizeStringArray(userProfile?.skills, 25, 40),
    experienceLevel: ['Beginner', 'Intermediate', 'Advanced'].includes(userProfile?.experienceLevel)
      ? userProfile.experienceLevel
      : 'Intermediate',
    preferredEventTypes: sanitizeStringArray(userProfile?.preferredEventTypes, 10, 30),
    preferredMode: ['In-person', 'Online', 'Both'].includes(userProfile?.preferredMode)
      ? userProfile.preferredMode
      : 'Both',
    location: sanitizeForPrompt(userProfile?.location || '', 60),
    viewedEvents: sanitizeStringArray(userProfile?.viewedEvents, 50, 30),
    savedEvents: sanitizeStringArray(userProfile?.savedEvents, 50, 30),
  };

  // Sanitize events
  const sanitizedEvents = [];
  for (const e of events) {
    if (!e || typeof e !== 'object') continue;
    if (!e.id || typeof e.id !== 'string') continue;

    sanitizedEvents.push({
      id: sanitizeString(e.id, 40),
      title: sanitizeForPrompt(e.title || '', 120),
      category: sanitizeForPrompt(e.category || '', 50),
      organizer: sanitizeForPrompt(e.organizer || '', 80),
      technologies: sanitizeStringArray(e.technologies, 15, 30),
      eventType: sanitizeForPrompt(e.eventType || '', 40),
      experienceLevel: sanitizeForPrompt(e.experienceLevel || 'All Levels', 30),
      location: sanitizeForPrompt(e.location || '', 80),
      mode: sanitizeForPrompt(e.mode || 'Both', 20),
      popularity: typeof e.popularity === 'number' ? Math.min(100, Math.max(0, e.popularity)) : 80,
    });
  }

  if (sanitizedEvents.length === 0) {
    return { valid: false, error: 'No valid event items found in request.' };
  }

  return {
    valid: true,
    sanitized: {
      userProfile: sanitizedProfile,
      events: sanitizedEvents,
    },
  };
}
