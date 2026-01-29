# Terraform configuration for Project Tributaries infrastructure
# This is a template - customize for your cloud provider

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
  }

  # Configure your backend
  # backend "s3" {
  #   bucket = "tributaries-terraform-state"
  #   key    = "state/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

# Variables
variable "environment" {
  description = "Environment (staging, production)"
  type        = string
  default     = "staging"
}

variable "verticals" {
  description = "List of verticals to deploy"
  type        = list(string)
  default = [
    "forge",
    "counsel",
    "ledger",
    "vitals",
    "harvest",
    "shield",
    "foundry",
    "dwelling",
    "freight",
    "scribe",
    "sentinel",
    "fleet",
    "grant",
    "sustain",
    "molar"
  ]
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

# Providers
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "tributaries"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# Shared infrastructure

# RDS PostgreSQL with pgvector
resource "aws_db_instance" "main" {
  identifier     = "tributaries-${var.environment}"
  engine         = "postgres"
  engine_version = "16"
  instance_class = var.environment == "production" ? "db.r6g.large" : "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp3"

  db_name  = "tributaries"
  username = "tributaries"
  password = random_password.db_password.result

  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = var.environment == "production" ? 7 : 1
  skip_final_snapshot     = var.environment != "production"

  # Enable pgvector via parameter group
  parameter_group_name = aws_db_parameter_group.main.name
}

resource "aws_db_parameter_group" "main" {
  family = "postgres16"
  name   = "tributaries-${var.environment}"

  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements,pgvector"
  }
}

resource "random_password" "db_password" {
  length  = 32
  special = false
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "main" {
  cluster_id           = "tributaries-${var.environment}"
  engine               = "redis"
  node_type            = var.environment == "production" ? "cache.r6g.large" : "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
  security_group_ids   = [aws_security_group.redis.id]
  subnet_group_name    = aws_elasticache_subnet_group.main.name
}

# S3 bucket for document storage
resource "aws_s3_bucket" "documents" {
  bucket = "tributaries-documents-${var.environment}"
}

resource "aws_s3_bucket_versioning" "documents" {
  bucket = aws_s3_bucket.documents.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "documents" {
  bucket = aws_s3_bucket.documents.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Outputs
output "database_endpoint" {
  value     = aws_db_instance.main.endpoint
  sensitive = true
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.main.cache_nodes[0].address
}

output "s3_bucket" {
  value = aws_s3_bucket.documents.bucket
}

# Note: Network resources (VPC, subnets, security groups) are simplified
# In production, use proper VPC configuration

resource "aws_security_group" "db" {
  name        = "tributaries-db-${var.environment}"
  description = "Database security group"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }
}

resource "aws_security_group" "redis" {
  name        = "tributaries-redis-${var.environment}"
  description = "Redis security group"

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }
}

# Placeholder for subnet groups - configure with your VPC
resource "aws_db_subnet_group" "main" {
  name       = "tributaries-${var.environment}"
  subnet_ids = [] # Add your subnet IDs
}

resource "aws_elasticache_subnet_group" "main" {
  name       = "tributaries-${var.environment}"
  subnet_ids = [] # Add your subnet IDs
}
