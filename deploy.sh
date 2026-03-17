#!/bin/bash

# Modern Multi-Tenant Deployment Script
# Kullanım: ./deploy.sh [tenant] [--skip-build]

set -e  # Hata durumunda dur

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   Multi-Tenant Deployment Script     ║"
echo "╔═══════════════════════════════════════╗"
echo -e "${NC}"

# Parametreler
TENANT=${1:-"all"}
SKIP_BUILD=${2}

# Tenant listesi
TENANTS=("checkupcodes.com" "elselif.com" "yusufdur.com" "candundarli.com" "alperenalperen.com")

# Fonksiyonlar
print_step() {
    echo -e "\n${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Git kontrolü
print_step "Git durumu kontrol ediliyor..."
if [[ -n $(git status -s) ]]; then
    print_warning "Commit edilmemiş değişiklikler var!"
    git status -s
    read -p "Devam edilsin mi? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Composer bağımlılıkları
print_step "Composer bağımlılıkları kontrol ediliyor..."
if [ -f "composer.json" ]; then
    composer install --no-dev --optimize-autoloader --no-interaction
    print_success "Composer bağımlılıkları güncellendi"
else
    print_error "composer.json bulunamadı!"
    exit 1
fi

# Frontend build
if [[ "$SKIP_BUILD" != "--skip-build" ]]; then
    print_step "Frontend build yapılıyor..."
    if [ -f "package.json" ]; then
        npm install
        npm run build
        print_success "Frontend build tamamlandı"
    else
        print_warning "package.json bulunamadı, frontend build atlandı"
    fi
else
    print_warning "Frontend build atlandı (--skip-build)"
fi

# Cache temizleme fonksiyonu
clear_cache() {
    local tenant=$1
    print_step "Cache temizleniyor: $tenant"
    
    APP_TENANT=$tenant php artisan config:clear
    APP_TENANT=$tenant php artisan cache:clear
    APP_TENANT=$tenant php artisan route:clear
    APP_TENANT=$tenant php artisan view:clear
    
    print_success "Cache temizlendi: $tenant"
}

# Optimize fonksiyonu
optimize_app() {
    local tenant=$1
    print_step "Optimize ediliyor: $tenant"
    
    APP_TENANT=$tenant php artisan config:cache
    APP_TENANT=$tenant php artisan route:cache
    APP_TENANT=$tenant php artisan view:cache
    
    print_success "Optimize edildi: $tenant"
}

# Tenant işlemleri
if [[ "$TENANT" == "all" ]]; then
    print_step "Tüm tenant'lar için işlemler yapılıyor..."
    for t in "${TENANTS[@]}"; do
        clear_cache "$t"
        optimize_app "$t"
    done
else
    if [[ " ${TENANTS[@]} " =~ " ${TENANT} " ]]; then
        clear_cache "$TENANT"
        optimize_app "$TENANT"
    else
        print_error "Geçersiz tenant: $TENANT"
        echo "Geçerli tenant'lar: ${TENANTS[*]}"
        exit 1
    fi
fi

# Permissions
print_step "Dosya izinleri ayarlanıyor..."
chmod -R 775 storage bootstrap/cache 2>/dev/null || true
print_success "İzinler ayarlandı"

# Özet
echo -e "\n${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     Deployment Başarıyla Tamamlandı  ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}\n"

# Test URL'leri
print_step "Test URL'leri:"
if [[ "$TENANT" == "all" ]]; then
    for t in "${TENANTS[@]}"; do
        echo "  → https://$t"
    done
else
    echo "  → https://$TENANT"
fi

echo -e "\n${YELLOW}Not: Production sunucusunda çalıştırmayı unutma!${NC}\n"
