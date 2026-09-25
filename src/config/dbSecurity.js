/**
 * EventIQ - Database Security & Hardening Module
 * Enforces production security standards for database connections:
 * 1. Mandatory TLS/SSL encryption in production.
 * 2. Rejection of default or weak credentials.
 * 3. Prevention of exposed unauthenticated connections.
 */

const FORBIDDEN_PASSWORDS = new Set([
  'postgres', 'password', 'password123', 'admin', 'root',
  '123456', '12345678', 'test', 'secret', 'changeme', 'master'
]);

const FORBIDDEN_USERNAMES = new Set(['admin', 'root', 'test']);

/**
 * Validates database connection strings against enterprise security standards
 * @param {string} connectionString - PostgreSQL, MongoDB, or MySQL connection URL
 * @param {string} env - 'production' | 'development' | 'test'
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateDatabaseSecurity(connectionString, env = 'production') {
  const errors = [];

  if (!connectionString || typeof connectionString !== 'string') {
    return { valid: true, errors: [] }; // No external database connected; static/in-memory catalog active
  }

  const isProduction = env === 'production';

  try {
    const url = new URL(connectionString);

    // 1. TLS / SSL Validation
    if (isProduction) {
      const isPostgres = url.protocol === 'postgres:' || url.protocol === 'postgresql:';
      const isMongo = url.protocol === 'mongodb:' || url.protocol === 'mongodb+srv:';
      const isMysql = url.protocol === 'mysql:';

      const searchParams = url.searchParams;
      const sslMode = searchParams.get('sslmode');
      const ssl = searchParams.get('ssl');
      const tls = searchParams.get('tls');

      let hasTls = false;
      if (isMongo && url.protocol === 'mongodb+srv:') {
        hasTls = true; // mongodb+srv implies TLS
      } else if (sslMode === 'require' || sslMode === 'verify-full' || sslMode === 'verify-ca') {
        hasTls = true;
      } else if (ssl === 'true' || tls === 'true') {
        hasTls = true;
      }

      if (!hasTls) {
        errors.push('Database connection must enforce TLS/SSL encryption in production (e.g. sslmode=require or tls=true).');
      }
    }

    // 2. Authentication & Credential Strength Check
    const username = (url.username || '').toLowerCase();
    const password = url.password || '';

    if (!username) {
      errors.push('Database connection URL must include an authenticated username (unauthenticated access is forbidden).');
    }

    if (!password) {
      errors.push('Database connection URL must include a non-empty password (unauthenticated access is forbidden).');
    }

    if (password && FORBIDDEN_PASSWORDS.has(password.toLowerCase())) {
      errors.push(`Database connection uses an insecure default password ('${password}'). Use a strong, generated secret.`);
    }

    if (password && password.length < 12 && isProduction) {
      errors.push('Database password must be at least 12 characters long in production.');
    }

    // 3. Port & Host Security
    const hostname = url.hostname.toLowerCase();
    if (hostname === '0.0.0.0') {
      errors.push('Database connection hostname cannot bind to 0.0.0.0.');
    }

  } catch (err) {
    errors.push('Invalid database connection string format.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export default { validateDatabaseSecurity };
