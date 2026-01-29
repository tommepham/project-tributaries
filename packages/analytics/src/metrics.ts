/**
 * Vertical performance metrics
 */

export interface VerticalMetrics {
  vertical: string;
  period: {
    start: Date;
    end: Date;
  };
  acquisition: {
    waitlistSignups: number;
    demoRequests: number;
    trialStarts: number;
  };
  activation: {
    onboardingCompleted: number;
    firstValueTime: number; // hours
    activationRate: number; // percentage
  };
  revenue: {
    mrr: number;
    arr: number;
    customers: number;
    avgContractValue: number;
    churnRate: number;
  };
  engagement: {
    dau: number;
    wau: number;
    mau: number;
    featureAdoption: Record<string, number>;
  };
  satisfaction: {
    nps: number;
    csat: number;
    supportTickets: number;
  };
}

/**
 * Calculate vertical health score (0-100)
 */
export function calculateHealthScore(metrics: VerticalMetrics): number {
  const scores = {
    // Traction (40%)
    traction:
      Math.min(metrics.acquisition.waitlistSignups / 100, 1) * 15 +
      Math.min(metrics.acquisition.demoRequests / 20, 1) * 15 +
      Math.min(metrics.revenue.customers / 10, 1) * 10,

    // Revenue (30%)
    revenue:
      Math.min(metrics.revenue.mrr / 10000, 1) * 15 +
      Math.min((100 - metrics.revenue.churnRate) / 100, 1) * 15,

    // Engagement (20%)
    engagement:
      Math.min(metrics.engagement.mau / 100, 1) * 10 +
      Math.min(metrics.activation.activationRate / 100, 1) * 10,

    // Satisfaction (10%)
    satisfaction:
      Math.min((metrics.satisfaction.nps + 100) / 200, 1) * 10,
  };

  return Math.round(
    scores.traction + scores.revenue + scores.engagement + scores.satisfaction
  );
}

/**
 * Compare verticals for prioritization
 */
export function rankVerticals(
  metrics: VerticalMetrics[]
): { vertical: string; score: number; rank: number }[] {
  return metrics
    .map((m) => ({
      vertical: m.vertical,
      score: calculateHealthScore(m),
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((v, i) => ({ ...v, rank: i + 1 }));
}

/**
 * Generate weekly report for all verticals
 */
export function generateWeeklyReport(metrics: VerticalMetrics[]): string {
  const ranked = rankVerticals(metrics);

  let report = '# Weekly Vertical Performance Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += '## Rankings\n\n';
  report += '| Rank | Vertical | Score | MRR | Customers |\n';
  report += '|------|----------|-------|-----|----------|\n';

  for (const v of ranked) {
    const m = metrics.find((x) => x.vertical === v.vertical)!;
    report += `| ${v.rank} | ${v.vertical} | ${v.score} | $${m.revenue.mrr.toLocaleString()} | ${m.revenue.customers} |\n`;
  }

  return report;
}
