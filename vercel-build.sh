#!/bin/bash
# Install dependencies
npm install

# Build the client and server
npm run vercel-build

# Create necessary directories
mkdir -p dist/public

# Copy static assets
cp -r public dist/

# Move built files to the right locations
if [ -d "dist/public/assets" ]; then
  echo "Assets directory exists, continuing..."
else
  echo "Warning: assets directory does not exist, check build output."
fi

echo "Build completed successfully!" 