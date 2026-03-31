import { AddressProvider } from '../../domain/services/address-generation.service';
import { MockAddressProvider } from './mock-address-provider';
import { DeterministicAddressProvider } from './deterministic-address-provider';

export type ProviderType = 'mock' | 'deterministic';

export class ProviderFactory {
  static create(type: ProviderType = 'deterministic'): AddressProvider {
    switch (type) {
      case 'mock':
        return new MockAddressProvider();
      case 'deterministic':
        return new DeterministicAddressProvider();
      default:
        throw new Error(`Unknown provider type: ${type}`);
    }
  }

  static fromEnvironment(): AddressProvider {
    const env = (typeof process !== 'undefined' && process.env?.ADDRESS_PROVIDER) || 'deterministic';
    return ProviderFactory.create(env as ProviderType);
  }
}
