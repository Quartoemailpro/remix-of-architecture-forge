# Mixer Backend

Production-grade backend built with **Fastify**, **TypeScript**, **PostgreSQL**, and **Redis**.

## Architecture

- **Clean Architecture** with strict layer separation (domain → application → infra)
- **DDD modular design** with 6 bounded contexts
- **Privacy by design** — minimal metadata, PII redaction, short retention
- **Event-driven** communication between modules

## Quick Start

```bash
# 1. Start infrastructure
docker compose up -d

# 2. Install dependencies
npm install

# 3. Copy environment config
cp .env.example .env

# 4. Run migrations
npm run migrate

# 5. Start development server
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled production build |
| `npm test` | Run all tests |
| `npm run test:unit` | Unit tests only |
| `npm run test:integration` | Integration tests only |
| `npm run test:e2e` | E2E tests only |
| `npm run lint` | Lint with Biome |
| `npm run typecheck` | Type check without emitting |
| `npm run migrate` | Run database migrations |

## Module Map

```
blockchain-monitor → deposit-saga → liquidity-pool
                                  → address-generator
                                  → payment-scheduler
                                  → log-minimizer
```

See `docs/` for detailed architecture documentation.
