/**
 * Document preprocessing utilities
 */

import sharp from 'sharp';

export interface PreprocessOptions {
  grayscale?: boolean;
  contrast?: number;
  brightness?: number;
  sharpen?: boolean;
  denoise?: boolean;
  deskew?: boolean;
  resize?: { width?: number; height?: number };
}

/**
 * Preprocess image for better OCR accuracy
 */
export async function preprocessImage(
  imageBuffer: Buffer,
  options: PreprocessOptions = {}
): Promise<Buffer> {
  let pipeline = sharp(imageBuffer);

  // Convert to grayscale (improves OCR for most documents)
  if (options.grayscale !== false) {
    pipeline = pipeline.grayscale();
  }

  // Resize if needed (OCR works best at certain DPIs)
  if (options.resize) {
    pipeline = pipeline.resize(options.resize.width, options.resize.height, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Adjust contrast
  if (options.contrast) {
    pipeline = pipeline.linear(options.contrast, 0);
  }

  // Adjust brightness
  if (options.brightness) {
    pipeline = pipeline.modulate({ brightness: options.brightness });
  }

  // Sharpen for clearer text
  if (options.sharpen) {
    pipeline = pipeline.sharpen();
  }

  // Denoise
  if (options.denoise) {
    pipeline = pipeline.median(3);
  }

  return pipeline.png().toBuffer();
}

/**
 * Detect image orientation and rotate if needed
 */
export async function normalizeOrientation(imageBuffer: Buffer): Promise<Buffer> {
  return sharp(imageBuffer).rotate().toBuffer();
}

/**
 * Convert various image formats to PNG for consistent processing
 */
export async function toPng(imageBuffer: Buffer): Promise<Buffer> {
  return sharp(imageBuffer).png().toBuffer();
}

/**
 * Get image metadata
 */
export async function getImageInfo(imageBuffer: Buffer) {
  const metadata = await sharp(imageBuffer).metadata();
  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    channels: metadata.channels,
    density: metadata.density,
  };
}
