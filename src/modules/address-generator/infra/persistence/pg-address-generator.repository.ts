import { AddressToken } from '../../domain/entities/address-token.entity';
import { AddressTokenId } from '../../domain/value-objects/address-token-id';
import { Namespace } from '../../domain/value-objects/namespace';
import { AddressGeneratorRepository } from '../../domain/repositories/address-generator.repository';
import { AddressGeneratorRepositoryMapper } from './address-generator.repository.mapper';
import { AddressTokenRecord } from './address-token.record';

/**
 * PostgreSQL implementation of AddressGeneratorRepository.
 * In a real deployment, this would use a pg client/pool.
 * Currently uses an in-memory Map as a stand-in for the actual SQL layer,
 * making it runnable without a live database while preserving the contract.
 */
export class PgAddressGeneratorRepository implements AddressGeneratorRepository {
  private store = new Map<string, AddressTokenRecord>();

  async save(token: AddressToken): Promise<void> {
    const record = AddressGeneratorRepositoryMapper.toPersistence(token);
    // In production: INSERT ... ON CONFLICT (id) DO UPDATE ...
    this.store.set(record.id, record);
  }

  async findById(id: AddressTokenId): Promise<AddressToken | null> {
    const record = this.store.get(id.toString());
    if (!record) return null;
    return AddressGeneratorRepositoryMapper.toDomain(record);
  }

  async findByNamespace(namespace: Namespace): Promise<AddressToken[]> {
    const ns = namespace.toString();
    const results: AddressToken[] = [];
    for (const record of this.store.values()) {
      if (record.namespace === ns) {
        results.push(AddressGeneratorRepositoryMapper.toDomain(record));
      }
    }
    return results;
  }

  async delete(id: AddressTokenId): Promise<void> {
    this.store.delete(id.toString());
  }
}
