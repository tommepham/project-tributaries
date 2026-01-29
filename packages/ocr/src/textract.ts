/**
 * AWS Textract integration for complex document processing
 */

import {
  TextractClient,
  AnalyzeDocumentCommand,
  DetectDocumentTextCommand,
} from '@aws-sdk/client-textract';
import type { TextractResult, OCROptions } from './types';

let textractClient: TextractClient | null = null;

function getTextractClient(): TextractClient {
  if (!textractClient) {
    textractClient = new TextractClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }
  return textractClient;
}

/**
 * Simple text detection using Textract
 */
export async function detectText(
  documentBuffer: Buffer
): Promise<TextractResult> {
  const client = getTextractClient();

  const response = await client.send(
    new DetectDocumentTextCommand({
      Document: { Bytes: documentBuffer },
    })
  );

  const lines: string[] = [];
  const blocks = response.Blocks ?? [];

  for (const block of blocks) {
    if (block.BlockType === 'LINE' && block.Text) {
      lines.push(block.Text);
    }
  }

  return {
    text: lines.join('\n'),
    lines,
    confidence:
      blocks.reduce((sum, b) => sum + (b.Confidence ?? 0), 0) / blocks.length,
    rawBlocks: blocks,
  };
}

/**
 * Analyze document with forms and tables extraction
 */
export async function analyzeDocument(
  documentBuffer: Buffer,
  features: ('FORMS' | 'TABLES')[] = ['FORMS', 'TABLES']
): Promise<TextractResult> {
  const client = getTextractClient();

  const response = await client.send(
    new AnalyzeDocumentCommand({
      Document: { Bytes: documentBuffer },
      FeatureTypes: features,
    })
  );

  const blocks = response.Blocks ?? [];
  const lines: string[] = [];
  const keyValues: Record<string, string> = {};
  const tables: string[][][] = [];

  // Extract text lines
  for (const block of blocks) {
    if (block.BlockType === 'LINE' && block.Text) {
      lines.push(block.Text);
    }
  }

  // Extract key-value pairs (forms)
  const keyBlocks = blocks.filter((b) => b.BlockType === 'KEY_VALUE_SET');
  for (const keyBlock of keyBlocks) {
    if (keyBlock.EntityTypes?.includes('KEY')) {
      const keyText = getBlockText(keyBlock, blocks);
      const valueBlock = blocks.find(
        (b) =>
          b.BlockType === 'KEY_VALUE_SET' &&
          b.EntityTypes?.includes('VALUE') &&
          keyBlock.Relationships?.some(
            (r) => r.Type === 'VALUE' && r.Ids?.includes(b.Id ?? '')
          )
      );
      if (valueBlock) {
        const valueText = getBlockText(valueBlock, blocks);
        if (keyText && valueText) {
          keyValues[keyText] = valueText;
        }
      }
    }
  }

  return {
    text: lines.join('\n'),
    lines,
    confidence:
      blocks.reduce((sum, b) => sum + (b.Confidence ?? 0), 0) / blocks.length,
    keyValues,
    tables,
    rawBlocks: blocks,
  };
}

function getBlockText(block: any, allBlocks: any[]): string {
  const childIds =
    block.Relationships?.find((r: any) => r.Type === 'CHILD')?.Ids ?? [];
  return childIds
    .map((id: string) => allBlocks.find((b) => b.Id === id)?.Text ?? '')
    .join(' ')
    .trim();
}
