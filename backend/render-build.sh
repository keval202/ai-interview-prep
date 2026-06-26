#!/usr/bin/env bash
# exit on error
set -o errexit

# Change directory to where the script is located (backend/ folder)
cd "$(dirname "$0")"

echo ">>> Installing dependencies..."
npm install

echo ">>> Ensuring Puppeteer cache directory exists..."
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
mkdir -p $PUPPETEER_CACHE_DIR

echo ">>> Installing Puppeteer Chromium browser binary..."
npx puppeteer browsers install chrome

echo ">>> Persisting Chromium in the Render cache..."
if [[ -d .cache/puppeteer/chrome/ ]]; then
  cp -R .cache/puppeteer/chrome/ $PUPPETEER_CACHE_DIR
fi

echo ">>> Build completed successfully!"
