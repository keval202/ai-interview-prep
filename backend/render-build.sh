#!/usr/bin/env bash
# exit on error
set -o errexit

# Change directory to where the script is located (backend/ folder)
cd "$(dirname "$0")"

echo ">>> Installing backend dependencies..."
npm install

echo ">>> Installing frontend dependencies and building..."
cd ../frontend
npm install --include=dev
npm run build
cd ../backend

echo ">>> Build completed successfully!"
