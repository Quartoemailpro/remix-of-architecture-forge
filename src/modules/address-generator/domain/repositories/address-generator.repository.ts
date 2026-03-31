import { AddressToken } from '../entities/address-token.entity';
import { AddressTokenId } from '../value-objects/address-token-id';
import { Namespace } from '../value-objects/namespace';

export interface AddressGeneratorRepository {
  save(token: AddressToken): Promise<void>;
  findById(id: AddressTokenId): Promise<AddressToken | null>;
  findByNamespace(namespace: Namespace): Promise<AddressToken[]>;
  delete(id: AddressTokenId): Promise<void>;
}
