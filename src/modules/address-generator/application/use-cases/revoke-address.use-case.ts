import { AddressTokenId } from '../../domain/value-objects/address-token-id';
import { AddressGeneratorRepository } from '../../domain/repositories/address-generator.repository';
import { AddressExpiredEvent } from '../../domain/events/address-expired.event';
import { EventBus } from './generate-address.use-case';

export class RevokeAddressUseCase {
  constructor(
    private readonly repository: AddressGeneratorRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(tokenId: string): Promise<void> {
    const id = AddressTokenId.fromString(tokenId);
    const token = await this.repository.findById(id);

    if (!token) {
      throw new Error(`Address token "${tokenId}" not found.`);
    }

    token.revoke();
    await this.repository.save(token);

    this.eventBus.publish(
      new AddressExpiredEvent({
        tokenId: token.id.toString(),
        namespace: token.namespace.toString(),
        reason: 'revoked',
        occurredAt: Date.now(),
      })
    );
  }
}
