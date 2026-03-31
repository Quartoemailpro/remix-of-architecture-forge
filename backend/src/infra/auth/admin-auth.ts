import type { FastifyRequest, FastifyReply } from 'fastify';
import { RolePolicy } from './role-policy.js';

export async function adminAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
    const user = request.user as { role?: string };
    RolePolicy.assertRole(user.role ?? 'viewer', 'admin');
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
}
