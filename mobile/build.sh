#!/bin/bash

echo "🚀 Building MikroNet APK..."

# Install dependencies
npm install

# Build for Android
echo "📦 Building APK..."
eas build --platform android --local

echo "✅ APK build complete!"
echo "📁 Check 'dist' folder for the APK file"
