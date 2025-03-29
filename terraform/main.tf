# Configure the AWS Provider
provider "aws" {
  region = var.region
}

# Create random ID for unique resource naming
resource "random_id" "id" {
  byte_length = 4
}

# Tags used across all resources
locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}