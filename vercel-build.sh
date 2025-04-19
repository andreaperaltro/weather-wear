#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "Starting Vercel build process..."

# Install dependencies
npm install

# Build the client
cd client
npm install
npm run build
cd ..

# Create server output directory
mkdir -p dist

# Build the server
npx esbuild server/index.ts server/routes.ts server/vite.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Copy static assets if they exist
if [ -d "client/dist" ]; then
  echo "Copying client build to dist/public..."
  mkdir -p dist/public
  cp -r client/dist/* dist/public/
else
  echo "ERROR: client build directory not found!"
  exit 1
fi

# Copy other necessary files
if [ -d "public" ]; then
  echo "Copying public assets..."
  cp -r public/* dist/public/
fi

echo "Build completed successfully!" 