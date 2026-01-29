/**
 * @tributaries/database
 * Shared database utilities using Drizzle ORM
 *
 * Provides:
 * - PostgreSQL connection management
 * - pgvector integration for embeddings
 * - Common schema definitions
 * - Migration utilities
 * - Multi-tenant helpers
 */

export * from './client';
export * from './schema';
export * from './vectors';
export * from './tenant';
export * from './types';
