import { describe, it, expect } from 'vitest';
import { Namespace, InvalidNamespaceFormatError } from '../../../../modules/address-generator/domain/value-objects/namespace';
import { IssuanceContext, PIIDetectedError } from '../../../../modules/address-generator/domain/value-objects/issuance-context';
import { AddressExpiration } from '../../../../modules/address-generator/domain/value-objects/address-expiration';
import { AddressTokenId } from '../../../../modules/address-generator/domain/value-objects/address-token-id';
import { AddressToken } from '../../../../modules/address-generator/domain/entities/address-token.entity';
import { MinimalMetadataPolicy, ForbiddenMetadataError, PIIInMetadataError } from '../../../../modules/address-generator/domain/policies/minimal-metadata.policy';
import { NamespaceIsolationPolicy, NamespaceIsolationViolationError } from '../../../../modules/address-generator/domain/policies/namespace-isolation.policy';
import { AddressExpirationPolicy, AddressExpiredError } from '../../../../modules/address-generator/domain/policies/address-expiration.policy';
import { makeAddressGeneratorModule } from '../../../../modules/address-generator';

// ─── Namespace ───────────────────────────────────────────

describe('Namespace', () => {
  it('creates a valid namespace', () => {
    const ns = Namespace.create('bitcoin-main');
    expect(ns.toString()).toBe('bitcoin-main');
  });

  it('rejects empty string', () => {
    expect(() => Namespace.create('')).toThrow(InvalidNamespaceFormatError);
  });

  it('rejects uppercase', () => {
    expect(() => Namespace.create('Bitcoin')).toThrow(InvalidNamespaceFormatError);
  });

  it('rejects too short', () => {
    expect(() => Namespace.create('ab')).toThrow(InvalidNamespaceFormatError);
  });

  it('rejects starting with number', () => {
    expect(() => Namespace.create('1abc')).toThrow(InvalidNamespaceFormatError);
  });

  it('equality works', () => {
    expect(Namespace.create('abc').equals(Namespace.create('abc'))).toBe(true);
    expect(Namespace.create('abc').equals(Namespace.create('def'))).toBe(false);
  });
});

// ─── Metadata Policy ────────────────────────────────────

describe('MinimalMetadataPolicy', () => {
  it('allows whitelisted keys', () => {
    expect(() =>
      MinimalMetadataPolicy.enforce({
        tokenId: 'abc',
        namespace: 'test',
        controlCode: 'x1',
        createdAt: 1,
        expiresAt: 2,
        status: 'active',
      })
    ).not.toThrow();
  });

  it('rejects forbidden keys', () => {
    expect(() =>
      MinimalMetadataPolicy.enforce({ tokenId: 'x', email: 'a@b.com' } as any)
    ).toThrow(ForbiddenMetadataError);
  });

  it('rejects PII in values', () => {
    expect(() =>
      MinimalMetadataPolicy.enforce({ tokenId: 'x', namespace: 'test', controlCode: 'user@example.com', createdAt: 1, expiresAt: 2, status: 'active' })
    ).toThrow(PIIInMetadataError);
  });
});

// ─── IssuanceContext PII ────────────────────────────────

describe('IssuanceContext', () => {
  it('creates with valid data', () => {
    const ctx = IssuanceContext.create({ purpose: 'mixing', controlCode: 'ctrl-1', issuedAtEpoch: 1000 });
    expect(ctx.purpose).toBe('mixing');
  });

  it('rejects email in fields', () => {
    expect(() =>
      IssuanceContext.create({ purpose: 'user@test.com', controlCode: 'x', issuedAtEpoch: 1 })
    ).toThrow(PIIDetectedError);
  });

  it('rejects IP address', () => {
    expect(() =>
      IssuanceContext.create({ purpose: 'from 192.168.1.1', controlCode: 'x', issuedAtEpoch: 1 })
    ).toThrow(PIIDetectedError);
  });
});

// ─── Expiration ─────────────────────────────────────────

describe('AddressExpiration', () => {
  it('creates from TTL', () => {
    const exp = AddressExpiration.fromTTL(60_000, 1000);
    expect(exp.getExpiresAt()).toBe(61_000);
    expect(exp.isExpired(60_999)).toBe(false);
    expect(exp.isExpired(61_000)).toBe(true);
  });

  it('rejects non-positive TTL', () => {
    expect(() => AddressExpiration.fromTTL(0)).toThrow();
    expect(() => AddressExpiration.fromTTL(-1)).toThrow();
  });

  it('rejects TTL > 7 days', () => {
    expect(() => AddressExpiration.fromTTL(8 * 24 * 60 * 60 * 1000)).toThrow();
  });
});

