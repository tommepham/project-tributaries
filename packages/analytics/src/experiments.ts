/**
 * Experiment tracking for vertical validation
 */

export interface Experiment {
  id: string;
  vertical: string;
  name: string;
  hypothesis: string;
  metrics: ExperimentMetric[];
  status: 'planned' | 'running' | 'completed' | 'paused';
  startDate?: Date;
  endDate?: Date;
  results?: ExperimentResults;
}

export interface ExperimentMetric {
  name: string;
  type: 'count' | 'conversion' | 'revenue' | 'nps';
  target: number;
  current: number;
}

export interface ExperimentResults {
  success: boolean;
  summary: string;
  metrics: Record<string, number>;
  insights: string[];
  nextSteps: string[];
}

/**
 * In-memory experiment store (replace with DB for production)
 */
const experiments = new Map<string, Experiment>();

/**
 * Create a new experiment
 */
export function createExperiment(experiment: Omit<Experiment, 'id'>): Experiment {
  const id = crypto.randomUUID();
  const exp: Experiment = { ...experiment, id };
  experiments.set(id, exp);
  return exp;
}

/**
 * Get experiment by ID
 */
export function getExperiment(id: string): Experiment | undefined {
  return experiments.get(id);
}

/**
 * Update experiment metric
 */
export function updateMetric(
  experimentId: string,
  metricName: string,
  value: number
): void {
  const experiment = experiments.get(experimentId);
  if (!experiment) return;

  const metric = experiment.metrics.find((m) => m.name === metricName);
  if (metric) {
    metric.current = value;
  }
}

/**
 * Complete an experiment
 */
export function completeExperiment(
  experimentId: string,
  results: ExperimentResults
): void {
  const experiment = experiments.get(experimentId);
  if (!experiment) return;

  experiment.status = 'completed';
  experiment.endDate = new Date();
  experiment.results = results;
}

/**
 * Get experiments by vertical
 */
export function getVerticalExperiments(vertical: string): Experiment[] {
  return Array.from(experiments.values()).filter(
    (e) => e.vertical === vertical
  );
}

/**
 * Standard experiment templates for verticals
 */
export const EXPERIMENT_TEMPLATES = {
  LANDING_PAGE: {
    name: 'Landing Page Test',
    hypothesis: 'A targeted landing page will generate waitlist signups',
    metrics: [
      { name: 'visitors', type: 'count' as const, target: 1000, current: 0 },
      { name: 'signups', type: 'count' as const, target: 100, current: 0 },
      { name: 'conversion_rate', type: 'conversion' as const, target: 10, current: 0 },
    ],
  },
  CUSTOMER_INTERVIEW: {
    name: 'Customer Discovery',
    hypothesis: 'Target customers have significant pain and budget',
    metrics: [
      { name: 'interviews_completed', type: 'count' as const, target: 20, current: 0 },
      { name: 'pain_score_avg', type: 'count' as const, target: 8, current: 0 },
      { name: 'budget_confirmed', type: 'count' as const, target: 10, current: 0 },
    ],
  },
  LOI_COLLECTION: {
    name: 'Letter of Intent',
    hypothesis: 'Customers will commit to paying for the solution',
    metrics: [
      { name: 'lois_sent', type: 'count' as const, target: 10, current: 0 },
      { name: 'lois_signed', type: 'count' as const, target: 5, current: 0 },
      { name: 'total_committed_arr', type: 'revenue' as const, target: 50000, current: 0 },
    ],
  },
};
