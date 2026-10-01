#!/bin/bash

# stop on the first failing command so Render marks the build as failed
set -e

echo "Build script"

npm ci
cd frontend
npm ci
cd ..
npm run build:ui
