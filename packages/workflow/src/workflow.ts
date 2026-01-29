/**
 * Workflow definition and execution
 */

import { addJob, createWorker } from './queue';
import type { WorkflowDefinition, WorkflowStep, WorkflowExecution } from './types';

const workflows = new Map<string, WorkflowDefinition>();

/**
 * Register a workflow definition
 */
export function registerWorkflow(definition: WorkflowDefinition): void {
  workflows.set(definition.name, definition);
}

/**
 * Get a registered workflow
 */
export function getWorkflow(name: string): WorkflowDefinition | undefined {
  return workflows.get(name);
}

/**
 * Execute a workflow
 */
export async function executeWorkflow<T>(
  workflowName: string,
  input: T,
  context?: { organizationId?: string; userId?: string }
): Promise<WorkflowExecution> {
  const workflow = workflows.get(workflowName);
  if (!workflow) {
    throw new Error(`Workflow not found: ${workflowName}`);
  }

  const executionId = crypto.randomUUID();

  const execution: WorkflowExecution = {
    id: executionId,
    workflowName,
    status: 'running',
    startedAt: new Date(),
    steps: [],
    context,
  };

  // Add first step to queue
  await addJob(
    `workflow:${workflowName}`,
    workflow.steps[0].name,
    {
      executionId,
      stepIndex: 0,
      input,
      context,
    }
  );

  return execution;
}

/**
 * Create workflow processor
 */
export function createWorkflowProcessor(workflowName: string): void {
  const workflow = workflows.get(workflowName);
  if (!workflow) {
    throw new Error(`Workflow not found: ${workflowName}`);
  }

  createWorker(
    `workflow:${workflowName}`,
    async (job) => {
      const { executionId, stepIndex, input, context } = job.data as {
        executionId: string;
        stepIndex: number;
        input: unknown;
        context: unknown;
      };

      const step = workflow.steps[stepIndex];
      if (!step) {
        return { status: 'completed', executionId };
      }

      // Execute step
      const result = await step.handler(input, context);

      // Queue next step if exists
      const nextStepIndex = stepIndex + 1;
      if (nextStepIndex < workflow.steps.length) {
        await addJob(
          `workflow:${workflowName}`,
          workflow.steps[nextStepIndex].name,
          {
            executionId,
            stepIndex: nextStepIndex,
            input: result,
            context,
          }
        );
      }

      return result;
    },
    { concurrency: workflow.concurrency ?? 5 }
  );
}

/**
 * Define a workflow step
 */
export function step<TInput, TOutput>(
  name: string,
  handler: (input: TInput, context?: unknown) => Promise<TOutput>
): WorkflowStep<TInput, TOutput> {
  return { name, handler };
}
