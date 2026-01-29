/**
 * Event tracking utilities
 */

import { PostHog } from 'posthog-node';

let posthogClient: PostHog | null = null;

function getPostHog(): PostHog | null {
  if (!posthogClient && process.env.POSTHOG_API_KEY) {
    posthogClient = new PostHog(process.env.POSTHOG_API_KEY, {
      host: process.env.POSTHOG_HOST ?? 'https://app.posthog.com',
    });
  }
  return posthogClient;
}

export interface TrackingContext {
  userId?: string;
  organizationId?: string;
  vertical?: string;
}

/**
 * Track an event
 */
export function track(
  event: string,
  properties?: Record<string, unknown>,
  context?: TrackingContext
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  posthog.capture({
    distinctId: context?.userId ?? 'anonymous',
    event,
    properties: {
      ...properties,
      organizationId: context?.organizationId,
      vertical: context?.vertical,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Identify a user
 */
export function identify(
  userId: string,
  traits?: Record<string, unknown>
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  posthog.identify({
    distinctId: userId,
    properties: traits,
  });
}

/**
 * Track page view
 */
export function page(
  name: string,
  properties?: Record<string, unknown>,
  context?: TrackingContext
): void {
  track('$pageview', { ...properties, pageName: name }, context);
}

/**
 * Standard event names for consistency
 */
export const EVENTS = {
  // User events
  USER_SIGNED_UP: 'user_signed_up',
  USER_LOGGED_IN: 'user_logged_in',
  USER_INVITED: 'user_invited',

  // Subscription events
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_UPGRADED: 'subscription_upgraded',
  SUBSCRIPTION_DOWNGRADED: 'subscription_downgraded',
  SUBSCRIPTION_CANCELED: 'subscription_canceled',

  // Feature usage
  FEATURE_USED: 'feature_used',
  DOCUMENT_UPLOADED: 'document_uploaded',
  DOCUMENT_PROCESSED: 'document_processed',
  WORKFLOW_EXECUTED: 'workflow_executed',

  // Experiment events
  EXPERIMENT_VIEWED: 'experiment_viewed',
  EXPERIMENT_CONVERTED: 'experiment_converted',
} as const;

/**
 * Flush events (call on shutdown)
 */
export async function flush(): Promise<void> {
  const posthog = getPostHog();
  if (posthog) {
    await posthog.shutdown();
  }
}
