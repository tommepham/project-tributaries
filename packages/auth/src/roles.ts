/**
 * Role-based access control utilities
 */

export type Role = 'member' | 'admin' | 'owner';

export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'admin';
}

/**
 * Default role permissions
 * Verticals can extend this with domain-specific permissions
 */
export const defaultPermissions: Record<Role, Permission[]> = {
  member: [
    { resource: '*', action: 'read' },
  ],
  admin: [
    { resource: '*', action: 'read' },
    { resource: '*', action: 'write' },
  ],
  owner: [
    { resource: '*', action: 'read' },
    { resource: '*', action: 'write' },
    { resource: '*', action: 'delete' },
    { resource: '*', action: 'admin' },
  ],
};

/**
 * Check if role has permission
 */
export function checkPermission(
  role: Role,
  resource: string,
  action: Permission['action'],
  customPermissions?: Record<Role, Permission[]>
): boolean {
  const permissions = customPermissions ?? defaultPermissions;
  const rolePermissions = permissions[role] ?? [];

  return rolePermissions.some(
    (p) =>
      (p.resource === '*' || p.resource === resource) &&
      (p.action === action || p.action === 'admin')
  );
}
