# Production Deployment Checklist

## ❌ Şu Anda Durum
- Dosyalar sadece local'de
- Production sunucusunda yok
- Bu yüzden 404 hatası

## ✅ Yapılması Gerekenler

### 1. Git ile Dosyaları Yükle

```bash
# Local'de (kendi bilgisayarında)
git status  # Değişiklikleri gör
git add .   # Tüm değişiklikleri ekle
git commit -m "feat: Add tenant management panel and automation"
git push origin main  # Veya master
```

### 2. Production Sunucusunda Pull

```bash
# SSH ile sunucuya bağlan
ssh user@your-server.com

# Proje dizinine git
cd /var/www/html/your-project  # Veya projenin olduğu yer

# Git pull
git pull origin main  # Veya master

# Composer update (eğer gerekirse)
composer install --no-dev --optimize-autoloader
```

### 3. Cache Temizle

```bash
# Hala sunucudasın
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### 4. Frontend Build (Eğer Gerekirse)

```bash
# Eğer Vue dosyalarını değiştirdiysen
npm install
npm run build
```

### 5. Permissions

```bash
# Storage ve cache klasörlerine yazma izni
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 6. Test Et

```bash
# Tarayıcıda aç
https://www.checkupcodes.com/tenants
```

## 🔍 Sorun Giderme

### Hala 404 Alıyorsan

**1. Route cache kontrol et:**
```bash
php artisan route:list | grep tenant
```

Eğer tenant route'ları görünmüyorsa:
```bash
php artisan route:clear
php artisan config:clear
```

**2. .htaccess kontrol et:**
```bash
cat public/.htaccess
```

**3. Web server restart:**
```bash
# Apache
sudo systemctl restart apache2

# Nginx
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm  # PHP versiyonuna göre
```

**4. Log'ları kontrol et:**
```bash
tail -f storage/logs/laravel.log
```

## 📋 Hızlı Komutlar (Tek Satır)

```bash
# Sunucuda çalıştır
cd /var/www/html/your-project && \
git pull && \
composer install --no-dev --optimize-autoloader && \
php artisan config:clear && \
php artisan cache:clear && \
php artisan route:clear && \
php artisan view:clear && \
chmod -R 775 storage bootstrap/cache
```

## ⚠️ Önemli Notlar

1. **Git push yapmadan önce** local'de test et
2. **Production'da** önce backup al
3. **Composer install** uzun sürebilir
4. **npm run build** gerekirse çalıştır (Vue değişiklikleri için)
5. **Cache temizleme** çok önemli!

