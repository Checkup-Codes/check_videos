# Deployment Kılavuzu

Bu proje için iki farklı deployment scripti bulunmaktadır.

## 📋 İçindekiler

- [Lokal Deployment](#lokal-deployment)
- [Production Deployment](#production-deployment)
- [Tek Tenant Deployment](#tek-tenant-deployment)
- [Sorun Giderme](#sorun-giderme)

---

## 🏠 Lokal Deployment

Lokal geliştirme ortamında değişiklikleri test etmek için:

```bash
./deploy.sh
```

### Parametreler

```bash
# Tüm tenant'lar için (varsayılan)
./deploy.sh

# Belirli bir tenant için
./deploy.sh checkupcodes.com

# Frontend build'i atla (hızlı deployment)
./deploy.sh all --skip-build
./deploy.sh elselif.com --skip-build
```

### Ne Yapar?

- ✅ Composer bağımlılıklarını günceller
- ✅ Frontend build yapar (npm run build)
- ✅ Cache'leri temizler
- ✅ Route, config, view cache'lerini oluşturur
- ✅ Dosya izinlerini ayarlar

---

## 🚀 Production Deployment (Hostinger)

Production sunucusunda çalıştırılmalıdır:

```bash
./deploy-production.sh
```

### Ne Yapar?

1. **Maintenance Mode** - Siteyi geçici olarak kapatır
2. **Backup** - Mevcut durumun yedeğini alır
3. **Git Pull** - Son değişiklikleri çeker
4. **Composer Install** - Production bağımlılıklarını yükler
5. **Frontend Build** - Assets'leri derler
6. **Cache İşlemleri** - Tüm tenant'lar için cache temizler ve optimize eder
7. **Permissions** - Dosya izinlerini düzeltir
8. **Maintenance Mode Kapat** - Siteyi tekrar açar
9. **Cleanup** - 30 günden eski backupları siler

### Backup Yönetimi

Backuplar `backups/` klasöründe saklanır:

```bash
# Backupları listele
ls -lh backups/

# Backup'tan geri yükle
tar -xzf backups/backup_20260317_074500.tar.gz -C /tmp/restore
```

---

## 🎯 Tek Tenant Deployment

Sadece bir tenant'ı güncellemek için:

```bash
# Cache temizle
APP_TENANT=checkupcodes.com php artisan cache:clear
APP_TENANT=checkupcodes.com php artisan config:clear
APP_TENANT=checkupcodes.com php artisan route:clear
APP_TENANT=checkupcodes.com php artisan view:clear

# Optimize et
APP_TENANT=checkupcodes.com php artisan config:cache
APP_TENANT=checkupcodes.com php artisan route:cache
APP_TENANT=checkupcodes.com php artisan view:cache
```

---

## 🔧 Sorun Giderme

### Script çalışmıyor

```bash
# Execute izni ver
chmod +x deploy.sh deploy-production.sh

# Bash ile çalıştır
bash deploy.sh
```

### Git pull başarısız

```bash
# Değişiklikleri kontrol et
git status

# Değişiklikleri stash'le
git stash

# Pull yap
git pull origin main

# Stash'i geri getir
git stash pop
```

### Cache sorunları

```bash
# Manuel cache temizleme
rm -rf bootstrap/cache/*.php
rm -rf storage/framework/cache/*
rm -rf storage/framework/views/*

# Sonra deploy scriptini çalıştır
./deploy.sh
```

### Permission hataları

```bash
# Storage ve cache klasörlerine izin ver
chmod -R 775 storage bootstrap/cache

# Hostinger'da www-data kullanıcısı yoksa
chmod -R 777 storage bootstrap/cache
```

### Frontend build hataları

```bash
# Node modules'ü temizle
rm -rf node_modules package-lock.json

# Yeniden yükle
npm install

# Build yap
npm run build
```

---

## 📝 Deployment Checklist

Production'a deploy etmeden önce:

- [ ] Tüm değişiklikler commit edildi mi?
- [ ] Lokal testler başarılı mı?
- [ ] `.env` dosyaları güncel mi?
- [ ] Database migration'ları var mı? (Varsa önce çalıştır)
- [ ] Backup alındı mı?
- [ ] Maintenance mode planlandı mı?

---

## 🔄 Deployment Workflow

### Geliştirme Ortamı

```bash
# 1. Değişiklikleri yap
git add .
git commit -m "feat: yeni özellik"

# 2. Lokal test
./deploy.sh checkupcodes.com --skip-build

# 3. Frontend değişikliği varsa
./deploy.sh checkupcodes.com

# 4. Push et
git push origin main
```

### Production Ortamı

```bash
# 1. SSH ile sunucuya bağlan
ssh user@your-server.com

# 2. Proje dizinine git
cd /path/to/public_html

# 3. Deploy et
./deploy-production.sh

# 4. Test et
curl -I https://checkupcodes.com
```

---

## 🆘 Acil Durum (Rollback)

Deployment sonrası sorun çıkarsa:

```bash
# 1. Maintenance mode aç
php artisan down

# 2. Son backup'ı geri yükle
cd /path/to/public_html
tar -xzf backups/backup_YYYYMMDD_HHMMSS.tar.gz

# 3. Cache temizle
./deploy.sh all --skip-build

# 4. Maintenance mode kapat
php artisan up
```

---

## 📞 İletişim

Sorun yaşarsan:

1. `storage/logs/laravel.log` dosyasını kontrol et
2. Error log'ları incele
3. Backup'tan geri yükle

---

**Son Güncelleme:** 17 Mart 2026
