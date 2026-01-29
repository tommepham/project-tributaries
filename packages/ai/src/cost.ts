/**
 * AI cost tracking utilities
 */

export interface ModelPricing {
  inputPer1kTokens: number;
  outputPer1kTokens: number;
}

export const PRICING: Record<string, ModelPricing> = {
  'gpt-4': { inputPer1kTokens: 0.03, outputPer1kTokens: 0.06 },
  'gpt-4-turbo': { inputPer1kTokens: 0.01, outputPer1kTokens: 0.03 },
  'gpt-3.5-turbo': { inputPer1kTokens: 0.0005, outputPer1kTokens: 0.0015 },
  'claude-3-opus': { inputPer1kTokens: 0.015, outputPer1kTokens: 0.075 },
  'claude-3-sonnet': { inputPer1kTokens: 0.003, outputPer1kTokens: 0.015 },
  'text-embedding-3-small': { inputPer1kTokens: 0.00002, outputPer1kTokens: 0 },
  'text-embedding-3-large': { inputPer1kTokens: 0.00013, outputPer1kTokens: 0 },
};

export interface UsageRecord {
  model: string;
  inputTokens: number;
  outputTokens: number;
  timestamp: Date;
  vertical: string;
  operation: string;
}

/**
 * Calculate cost for a usage record
 */
export function calculateCost(record: UsageRecord): number {
  const pricing = PRICING[record.model];
  if (!pricing) return 0;

  return (
    (record.inputTokens / 1000) * pricing.inputPer1kTokens +
    (record.outputTokens / 1000) * pricing.outputPer1kTokens
  );
}

/**
 * Simple in-memory usage tracker
 * Replace with database storage for production
 */
export class UsageTracker {
  private records: UsageRecord[] = [];

  record(usage: Omit<UsageRecord, 'timestamp'>): void {
    this.records.push({
      ...usage,
      timestamp: new Date(),
    });
  }

  getTotalCost(filter?: { vertical?: string; since?: Date }): number {
    return this.records
      .filter((r) => {
        if (filter?.vertical && r.vertical !== filter.vertical) return false;
        if (filter?.since && r.timestamp < filter.since) return false;
        return true;
      })
      .reduce((sum, r) => sum + calculateCost(r), 0);
  }

  getRecords(): UsageRecord[] {
    return [...this.records];
  }
}
