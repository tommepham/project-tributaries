/**
 * pgvector utilities for semantic search
 */

import { sql } from 'drizzle-orm';
import { getDb } from './client';

/**
 * Initialize pgvector extension
 */
export async function initVectorExtension(): Promise<void> {
  const db = getDb();
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector`);
}

/**
 * Create a vector similarity search function
 */
export function vectorSimilarity(
  column: string,
  embedding: number[],
  operator: '<->' | '<=>' | '<#>' = '<=>'
): ReturnType<typeof sql> {
  const vectorString = `[${embedding.join(',')}]`;
  return sql.raw(`${column} ${operator} '${vectorString}'`);
}

/**
 * Search documents by embedding similarity
 */
export async function searchByEmbedding(params: {
  table: string;
  embeddingColumn: string;
  embedding: number[];
  limit?: number;
  threshold?: number;
  additionalColumns?: string[];
}): Promise<unknown[]> {
  const db = getDb();
  const {
    table,
    embeddingColumn,
    embedding,
    limit = 10,
    threshold,
    additionalColumns = [],
  } = params;

  const vectorString = `[${embedding.join(',')}]`;
  const columns = ['id', ...additionalColumns].join(', ');
  const distanceExpr = `${embeddingColumn} <=> '${vectorString}'`;

  let query = `
    SELECT ${columns}, ${distanceExpr} as distance
    FROM ${table}
  `;

  if (threshold !== undefined) {
    query += ` WHERE ${distanceExpr} < ${threshold}`;
  }

  query += ` ORDER BY distance LIMIT ${limit}`;

  const result = await db.execute(sql.raw(query));
  return result as unknown[];
}

/**
 * Upsert document with embedding
 */
export async function upsertWithEmbedding(params: {
  table: string;
  id: string;
  embeddingColumn: string;
  embedding: number[];
  data: Record<string, unknown>;
}): Promise<void> {
  const db = getDb();
  const { table, id, embeddingColumn, embedding, data } = params;

  const vectorString = `[${embedding.join(',')}]`;
  const columns = Object.keys(data);
  const values = Object.values(data);

  const columnsList = [...columns, embeddingColumn, 'id'].join(', ');
  const placeholders = [
    ...values.map((_, i) => `$${i + 1}`),
    `'${vectorString}'::vector`,
    `'${id}'`,
  ].join(', ');

  const updateSet = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');

  await db.execute(
    sql.raw(`
      INSERT INTO ${table} (${columnsList})
      VALUES (${placeholders})
      ON CONFLICT (id) DO UPDATE SET ${updateSet}, ${embeddingColumn} = '${vectorString}'::vector
    `)
  );
}
