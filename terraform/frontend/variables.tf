variable "region" {
  description = "AWS region"
  default     = "ap-south-1"  # Mumbai region
}

variable "public_key_path" {
  description = "Path to the public SSH key"
  default     = "~/.ssh/id_rsa.pub"
}
