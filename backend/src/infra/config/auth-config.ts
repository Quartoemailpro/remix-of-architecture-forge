import { getEnv } from './env.js';

export function getAuthConfig() {
  const env = getEnv();
  return {
    secret: env.JWT_SECRET,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
    expiry: env.JWT_EXPIRY,
  };
}
