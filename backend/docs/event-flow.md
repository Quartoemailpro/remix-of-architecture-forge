# Event Flow

## Domain Events

| Event | Producer | Consumers |
|-------|----------|-----------|
| DEPOSIT_DETECTED | blockchain-monitor | deposit-saga |
| DEPOSIT_CONFIRMED | blockchain-monitor | deposit-saga |
| DEPOSIT_SAGA_STARTED | deposit-saga | log-minimizer |
| LIQUIDITY_RESERVED | liquidity-pool | deposit-saga |
| LIQUIDITY_RELEASED | liquidity-pool | deposit-saga |
| ADDRESS_GENERATED | address-generator | deposit-saga |
| PAYMENT_SCHEDULED | payment-scheduler | deposit-saga |
| PAYMENT_RELEASED | payment-scheduler | deposit-saga, log-minimizer |
| PAYMENT_FAILED | payment-scheduler | deposit-saga |
| LOGS_MINIMIZED | log-minimizer | — |

## Outbox Pattern
Events are persisted to `event_outbox` before publishing, ensuring at-least-once delivery.
The `event_inbox` table provides idempotency for consumers.
