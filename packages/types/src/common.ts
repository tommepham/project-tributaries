/**
 * Common types used across all verticals
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Standard error response
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entity with organization context
 */
export interface OrganizationEntity extends BaseEntity {
  organizationId: string;
}

/**
 * Document types common across verticals
 */
export interface Document extends OrganizationEntity {
  name: string;
  mimeType: string;
  size: number;
  url: string;
  metadata?: Record<string, unknown>;
}

/**
 * File upload result
 */
export interface UploadResult {
  id: string;
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

/**
 * Job/task status
 */
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * Background job
 */
export interface Job extends BaseEntity {
  type: string;
  status: JobStatus;
  progress?: number;
  result?: unknown;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}
