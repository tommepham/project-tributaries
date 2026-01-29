/**
 * Structured output parsing utilities
 */

import { complete } from './clients';

/**
 * Extract structured data from text using LLM
 */
export async function extractStructured<T>(params: {
  text: string;
  schema: string;
  instructions?: string;
}): Promise<T> {
  const prompt = `Extract structured data from the following text according to the schema.

Text:
${params.text}

Schema (JSON):
${params.schema}

${params.instructions ? `Instructions: ${params.instructions}` : ''}

Return ONLY valid JSON matching the schema, no other text.`;

  const response = await complete({
    prompt,
    systemPrompt: 'You are a precise data extraction assistant. Output only valid JSON.',
    model: 'gpt-4',
    temperature: 0,
  });

  // Clean potential markdown code blocks
  const cleaned = response
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(cleaned) as T;
}

/**
 * Common extraction schemas for verticals
 */
export const SCHEMAS = {
  // For Forge (Construction)
  INVOICE: `{
    "invoiceNumber": "string",
    "vendor": "string",
    "date": "string (ISO date)",
    "dueDate": "string (ISO date) | null",
    "lineItems": [{ "description": "string", "quantity": "number", "unitPrice": "number", "total": "number" }],
    "subtotal": "number",
    "tax": "number | null",
    "total": "number"
  }`,

  // For Counsel (Legal)
  CONTRACT: `{
    "parties": ["string"],
    "effectiveDate": "string (ISO date)",
    "terminationDate": "string (ISO date) | null",
    "keyTerms": ["string"],
    "obligations": [{ "party": "string", "obligation": "string", "deadline": "string | null" }],
    "governingLaw": "string | null"
  }`,

  // For Ledger (Accounting)
  RECEIPT: `{
    "vendor": "string",
    "date": "string (ISO date)",
    "items": [{ "description": "string", "amount": "number" }],
    "total": "number",
    "paymentMethod": "string | null",
    "category": "string | null"
  }`,
};
