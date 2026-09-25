/**
 * EventIQ - Input Sanitization & Anti-Injection Utilities (Isomorphic: Browser + Node.js)
 */

/**
 * Sanitizes input string: strips dangerous control characters, HTML tags, and truncates length
 * @param {any} input
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeString(input, maxLength = 100) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Strip non-printable control chars
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes string specifically for LLM prompt interpolation to neutralize Prompt Injection
 * Strips backticks, template expressions, system instruction prefixes, and prompt delimiters
 * @param {any} input
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeForPrompt(input, maxLength = 80) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[`${}\\]/g, '') // Remove backticks, template syntax, escape slashes
    .replace(/[\r\n\t]/g, ' ') // Collapse newlines and tabs to spaces to prevent delimiter breakout
    .replace(/(system|assistant|user)\s*:/gi, '') // Remove role spoofing markers
    .replace(/<[^>]*>/g, '') // Strip XML/HTML tags
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates and cleanses an array of strings
 * @param {any} arr
 * @param {number} maxItems
 * @param {number} maxItemLength
 * @returns {string[]}
 */
export function sanitizeStringArray(arr, maxItems = 20, maxItemLength = 50) {
  if (!Array.isArray(arr)) return [];
  const clean = [];
  const seen = new Set();

  for (let i = 0; i < Math.min(arr.length, maxItems); i++) {
    const item = arr[i];
    if (typeof item === 'string') {
      const sanitized = sanitizeForPrompt(item, maxItemLength);
      if (sanitized && !seen.has(sanitized.toLowerCase())) {
        seen.add(sanitized.toLowerCase());
        clean.push(sanitized);
      }
    }
  }

  return clean;
}
