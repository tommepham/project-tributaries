/**
 * Workflow types
 */

export interface WorkflowStep<TInput = unknown, TOutput = unknown> {
  name: string;
  handler: (input: TInput, context?: unknown) => Promise<TOutput>;
  retries?: number;
  timeout?: number;
}

export interface WorkflowDefinition {
  name: string;
  description?: string;
  steps: WorkflowStep[];
  concurrency?: number;
  timeout?: number;
}

export interface WorkflowExecution {
  id: string;
  workflowName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  steps: StepExecution[];
  context?: unknown;
}

export interface StepExecution {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  input?: unknown;
  output?: unknown;
  error?: string;
  attempts: number;
}

export interface JobData<T = unknown> {
  executionId: string;
  stepIndex: number;
  input: T;
  context?: unknown;
}
