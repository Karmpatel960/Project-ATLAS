# Configure the AWS Provider
provider "aws" {
  region = "ap-south-1"  # Using N. Virginia region, which commonly has good free tier options
}

# Create random ID for unique resource naming
resource "random_id" "id" {
  byte_length = 4
}

# Tags used across all resources
locals {
  common_tags = {
    Project     = "react-nginx-app"
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}