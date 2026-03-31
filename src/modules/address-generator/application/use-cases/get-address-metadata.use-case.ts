import { AddressTokenId } from '../../domain/value-objects/address-token-id';
import { AddressGeneratorRepository } from '../../domain/repositories/address-generator.repository';
import { AddressTokenMapper } from '../mappers/address-token.mapper';
import { MinimalMetadataPolicy } from '../../domain/policies/minimal-metadata.policy';

export class GetAddressMetadataUseCase {
  constructor(private readonly repository: AddressGeneratorRepository) {}

  async execute(tokenId: string): Promise<Record<string, unknown>> {
    const id = AddressTokenId.fromString(tokenId);
    const token = await this.repository.findById(id);

    if (!token) {
      throw new Error(`Address token "${tokenId}" not found.`);
    }

    const metadata = AddressTokenMapper.toSafeMetadata(token);

    // Final enforcement: ensure output passes policy
    MinimalMetadataPolicy.enforce(metadata);

    return metadata;
  }
}
