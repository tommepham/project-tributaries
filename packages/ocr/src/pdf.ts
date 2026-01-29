/**
 * PDF processing utilities
 */

import pdfParse from 'pdf-parse';
import type { PDFResult } from './types';

/**
 * Extract text from PDF
 */
export async function extractPdfText(pdfBuffer: Buffer): Promise<PDFResult> {
  const data = await pdfParse(pdfBuffer);

  return {
    text: data.text,
    pages: data.numpages,
    info: {
      title: data.info?.Title ?? null,
      author: data.info?.Author ?? null,
      creator: data.info?.Creator ?? null,
      creationDate: data.info?.CreationDate ?? null,
    },
    metadata: data.metadata ?? null,
  };
}

/**
 * Check if PDF is text-based or scanned (image-based)
 */
export async function isPdfScanned(pdfBuffer: Buffer): Promise<boolean> {
  const data = await pdfParse(pdfBuffer);

  // Heuristic: if text is very sparse relative to pages, likely scanned
  const textPerPage = data.text.length / data.numpages;
  return textPerPage < 100; // Less than 100 chars per page suggests scanned
}

/**
 * Split PDF text by pages (best effort)
 */
export function splitByPages(text: string): string[] {
  // PDF page breaks are often indicated by form feed characters
  // or multiple newlines; this is a heuristic approach
  return text.split(/\f|\n{4,}/).filter((page) => page.trim().length > 0);
}
