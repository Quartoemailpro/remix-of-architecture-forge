# Security Model

- **JWT authentication** for admin endpoints
- **Role-based access control** (admin, operator, viewer)
- **Rate limiting** on all public endpoints
- **Helmet** for HTTP security headers
- **No PII storage** — enforced by domain policies
- **Namespace isolation** — prevents cross-tenant data access
- **Idempotency keys** — prevents duplicate operations
- **Distributed locks** — prevents race conditions
- **Input validation** — Zod schemas on all inputs
- **Error sanitization** — no internal details leaked to clients
