#!/bin/bash

# Ensure dependencies are installed
echo "Installing client dependencies..."
cd client && npm install

# Build the client
echo "Building client..."
npm run build
cd ..

echo "Deployment preparation complete!" 