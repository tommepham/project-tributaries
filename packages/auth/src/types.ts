/**
 * Shared authentication types
 */

export interface Session {
  userId: string;
  organizationId: string | null;
  role: string;
  expiresAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  metadata: Record<string, unknown>;
}

export interface Invitation {
  id: string;
  email: string;
  organizationId: string;
  role: string;
  status: 'pending' | 'accepted' | 'revoked';
  expiresAt: Date;
}