// ─── Namespace Isolation ────────────────────────────────

describe('NamespaceIsolationPolicy', () => {
  it('passes for same namespace', () => {
    const ns = Namespace.create('bitcoin-main');
    expect(() => NamespaceIsolationPolicy.enforce(ns, ns)).not.toThrow();
  });

  it('fails for different namespaces', () => {
    const a = Namespace.create('bitcoin-main');
    const b = Namespace.create('ethereum-main');
    expect(() => NamespaceIsolationPolicy.enforce(a, b)).toThrow(NamespaceIsolationViolationError);
  });
});

// ─── AddressToken Entity ────────────────────────────────

describe('AddressToken', () => {
  const makeToken = (overrides: Partial<{ ttl: number; now: number }> = {}) => {
    const now = overrides.now ?? 1000;
    return AddressToken.create({
      id: AddressTokenId.create(),
      namespace: Namespace.create('test-ns'),
      issuanceContext: IssuanceContext.create({ purpose: 'test', controlCode: 'c1', issuedAtEpoch: now }),
      generatedAddress: 'addr-test-00000001',
      expiration: AddressExpiration.fromTTL(overrides.ttl ?? 60_000, now),
      createdAt: now,
    });
  };

  it('creates with active status', () => {
    expect(makeToken().status).toBe('active');
  });

  it('revokes', () => {
    const t = makeToken();
    t.revoke();
    expect(t.status).toBe('revoked');
  });

  it('cannot revoke twice', () => {
    const t = makeToken();
    t.revoke();
    expect(() => t.revoke()).toThrow();
  });

  it('detects expiration', () => {
    const t = makeToken({ ttl: 100, now: 1000 });
    expect(t.isExpired(1099)).toBe(false);
    expect(t.isExpired(1100)).toBe(true);
  });

  it('isUsable returns false when expired', () => {
    const t = makeToken({ ttl: 100, now: 1000 });
    expect(t.isUsable(1050)).toBe(true);
    expect(t.isUsable(1100)).toBe(false);
  });
});

// ─── Expiration Policy ──────────────────────────────────

describe('AddressExpirationPolicy', () => {
  it('throws on expired token', () => {
    const t = AddressToken.create({
      id: AddressTokenId.create(),
      namespace: Namespace.create('test-ns'),
      issuanceContext: IssuanceContext.create({ purpose: 'x', controlCode: 'c', issuedAtEpoch: 1 }),
      generatedAddress: 'addr-test-00000001',
      expiration: AddressExpiration.fromTTL(100, 1000),
      createdAt: 1000,
    });
    expect(() => AddressExpirationPolicy.assertUsable(t, 1100)).toThrow(AddressExpiredError);
  });
});

// ─── Full Generation Flow ───────────────────────────────

describe('GenerateAddressUseCase (integration)', () => {
  it('generates, persists, and emits event', async () => {
    const events: unknown[] = [];
    const mod = makeAddressGeneratorModule({
      providerType: 'mock',
      eventBus: { publish: (e) => events.push(e) },
    });

    const output = await mod.generateAddress.execute({
      namespace: 'test-flow',
      purpose: 'integration-test',
      controlCode: 'ctrl-01',
      ttlMs: 300_000,
    });

    expect(output.tokenId).toBeTruthy();
    expect(output.namespace).toBe('test-flow');
    expect(output.status).toBe('active');
    expect(output.generatedAddress).toContain('mock-test-flow');
    expect(events).toHaveLength(1);
    expect((events[0] as any).type).toBe('ADDRESS_GENERATED');
  });
});

// ─── Revocation Flow ────────────────────────────────────

describe('RevokeAddressUseCase (integration)', () => {
  it('revokes and emits event', async () => {
    const events: unknown[] = [];
    const mod = makeAddressGeneratorModule({
      providerType: 'mock',
      eventBus: { publish: (e) => events.push(e) },
    });

    const output = await mod.generateAddress.execute({
      namespace: 'revoke-test',
      purpose: 'test',
      controlCode: 'ctrl',
      ttlMs: 60_000,
    });

    await mod.revokeAddress.execute(output.tokenId);

    expect(events).toHaveLength(2);
    expect((events[1] as any).type).toBe('ADDRESS_EXPIRED');
    expect((events[1] as any).payload.reason).toBe('revoked');

    const meta = await mod.getAddressMetadata.execute(output.tokenId);
    expect(meta.status).toBe('revoked');
  });
});
