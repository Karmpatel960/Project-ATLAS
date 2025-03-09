# Fetch latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Create an EC2 key pair for SSH access
resource "aws_key_pair" "app_key_pair" {
  key_name   = "app-key-pair-${random_id.id.hex}"
  public_key = file("~/.ssh/id_rsa.pub") # Make sure this exists or provide your public key directly
  tags       = local.common_tags
}

# Create the EC2 instance
resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = "t2.micro"               # Free tier eligible instance type
  key_name               = aws_key_pair.app_key_pair.key_name
  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  
  user_data = <<-EOF
              #!/bin/bash
              aws s3 cp s3://${aws_s3_bucket.app_config.id}/setup.sh /home/ec2-user/setup.sh
              chmod +x /home/ec2-user/setup.sh
              /home/ec2-user/setup.sh
              EOF
  
  root_block_device {
    volume_size = 8 # 8 GB is within free tier
    volume_type = "gp2"
  }
  
  tags = merge(
    local.common_tags,
    {
      Name = "app-server"
    }
  )
}