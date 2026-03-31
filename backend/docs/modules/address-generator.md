# address-generator

## Responsibility
Generates deterministic, namespace-isolated address tokens with minimal metadata and strict expiration.

## Events Published
- `ADDRESS_GENERATED` — when a new address token is created
- `ADDRESS_EXPIRED` — when a token expires or is revoked

## Events Consumed
- None (triggered by deposit-saga via use case calls)

## Allowed Dependencies
- `shared/domain`, `shared/application/ports`

## Risks
- Provider failure → `AddressGenerationFailedError`
- Namespace collision → prevented by `NamespaceIsolationPolicy`
