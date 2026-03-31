import { Namespace } from '../../domain/value-objects/namespace';
import { AddressProvider } from '../../domain/services/address-generation.service';

export class MockAddressProvider implements AddressProvider {
  private counter = 0;

  generate(namespace: Namespace, _seed?: string): string {
    this.counter++;
    return `mock-${namespace.toString()}-${String(this.counter).padStart(8, '0')}`;
  }
}
