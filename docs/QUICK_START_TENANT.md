# Yeni Tenant Ekleme - Hızlı Başlangıç

## 🚀 Tek Komut ile Tenant Oluştur

```bash
php artisan tenant:setup candundar.com --copy-users
```

Bu komut:
- ✅ .env.candundar.com dosyası oluşturur
- ✅ candundar_com veritabanını oluşturur
- ✅ Tüm tabloları migrate eder
- ✅ User verilerini ana DB'den kopyalar
- ✅ SEO ayarlarını oluşturur
- ✅ Storage klasörlerini oluşturur
- ✅ config/domains.php'yi günceller

## 📋 Tam Süreç (5 Dakika)

### 1. Domain Al ve Park Et (Hostinger)
- Domain satın al: candundar.com
- Park et: checkupcodes.com

### 2. Tenant Oluştur (Sunucuda)
```bash
cd /var/www/html/your-project
php artisan tenant:setup candundar.com --copy-users
php artisan config:clear
php artisan cache:clear
```

### 3. Test Et
```bash
# robots.txt
curl https://candundar.com/robots.txt

# Ana sayfa
curl -I https://candundar.com
```

### 4. Özelleştir
- Logo: https://candundar.com/seo
- SEO: Site adı, açıklama
- İçerik: Yazılar ekle

## 🧹 Bakım

### Nokta Klasörlerini Temizle
```bash
php artisan tenant:cleanup-dots
```

### Tenant Sil
```bash
# Database
mysql -u root -p
DROP DATABASE candundar_com;

# Dosyalar
rm .env.candundar.com
rm -rf storage/multi/candundar.com
```

## ❓ Sorun Giderme

### "Database already exists" Hatası
```bash
php artisan tenant:setup candundar.com --copy-users
# Soruya "yes" cevabı ver (drop and recreate)
```

### ".env file already exists" Hatası
```bash
# Mevcut .env'yi kontrol et
cat .env.candundar.com

# Overwrite etmek istersen "yes" cevabı ver
```

### Storage Klasörü Oluşmadı
```bash
# Manuel oluştur
mkdir -p storage/multi/candundar.com/public
chmod -R 755 storage/multi/candundar.com
```

## 📞 Destek

Sorun yaşarsan:
1. `docs/TENANT_AUTOMATION_GUIDE.md` dosyasını oku
2. Log'ları kontrol et: `storage/logs/laravel.log`
3. Database'i kontrol et: `mysql -u root -p`

