/**
 * Tesseract.js OCR utilities
 */

import Tesseract from 'tesseract.js';
import type { OCRResult, OCROptions } from './types';

/**
 * Extract text from image using Tesseract
 */
export async function ocrImage(
  imageBuffer: Buffer,
  options?: OCROptions
): Promise<OCRResult> {
  const worker = await Tesseract.createWorker(options?.language ?? 'eng');

  try {
    const result = await worker.recognize(imageBuffer);

    return {
      text: result.data.text,
      confidence: result.data.confidence,
      words: result.data.words.map((w) => ({
        text: w.text,
        confidence: w.confidence,
        bbox: {
          x: w.bbox.x0,
          y: w.bbox.y0,
          width: w.bbox.x1 - w.bbox.x0,
          height: w.bbox.y1 - w.bbox.y0,
        },
      })),
      lines: result.data.lines.map((l) => ({
        text: l.text,
        confidence: l.confidence,
      })),
    };
  } finally {
    await worker.terminate();
  }
}

/**
 * Batch OCR for multiple images
 */
export async function ocrBatch(
  images: Buffer[],
  options?: OCROptions
): Promise<OCRResult[]> {
  const results: OCRResult[] = [];

  // Process in parallel with concurrency limit
  const concurrency = options?.concurrency ?? 3;
  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((img) => ocrImage(img, options))
    );
    results.push(...batchResults);
  }

  return results;
}
