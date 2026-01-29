/**
 * @tributaries/ocr
 * Document OCR and text extraction pipeline
 *
 * Provides:
 * - PDF text extraction
 * - Image OCR (Tesseract)
 * - AWS Textract integration (for complex documents)
 * - Document preprocessing
 * - Structured data extraction
 */

export * from './tesseract';
export * from './textract';
export * from './pdf';
export * from './preprocessing';
export * from './pipeline';
export * from './types';
