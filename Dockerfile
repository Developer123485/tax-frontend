# # Use official Node.js LTS image as base
# FROM node:18-alpine

# # Set working directory inside container
# WORKDIR /app

# # Copy package.json and package-lock.json (if available)
# COPY package.json package-lock.json* ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the app source code
# COPY . .

# # Build the Next.js app
# RUN npm run build

# # Expose port 3000 to the outside
# EXPOSE 3000

# # Start the app
# CMD ["npm", "start"]

# Use official Node.js LTS Alpine image
FROM node:18-alpine

# Install system dependencies required by Chromium
RUN apk add --no-cache \
    ca-certificates \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    google-chrome \
    dumb-init

# Set environment variables for Puppeteer + Chromium
ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
ENV CHROMIUM_PATH=/usr/bin/google-chrome

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json* ./

# Install node modules
RUN npm install -f

# Copy the rest of the app
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
