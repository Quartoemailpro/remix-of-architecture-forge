-- Blockchain monitor tables
CREATE TABLE IF NOT EXISTS monitored_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  txid VARCHAR(64) NOT NULL UNIQUE,
  namespace VARCHAR(64) NOT NULL,
  expected_amount BIGINT,
  confirmations INTEGER NOT NULL DEFAULT 0,
  required_confirmations INTEGER NOT NULL DEFAULT 3,
  status VARCHAR(16) NOT NULL DEFAULT 'pending',
  detected_at BIGINT,
  confirmed_at BIGINT,
  created_at BIGINT NOT NULL,
  CHECK (status IN ('pending', 'detected', 'confirmed', 'failed'))
);

CREATE INDEX idx_monitored_tx_status ON monitored_transactions(status);

-- Deposit saga
CREATE TABLE IF NOT EXISTS deposit_sagas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  namespace VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'initiated',
  current_step VARCHAR(64),
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  completed_at BIGINT,
  failed_at BIGINT,
  failure_reason TEXT,
  compensation_status VARCHAR(16) DEFAULT 'none',
  metadata JSONB DEFAULT '{}',
  CHECK (status IN ('initiated', 'deposit_detected', 'liquidity_reserved', 'address_generated', 'payment_scheduled', 'completed', 'failed', 'compensating', 'compensated'))
);

-- Liquidity pool
CREATE TABLE IF NOT EXISTS liquidity_pools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_balance BIGINT NOT NULL DEFAULT 0,
  available_balance BIGINT NOT NULL DEFAULT 0,
  reserved_balance BIGINT NOT NULL DEFAULT 0,
  updated_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS pool_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pool_id UUID NOT NULL REFERENCES liquidity_pools(id),
  amount BIGINT NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'reserved',
  reserved_at BIGINT NOT NULL,
  released_at BIGINT,
  CHECK (status IN ('reserved', 'released', 'expired'))
);

-- Scheduled payments
CREATE TABLE IF NOT EXISTS scheduled_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  namespace VARCHAR(64) NOT NULL,
  amount BIGINT NOT NULL,
  destination_address TEXT NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'scheduled',
  priority INTEGER NOT NULL DEFAULT 0,
  scheduled_at BIGINT NOT NULL,
  execute_after BIGINT NOT NULL,
  execute_before BIGINT NOT NULL,
  executed_at BIGINT,
  failed_at BIGINT,
  failure_reason TEXT,
  CHECK (status IN ('scheduled', 'executing', 'completed', 'failed'))
);

CREATE INDEX idx_scheduled_payments_status ON scheduled_payments(status);

-- Log policies
CREATE TABLE IF NOT EXISTS log_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scope VARCHAR(64) NOT NULL UNIQUE,
  retention_hours INTEGER NOT NULL DEFAULT 24,
  redaction_rules JSONB DEFAULT '[]',
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);
