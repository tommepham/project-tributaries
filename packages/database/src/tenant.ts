/**
 * Multi-tenancy utilities
 */

import { eq } from 'drizzle-orm';
import { getDb } from './client';
import { organizations, memberships, users } from './schema';

/**
 * Get organization by Clerk org ID
 */
export async function getOrganizationByClerkId(clerkOrgId: string) {
  const db = getDb();
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.clerkOrgId, clerkOrgId))
    .limit(1);
  return result[0] ?? null;
}

/**
 * Get or create organization from Clerk webhook
 */
export async function upsertOrganization(data: {
  clerkOrgId: string;
  name: string;
  slug: string;
}) {
  const db = getDb();
  const existing = await getOrganizationByClerkId(data.clerkOrgId);

  if (existing) {
    await db
      .update(organizations)
      .set({ name: data.name, slug: data.slug, updatedAt: new Date() })
      .where(eq(organizations.id, existing.id));
    return existing;
  }

  const [created] = await db
    .insert(organizations)
    .values(data)
    .returning();

  return created;
}

/**
 * Check if user is member of organization
 */
export async function isMember(userId: string, organizationId: string): Promise<boolean> {
  const db = getDb();
  const result = await db
    .select()
    .from(memberships)
    .where(eq(memberships.userId, userId))
    .where(eq(memberships.organizationId, organizationId))
    .limit(1);
  return result.length > 0;
}

/**
 * Get user's organizations
 */
export async function getUserOrganizations(userId: string) {
  const db = getDb();
  return db
    .select({
      organization: organizations,
      role: memberships.role,
    })
    .from(memberships)
    .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
    .where(eq(memberships.userId, userId));
}

/**
 * Scope query to organization (helper for RLS-like behavior)
 */
export function withOrganization<T extends { organizationId: string }>(
  organizationId: string
) {
  return (query: T) => ({
    ...query,
    organizationId,
  });
}
