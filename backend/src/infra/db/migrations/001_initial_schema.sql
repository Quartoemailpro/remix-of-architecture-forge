-- Initial schema setup
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Address tokens
CREATE TABLE IF NOT EXISTS address_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  namespace VARCHAR(64) NOT NULL,
  purpose VARCHAR(128) NOT NULL,
  control_code VARCHAR(64) NOT NULL,
  issued_at_epoch BIGINT NOT NULL,
  generated_address TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  ttl_ms BIGINT NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'active',
  CHECK (status IN ('active', 'expired', 'revoked'))
);

CREATE INDEX idx_address_tokens_namespace ON address_tokens(namespace);
CREATE INDEX idx_address_tokens_status ON address_tokens(status);

-- Domain event outbox
CREATE TABLE IF NOT EXISTS event_outbox (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(128) NOT NULL,
  payload JSONB NOT NULL,
  occurred_at BIGINT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at BIGINT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_event_outbox_unpublished ON event_outbox(published) WHERE published = false;

-- Domain event inbox (idempotency)
CREATE TABLE IF NOT EXISTS event_inbox (
  event_id UUID PRIMARY KEY,
  event_type VARCHAR(128) NOT NULL,
  processed_at TIMESTAMP DEFAULT NOW()
);
