#!/bin/bash

# Tenant Panel Deployment Script
# Bu script'i production sunucusunda çalıştır

echo "🚀 Tenant Panel Deployment Başlıyor..."
echo ""

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Proje dizini (değiştir!)
PROJECT_DIR="/var/www/html/your-project"

# Proje dizinine git
cd $PROJECT_DIR || exit

echo "📁 Proje dizini: $PROJECT_DIR"
echo ""

# Git pull
echo "📥 Git pull yapılıyor..."
git pull origin main || git pull origin master

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Git pull başarılı${NC}"
else
    echo -e "${RED}❌ Git pull başarısız${NC}"
    exit 1
fi
echo ""

# Composer install
echo "📦 Composer install..."
composer install --no-dev --optimize-autoloader --no-interaction

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Composer install başarılı${NC}"
else
    echo -e "${YELLOW}⚠️  Composer install başarısız (devam ediliyor)${NC}"
fi
echo ""

# Cache temizleme
echo "🧹 Cache temizleniyor..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo -e "${GREEN}✅ Cache temizlendi${NC}"
echo ""

# Route kontrolü
echo "🔍 Route kontrolü..."
ROUTE_COUNT=$(php artisan route:list | grep -c "tenants")

if [ $ROUTE_COUNT -gt 0 ]; then
    echo -e "${GREEN}✅ Tenant route'ları bulundu ($ROUTE_COUNT adet)${NC}"
else
    echo -e "${RED}❌ Tenant route'ları bulunamadı!${NC}"
    echo "Route listesi:"
    php artisan route:list | grep tenant
fi
echo ""

# Permissions
echo "🔐 Permissions ayarlanıyor..."
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

echo -e "${GREEN}✅ Permissions ayarlandı${NC}"
echo ""

# Frontend build (opsiyonel)
read -p "Frontend build yapılsın mı? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🎨 Frontend build yapılıyor..."
    npm install
    npm run build
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend build başarılı${NC}"
    else
        echo -e "${RED}❌ Frontend build başarısız${NC}"
    fi
fi
echo ""

# Test URL
echo "🧪 Test URL'leri:"
echo "   https://www.checkupcodes.com/tenants"
echo "   https://checkupcodes.com/tenants"
echo ""

echo -e "${GREEN}🎉 Deployment tamamlandı!${NC}"
echo ""
echo "Şimdi tarayıcıda test et:"
echo "1. https://www.checkupcodes.com/tenants"
echo "2. Giriş yap"
echo "3. Tenant listesini gör"
echo ""

