import { ConfirmationCount } from '../value-objects/confirmation-count.js';

export class ConfirmationThresholdPolicy {
  static isMet(count: ConfirmationCount): boolean {
    return count.isSufficient();
  }

  static assertMet(count: ConfirmationCount): void {
    if (!count.isSufficient()) {
      throw new Error(`Confirmation threshold not met: ${count.current}/${count.required}`);
    }
  }
}
