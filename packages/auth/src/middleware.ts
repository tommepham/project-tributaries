/**
 * Authentication middleware for API routes
 */

import { authMiddleware } from '@clerk/nextjs';

/**
 * Default auth middleware configuration
 * Customize per-vertical as needed
 */
export const createAuthMiddleware = (options?: {
  publicRoutes?: string[];
  ignoredRoutes?: string[];
}) => {
  return authMiddleware({
    publicRoutes: options?.publicRoutes ?? [
      '/',
      '/api/health',
      '/api/webhooks/(.*)',
    ],
    ignoredRoutes: options?.ignoredRoutes ?? [
      '/api/webhooks/(.*)',
    ],
  });
};

export const defaultAuthMiddleware = createAuthMiddleware();
