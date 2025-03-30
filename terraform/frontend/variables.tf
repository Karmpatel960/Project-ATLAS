variable "region" {
  description = "AWS region"
  default     = "ap-south-1"  # Mumbai region
}

variable "key_name" {
  description = "Name of the existing key pair in AWS"
  type        = string
  default     = "jenkins-mumbai"  # Replace with your AWS key pair name
}
