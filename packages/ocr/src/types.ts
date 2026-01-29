/**
 * OCR types
 */

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Word {
  text: string;
  confidence: number;
  bbox: BoundingBox;
}

export interface Line {
  text: string;
  confidence: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  words: Word[];
  lines: Line[];
}

export interface OCROptions {
  language?: string;
  concurrency?: number;
}

export interface TextractResult {
  text: string;
  lines: string[];
  confidence: number;
  keyValues?: Record<string, string>;
  tables?: string[][][];
  rawBlocks?: unknown[];
}

export interface PDFResult {
  text: string;
  pages: number;
  info: {
    title: string | null;
    author: string | null;
    creator: string | null;
    creationDate: string | null;
  };
  metadata: unknown;
}

export interface PipelineOptions {
  mimeType?: string;
  language?: string;
  useTextract?: boolean;
}

export interface DocumentResult {
  source: 'pdf-text' | 'tesseract' | 'textract';
  text: string;
  confidence: number;
  pages?: number;
  metadata?: Record<string, unknown>;
  keyValues?: Record<string, string>;
  tables?: string[][][];
  words?: Word[];
  warnings?: string[];
}
