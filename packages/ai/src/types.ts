/**
 * Shared AI types
 */

export interface CompletionOptions {
  model: string;
  maxTokens: number;
  temperature: number;
  systemPrompt?: string;
}

export interface CompletionResult {
  content: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  finishReason: 'stop' | 'length' | 'content_filter';
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamingOptions extends CompletionOptions {
  onToken?: (token: string) => void;
  onComplete?: (result: CompletionResult) => void;
}
