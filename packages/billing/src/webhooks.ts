/**
 * Stripe webhook handling
 */

import type Stripe from 'stripe';
import { getStripe } from './stripe';

/**
 * Verify and construct webhook event
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

/**
 * Webhook event types we care about
 */
export const BILLING_EVENTS = {
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  INVOICE_PAID: 'invoice.paid',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
  CHECKOUT_COMPLETED: 'checkout.session.completed',
} as const;

export type BillingEventType = (typeof BILLING_EVENTS)[keyof typeof BILLING_EVENTS];

/**
 * Type-safe webhook handler registration
 */
export type WebhookHandler<T = unknown> = (data: T) => Promise<void>;

export interface WebhookHandlers {
  [BILLING_EVENTS.SUBSCRIPTION_CREATED]?: WebhookHandler<Stripe.Subscription>;
  [BILLING_EVENTS.SUBSCRIPTION_UPDATED]?: WebhookHandler<Stripe.Subscription>;
  [BILLING_EVENTS.SUBSCRIPTION_DELETED]?: WebhookHandler<Stripe.Subscription>;
  [BILLING_EVENTS.INVOICE_PAID]?: WebhookHandler<Stripe.Invoice>;
  [BILLING_EVENTS.INVOICE_PAYMENT_FAILED]?: WebhookHandler<Stripe.Invoice>;
  [BILLING_EVENTS.CHECKOUT_COMPLETED]?: WebhookHandler<Stripe.Checkout.Session>;
}

/**
 * Process webhook event with registered handlers
 */
export async function processWebhookEvent(
  event: Stripe.Event,
  handlers: WebhookHandlers
): Promise<void> {
  const handler = handlers[event.type as BillingEventType];
  if (handler) {
    await handler(event.data.object);
  }
}
