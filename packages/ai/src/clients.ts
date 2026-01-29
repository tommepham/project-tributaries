/**
 * AI client configuration
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

let openaiInstance: OpenAI | null = null;
let anthropicInstance: Anthropic | null = null;

export function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }
    openaiInstance = new OpenAI({ apiKey });
  }
  return openaiInstance;
}

export function getAnthropic(): Anthropic {
  if (!anthropicInstance) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }
    anthropicInstance = new Anthropic({ apiKey });
  }
  return anthropicInstance;
}

/**
 * Simple completion wrapper with fallback
 */
export async function complete(params: {
  prompt: string;
  systemPrompt?: string;
  model?: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet';
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const model = params.model ?? 'gpt-4';

  if (model.startsWith('claude')) {
    const anthropic = getAnthropic();
    const response = await anthropic.messages.create({
      model: model === 'claude-3-opus' ? 'claude-3-opus-20240229' : 'claude-3-sonnet-20240229',
      max_tokens: params.maxTokens ?? 1024,
      system: params.systemPrompt,
      messages: [{ role: 'user', content: params.prompt }],
    });
    const content = response.content[0];
    return content.type === 'text' ? content.text : '';
  }

  const openai = getOpenAI();
  const messages: OpenAI.ChatCompletionMessageParam[] = [];

  if (params.systemPrompt) {
    messages.push({ role: 'system', content: params.systemPrompt });
  }
  messages.push({ role: 'user', content: params.prompt });

  const response = await openai.chat.completions.create({
    model,
    messages,
    max_tokens: params.maxTokens ?? 1024,
    temperature: params.temperature ?? 0.7,
  });

  return response.choices[0]?.message?.content ?? '';
}
