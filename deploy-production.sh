#!/bin/bash

# Production Deployment Script (Hostinger için optimize edilmiş)
# Bu scripti production sunucusunda çalıştır

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Konfigürasyon
PROJECT_DIR="${PWD}"
BACKUP_DIR="${PROJECT_DIR}/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   Production Deployment (Hostinger)  ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Fonksiyonlar
print_step() { echo -e "\n${BLUE}▶ $1${NC}"; }
print_success() { echo -e "${GREEN}✓ $1${NC}"; }
print_error() { echo -e "${RED}✗ $1${NC}"; exit 1; }
print_warning() { echo -e "${YELLOW}⚠ $1${NC}"; }

# Maintenance mode
print_step "Maintenance mode aktif ediliyor..."
php artisan down --retry=60 || print_warning "Maintenance mode başarısız (devam ediliyor)"

# Backup oluştur
print_step "Backup oluşturuluyor..."
mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='storage/logs' \
    --exclude='backups' \
    . 2>/dev/null || print_warning "Backup kısmen başarılı"
print_success "Backup: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# Git pull
print_step "Git pull yapılıyor..."
git fetch origin
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git pull origin "$CURRENT_BRANCH" || print_error "Git pull başarısız!"
print_success "Git pull tamamlandı"

# Composer
print_step "Composer install..."
composer install --no-dev --optimize-autoloader --no-interaction || print_error "Composer başarısız!"
print_success "Composer tamamlandı"

# NPM Build
print_step "Frontend build..."
if command -v npm &> /dev/null; then
    npm ci --production
    npm run build
    print_success "Frontend build tamamlandı"
else
    print_warning "npm bulunamadı, frontend build atlandı"
fi

# Cache temizleme ve optimize
print_step "Cache ve optimize işlemleri..."
TENANTS=("checkupcodes.com" "elselif.com" "yusufdur.com" "candundarli.com" "alperenalperen.com")

for tenant in "${TENANTS[@]}"; do
    echo "  → $tenant"
    APP_TENANT=$tenant php artisan config:clear
    APP_TENANT=$tenant php artisan cache:clear
    APP_TENANT=$tenant php artisan route:clear
    APP_TENANT=$tenant php artisan view:clear
    
    APP_TENANT=$tenant php artisan config:cache
    APP_TENANT=$tenant php artisan route:cache
    APP_TENANT=$tenant php artisan view:cache
done
print_success "Cache işlemleri tamamlandı"

# Permissions
print_step "Dosya izinleri ayarlanıyor..."
find storage -type f -exec chmod 664 {} \; 2>/dev/null || true
find storage -type d -exec chmod 775 {} \; 2>/dev/null || true
find bootstrap/cache -type f -exec chmod 664 {} \; 2>/dev/null || true
find bootstrap/cache -type d -exec chmod 775 {} \; 2>/dev/null || true
print_success "İzinler ayarlandı"

# Maintenance mode kapat
print_step "Maintenance mode kapatılıyor..."
php artisan up
print_success "Site tekrar aktif"

# Eski backupları temizle (30 günden eski)
print_step "Eski backuplar temizleniyor..."
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +30 -delete 2>/dev/null || true
print_success "Eski backuplar temizlendi"

# Özet
echo -e "\n${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Deployment Başarıyla Tamamlandı!   ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}\n"

print_step "Test URL'leri:"
for tenant in "${TENANTS[@]}"; do
    echo "  → https://$tenant"
done

echo -e "\n${YELLOW}Deployment Bilgileri:${NC}"
echo "  • Zaman: $(date)"
echo "  • Branch: $CURRENT_BRANCH"
echo "  • Commit: $(git rev-parse --short HEAD)"
echo "  • Backup: backup_$TIMESTAMP.tar.gz"
echo ""
