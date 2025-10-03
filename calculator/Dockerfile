# Stage 1: Use an official Nginx base image
FROM nginx:alpine

# Stage 2: Copy your calculator files into the default Nginx web root directory
COPY . /usr/share/nginx/html

# Stage 3: Expose port 80 (Nginx default)
EXPOSE 80