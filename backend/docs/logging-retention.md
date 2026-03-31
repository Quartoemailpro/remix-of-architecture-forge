# Logging & Retention

## Retention Policy
- Default: 24 hours for operational logs
- Configurable per scope via `log_policies` table
- Maximum: 720 hours (30 days)

## Redaction
- Automatic PII pattern removal (emails, IPs, hex identifiers)
- Sensitive keys stripped: password, secret, token, authorization, cookie

## Cleanup
- `cleanup-logs` job runs hourly
- Applies retention windows per scope
- Emits `LOGS_MINIMIZED` event with count of removed entries

## Payload Minimization
- Only whitelisted fields allowed: timestamp, level, scope, action, duration, status, errorCode
