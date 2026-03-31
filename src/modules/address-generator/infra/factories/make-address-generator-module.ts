import { PgAddressGeneratorRepository } from '../persistence/pg-address-generator.repository';
import { ProviderFactory, ProviderType } from '../providers/provider-factory';
import { AddressGenerationService } from '../../domain/services/address-generation.service';
import { GenerateAddressUseCase, EventBus } from '../../application/use-cases/generate-address.use-case';
import { RevokeAddressUseCase } from '../../application/use-cases/revoke-address.use-case';
import { GetAddressMetadataUseCase } from '../../application/use-cases/get-address-metadata.use-case';

export interface AddressGeneratorModule {
  generateAddress: GenerateAddressUseCase;
  revokeAddress: RevokeAddressUseCase;
  getAddressMetadata: GetAddressMetadataUseCase;
}

export interface AddressGeneratorModuleConfig {
  providerType?: ProviderType;
  eventBus: EventBus;
}

export function makeAddressGeneratorModule(
  config: AddressGeneratorModuleConfig
): AddressGeneratorModule {
  const repository = new PgAddressGeneratorRepository();
  const provider = ProviderFactory.create(config.providerType ?? 'deterministic');
  const generationService = new AddressGenerationService(provider);

  return {
    generateAddress: new GenerateAddressUseCase(repository, generationService, config.eventBus),
    revokeAddress: new RevokeAddressUseCase(repository, config.eventBus),
    getAddressMetadata: new GetAddressMetadataUseCase(repository),
  };
}
