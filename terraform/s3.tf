# Create an S3 bucket to store the Dockerfile and nginx config
resource "aws_s3_bucket" "app_config" {
  bucket = "app-config-${random_id.id.hex}"  # Ensure unique bucket name
  tags = merge(
    local.common_tags,
    {
      Name = "app-config-bucket"
    }
  )
}

# Upload Dockerfile to S3
resource "aws_s3_object" "dockerfile" {
  bucket  = aws_s3_bucket.app_config.id
  key     = "Dockerfile"
  content = <<-EOF
    # Use an official Node.js runtime as a parent image
    FROM node:18 AS build
    # Set working directory
    WORKDIR /app
    # Copy package.json and package-lock.json
    COPY package*.json ./
    # Install dependencies
    RUN npm install
    # Copy project files
    COPY . .
    # Build the React Vite application
    RUN npm run build
    # Use Nginx to serve the built app
    FROM nginx:alpine
    # Copy the built files
    COPY --from=build /app/dist /usr/share/nginx/html
    # Copy custom nginx config with load balancer config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    # Expose the port
    EXPOSE 80
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]
  EOF
}

# Upload Nginx config with load balancer to S3
resource "aws_s3_object" "nginx_conf" {
  bucket  = aws_s3_bucket.app_config.id
  key     = "nginx.conf"
  content = <<-EOF
    upstream backend {
        server localhost:8080;
        # You can add more servers here as your app scales
        # server localhost:8081;
        # server localhost:8082;
    }

    server {
        listen 80;
        
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        
        # API requests example - can be modified as needed
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
  EOF
}

# Create a script to set up Docker on the EC2 instance
resource "aws_s3_object" "setup_script" {
  bucket  = aws_s3_bucket.app_config.id
  key     = "setup.sh"
  content = <<-EOF
    #!/bin/bash
    # Update system
    sudo yum update -y
    
    # Install docker
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo systemctl enable docker
    sudo usermod -a -G docker ec2-user
    
    # Install aws cli
    sudo yum install -y aws-cli
    
    # Download config files from S3
    aws s3 cp s3://${aws_s3_bucket.app_config.id}/Dockerfile /home/ec2-user/Dockerfile
    aws s3 cp s3://${aws_s3_bucket.app_config.id}/nginx.conf /home/ec2-user/nginx.conf
    
    # Create app directory
    mkdir -p /home/ec2-user/app
    
    # Create a simple package.json for testing
    cat > /home/ec2-user/app/package.json << 'PKGJSON'
    {
      "name": "react-app",
      "version": "0.1.0",
      "scripts": {
        "build": "echo 'Mock build'"
      }
    }
    PKGJSON
    
    # Create sample index.html
    mkdir -p /home/ec2-user/app/dist
    cat > /home/ec2-user/app/dist/index.html << 'HTML'
    <!DOCTYPE html>
    <html>
      <head>
        <title>My React App</title>
      </head>
      <body>
        <h1>Hello from Docker on AWS EC2!</h1>
      </body>
    </html>
    HTML
    
    # Build Docker image
    cd /home/ec2-user/
    cp Dockerfile app/
    cp nginx.conf app/
    cd app
    sudo docker build -t react-app .
    
    # Run Docker container
    sudo docker run -d -p 80:80 --name react-app-container react-app
  EOF
}