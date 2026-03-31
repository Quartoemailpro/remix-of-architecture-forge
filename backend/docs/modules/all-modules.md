# blockchain-monitor
## Responsibility
Watches blockchain transactions, tracks confirmations, detects and confirms deposits.
## Events Published
- `DEPOSIT_DETECTED`, `DEPOSIT_CONFIRMED`
## Events Consumed
- None (driven by poll-blockchain job)

---
# deposit-saga
## Responsibility
Orchestrates the full deposit flow with state machine transitions and compensation.
## Events Published
- `DEPOSIT_SAGA_STARTED`, `DEPOSIT_ACCEPTED`, `DEPOSIT_ROUTED`, `DEPOSIT_SAGA_FAILED`
## Events Consumed
- `DEPOSIT_DETECTED`, `DEPOSIT_CONFIRMED`, `LIQUIDITY_RESERVED`, `PAYMENT_RELEASED`

---
# liquidity-pool
## Responsibility
Manages internal liquidity reserves, allocations, and reconciliation.
## Events Published
- `LIQUIDITY_RESERVED`, `LIQUIDITY_RELEASED`

---
# log-minimizer
## Responsibility
Enforces log retention, payload minimization, and PII redaction.
## Events Published
- `LOGS_MINIMIZED`

---
# payment-scheduler
## Responsibility
Schedules delayed payments with configurable windows and priority ordering.
## Events Published
- `PAYMENT_SCHEDULED`, `PAYMENT_RELEASED`, `PAYMENT_FAILED`
