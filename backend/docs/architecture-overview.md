# Architecture Overview

## Layers

```
API (HTTP) → Application (Use Cases) → Domain (Entities/Policies) ← Infra (Adapters)
```

- **Domain**: Pure business logic. No framework dependencies. Entities, value objects, policies, events.
- **Application**: Use cases orchestrating domain logic via ports.
- **Infrastructure**: Adapters for PostgreSQL, Redis, blockchain providers, logging.
- **API**: HTTP routes, schemas (Zod), presenters. No business logic.

## Module Map

```
blockchain-monitor → (DEPOSIT_DETECTED, DEPOSIT_CONFIRMED)
       ↓
deposit-saga → orchestrates:
       ├→ liquidity-pool (reserve/release)
       ├→ address-generator (generate/revoke)
       ├→ payment-scheduler (schedule/release)
       └→ log-minimizer (redact/cleanup)
```

## Key Principles

- **Privacy by architecture**: No PII stored. Minimal metadata. Automatic redaction.
- **Namespace isolation**: All operations scoped to a namespace. No cross-leakage.
- **Event-driven**: Modules communicate via domain events through an EventBus.
- **Deterministic**: Address generation is reproducible given namespace + seed.
- **Compensatable**: Deposit saga supports rollback via compensation policies.
