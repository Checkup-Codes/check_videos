#!/bin/bash

# Test script for metals:fetch command
# Bu script'i SSH üzerinden çalıştırarak cron job'ın çalışıp çalışmadığını test edebilirsiniz

# Renkli çıktı için
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Metal Prices Cron Job Test Script"
echo "=========================================="
echo ""

# 1. Proje dizinine git
PROJECT_DIR="/home/u807351145/domains/checkupcodes.com/public_html"
echo -e "${YELLOW}[1/6]${NC} Proje dizinine gidiliyor: $PROJECT_DIR"
cd "$PROJECT_DIR" || {
    echo -e "${RED}✗ HATA: Proje dizinine gidilemedi!${NC}"
    exit 1
}
echo -e "${GREEN}✓ Proje dizinine gidildi${NC}"
echo ""

# 2. PHP path kontrolü
echo -e "${YELLOW}[2/6]${NC} PHP path kontrol ediliyor..."
PHP_PATH="/usr/bin/php"
if [ ! -f "$PHP_PATH" ]; then
    echo -e "${RED}✗ HATA: PHP bulunamadı: $PHP_PATH${NC}"
    echo "Mevcut PHP path'leri:"
    which php
    exit 1
fi
echo -e "${GREEN}✓ PHP bulundu: $PHP_PATH${NC}"
$PHP_PATH -v | head -1
echo ""

# 3. Artisan dosyası kontrolü
echo -e "${YELLOW}[3/6]${NC} Artisan dosyası kontrol ediliyor..."
if [ ! -f "$PROJECT_DIR/artisan" ]; then
    echo -e "${RED}✗ HATA: artisan dosyası bulunamadı!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Artisan dosyası bulundu${NC}"
echo ""

# 4. Environment dosyası kontrolü
echo -e "${YELLOW}[4/6]${NC} Environment dosyası kontrol ediliyor..."
ENV_FILE="$PROJECT_DIR/.env.checkupcodes.com"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}✗ UYARI: .env.checkupcodes.com dosyası bulunamadı!${NC}"
    echo "Alternatif .env dosyaları:"
    ls -la "$PROJECT_DIR"/.env* 2>/dev/null || echo "Hiç .env dosyası bulunamadı"
else
    echo -e "${GREEN}✓ Environment dosyası bulundu${NC}"
    # API key'lerin var olduğunu kontrol et (değerleri gösterme)
    if grep -q "METALS_API" "$ENV_FILE"; then
        echo -e "${GREEN}✓ METALS_API konfigürasyonları bulundu${NC}"
    else
        echo -e "${RED}✗ UYARI: METALS_API konfigürasyonları bulunamadı!${NC}"
    fi
fi
echo ""

# 5. Komutun varlığını kontrol et
echo -e "${YELLOW}[5/6]${NC} metals:fetch komutu kontrol ediliyor..."
if $PHP_PATH artisan list | grep -q "metals:fetch"; then
    echo -e "${GREEN}✓ metals:fetch komutu bulundu${NC}"
else
    echo -e "${RED}✗ HATA: metals:fetch komutu bulunamadı!${NC}"
    echo "Mevcut komutlar:"
    $PHP_PATH artisan list | grep -i metal || echo "Metal ile ilgili komut bulunamadı"
    exit 1
fi
echo ""

# 6. Komutu çalıştır
echo -e "${YELLOW}[6/6]${NC} metals:fetch komutu çalıştırılıyor..."
echo "----------------------------------------"
echo ""

LOG_FILE="$PROJECT_DIR/storage/logs/cron-test-$(date +%Y%m%d-%H%M%S).log"
mkdir -p "$(dirname "$LOG_FILE")"

# Komutu çalıştır ve hem ekrana hem de log dosyasına yaz
APP_ENV=checkupcodes.com $PHP_PATH artisan metals:fetch 2>&1 | tee "$LOG_FILE"
EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo "----------------------------------------"
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ Komut başarıyla tamamlandı!${NC}"
    echo -e "${GREEN}✓ Log dosyası: $LOG_FILE${NC}"
else
    echo -e "${RED}✗ Komut hata ile sonlandı (Exit code: $EXIT_CODE)${NC}"
    echo -e "${RED}✗ Log dosyasını kontrol edin: $LOG_FILE${NC}"
fi

echo ""
echo "=========================================="
echo "Test tamamlandı!"
echo "=========================================="

exit $EXIT_CODE

