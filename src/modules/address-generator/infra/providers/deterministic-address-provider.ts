import { Namespace } from '../../domain/value-objects/namespace';
import { AddressProvider } from '../../domain/services/address-generation.service';

/**
 * Generates a reproducible address based on namespace + seed.
 * Uses a simple hash-like approach for determinism without crypto dependencies.
 */
export class DeterministicAddressProvider implements AddressProvider {
  generate(namespace: Namespace, seed?: string): string {
    const input = `${namespace.toString()}:${seed ?? 'default'}`;
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash + char) | 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `addr-${namespace.toString()}-${hex}${hex}${hex.slice(0, 4)}`;
  }
}
