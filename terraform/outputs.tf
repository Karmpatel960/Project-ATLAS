# Output the public IP address of the EC2 instance
output "public_ip" {
  value       = aws_instance.app_server.public_ip
  description = "The public IP address of the EC2 instance"
}

# Output the S3 bucket name
output "s3_bucket_name" {
  value       = aws_s3_bucket.app_config.bucket
  description = "The name of the S3 bucket for app configuration"
}

# Output SSH command
output "ssh_command" {
  value       = "ssh -i ~/.ssh/id_rsa ec2-user@${aws_instance.app_server.public_ip}"
  description = "Command to SSH into the EC2 instance"
}

# Output website URL
output "website_url" {
  value       = "http://${aws_instance.app_server.public_ip}"
  description = "URL to access the website"
}