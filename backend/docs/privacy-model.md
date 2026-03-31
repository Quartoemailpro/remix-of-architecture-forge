# Privacy Model

- **Minimal metadata only** — enforced by `MinimalMetadataPolicy`
- **PII detection** — regex-based rejection of emails, IPs, wallet identifiers
- **Log redaction** — automatic PII scrubbing via `redact()` utility
- **Short retention** — configurable per-scope via `RetentionPolicy`
- **No user identity storage** — all operations are namespace-scoped, not user-scoped
- **Issuance context** — contains only purpose, control code, and timestamp
