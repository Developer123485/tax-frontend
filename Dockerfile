# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy built files to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Custom Nginx config (uncomment to use custom config)
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 775 /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
