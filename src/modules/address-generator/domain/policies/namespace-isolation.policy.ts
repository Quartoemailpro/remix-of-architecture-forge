import { Namespace } from '../value-objects/namespace';

/**
 * Enforces strict isolation between namespaces.
 * An operation scoped to namespace A must NEVER access tokens from namespace B.
 */
export class NamespaceIsolationPolicy {
  static enforce(requestedNamespace: Namespace, tokenNamespace: Namespace): void {
    if (!requestedNamespace.equals(tokenNamespace)) {
      throw new NamespaceIsolationViolationError(
        requestedNamespace.toString(),
        tokenNamespace.toString()
      );
    }
  }
}

export class NamespaceIsolationViolationError extends Error {
  constructor(requested: string, actual: string) {
    super(
      `Namespace isolation violation: requested "${requested}" but token belongs to "${actual}".`
    );
    this.name = 'NamespaceIsolationViolationError';
  }
}
