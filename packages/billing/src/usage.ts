/**
 * Usage-based billing utilities
 */

import { getStripe } from './stripe';

/**
 * Report usage for metered billing
 */
export async function reportUsage(params: {
  subscriptionItemId: string;
  quantity: number;
  timestamp?: Date;
  action?: 'increment' | 'set';
}): Promise<void> {
  const stripe = getStripe();

  await stripe.subscriptionItems.createUsageRecord(params.subscriptionItemId, {
    quantity: params.quantity,
    timestamp: params.timestamp
      ? Math.floor(params.timestamp.getTime() / 1000)
      : 'now',
    action: params.action ?? 'increment',
  });
}

/**
 * Get current usage for a subscription item
 */
export async function getUsageSummary(subscriptionItemId: string) {
  const stripe = getStripe();

  const summary = await stripe.subscriptionItems.listUsageRecordSummaries(
    subscriptionItemId,
    { limit: 1 }
  );

  return summary.data[0] ?? null;
}

/**
 * Usage tracking for common vertical metrics
 */
export interface UsageMetric {
  name: string;
  unit: string;
  currentValue: number;
  limit: number | null;
}

export function checkUsageLimit(metric: UsageMetric): boolean {
  if (metric.limit === null) return true;
  return metric.currentValue < metric.limit;
}
