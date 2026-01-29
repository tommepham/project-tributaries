/**
 * Text embedding utilities
 */

import { getOpenAI } from './clients';

export type EmbeddingModel = 'text-embedding-3-small' | 'text-embedding-3-large' | 'text-embedding-ada-002';

export interface EmbeddingResult {
  embedding: number[];
  model: string;
  tokens: number;
}

/**
 * Generate embeddings for text
 */
export async function embed(
  text: string | string[],
  model: EmbeddingModel = 'text-embedding-3-small'
): Promise<EmbeddingResult[]> {
  const openai = getOpenAI();
  const input = Array.isArray(text) ? text : [text];

  const response = await openai.embeddings.create({
    model,
    input,
  });

  return response.data.map((item, index) => ({
    embedding: item.embedding,
    model: response.model,
    tokens: response.usage.total_tokens / input.length,
  }));
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Embeddings must have same dimensions');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Chunk text for embedding (handles token limits)
 */
export function chunkText(
  text: string,
  maxChunkSize: number = 512,
  overlap: number = 50
): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += maxChunkSize - overlap) {
    const chunk = words.slice(i, i + maxChunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk);
    }
  }

  return chunks;
}
