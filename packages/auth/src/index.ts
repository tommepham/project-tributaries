/**
 * @tributaries/auth
 * Shared authentication module for all verticals
 *
 * Provides:
 * - Clerk integration for user auth
 * - Organization/tenant management
 * - Role-based access control
 * - API authentication helpers
 */

export * from './clerk';
export * from './middleware';
export * from './roles';
export * from './types';
