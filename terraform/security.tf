# Create a security group for the EC2 instance
resource "aws_security_group" "app_sg" {
  name        = "app-sg-${random_id.id.hex}"
  description = "Allow HTTP and SSH traffic"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }
  
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Jenkins"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = merge(
    local.common_tags,
    {
      Name = "app-sg"
    }
  )
}

# Create an IAM role for the EC2 instance
resource "aws_iam_role" "ec2_role" {
  name = "ec2_role_${random_id.id.hex}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
  tags = local.common_tags
}

# Create an IAM policy for S3 access
resource "aws_iam_policy" "s3_access" {
  name        = "s3_access_policy_${random_id.id.hex}"
  description = "Allow EC2 to access S3"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:ListBucket",
        ]
        Effect = "Allow"
        Resource = [
          "${aws_s3_bucket.app_config.arn}",
          "${aws_s3_bucket.app_config.arn}/*",
        ]
      }
    ]
  })
  tags = local.common_tags
}

# Attach the policy to the role
resource "aws_iam_role_policy_attachment" "s3_access_attach" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = aws_iam_policy.s3_access.arn
}

# Create an instance profile
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2_profile_${random_id.id.hex}"
  role = aws_iam_role.ec2_role.name
  tags = local.common_tags
}