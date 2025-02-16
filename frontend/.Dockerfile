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

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
