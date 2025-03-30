provider "aws" {
  region = var.region
  # AWS credentials will be provided by environment variables
}

# Remove the aws_key_pair resource completely

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

# EC2 Instance with existing key pair
resource "aws_instance" "frontend" {
  ami                    = "ami-0f58b397bc5c1f2e8"
  instance_type          = "t2.micro"
  key_name               = var.jenkins-mumbai  # Use existing key name
  security_groups        = [aws_security_group.ec2_sg.name]
  tags = {
    Name = "Frontend-Instance"
  }

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

output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.frontend.public_ip
}
