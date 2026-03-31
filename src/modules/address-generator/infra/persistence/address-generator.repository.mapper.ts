import { AddressToken } from '../../domain/entities/address-token.entity';
import { AddressTokenId } from '../../domain/value-objects/address-token-id';
import { Namespace } from '../../domain/value-objects/namespace';
import { IssuanceContext } from '../../domain/value-objects/issuance-context';
import { AddressExpiration } from '../../domain/value-objects/address-expiration';
import { AddressTokenRecord } from './address-token.record';

export class AddressGeneratorRepositoryMapper {
  static toPersistence(entity: AddressToken): AddressTokenRecord {
    return {
      id: entity.id.toString(),
      namespace: entity.namespace.toString(),
      purpose: entity.issuanceContext.purpose,
      control_code: entity.issuanceContext.controlCode,
      issued_at_epoch: entity.issuanceContext.issuedAtEpoch,
      generated_address: entity.generatedAddress,
      created_at: entity.createdAt,
      expires_at: entity.expiration.getExpiresAt(),
      ttl_ms: entity.expiration.getTTL(),
      status: entity.status,
    };
  }

  static toDomain(record: AddressTokenRecord): AddressToken {
    return AddressToken.reconstitute({
      id: AddressTokenId.fromString(record.id),
      namespace: Namespace.create(record.namespace),
      issuanceContext: IssuanceContext.create({
        purpose: record.purpose,
        controlCode: record.control_code,
        issuedAtEpoch: record.issued_at_epoch,
      }),
      generatedAddress: record.generated_address,
      createdAt: record.created_at,
      expiration: AddressExpiration.fromTimestamp(record.expires_at, record.ttl_ms),
      status: record.status,
    });
  }
}
