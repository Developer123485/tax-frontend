# ------------------------------------------------------
# 1. Base image: Node.js LTS (Debian Slim, not Alpine)
# ------------------------------------------------------
FROM node:18-slim

# ------------------------------------------------------
# 2. Install system dependencies for GUI + Chrome
# ------------------------------------------------------
RUN apt-get update && apt-get install -y \
    xvfb fluxbox x11vnc websockify novnc curl unzip gnupg \
    && rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------
# 3. Install Google Chrome Stable
# ------------------------------------------------------
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
    > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------
# 4. Set environment variables
# ------------------------------------------------------
ENV NODE_ENV=production
ENV DISPLAY=:99
ENV CHROME_PATH=/usr/bin/google-chrome
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
ENV PORT=3000

# ------------------------------------------------------
# 5. Working directory
# ------------------------------------------------------
WORKDIR /app

# ------------------------------------------------------
# 6. Copy and install Node.js dependencies
# ------------------------------------------------------
COPY package*.json ./
RUN npm ci --omit=dev

# ------------------------------------------------------
# 7. Copy app source and build
# ------------------------------------------------------
COPY . .
RUN npm run build

# ------------------------------------------------------
# 8. Expose Next.js (3000) + noVNC (8080)
# ------------------------------------------------------
EXPOSE 3000 8080

# ------------------------------------------------------
# 9. Start everything (Xvfb + Fluxbox + noVNC + Next.js)
# ------------------------------------------------------
CMD bash -lc '\
  echo "🖥️  Starting Xvfb virtual display on :99..." && \
  Xvfb :99 -screen 0 1920x1080x24 -ac +extension GLX +render -noreset & \
  sleep 2 && \
  echo "🎨 Starting Fluxbox window manager..." && DISPLAY=:99 fluxbox & \
  echo "🔌 Starting VNC + noVNC servers..." && \
  DISPLAY=:99 x11vnc -display :99 -nopw -forever -shared -rfbport 5900 -quiet & \
  websockify --web=/usr/share/novnc/ 8080 localhost:5900 & \
  echo "🚀 Launching Next.js app..." && \
  npm run start'
