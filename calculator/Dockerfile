# === STAGE 1: Build Stage (Optional for static files, but good practice) ===
# We use a node image just as a temporary workspace to collect the files.
# For a complex project (e.g., React/Vue), this stage would run 'npm build'.
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the static files into the working directory
COPY index.html style.css script.js .


# === STAGE 2: Production Stage (Final, minimal image) ===
# We use a very tiny base image for serving static content.
# 'nginx:alpine' is fine, but 'caddy' or even 'busybox' can be smaller.
# Let's stick with a minimal Nginx for simplicity.
FROM nginx:alpine

# Remove the default Nginx index.html and put our files in its place.
# The default Nginx web root is /usr/share/nginx/html
COPY --from=builder /app/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/style.css /usr/share/nginx/html/style.css
COPY --from=builder /app/script.js /usr/share/nginx/html/script.js

# Nginx runs on port 80 by default (no need for a CMD, Nginx starts automatically)
EXPOSE 80