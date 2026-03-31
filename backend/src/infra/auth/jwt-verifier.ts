import { getAuthConfig } from '../config/auth-config.js';

export interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export class JwtVerifier {
  private config = getAuthConfig();

  async verify(token: string): Promise<JwtPayload> {
    // In production, use @fastify/jwt's verify. This is a structural placeholder.
    // The actual verification happens via Fastify's jwt plugin.
    throw new Error('Use Fastify JWT plugin for verification. This is a fallback.');
  }
}
