# Specify the AWS provider with authentication
provider "aws" {
  region = var.region
  
  # These will be populated from environment variables:
  # AWS_ACCESS_KEY_ID
  # AWS_SECRET_ACCESS_KEY
  # AWS_SESSION_TOKEN (optional)
}

# Create a key pair
resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = var.public_key_content
}

# Security group for EC2
resource "aws_security_group" "ec2_sg" {
  name        = "ec2_sg"
  description = "Allow SSH and HTTP access"
  
  ingress {
    from_port   = 22    # SSH
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  
  }
  ingress {
    from_port   = 80    # HTTP
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "frontend" {
  ami                    = "ami-0f58b397bc5c1f2e8"   # Free-tier AMI for Mumbai (Amazon Linux 2023)
  instance_type          = "t2.micro"               # Free-tier eligible
  key_name               = aws_key_pair.deployer.key_name
  security_groups        = [aws_security_group.ec2_sg.name]
  tags = {
    Name = "Frontend-Instance"
  }
  # User data to install Docker and start the container
  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install docker -y
    sudo service docker start
    sudo usermod -aG docker ec2-user
    sudo systemctl enable docker
    docker run -d -p 80:80 --name frontend karmpatel/vitefrontend:latest
  EOF
}

