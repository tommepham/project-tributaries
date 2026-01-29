/**
 * Environment configuration utilities
 */

export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

export function getEnvVarOptional(name: string): string | undefined {
  return process.env[name];
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

/**
 * Shared configuration values
 */
export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Redis
  redisUrl: process.env.REDIS_URL,

  // API Keys (check existence, don't expose)
  hasOpenAI: !!process.env.OPENAI_API_KEY,
  hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
  hasStripe: !!process.env.STRIPE_SECRET_KEY,
  hasAWS: !!process.env.AWS_ACCESS_KEY_ID,
} as const;
