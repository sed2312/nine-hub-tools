#!/bin/bash

# Nine Hub Tools - CloudPanel Deployment Script
# For nineproo.com on VPS

set -e  # Exit on error

echo "🚀 Deploying Nine Hub Tools to CloudPanel VPS..."
echo "================================================"

# Configuration - Update these paths for your CloudPanel setup
PROJECT_DIR="/home/cloudpanel/htdocs/nineproo.com"
WEB_USER="cloudpanel"
WEB_GROUP="cloudpanel"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📥 Step 1: Pulling latest code from GitHub...${NC}"
cd "$PROJECT_DIR"
git pull origin main

echo -e "${YELLOW}📦 Step 2: Installing dependencies...${NC}"
# Use bun if available, otherwise npm
if command -v bun &> /dev/null; then
    bun install --production
else
    npm ci --production
fi

echo -e "${YELLOW}🔨 Step 3: Building for production...${NC}"
if command -v bun &> /dev/null; then
    bun run build
else
    npm run build
fi

echo -e "${YELLOW}🧹 Step 4: Cleaning old files...${NC}"
# Backup current deployment (optional)
if [ -d "${PROJECT_DIR}/current" ]; then
    rm -rf "${PROJECT_DIR}/backup"
    mv "${PROJECT_DIR}/current" "${PROJECT_DIR}/backup"
fi

echo -e "${YELLOW}📂 Step 5: Deploying build files...${NC}"
# Create current directory and copy dist files
mkdir -p "${PROJECT_DIR}/current"
cp -r dist/* "${PROJECT_DIR}/current/"

# Copy important files
cp public/robots.txt "${PROJECT_DIR}/current/" 2>/dev/null || echo "robots.txt not found, skipping"
cp public/sitemap.xml "${PROJECT_DIR}/current/" 2>/dev/null || echo "sitemap.xml not found, skipping"

echo -e "${YELLOW}🔐 Step 6: Setting correct permissions...${NC}"
chown -R "$WEB_USER:$WEB_GROUP" "${PROJECT_DIR}/current"
chmod -R 755 "${PROJECT_DIR}/current"

echo -e "${YELLOW}🔄 Step 7: Symlinking to web root (if needed)...${NC}"
# If your CloudPanel setup uses a different public folder
if [ -d "${PROJECT_DIR}/htdocs" ]; then
    rm -rf "${PROJECT_DIR}/htdocs"/*
    cp -r "${PROJECT_DIR}/current"/* "${PROJECT_DIR}/htdocs/"
    chown -R "$WEB_USER:$WEB_GROUP" "${PROJECT_DIR}/htdocs"
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo "================================================"
echo -e "${GREEN}🌐 Your site is live at: https://nineproo.com${NC}"
echo ""
echo "Next steps:"
echo "1. Test the site: curl -I https://nineproo.com"
echo "2. Check browser console for any errors"
echo "3. Verify all 9 tools are working"
echo "4. Test on mobile devices"
echo ""
echo "Backup location: ${PROJECT_DIR}/backup"
