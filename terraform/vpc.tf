# Create a VPC for our infrastructure
resource "aws_vpc" "app_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = merge(
    local.common_tags,
    {
      Name = "app-vpc"
    }
  )
}

# Create an internet gateway for the VPC
resource "aws_internet_gateway" "app_igw" {
  vpc_id = aws_vpc.app_vpc.id
  tags = merge(
    local.common_tags,
    {
      Name = "app-igw"
    }
  )
}

# Create a public subnet where our EC2 instance will be launched
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.app_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-south-1"
  tags = merge(
    local.common_tags,
    {
      Name = "public-subnet"
    }
  )
}

# Create a route table for the public subnet
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.app_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_igw.id
  }
  tags = merge(
    local.common_tags,
    {
      Name = "public-rt"
    }
  )
}

# Associate the route table with the public subnet
resource "aws_route_table_association" "public_rta" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}