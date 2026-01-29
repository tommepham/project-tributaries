/**
 * Event types for cross-vertical communication
 */

/**
 * Base event structure
 */
export interface BaseEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: Date;
  source: string;
  organizationId: string;
  userId?: string;
  data: T;
  metadata?: Record<string, unknown>;
}

/**
 * Document events
 */
export interface DocumentUploadedEvent extends BaseEvent<{
  documentId: string;
  name: string;
  mimeType: string;
  size: number;
}> {
  type: 'document.uploaded';
}

export interface DocumentProcessedEvent extends BaseEvent<{
  documentId: string;
  extractedText?: string;
  extractedData?: Record<string, unknown>;
  confidence?: number;
}> {
  type: 'document.processed';
}

/**
 * Workflow events
 */
export interface WorkflowStartedEvent extends BaseEvent<{
  workflowId: string;
  workflowName: string;
  input: unknown;
}> {
  type: 'workflow.started';
}

export interface WorkflowCompletedEvent extends BaseEvent<{
  workflowId: string;
  workflowName: string;
  output: unknown;
  duration: number;
}> {
  type: 'workflow.completed';
}

export interface WorkflowFailedEvent extends BaseEvent<{
  workflowId: string;
  workflowName: string;
  error: string;
  step?: string;
}> {
  type: 'workflow.failed';
}

/**
 * Billing events
 */
export interface SubscriptionCreatedEvent extends BaseEvent<{
  subscriptionId: string;
  plan: string;
  priceMonthly: number;
}> {
  type: 'subscription.created';
}

export interface SubscriptionCanceledEvent extends BaseEvent<{
  subscriptionId: string;
  reason?: string;
}> {
  type: 'subscription.canceled';
}

/**
 * Union of all event types
 */
export type TributariesEvent =
  | DocumentUploadedEvent
  | DocumentProcessedEvent
  | WorkflowStartedEvent
  | WorkflowCompletedEvent
  | WorkflowFailedEvent
  | SubscriptionCreatedEvent
  | SubscriptionCanceledEvent;
