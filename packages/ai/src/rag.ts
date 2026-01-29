/**
 * RAG (Retrieval Augmented Generation) utilities
 */

import { embed, cosineSimilarity } from './embeddings';
import { complete } from './clients';

export interface Document {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  embedding?: number[];
}

export interface RetrievalResult {
  document: Document;
  score: number;
}

/**
 * Simple in-memory vector store for prototyping
 * Use @tributaries/database for production with pgvector
 */
export class SimpleVectorStore {
  private documents: Document[] = [];

  async add(docs: Omit<Document, 'embedding'>[]): Promise<void> {
    const embeddings = await embed(docs.map((d) => d.content));

    for (let i = 0; i < docs.length; i++) {
      this.documents.push({
        ...docs[i],
        embedding: embeddings[i].embedding,
      });
    }
  }

  async search(query: string, topK: number = 5): Promise<RetrievalResult[]> {
    const [queryEmbedding] = await embed(query);

    const scored = this.documents
      .filter((doc) => doc.embedding)
      .map((doc) => ({
        document: doc,
        score: cosineSimilarity(queryEmbedding.embedding, doc.embedding!),
      }))
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, topK);
  }
}

/**
 * RAG query with context injection
 */
export async function ragQuery(params: {
  query: string;
  context: RetrievalResult[];
  systemPrompt?: string;
  model?: 'gpt-4' | 'claude-3-sonnet';
}): Promise<string> {
  const contextText = params.context
    .map((r, i) => `[${i + 1}] ${r.document.content}`)
    .join('\n\n');

  const prompt = `Context documents:
${contextText}

Question: ${params.query}

Answer based on the context provided. If the answer cannot be found in the context, say so.`;

  return complete({
    prompt,
    systemPrompt: params.systemPrompt ?? 'You are a helpful assistant that answers questions based on provided context.',
    model: params.model ?? 'gpt-4',
  });
}
