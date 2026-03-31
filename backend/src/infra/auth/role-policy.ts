export type Role = 'admin' | 'operator' | 'viewer';

export class RolePolicy {
  static isAdmin(role: string): boolean {
    return role === 'admin';
  }

  static isOperator(role: string): boolean {
    return role === 'admin' || role === 'operator';
  }

  static assertRole(actual: string, required: Role): void {
    const hierarchy: Record<Role, number> = { admin: 3, operator: 2, viewer: 1 };
    if ((hierarchy[actual as Role] ?? 0) < hierarchy[required]) {
      throw new Error(`Insufficient role: required ${required}, got ${actual}`);
    }
  }
}
