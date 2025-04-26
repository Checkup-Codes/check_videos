#!/bin/bash

# Deploy script for fixing the 500 error on /rendition/words 

echo "Starting deployment..."

# Pull latest changes
git add .
git commit -m "Fix: 500 error on /rendition/words page"
git push origin main

# SSH into production server and execute commands
echo "Updating production server..."
echo "Please manually run the following commands on your production server:"
echo ""
echo "cd /path/to/your/production/directory"
echo "git pull origin main"
echo "composer install --optimize-autoloader --no-dev"
echo "php artisan optimize:clear"
echo "php artisan view:clear"
echo "php artisan config:clear"
echo "php artisan route:clear"
echo "php artisan cache:clear"
echo "npm install" 
echo "npm run build"
echo "php artisan optimize"
echo ""
echo "After completing these steps, the 500 error should be resolved." 

# chmod +x deploy.sh