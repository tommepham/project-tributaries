/**
 * Database client configuration
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let connectionInstance: ReturnType<typeof postgres> | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getConnection() {
  if (!connectionInstance) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not configured');
    }

    connectionInstance = postgres(connectionString, {
      max: parseInt(process.env.DATABASE_POOL_SIZE ?? '10', 10),
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }
  return connectionInstance;
}

export function getDb() {
  if (!dbInstance) {
    const connection = getConnection();
    dbInstance = drizzle(connection);
  }
  return dbInstance;
}

/**
 * Close all connections (for graceful shutdown)
 */
export async function closeConnections(): Promise<void> {
  if (connectionInstance) {
    await connectionInstance.end();
    connectionInstance = null;
    dbInstance = null;
  }
}

/**
 * Health check for database connection
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const connection = getConnection();
    await connection`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
