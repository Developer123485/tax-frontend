#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the branch name
BRANCH_NAME="main"

# Pull the latest changes from the specified branch
echo "Pulling latest changes from $BRANCH_NAME..."
git pull origin "$BRANCH_NAME"


# Start containers using docker-compose
echo "Starting services with docker-compose..."
docker-compose up --build -d
