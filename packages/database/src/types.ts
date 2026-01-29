/**
 * Database types
 */

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface VectorSearchOptions {
  embedding: number[];
  limit?: number;
  threshold?: number;
  filters?: Record<string, unknown>;
}

export interface AuditLogEntry {
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  userId?: string;
  organizationId: string;
}
