import { AddressTokenId } from '../../domain/value-objects/address-token-id';
import { Namespace } from '../../domain/value-objects/namespace';
import { IssuanceContext } from '../../domain/value-objects/issuance-context';
import { AddressExpiration } from '../../domain/value-objects/address-expiration';
import { AddressToken } from '../../domain/entities/address-token.entity';
import { AddressGenerationService } from '../../domain/services/address-generation.service';
import { AddressGeneratorRepository } from '../../domain/repositories/address-generator.repository';
import { MinimalMetadataPolicy } from '../../domain/policies/minimal-metadata.policy';
import { AddressGeneratedEvent } from '../../domain/events/address-generated.event';
import { AddressGenerationFailedError } from '../../domain/errors/address-generation-failed.error';
import { GenerateAddressInput } from '../dto/generate-address.input';
import { GenerateAddressOutput } from '../dto/generate-address.output';
import { AddressTokenMapper } from '../mappers/address-token.mapper';

export interface EventBus {
  publish(event: unknown): void;
}

export class GenerateAddressUseCase {
  constructor(
    private readonly repository: AddressGeneratorRepository,
    private readonly generationService: AddressGenerationService,
    private readonly eventBus: EventBus
  ) {}

  async execute(input: GenerateAddressInput): Promise<GenerateAddressOutput> {
    // 1. Validate & create value objects
    const namespace = Namespace.create(input.namespace);
    const now = Date.now();

    const issuanceContext = IssuanceContext.create({
      purpose: input.purpose,
      controlCode: input.controlCode,
      issuedAtEpoch: now,
    });

    const expiration = AddressExpiration.fromTTL(input.ttlMs, now);

    // 2. Apply metadata policy on what will be stored
    const metadataPreview: Record<string, unknown> = {
      tokenId: 'pending',
      namespace: input.namespace,
      controlCode: input.controlCode,
      purpose: input.purpose,
      createdAt: now,
      expiresAt: expiration.getExpiresAt(),
      status: 'active',
    };
    MinimalMetadataPolicy.enforce(metadataPreview);

    // 3. Generate address via domain service
    let generatedAddress: string;
    try {
      generatedAddress = this.generationService.generate(namespace, input.seed);
    } catch (err) {
      throw new AddressGenerationFailedError(
        err instanceof Error ? err.message : 'Unknown provider error'
      );
    }

    // 4. Create entity
    const id = AddressTokenId.create();
    const token = AddressToken.create({
      id,
      namespace,
      issuanceContext,
      generatedAddress,
      expiration,
      createdAt: now,
    });

    // 5. Persist
    await this.repository.save(token);

    // 6. Emit event
    this.eventBus.publish(
      new AddressGeneratedEvent({
        tokenId: id.toString(),
        namespace: namespace.toString(),
        controlCode: input.controlCode,
        createdAt: now,
        expiresAt: expiration.getExpiresAt(),
      })
    );

    // 7. Return safe output
    return AddressTokenMapper.toOutput(token);
  }
}
