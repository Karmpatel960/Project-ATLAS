variable "region" {
  description = "AWS region"
  default     = "ap-south-1"  # Mumbai region
}

variable "public_key_content" {
  description = "Content of the public SSH key"
  type        = string
  # No default - should be passed as an environment variable
}
