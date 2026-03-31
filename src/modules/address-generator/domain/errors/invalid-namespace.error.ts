export class InvalidNamespaceError extends Error {
  constructor(namespace: string) {
    super(`Invalid namespace: "${namespace}".`);
    this.name = 'InvalidNamespaceError';
  }
}
