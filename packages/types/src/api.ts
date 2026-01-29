/**
 * API-related types
 */

/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request context (injected by middleware)
 */
export interface RequestContext {
  userId: string;
  organizationId: string;
  role: string;
  requestId: string;
}

/**
 * API route handler
 */
export type RouteHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput,
  context: RequestContext
) => Promise<TOutput>;

/**
 * Webhook payload
 */
export interface WebhookPayload<T = unknown> {
  id: string;
  type: string;
  timestamp: string;
  data: T;
  metadata?: Record<string, unknown>;
}

/**
 * Rate limit info
 */
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
}
