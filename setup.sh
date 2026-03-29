#!/bin/bash

# 🚀 Study Helper AI - Quick Setup Script
# Run this file to get started: bash setup.sh

echo "📚 Welcome to Study Helper AI Setup!"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created (using demo keys)"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "=================================="
echo "🎉 Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Start dev server: npm run dev"
echo "2. Open browser: http://localhost:3000"
echo "3. Try demo account:"
echo "   Email: demo@example.com"
echo "   Password: demo123"
echo ""
echo "📚 Read more:"
echo "   - QUICKSTART.md (quick guide)"
echo "   - README.md (full documentation)"
echo "   - INTEGRATION_GUIDE.md (API setup)"
echo ""
echo "Happy studying! 🎓"
