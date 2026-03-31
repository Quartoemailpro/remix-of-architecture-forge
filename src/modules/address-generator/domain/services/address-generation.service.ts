import { Namespace } from '../value-objects/namespace';

export interface AddressProvider {
  generate(namespace: Namespace, seed?: string): string;
}

export class AddressGenerationService {
  constructor(private readonly provider: AddressProvider) {}

  generate(namespace: Namespace, seed?: string): string {
    const address = this.provider.generate(namespace, seed);
    if (!address || address.length < 10) {
      throw new Error('Address provider returned an invalid address.');
    }
    return address;
  }
}
