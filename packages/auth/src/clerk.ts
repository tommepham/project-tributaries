/**
 * Clerk authentication utilities
 */

import { auth, currentUser } from '@clerk/nextjs';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  organizationId: string | null;
  role: string;
}

/**
 * Get the current authenticated user with organization context
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const user = await currentUser();
  if (!user) return null;

  const { orgId, orgRole } = auth();

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? '',
    firstName: user.firstName,
    lastName: user.lastName,
    organizationId: orgId ?? null,
    role: orgRole ?? 'member',
  };
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthUser, requiredRole: string): boolean {
  const roleHierarchy = ['member', 'admin', 'owner'];
  const userRoleIndex = roleHierarchy.indexOf(user.role);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
  return userRoleIndex >= requiredRoleIndex;
}
