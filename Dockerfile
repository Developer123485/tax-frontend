# FROM node:18-bullseye

# # Install dependencies
# RUN apt-get update && apt-get install -y wget gnupg ca-certificates

# RUN apt-get update && apt-get install -y \
#     xvfb fluxbox x11vnc novnc websockify net-tools

# Use official Node.js image
FROM node:18

# Install dependencies for Puppeteer/Chrome
RUN apt-get update && apt-get install -y \
    xvfb fluxbox x11vnc novnc websockify net-tools wget gnupg

# Add Google Chrome’s official repository and key
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-linux.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list

# Install Google Chrome Stable
RUN apt-get update && apt-get install -y google-chrome-stable dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Environment variables
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
ENV CHROMIUM_PATH=/usr/bin/google-chrome
ENV NODE_ENV=production

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
