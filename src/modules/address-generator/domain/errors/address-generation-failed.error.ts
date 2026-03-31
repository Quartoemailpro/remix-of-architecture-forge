export class AddressGenerationFailedError extends Error {
  constructor(reason: string) {
    super(`Address generation failed: ${reason}`);
    this.name = 'AddressGenerationFailedError';
  }
}
