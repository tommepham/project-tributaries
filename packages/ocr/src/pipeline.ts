/**
 * Document processing pipeline
 */

import { extractPdfText, isPdfScanned } from './pdf';
import { ocrImage } from './tesseract';
import { analyzeDocument } from './textract';
import { preprocessImage } from './preprocessing';
import type { DocumentResult, PipelineOptions } from './types';

/**
 * Unified document processing pipeline
 * Handles PDFs (text and scanned), images
 */
export async function processDocument(
  buffer: Buffer,
  options: PipelineOptions = {}
): Promise<DocumentResult> {
  const mimeType = options.mimeType ?? detectMimeType(buffer);

  if (mimeType === 'application/pdf') {
    return processPdf(buffer, options);
  }

  if (mimeType.startsWith('image/')) {
    return processImage(buffer, options);
  }

  throw new Error(`Unsupported document type: ${mimeType}`);
}

async function processPdf(
  buffer: Buffer,
  options: PipelineOptions
): Promise<DocumentResult> {
  // Try text extraction first
  const pdfResult = await extractPdfText(buffer);

  // Check if it's a scanned PDF
  const isScanned = await isPdfScanned(buffer);

  if (!isScanned && pdfResult.text.trim().length > 0) {
    return {
      source: 'pdf-text',
      text: pdfResult.text,
      confidence: 100,
      pages: pdfResult.pages,
      metadata: pdfResult.info,
    };
  }

  // Fall back to Textract for scanned PDFs
  if (options.useTextract) {
    const textractResult = await analyzeDocument(buffer);
    return {
      source: 'textract',
      text: textractResult.text,
      confidence: textractResult.confidence,
      keyValues: textractResult.keyValues,
      tables: textractResult.tables,
    };
  }

  // Return what we have
  return {
    source: 'pdf-text',
    text: pdfResult.text,
    confidence: 50, // Lower confidence for potentially scanned docs
    pages: pdfResult.pages,
    metadata: pdfResult.info,
    warnings: ['Document appears to be scanned; enable Textract for better results'],
  };
}

async function processImage(
  buffer: Buffer,
  options: PipelineOptions
): Promise<DocumentResult> {
  // Preprocess for better OCR
  const preprocessed = await preprocessImage(buffer, {
    grayscale: true,
    sharpen: true,
  });

  // Use Textract if available and enabled
  if (options.useTextract) {
    const textractResult = await analyzeDocument(preprocessed);
    return {
      source: 'textract',
      text: textractResult.text,
      confidence: textractResult.confidence,
      keyValues: textractResult.keyValues,
      tables: textractResult.tables,
    };
  }

  // Fall back to Tesseract
  const ocrResult = await ocrImage(preprocessed, {
    language: options.language,
  });

  return {
    source: 'tesseract',
    text: ocrResult.text,
    confidence: ocrResult.confidence,
    words: ocrResult.words,
  };
}

function detectMimeType(buffer: Buffer): string {
  // Simple magic number detection
  if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
    return 'application/pdf';
  }
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'image/png';
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  return 'application/octet-stream';
}
