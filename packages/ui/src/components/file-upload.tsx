/**
 * File upload component with drag-and-drop
 */

import * as React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../utils';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesSelected: (files: File[]) => void;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  onFilesSelected,
  className,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.size <= maxSize
    );
    if (files.length > 0) {
      onFilesSelected(multiple ? files : [files[0]]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter(
      (file) => file.size <= maxSize
    );
    if (files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Click to upload</span> or
        drag and drop
      </p>
      <p className="text-xs text-muted-foreground">
        {accept || 'Any file type'} (max {Math.round(maxSize / 1024 / 1024)}MB)
      </p>
    </div>
  );
}
