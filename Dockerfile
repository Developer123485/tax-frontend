# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 to the outside
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
