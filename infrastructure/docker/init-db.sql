-- Initialize PostgreSQL with required extensions and databases

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create database for n8n
CREATE DATABASE n8n;

-- Create schemas for each vertical (optional organization)
-- Each vertical uses the main database with prefixed tables

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE tributaries TO tributaries;
GRANT ALL PRIVILEGES ON DATABASE n8n TO tributaries;

-- Create audit log function for tracking changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
