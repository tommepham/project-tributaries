/**
 * Shared billing types
 */

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  features: string[];
  limits: Record<string, number | null>;
}

export interface Customer {
  id: string;
  stripeCustomerId: string;
  email: string;
  name: string;
  organizationId: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  dueDate: Date | null;
  paidAt: Date | null;
  invoiceUrl: string | null;
  invoicePdf: string | null;
}
