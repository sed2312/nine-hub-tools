#!/bin/bash

# =================================================================
# VPS Production Server - Sentry Configuration
# =================================================================
# 
# This file contains the commands to add Sentry DSN to your VPS
# DO THIS ON YOUR PRODUCTION SERVER, NOT LOCALLY
#
# =================================================================

# Option 1: Edit .env file directly
# ---------------------------------
echo "Setting up Sentry on VPS..."

# Navigate to your project directory
cd /home/nineprooc/htdocs/nineproo.com

# Edit the .env file
nano .env

# Add this line (or update if exists):
# VITE_SENTRY_DSN=https://8efd9a4a50e1374bbf949d5740ef9645@o4510725894504448.ingest.us.sentry.io/4510725902106624

# Save: Ctrl+X, then Y, then Enter

# Rebuild the application
npm run build

echo "Sentry configured! Restarting application..."


# Option 2: Quick one-liner (if .env doesn't exist)
# --------------------------------------------------
# echo 'VITE_SENTRY_DSN=https://8efd9a4a50e1374bbf949d5740ef9645@o4510725894504448.ingest.us.sentry.io/4510725902106624' >> .env
# npm run build


# Option 3: Using CloudPanel Environment Variables
# -------------------------------------------------
# 1. Log into CloudPanel dashboard
# 2. Select your site (nineproo.com)
# 3. Go to Settings → Environment Variables
# 4. Click "Add Variable"
# 5. Name: VITE_SENTRY_DSN
# 6. Value: https://8efd9a4a50e1374bbf949d5740ef9645@o4510725894504448.ingest.us.sentry.io/4510725902106624
# 7. Click Save
# 8. Rebuild: npm run build
